import { Router } from 'express';
import { EventController } from '../controllers/EventController';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.get('/', asyncHandler(EventController.listEvents));
router.get('/search', asyncHandler(EventController.searchEvents));
router.get('/nearby', asyncHandler(EventController.nearbyEvents));
router.get('/calendar/:year/:month', asyncHandler(EventController.calendarEvents));
router.get('/:id', asyncHandler(EventController.getEventById));

export default router;
