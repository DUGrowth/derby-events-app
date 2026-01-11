import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface RoadworkAttributes {
  id: number;
  workReference: string;
  streetName?: string | null;
  promoter?: string | null;
  workCategory?: string | null;
  trafficManagement?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  location?: { type: 'Point'; coordinates: [number, number] } | null;
  status?: string | null;
  description?: string | null;
  createdAt: Date;
}

export type RoadworkCreationAttributes = Optional<RoadworkAttributes, 'id' | 'streetName' | 'promoter' | 'workCategory' | 'trafficManagement' | 'startDate' | 'endDate' | 'location' | 'status' | 'description' | 'createdAt'>;

export class Roadwork extends Model<RoadworkAttributes, RoadworkCreationAttributes> implements RoadworkAttributes {
  declare id: number;
  declare workReference: string;
  declare streetName?: string | null;
  declare promoter?: string | null;
  declare workCategory?: string | null;
  declare trafficManagement?: string | null;
  declare startDate?: Date | null;
  declare endDate?: Date | null;
  declare location?: { type: 'Point'; coordinates: [number, number] } | null;
  declare status?: string | null;
  declare description?: string | null;
  declare createdAt: Date;
}

Roadwork.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    workReference: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: 'work_reference'
    },
    streetName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'street_name'
    },
    promoter: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    workCategory: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'work_category'
    },
    trafficManagement: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'traffic_management'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'end_date'
    },
    location: {
      type: DataTypes.GEOGRAPHY('POINT', 4326),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'roadworks',
    timestamps: false
  }
);
