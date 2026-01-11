import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface CategoryAttributes {
  id: number;
  name: string;
  slug: string;
  icon?: string | null;
  color?: string | null;
  createdAt: Date;
}

export type CategoryCreationAttributes = Optional<CategoryAttributes, 'id' | 'icon' | 'color' | 'createdAt'>;

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  declare id: number;
  declare name: string;
  declare slug: string;
  declare icon?: string | null;
  declare color?: string | null;
  declare createdAt: Date;
}

Category.init(
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
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(20),
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
    tableName: 'categories',
    timestamps: false
  }
);
