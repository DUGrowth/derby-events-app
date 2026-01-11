import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface CrimeIncidentAttributes {
  id: number;
  crimeId: string;
  category?: string | null;
  locationName?: string | null;
  location?: { type: 'Point'; coordinates: [number, number] } | null;
  month?: string | null;
  outcomeStatus?: string | null;
}

export type CrimeIncidentCreationAttributes = Optional<CrimeIncidentAttributes, 'id' | 'category' | 'locationName' | 'location' | 'month' | 'outcomeStatus'>;

export class CrimeIncident extends Model<CrimeIncidentAttributes, CrimeIncidentCreationAttributes> implements CrimeIncidentAttributes {
  declare id: number;
  declare crimeId: string;
  declare category?: string | null;
  declare locationName?: string | null;
  declare location?: { type: 'Point'; coordinates: [number, number] } | null;
  declare month?: string | null;
  declare outcomeStatus?: string | null;
}

CrimeIncident.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    crimeId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'crime_id'
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    locationName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'location_name'
    },
    location: {
      type: DataTypes.GEOGRAPHY('POINT', 4326),
      allowNull: true
    },
    month: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    outcomeStatus: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'outcome_status'
    }
  },
  {
    sequelize,
    tableName: 'crime_incidents',
    timestamps: false
  }
);
