import { format } from 'date-fns';
import { Event } from '../types/Event';

interface EventCardProps {
  event: Event;
  onSelect?: (event: Event) => void;
}

export const EventCard = ({ event, onSelect }: EventCardProps) => {
  const badgeStyle = event.category?.color
    ? { backgroundColor: event.category.color, color: '#fff' }
    : undefined;

  return (
    <article
      className="event-card cursor-pointer"
      onClick={() => onSelect?.(event)}
    >
      <div className="relative">
        <img
          className="h-40 w-full object-cover"
          src={event.imageUrl || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop'}
          alt={event.title}
        />
        {event.category && (
          <span
            className="category-badge absolute left-4 top-4"
            style={badgeStyle}
          >
            {event.category.icon} {event.category.name}
          </span>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-display text-lg font-semibold text-ink">{event.title}</h3>
        <p className="text-sm text-slate">
          {format(new Date(event.startDate), 'EEE, MMM d • p')}
        </p>
        <p className="text-sm text-slate">{event.locationName || event.venue?.name || 'Derby'}</p>
        <p className={event.isFree ? 'free-badge' : 'price'}>
          {event.isFree
            ? 'FREE'
            : event.priceMin
            ? `£${event.priceMin}${event.priceMax ? `-${event.priceMax}` : ''}`
            : 'Pricing TBA'}
        </p>
      </div>
    </article>
  );
};
