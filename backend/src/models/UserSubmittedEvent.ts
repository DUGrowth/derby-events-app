import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface UserSubmittedEventAttributes {
  id: number;
  submitterName?: string | null;
  submitterEmail: string;
  title: string;
  description?: string | null;
  startDate: Date;
  endDate?: Date | null;
  locationName?: string | null;
  locationAddress?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  categoryId?: number | null;
  isFree: boolean;
  priceMin?: number | null;
  ticketUrl?: string | null;
  imageUrl?: string | null;
  organizerName?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt?: Date | null;
  rejectionReason?: string | null;
  approvedEventId?: number | null;
  createdAt: Date;
}

export type UserSubmittedEventCreationAttributes = Optional<UserSubmittedEventAttributes, 'id' | 'submitterName' | 'description' | 'endDate' | 'locationName' | 'locationAddress' | 'latitude' | 'longitude' | 'categoryId' | 'isFree' | 'priceMin' | 'ticketUrl' | 'imageUrl' | 'organizerName' | 'status' | 'reviewedAt' | 'rejectionReason' | 'approvedEventId' | 'createdAt'>;

export class UserSubmittedEvent extends Model<UserSubmittedEventAttributes, UserSubmittedEventCreationAttributes> implements UserSubmittedEventAttributes {
  declare id: number;
  declare submitterName?: string | null;
  declare submitterEmail: string;
  declare title: string;
  declare description?: string | null;
  declare startDate: Date;
  declare endDate?: Date | null;
  declare locationName?: string | null;
  declare locationAddress?: string | null;
  declare latitude?: number | null;
  declare longitude?: number | null;
  declare categoryId?: number | null;
  declare isFree: boolean;
  declare priceMin?: number | null;
  declare ticketUrl?: string | null;
  declare imageUrl?: string | null;
  declare organizerName?: string | null;
  declare status: 'pending' | 'approved' | 'rejected';
  declare reviewedAt?: Date | null;
  declare rejectionReason?: string | null;
  declare approvedEventId?: number | null;
  declare createdAt: Date;
}

UserSubmittedEvent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    submitterName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'submitter_name'
    },
    submitterEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'submitter_email'
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'end_date'
    },
    locationName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'location_name'
    },
    locationAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'location_address'
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'category_id'
    },
    isFree: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_free'
    },
    priceMin: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'price_min'
    },
    ticketUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'ticket_url'
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'image_url'
    },
    organizerName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'organizer_name'
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'pending'
    },
    reviewedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'reviewed_at'
    },
    rejectionReason: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'rejection_reason'
    },
    approvedEventId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'approved_event_id'
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
    tableName: 'user_submitted_events',
    timestamps: false
  }
);
