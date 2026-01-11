import { Router } from 'express';
import { Category } from '../models';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.get('/', asyncHandler(async (_req, res) => {
  const categories = await Category.findAll({ order: [['name', 'ASC']] });
  res.json({ data: categories });
}));

export default router;
