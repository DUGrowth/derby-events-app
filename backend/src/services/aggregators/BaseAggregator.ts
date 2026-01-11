import axios, { AxiosInstance } from 'axios';
import slugify from 'slugify';
import { Event, EventCreationAttributes, EventSource, SyncLog } from '../../models';

export interface RawEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string | null;
  timezone?: string;
  url?: string;
  venue?: {
    name?: string;
    address?: string;
    latitude?: number | null;
    longitude?: number | null;
  };
  categoryId?: number | null;
  tags?: string[];
  isFree?: boolean;
  priceMin?: number | null;
  priceMax?: number | null;
  currency?: string;
  imageUrl?: string;
  organizerName?: string;
}

export abstract class BaseAggregator {
  protected sourceName: string;
  protected apiClient: AxiosInstance;

  constructor(sourceName: string, baseURL?: string) {
    this.sourceName = sourceName;
    this.apiClient = axios.create({ baseURL });
  }

  abstract fetchEvents(): Promise<RawEvent[]>;

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
      const rawEvents = await this.fetchEvents();
      let created = 0;
      let updated = 0;

      for (const rawEvent of rawEvents) {
        const normalized = this.normalizeEvent(rawEvent, source.id);
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
        eventsFetched: rawEvents.length,
        eventsCreated: created,
        eventsUpdated: updated,
        status: 'completed',
        durationSeconds: Math.round((Date.now() - started) / 1000)
      });

      return { fetched: rawEvents.length, created, updated };
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

  protected normalizeEvent(rawEvent: RawEvent, sourceId: number): EventCreationAttributes {
    const slug = slugify(rawEvent.title, { lower: true, strict: true });
    const latitude = rawEvent.venue?.latitude ?? null;
    const longitude = rawEvent.venue?.longitude ?? null;

    const hasCoords = latitude !== null && longitude !== null;

    return {
      sourceId,
      sourceEventId: rawEvent.id,
      sourceUrl: rawEvent.url ?? null,
      title: rawEvent.title,
      slug,
      description: rawEvent.description ?? null,
      shortDescription: rawEvent.description ? rawEvent.description.slice(0, 480) : null,
      startDate: new Date(rawEvent.startDate),
      endDate: rawEvent.endDate ? new Date(rawEvent.endDate) : null,
      timezone: rawEvent.timezone ?? 'Europe/London',
      locationName: rawEvent.venue?.name ?? null,
      locationAddress: rawEvent.venue?.address ?? null,
      latitude,
      longitude,
      location: hasCoords ? { type: 'Point', coordinates: [longitude, latitude] } : null,
      categoryId: rawEvent.categoryId ?? null,
      tags: rawEvent.tags ?? null,
      isFree: rawEvent.isFree ?? false,
      priceMin: rawEvent.priceMin ?? null,
      priceMax: rawEvent.priceMax ?? null,
      currency: rawEvent.currency ?? 'GBP',
      ticketUrl: rawEvent.url ?? null,
      imageUrl: rawEvent.imageUrl ?? null,
      status: 'active',
      isFeatured: false,
      isVerified: false,
      organizerName: rawEvent.organizerName ?? null,
      lastSyncedAt: new Date(),
      updatedAt: new Date()
    };
  }

  protected async sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}
