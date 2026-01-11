import { Sequelize } from 'sequelize';
import { env } from './env';

const sslMode = process.env.PGSSLMODE ?? '';
const useSsl = env.databaseUrl.includes('sslmode=require') || sslMode === 'require';
const allowSelfSigned = process.env.PG_SSL_ALLOW_SELF_SIGNED === 'true';

export const sequelize = new Sequelize(env.databaseUrl, {
  dialect: 'postgres',
  logging: env.nodeEnv === 'development' ? console.log : false,
  dialectOptions: {
    application_name: 'derby-events-app',
    ...(useSsl
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: !allowSelfSigned
          }
        }
      : {})
  }
});

export const ensurePostgis = async (): Promise<void> => {
  await sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis;');
};
