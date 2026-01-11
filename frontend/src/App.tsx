import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EventList } from './components/EventList';
import { EventMap } from './components/EventMap';
import { Filters } from './components/Filters';
import { EventCalendar } from './components/EventCalendar';
import { EventDetail } from './components/EventDetail';
import { SubmitEventForm } from './components/SubmitEventForm';
import { useEvents } from './hooks/useEvents';
import { useFilters } from './hooks/useFilters';
import { eventsApi } from './services/api';
import { Event } from './types/Event';

const DERBY_TAGLINE = 'Discover Derby\'s upcoming gigs, markets, workshops, and local happenings.';

const App = () => {
  const { filters, setFilters, queryParams } = useFilters();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Event | null>(null);

  const listQuery = useEvents({ page, limit: 20, ...queryParams });

  const searchQuery = useQuery({
    queryKey: ['search', filters.search],
    queryFn: async () => {
      const response = await eventsApi.search(filters.search);
      return response.data as { data: Event[] };
    },
    enabled: filters.search.trim().length > 0
  });

  const events = useMemo(() => {
    if (filters.search.trim().length > 0) {
      return searchQuery.data?.data ?? [];
    }
    return listQuery.data?.data ?? [];
  }, [filters.search, listQuery.data, searchQuery.data]);

  const meta = listQuery.data?.meta;

  return (
    <div className="min-h-screen">
      <header className="hero-noise">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ember">Derby Events</p>
              <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">Plan your next outing in Derby</h1>
              <p className="mt-3 max-w-xl text-slate">{DERBY_TAGLINE}</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 text-sm shadow-soft">
              <p className="font-semibold text-ink">Live updates every 6 hours</p>
              <p className="text-slate">Powered by Eventbrite, Ticketmaster & local listings.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Filters
            filters={filters}
            onChange={(next) => {
              setPage(1);
              setFilters(next);
            }}
          />

          <section className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              <EventMap events={events} onSelect={setSelected} />
              <EventCalendar
                events={events}
                onDateSelect={(date) => {
                  setPage(1);
                  setFilters({
                    ...filters,
                    startDate: date.toISOString().slice(0, 10),
                    endDate: date.toISOString().slice(0, 10)
                  });
                }}
              />
            </div>

            <EventList
              events={events}
              isLoading={listQuery.isLoading}
              page={page}
              total={meta?.total}
              limit={meta?.limit}
              onPageChange={setPage}
              onSelect={setSelected}
            />

            <SubmitEventForm />
          </section>
        </div>
      </main>

      {selected && <EventDetail event={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default App;
