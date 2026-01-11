import { format } from 'date-fns';
import { Event } from '../types/Event';

interface EventDetailProps {
  event: Event;
  onClose: () => void;
}

export const EventDetail = ({ event, onClose }: EventDetailProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-soft">
        <div className="relative">
          <img
            className="h-64 w-full object-cover"
            src={event.imageUrl || 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1400&auto=format&fit=crop'}
            alt={event.title}
          />
          <button
            className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="space-y-4 p-6">
          <h2 className="font-display text-2xl font-semibold text-ink">{event.title}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-slate">
            <span>{format(new Date(event.startDate), 'EEEE, MMM d • p')}</span>
            <span>{event.locationName || event.venue?.name || 'Derby'}</span>
          </div>
          <p className="text-slate">{event.description || event.shortDescription || 'Details coming soon.'}</p>
          {event.ticketUrl && (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-ember px-4 py-2 text-sm font-semibold text-white"
            >
              View tickets
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
