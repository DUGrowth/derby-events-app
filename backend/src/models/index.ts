import { Category } from './Category';
import { Event } from './Event';
import { EventSource } from './EventSource';
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
  Category,
  Event,
  EventSource,
  SyncLog,
  UserSubmittedEvent,
  Venue
};
