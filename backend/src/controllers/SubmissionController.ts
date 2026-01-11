import { Request, Response } from 'express';
import { UserSubmittedEvent } from '../models';

export class SubmissionController {
  static async submitEvent(req: Request, res: Response): Promise<void> {
    const submission = await UserSubmittedEvent.create({
      submitterName: req.body.submitterName,
      submitterEmail: req.body.submitterEmail,
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      locationName: req.body.locationName,
      locationAddress: req.body.locationAddress,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      categoryId: req.body.categoryId,
      isFree: req.body.isFree,
      priceMin: req.body.priceMin,
      ticketUrl: req.body.ticketUrl,
      imageUrl: req.body.imageUrl,
      organizerName: req.body.organizerName
    });

    res.status(201).json({ data: submission });
  }
}
