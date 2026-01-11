import { NextFunction, Request, Response } from 'express';

interface RateState {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 200;
const store = new Map<string, RateState>();

export const rateLimiter = (req: Request, res: Response, next: NextFunction): void => {
  const key = req.ip ?? 'unknown';
  const now = Date.now();
  const state = store.get(key);

  if (!state || now > state.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  if (state.count >= MAX_REQUESTS) {
    res.status(429).json({ message: 'Too many requests, please try again later.' });
    return;
  }

  state.count += 1;
  next();
};
