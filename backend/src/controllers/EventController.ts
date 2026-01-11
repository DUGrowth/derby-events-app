import { Request, Response } from 'express';
import { Op, QueryTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Category, Event, Venue } from '../models';

export class EventController {
  static async listEvents(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);
    const offset = (page - 1) * limit;

    const where: Record<string, unknown> = {
      status: 'active'
    };

    if (req.query.categoryId) {
      where.categoryId = Number(req.query.categoryId);
    }

    if (req.query.isFree !== undefined) {
      where.isFree = req.query.isFree === 'true';
    }

    if (req.query.startDate || req.query.endDate) {
      const startDate = req.query.startDate ? new Date(String(req.query.startDate)) : new Date('1970-01-01');
      const endDate = req.query.endDate ? new Date(String(req.query.endDate)) : new Date('2999-12-31');
      where.startDate = { [Op.between]: [startDate, endDate] };
    }

    const { rows, count } = await Event.findAndCountAll({
      where,
      include: [Category, Venue],
      limit,
      offset,
      order: [['startDate', 'ASC']]
    });

    res.json({
      data: rows,
      meta: {
        page,
        limit,
        total: count
      }
    });
  }

  static async searchEvents(req: Request, res: Response): Promise<void> {
    const q = String(req.query.q ?? '').trim();
    if (!q) {
      res.status(400).json({ message: 'Query parameter q is required.' });
      return;
    }

    const limit = Number(req.query.limit ?? 50);
    const offset = Number(req.query.offset ?? 0);

    const ranked = await sequelize.query<{ id: number }>(
      `SELECT id FROM events
       WHERE search_vector @@ plainto_tsquery('english', :query)
       ORDER BY ts_rank(search_vector, plainto_tsquery('english', :query)) DESC
       LIMIT :limit OFFSET :offset`,
      {
        replacements: { query: q, limit, offset },
        type: QueryTypes.SELECT
      }
    );

    const ids = ranked.map((row) => row.id);
    if (ids.length === 0) {
      res.json({ data: [] });
      return;
    }

    const events = await Event.findAll({
      where: { id: ids },
      include: [Category, Venue]
    });

    const sorted = ids
      .map((id) => events.find((event) => event.id === id))
      .filter((event): event is Event => Boolean(event));
    res.json({ data: sorted });
  }

  static async nearbyEvents(req: Request, res: Response): Promise<void> {
    const latitude = Number(req.query.latitude);
    const longitude = Number(req.query.longitude);
    const radius = Number(req.query.radius ?? 5);

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      res.status(400).json({ message: 'latitude and longitude are required.' });
      return;
    }

    const radiusMeters = radius * 1609.34;

    const nearby = await sequelize.query<{ id: number }>(
      `SELECT id FROM events
       WHERE location IS NOT NULL
       AND ST_DWithin(location, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography, :radius)
       ORDER BY ST_Distance(location, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography) ASC
       LIMIT 100`,
      {
        replacements: { lat: latitude, lng: longitude, radius: radiusMeters },
        type: QueryTypes.SELECT
      }
    );

    const ids = nearby.map((row) => row.id);
    if (ids.length === 0) {
      res.json({ data: [] });
      return;
    }

    const events = await Event.findAll({
      where: { id: ids },
      include: [Category, Venue]
    });

    const sorted = ids
      .map((id) => events.find((event) => event.id === id))
      .filter((event): event is Event => Boolean(event));
    res.json({ data: sorted });
  }

  static async calendarEvents(req: Request, res: Response): Promise<void> {
    const year = Number(req.params.year);
    const month = Number(req.params.month) - 1;

    if (Number.isNaN(year) || Number.isNaN(month)) {
      res.status(400).json({ message: 'Invalid year or month.' });
      return;
    }

    const start = new Date(Date.UTC(year, month, 1));
    const end = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59));

    const events = await Event.findAll({
      where: {
        startDate: { [Op.between]: [start, end] }
      },
      include: [Category]
    });

    res.json({ data: events });
  }

  static async getEventById(req: Request, res: Response): Promise<void> {
    const event = await Event.findByPk(Number(req.params.id), {
      include: [Category, Venue]
    });

    if (!event) {
      res.status(404).json({ message: 'Event not found.' });
      return;
    }

    await event.update({ viewCount: event.viewCount + 1 });
    res.json({ data: event });
  }
}
