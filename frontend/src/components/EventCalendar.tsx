import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Event } from '../types/Event';

interface EventCalendarProps {
  events: Event[];
  onDateSelect: (date: Date) => void;
}

export const EventCalendar = ({ events, onDateSelect }: EventCalendarProps) => {
  const grouped = events.reduce<Record<string, Event[]>>((acc, event) => {
    const key = new Date(event.startDate).toDateString();
    acc[key] = acc[key] ? [...acc[key], event] : [event];
    return acc;
  }, {});

  return (
    <div className="calendar-wrapper hero-noise rounded-2xl p-3">
      <Calendar
        onClickDay={onDateSelect}
        tileContent={({ date }) => {
          const list = grouped[date.toDateString()];
          if (!list) return null;
          return (
            <div className="mt-1 flex flex-wrap">
              {list.slice(0, 3).map((event) => (
                <span
                  key={event.id}
                  className="calendar-dot"
                  style={{ backgroundColor: event.category?.color ?? '#FF6B4A' }}
                />
              ))}
            </div>
          );
        }}
      />
    </div>
  );
};
