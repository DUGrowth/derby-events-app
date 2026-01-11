import { Router } from 'express';
import { SubmissionController } from '../controllers/SubmissionController';
import { asyncHandler } from '../middleware/asyncHandler';
import { requireFields } from '../middleware/validator';

const router = Router();

router.post(
  '/',
  requireFields(['submitterEmail', 'title', 'startDate']),
  asyncHandler(SubmissionController.submitEvent)
);

export default router;
