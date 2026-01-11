import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface BinCollectionAttributes {
  id: number;
  postcode?: string | null;
  address?: string | null;
  nextCollectionDate?: Date | null;
  collectionType?: string | null;
  updatedAt: Date;
}

export type BinCollectionCreationAttributes = Optional<BinCollectionAttributes, 'id' | 'postcode' | 'address' | 'nextCollectionDate' | 'collectionType' | 'updatedAt'>;

export class BinCollection extends Model<BinCollectionAttributes, BinCollectionCreationAttributes> implements BinCollectionAttributes {
  declare id: number;
  declare postcode?: string | null;
  declare address?: string | null;
  declare nextCollectionDate?: Date | null;
  declare collectionType?: string | null;
  declare updatedAt: Date;
}

BinCollection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    postcode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nextCollectionDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'next_collection_date'
    },
    collectionType: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'collection_type'
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
    tableName: 'bin_collections',
    timestamps: false
  }
);
