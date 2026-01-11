import { BaseAggregator, RawEvent } from './BaseAggregator';
import { env } from '../../config/env';

interface TicketmasterEvent {
  id: string;
  name?: string;
  url?: string;
  info?: string;
  description?: string;
  dates?: {
    start?: {
      dateTime?: string;
      localDate?: string;
      localTime?: string;
      timezone?: string;
    };
  };
  _embedded?: {
    venues?: Array<{
      name?: string;
      address?: { line1?: string };
      city?: { name?: string };
      postalCode?: string;
      location?: { latitude?: string; longitude?: string };
    }>;
  };
  priceRanges?: Array<{ min?: number; max?: number; currency?: string }>;
  images?: Array<{ url?: string }>
  promoter?: { name?: string };
}

interface TicketmasterResponse {
  _embedded?: { events?: TicketmasterEvent[] };
  page?: { totalPages?: number; number?: number };
}

export class TicketmasterAggregator extends BaseAggregator {
  constructor() {
    super('Ticketmaster', 'https://app.ticketmaster.com/discovery/v2');
  }

  async fetchEvents(): Promise<RawEvent[]> {
    if (!env.ticketmasterKey) {
      return [];
    }

    const events: RawEvent[] = [];
    let page = 0;
    let totalPages = 1;

    while (page < totalPages) {
      const response = await this.apiClient.get<TicketmasterResponse>('/events.json', {
        params: {
          apikey: env.ticketmasterKey,
          city: 'Derby',
          countryCode: 'GB',
          size: 200,
          page
        }
      });

      const batch = response.data._embedded?.events ?? [];
      for (const event of batch) {
        const start = event.dates?.start;
        const eventDateTime = start?.dateTime
          ?? (start?.localDate && start?.localTime ? `${start.localDate}T${start.localTime}` : undefined);

        if (!event.name || !eventDateTime) {
          continue;
        }

        const venue = event._embedded?.venues?.[0];
        const latitude = venue?.location?.latitude ? Number(venue.location.latitude) : null;
        const longitude = venue?.location?.longitude ? Number(venue.location.longitude) : null;
        const price = event.priceRanges?.[0];
        const imageUrl = event.images?.[0]?.url;

        events.push({
          id: event.id,
          title: event.name,
          description: event.info ?? event.description,
          startDate: eventDateTime,
          endDate: null,
          timezone: start?.timezone,
          url: event.url,
          venue: {
            name: venue?.name,
            address: [venue?.address?.line1, venue?.city?.name, venue?.postalCode].filter(Boolean).join(', '),
            latitude,
            longitude
          },
          isFree: price ? price.min === 0 && price.max === 0 : false,
          priceMin: price?.min ?? null,
          priceMax: price?.max ?? null,
          currency: price?.currency ?? 'GBP',
          imageUrl,
          organizerName: event.promoter?.name
        });
      }

      totalPages = response.data.page?.totalPages ?? totalPages;
      page = (response.data.page?.number ?? page) + 1;

      if (page < totalPages) {
        await this.sleep(250);
      }
    }

    return events;
  }
}
