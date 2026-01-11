import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface EventSourceAttributes {
  id: number;
  name: string;
  type: 'api' | 'scraper' | 'user_submitted';
  url?: string | null;
  isActive: boolean;
  createdAt: Date;
}

export type EventSourceCreationAttributes = Optional<EventSourceAttributes, 'id' | 'url' | 'isActive' | 'createdAt'>;

export class EventSource extends Model<EventSourceAttributes, EventSourceCreationAttributes> implements EventSourceAttributes {
  declare id: number;
  declare name: string;
  declare type: 'api' | 'scraper' | 'user_submitted';
  declare url?: string | null;
  declare isActive: boolean;
  declare createdAt: Date;
}

EventSource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    }
  },
  {
    sequelize,
    tableName: 'event_sources',
    timestamps: false
  }
);
