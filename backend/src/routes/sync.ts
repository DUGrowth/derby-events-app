import { Router } from 'express';
import { env } from '../config/env';
import { syncAllEvents } from '../jobs/syncEvents';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.get('/trigger', asyncHandler(async (req, res) => {
  if (env.adminSyncToken) {
    const token = req.header('x-admin-token');
    if (token !== env.adminSyncToken) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
  }

  await syncAllEvents();
  res.json({ message: 'Sync started.' });
}));

export default router;
