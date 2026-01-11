import { Op } from 'sequelize';
import { Event } from '../models';

export class Deduplicator {
  async findDuplicate(title: string, startDate: Date): Promise<Event | null> {
    const start = new Date(startDate);
    const end = new Date(startDate);
    end.setHours(23, 59, 59, 999);

    return Event.findOne({
      where: {
        title: { [Op.iLike]: title },
        startDate: { [Op.between]: [start, end] }
      }
    });
  }
}
