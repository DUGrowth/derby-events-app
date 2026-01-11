import { Router } from 'express';
import { Venue } from '../models';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.get('/', asyncHandler(async (_req, res) => {
  const venues = await Venue.findAll({ order: [['name', 'ASC']] });
  res.json({ data: venues });
}));

export default router;
