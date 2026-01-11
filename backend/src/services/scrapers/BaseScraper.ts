import axios from 'axios';
import slugify from 'slugify';
import { Event, EventCreationAttributes, EventSource, SyncLog } from '../../models';

export interface ScrapedEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string | null;
  url?: string;
  locationName?: string;
  locationAddress?: string;
  latitude?: number | null;
  longitude?: number | null;
  imageUrl?: string;
}

export abstract class BaseScraper {
  protected sourceName: string;

  constructor(sourceName: string) {
    this.sourceName = sourceName;
  }

  abstract fetchEvents(): Promise<ScrapedEvent[]>;

  protected async fetchHtml(url: string): Promise<string> {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'DerbyEventsBot/1.0 (+https://example.com)'
      }
    });
    return response.data as string;
  }

  async syncEvents(): Promise<{ fetched: number; created: number; updated: number }> {
    const source = await EventSource.findOne({ where: { name: this.sourceName } });
    if (!source) {
      throw new Error(`Missing event source: ${this.sourceName}`);
    }

    const syncLog = await SyncLog.create({
      sourceId: source.id,
      status: 'running',
      startedAt: new Date()
    });

    const started = Date.now();
    try {
      const scrapedEvents = await this.fetchEvents();
      let created = 0;
      let updated = 0;

      for (const event of scrapedEvents) {
        const normalized = this.normalizeEvent(event, source.id);
        const [_, wasCreated] = await Event.upsert(normalized, {
          conflictFields: ['source_id', 'source_event_id']
        });
        if (wasCreated) {
          created += 1;
        } else {
          updated += 1;
        }
      }

      await syncLog.update({
        completedAt: new Date(),
        eventsFetched: scrapedEvents.length,
        eventsCreated: created,
        eventsUpdated: updated,
        status: 'completed',
        durationSeconds: Math.round((Date.now() - started) / 1000)
      });

      return { fetched: scrapedEvents.length, created, updated };
    } catch (error) {
      await syncLog.update({
        completedAt: new Date(),
        status: 'failed',
        errorMessage: error instanceof Error ? error.message : String(error),
        durationSeconds: Math.round((Date.now() - started) / 1000)
      });
      throw error;
    }
  }

  protected normalizeEvent(event: ScrapedEvent, sourceId: number): EventCreationAttributes {
    const slug = slugify(event.title, { lower: true, strict: true });
    const latitude = event.latitude ?? null;
    const longitude = event.longitude ?? null;

    const hasCoords = latitude !== null && longitude !== null;

    return {
      sourceId,
      sourceEventId: event.id,
      sourceUrl: event.url ?? null,
      title: event.title,
      slug,
      description: event.description ?? null,
      shortDescription: event.description ? event.description.slice(0, 480) : null,
      startDate: new Date(event.startDate),
      endDate: event.endDate ? new Date(event.endDate) : null,
      timezone: 'Europe/London',
      locationName: event.locationName ?? null,
      locationAddress: event.locationAddress ?? null,
      latitude,
      longitude,
      location: hasCoords ? { type: 'Point', coordinates: [longitude, latitude] } : null,
      isFree: false,
      currency: 'GBP',
      ticketUrl: event.url ?? null,
      imageUrl: event.imageUrl ?? null,
      status: 'active',
      isFeatured: false,
      isVerified: false,
      lastSyncedAt: new Date(),
      updatedAt: new Date()
    };
  }

  protected async sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}
