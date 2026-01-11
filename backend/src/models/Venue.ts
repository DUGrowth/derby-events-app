import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface VenueAttributes {
  id: number;
  name: string;
  address?: string | null;
  city?: string | null;
  postcode?: string | null;
  location?: { type: 'Point'; coordinates: [number, number] } | null;
  latitude?: number | null;
  longitude?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export type VenueCreationAttributes = Optional<VenueAttributes, 'id' | 'address' | 'city' | 'postcode' | 'location' | 'latitude' | 'longitude' | 'createdAt' | 'updatedAt'>;

export class Venue extends Model<VenueAttributes, VenueCreationAttributes> implements VenueAttributes {
  declare id: number;
  declare name: string;
  declare address?: string | null;
  declare city?: string | null;
  declare postcode?: string | null;
  declare location?: { type: 'Point'; coordinates: [number, number] } | null;
  declare latitude?: number | null;
  declare longitude?: number | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Venue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    postcode: {
      type: DataTypes.STRING(20),
      allowNull: true
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    }
  },
  {
    sequelize,
    tableName: 'venues',
    timestamps: false
  }
);
