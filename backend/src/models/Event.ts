import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface EventAttributes {
  id: number;
  sourceId: number;
  sourceEventId?: string | null;
  sourceUrl?: string | null;
  title: string;
  slug: string;
  description?: string | null;
  shortDescription?: string | null;
  startDate: Date;
  endDate?: Date | null;
  timezone: string;
  venueId?: number | null;
  locationName?: string | null;
  locationAddress?: string | null;
  location?: { type: 'Point'; coordinates: [number, number] } | null;
  latitude?: number | null;
  longitude?: number | null;
  categoryId?: number | null;
  tags?: string[] | null;
  isFree: boolean;
  priceMin?: number | null;
  priceMax?: number | null;
  currency: string;
  ticketUrl?: string | null;
  imageUrl?: string | null;
  status: 'active' | 'cancelled' | 'completed';
  isFeatured: boolean;
  isVerified: boolean;
  organizerName?: string | null;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  lastSyncedAt?: Date | null;
  searchVector?: unknown;
}

export type EventCreationAttributes = Optional<EventAttributes, 'id' | 'sourceEventId' | 'sourceUrl' | 'description' | 'shortDescription' | 'endDate' | 'timezone' | 'venueId' | 'locationName' | 'locationAddress' | 'location' | 'latitude' | 'longitude' | 'categoryId' | 'tags' | 'isFree' | 'priceMin' | 'priceMax' | 'currency' | 'ticketUrl' | 'imageUrl' | 'status' | 'isFeatured' | 'isVerified' | 'organizerName' | 'viewCount' | 'createdAt' | 'updatedAt' | 'lastSyncedAt' | 'searchVector'>;

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  declare id: number;
  declare sourceId: number;
  declare sourceEventId?: string | null;
  declare sourceUrl?: string | null;
  declare title: string;
  declare slug: string;
  declare description?: string | null;
  declare shortDescription?: string | null;
  declare startDate: Date;
  declare endDate?: Date | null;
  declare timezone: string;
  declare venueId?: number | null;
  declare locationName?: string | null;
  declare locationAddress?: string | null;
  declare location?: { type: 'Point'; coordinates: [number, number] } | null;
  declare latitude?: number | null;
  declare longitude?: number | null;
  declare categoryId?: number | null;
  declare tags?: string[] | null;
  declare isFree: boolean;
  declare priceMin?: number | null;
  declare priceMax?: number | null;
  declare currency: string;
  declare ticketUrl?: string | null;
  declare imageUrl?: string | null;
  declare status: 'active' | 'cancelled' | 'completed';
  declare isFeatured: boolean;
  declare isVerified: boolean;
  declare organizerName?: string | null;
  declare viewCount: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare lastSyncedAt?: Date | null;
  declare searchVector?: unknown;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    sourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'source_id'
    },
    sourceEventId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'source_event_id'
    },
    sourceUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'source_url'
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    shortDescription: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'short_description'
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
    timezone: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'Europe/London'
    },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'venue_id'
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
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'category_id'
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
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
    priceMax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'price_max'
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'GBP'
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
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'active'
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_featured'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_verified'
    },
    organizerName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'organizer_name'
    },
    viewCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'view_count'
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
    },
    lastSyncedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_synced_at'
    },
    searchVector: {
      type: DataTypes.TSVECTOR,
      allowNull: true,
      field: 'search_vector'
    }
  },
  {
    sequelize,
    tableName: 'events',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['source_id', 'source_event_id']
      }
    ]
  }
);
