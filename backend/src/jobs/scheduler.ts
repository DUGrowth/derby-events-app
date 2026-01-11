import Bull from 'bull';
import { env } from '../config/env';
import { syncAllEvents } from './syncEvents';

const eventSyncQueue = new Bull('event-sync', { redis: env.redisUrl });

eventSyncQueue.process(async () => {
  await syncAllEvents();
});

eventSyncQueue.add(
  {},
  {
    repeat: {
      cron: '0 */6 * * *'
    }
  }
);

export { eventSyncQueue };

if (require.main === module) {
  eventSyncQueue.on('completed', (job) => {
    console.log(`Sync job completed: ${job.id}`);
  });

  eventSyncQueue.on('failed', (job, err) => {
    console.error(`Sync job failed: ${job?.id}`, err);
  });
}
