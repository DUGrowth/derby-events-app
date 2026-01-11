import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { sequelize } from './config/database';
import './models';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import categoriesRouter from './routes/categories';
import eventsRouter from './routes/events';
import submissionsRouter from './routes/submissions';
import venuesRouter from './routes/venues';
import syncRouter from './routes/sync';
import webhooksRouter from './routes/webhooks';

const app = express();

app.use(cors({ origin: env.frontendUrl }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimiter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/events', eventsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/venues', venuesRouter);
app.use('/api/submissions', submissionsRouter);
app.use('/api/sync', syncRouter);
app.use('/api/webhooks', webhooksRouter);

app.use(errorHandler);

const start = async (): Promise<void> => {
  await sequelize.authenticate();
  app.listen(env.port, () => {
    console.log(`API listening on port ${env.port}`);
  });
};

if (require.main === module) {
  start().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

export default app;
