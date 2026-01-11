import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface CameraAttributes {
  id: number;
  name: string;
  type?: string | null;
  url?: string | null;
  thumbnailUrl?: string | null;
  location?: { type: 'Point'; coordinates: [number, number] } | null;
  latitude?: number | null;
  longitude?: number | null;
  isActive: boolean;
  category?: string | null;
  viewCount: number;
}

export type CameraCreationAttributes = Optional<CameraAttributes, 'id' | 'type' | 'url' | 'thumbnailUrl' | 'location' | 'latitude' | 'longitude' | 'isActive' | 'category' | 'viewCount'>;

export class Camera extends Model<CameraAttributes, CameraCreationAttributes> implements CameraAttributes {
  declare id: number;
  declare name: string;
  declare type?: string | null;
  declare url?: string | null;
  declare thumbnailUrl?: string | null;
  declare location?: { type: 'Point'; coordinates: [number, number] } | null;
  declare latitude?: number | null;
  declare longitude?: number | null;
  declare isActive: boolean;
  declare category?: string | null;
  declare viewCount: number;
}

Camera.init(
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
    type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    thumbnailUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'thumbnail_url'
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
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active'
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    viewCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'view_count'
    }
  },
  {
    sequelize,
    tableName: 'cameras',
    timestamps: false
  }
);
