import { Event } from '../types/Event';
import { EventCard } from './EventCard';

interface EventListProps {
  events: Event[];
  isLoading: boolean;
  page: number;
  total?: number;
  limit?: number;
  onPageChange: (page: number) => void;
  onSelect?: (event: Event) => void;
}

export const EventList = ({
  events,
  isLoading,
  page,
  total = 0,
  limit = 20,
  onPageChange,
  onSelect
}: EventListProps) => {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="event-card h-72 animate-pulse bg-white/60" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate/30 bg-white/50 p-8 text-center text-slate">
        No events match your filters yet. Try widening the date range.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onSelect={onSelect} />
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-slate">
        <span>Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          <button
            className="rounded-full border border-slate/30 px-4 py-1 disabled:opacity-40"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </button>
          <button
            className="rounded-full border border-slate/30 px-4 py-1 disabled:opacity-40"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
