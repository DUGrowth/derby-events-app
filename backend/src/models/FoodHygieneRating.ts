import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface FoodHygieneRatingAttributes {
  id: number;
  fhrsId: number;
  businessName?: string | null;
  address?: string | null;
  location?: { type: 'Point'; coordinates: [number, number] } | null;
  rating?: number | null;
  ratingDate?: Date | null;
  businessType?: string | null;
  updatedAt: Date;
}

export type FoodHygieneRatingCreationAttributes = Optional<FoodHygieneRatingAttributes, 'id' | 'businessName' | 'address' | 'location' | 'rating' | 'ratingDate' | 'businessType' | 'updatedAt'>;

export class FoodHygieneRating extends Model<FoodHygieneRatingAttributes, FoodHygieneRatingCreationAttributes> implements FoodHygieneRatingAttributes {
  declare id: number;
  declare fhrsId: number;
  declare businessName?: string | null;
  declare address?: string | null;
  declare location?: { type: 'Point'; coordinates: [number, number] } | null;
  declare rating?: number | null;
  declare ratingDate?: Date | null;
  declare businessType?: string | null;
  declare updatedAt: Date;
}

FoodHygieneRating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fhrsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: 'fhrs_id'
    },
    businessName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'business_name'
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.GEOGRAPHY('POINT', 4326),
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ratingDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'rating_date'
    },
    businessType: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'business_type'
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
    tableName: 'food_hygiene_ratings',
    timestamps: false
  }
);
