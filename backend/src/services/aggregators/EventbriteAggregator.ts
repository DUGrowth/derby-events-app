import { BaseAggregator, RawEvent } from './BaseAggregator';
import { env } from '../../config/env';

interface EventbriteVenue {
  name?: string;
  address?: {
    localized_address_display?: string;
  };
  latitude?: string;
  longitude?: string;
}

interface EventbriteEvent {
  id: string;
  name?: { text?: string };
  description?: { text?: string };
  start?: { utc?: string; timezone?: string };
  end?: { utc?: string };
  url?: string;
  venue?: EventbriteVenue;
  is_free?: boolean;
  logo?: { url?: string };
  organizer?: { name?: string };
}

interface EventbriteResponse {
  events: EventbriteEvent[];
  pagination?: {
    has_more_items?: boolean;
    page_number?: number;
    page_count?: number;
  };
}

export class EventbriteAggregator extends BaseAggregator {
  constructor() {
    super('Eventbrite', 'https://www.eventbriteapi.com/v3');
  }

  async fetchEvents(): Promise<RawEvent[]> {
    if (!env.eventbriteToken) {
      return [];
    }

    const events: RawEvent[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await this.apiClient.get<EventbriteResponse>('/events/search/', {
        headers: {
          Authorization: `Bearer ${env.eventbriteToken}`
        },
        params: {
          'location.latitude': env.derbyLatitude,
          'location.longitude': env.derbyLongitude,
          'location.within': `${env.derbySearchRadiusMiles}mi`,
          'expand': 'venue,organizer',
          'page': page
        }
      });

      for (const event of response.data.events ?? []) {
        const venue = event.venue;
        const latitude = venue?.latitude ? Number(venue.latitude) : null;
        const longitude = venue?.longitude ? Number(venue.longitude) : null;

        if (!event.name?.text || !event.start?.utc) {
          continue;
        }

        events.push({
          id: event.id,
          title: event.name.text,
          description: event.description?.text,
          startDate: event.start.utc,
          endDate: event.end?.utc ?? null,
          timezone: event.start.timezone,
          url: event.url,
          venue: {
            name: venue?.name,
            address: venue?.address?.localized_address_display,
            latitude,
            longitude
          },
          isFree: event.is_free,
          imageUrl: event.logo?.url,
          organizerName: event.organizer?.name
        });
      }

      const pagination = response.data.pagination;
      hasMore = Boolean(pagination?.has_more_items);
      page = (pagination?.page_number ?? page) + 1;

      if (hasMore) {
        await this.sleep(500);
      }
    }

    return events;
  }
}
