import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface AirQualityAttributes {
  id: number;
  siteName?: string | null;
  location?: { type: 'Point'; coordinates: [number, number] } | null;
  measurementTime?: Date | null;
  pm25?: number | null;
  no2?: number | null;
  o3?: number | null;
  airQualityIndex?: number | null;
  healthAdvice?: string | null;
}

export type AirQualityCreationAttributes = Optional<AirQualityAttributes, 'id' | 'siteName' | 'location' | 'measurementTime' | 'pm25' | 'no2' | 'o3' | 'airQualityIndex' | 'healthAdvice'>;

export class AirQuality extends Model<AirQualityAttributes, AirQualityCreationAttributes> implements AirQualityAttributes {
  declare id: number;
  declare siteName?: string | null;
  declare location?: { type: 'Point'; coordinates: [number, number] } | null;
  declare measurementTime?: Date | null;
  declare pm25?: number | null;
  declare no2?: number | null;
  declare o3?: number | null;
  declare airQualityIndex?: number | null;
  declare healthAdvice?: string | null;
}

AirQuality.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    siteName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'site_name'
    },
    location: {
      type: DataTypes.GEOGRAPHY('POINT', 4326),
      allowNull: true
    },
    measurementTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'measurement_time'
    },
    pm25: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    no2: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    o3: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    airQualityIndex: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'air_quality_index'
    },
    healthAdvice: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'health_advice'
    }
  },
  {
    sequelize,
    tableName: 'air_quality',
    timestamps: false
  }
);
