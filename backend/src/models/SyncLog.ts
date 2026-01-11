import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface SyncLogAttributes {
  id: number;
  sourceId: number;
  startedAt: Date;
  completedAt?: Date | null;
  eventsFetched: number;
  eventsCreated: number;
  eventsUpdated: number;
  status: 'running' | 'completed' | 'failed';
  errorMessage?: string | null;
  durationSeconds?: number | null;
}

export type SyncLogCreationAttributes = Optional<SyncLogAttributes, 'id' | 'startedAt' | 'completedAt' | 'eventsFetched' | 'eventsCreated' | 'eventsUpdated' | 'status' | 'errorMessage' | 'durationSeconds'>;

export class SyncLog extends Model<SyncLogAttributes, SyncLogCreationAttributes> implements SyncLogAttributes {
  declare id: number;
  declare sourceId: number;
  declare startedAt: Date;
  declare completedAt?: Date | null;
  declare eventsFetched: number;
  declare eventsCreated: number;
  declare eventsUpdated: number;
  declare status: 'running' | 'completed' | 'failed';
  declare errorMessage?: string | null;
  declare durationSeconds?: number | null;
}

SyncLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    sourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'source_id'
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'started_at'
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'completed_at'
    },
    eventsFetched: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'events_fetched'
    },
    eventsCreated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'events_created'
    },
    eventsUpdated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'events_updated'
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'running'
    },
    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'error_message'
    },
    durationSeconds: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'duration_seconds'
    }
  },
  {
    sequelize,
    tableName: 'sync_logs',
    timestamps: false
  }
);
