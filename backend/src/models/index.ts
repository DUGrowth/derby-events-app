import { AirQuality } from './AirQuality';
import { BinCollection } from './BinCollection';
import { BusStop } from './BusStop';
import { Camera } from './Camera';
import { Category } from './Category';
import { CrimeIncident } from './CrimeIncident';
import { Event } from './Event';
import { EventSource } from './EventSource';
import { FoodHygieneRating } from './FoodHygieneRating';
import { Roadwork } from './Roadwork';
import { SyncLog } from './SyncLog';
import { UserSubmittedEvent } from './UserSubmittedEvent';
import { Venue } from './Venue';

EventSource.hasMany(Event, { foreignKey: 'sourceId' });
Event.belongsTo(EventSource, { foreignKey: 'sourceId' });

Category.hasMany(Event, { foreignKey: 'categoryId' });
Event.belongsTo(Category, { foreignKey: 'categoryId' });

Venue.hasMany(Event, { foreignKey: 'venueId' });
Event.belongsTo(Venue, { foreignKey: 'venueId' });

Category.hasMany(UserSubmittedEvent, { foreignKey: 'categoryId' });
UserSubmittedEvent.belongsTo(Category, { foreignKey: 'categoryId' });

Event.hasMany(UserSubmittedEvent, { foreignKey: 'approvedEventId' });
UserSubmittedEvent.belongsTo(Event, { foreignKey: 'approvedEventId' });

EventSource.hasMany(SyncLog, { foreignKey: 'sourceId' });
SyncLog.belongsTo(EventSource, { foreignKey: 'sourceId' });

export {
  AirQuality,
  BinCollection,
  BusStop,
  Camera,
  Category,
  CrimeIncident,
  Event,
  EventSource,
  FoodHygieneRating,
  Roadwork,
  SyncLog,
  UserSubmittedEvent,
  Venue
};
