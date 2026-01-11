import { Sequelize } from 'sequelize';
import { env } from './env';

export const sequelize = new Sequelize(env.databaseUrl, {
  dialect: 'postgres',
  logging: env.nodeEnv === 'development' ? console.log : false,
  dialectOptions: {
    application_name: 'derby-events-app'
  }
});

export const ensurePostgis = async (): Promise<void> => {
  await sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis;');
};
