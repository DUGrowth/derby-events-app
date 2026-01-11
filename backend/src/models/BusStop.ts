import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface BusStopAttributes {
  id: number;
  atcoCode: string;
  name: string;
  location?: { type: 'Point'; coordinates: [number, number] } | null;
  latitude?: number | null;
  longitude?: number | null;
  street?: string | null;
  locality?: string | null;
}

export type BusStopCreationAttributes = Optional<BusStopAttributes, 'id' | 'location' | 'latitude' | 'longitude' | 'street' | 'locality'>;

export class BusStop extends Model<BusStopAttributes, BusStopCreationAttributes> implements BusStopAttributes {
  declare id: number;
  declare atcoCode: string;
  declare name: string;
  declare location?: { type: 'Point'; coordinates: [number, number] } | null;
  declare latitude?: number | null;
  declare longitude?: number | null;
  declare street?: string | null;
  declare locality?: string | null;
}

BusStop.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    atcoCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      field: 'atco_code'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    location: {
      type: DataTypes.GEOGRAPHY('POINT', 4326),
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    locality: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'bus_stops',
    timestamps: false
  }
);
