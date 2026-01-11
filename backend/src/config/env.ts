import dotenv from 'dotenv';

dotenv.config();

const requireEnv = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const numberEnv = (key: string, fallback: number): number => {
  const value = process.env[key];
  if (!value) {
    return fallback;
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid number for ${key}`);
  }
  return parsed;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: numberEnv('PORT', 3001),
  databaseUrl: requireEnv('DATABASE_URL'),
  redisUrl: requireEnv('REDIS_URL'),
  eventbriteToken: process.env.EVENTBRITE_API_TOKEN ?? '',
  ticketmasterKey: process.env.TICKETMASTER_API_KEY ?? '',
  derbyLatitude: numberEnv('DERBY_LATITUDE', 52.9225),
  derbyLongitude: numberEnv('DERBY_LONGITUDE', -1.4767),
  derbySearchRadiusMiles: numberEnv('DERBY_SEARCH_RADIUS_MI', 10),
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  adminSyncToken: process.env.ADMIN_SYNC_TOKEN ?? ''
};
