import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.post('/street-manager', asyncHandler(async (req, res) => {
  console.log('[street-manager webhook]', {
    headers: req.headers,
    body: req.body
  });

  res.json({ received: true });
}));

export default router;
