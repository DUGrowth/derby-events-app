# Derby Events App

Full-stack events aggregation platform for Derby, UK. Aggregates Eventbrite, Ticketmaster, and local listings, stores them in Postgres/PostGIS, and serves a React UI with map, calendar, and filters.

## Requirements

- Node.js 20+
- Docker + Docker Compose
- Mapbox token
- Eventbrite + Ticketmaster API keys

## Local setup (Docker)

1. Create a `.env` file in the project root with:

```
EVENTBRITE_API_TOKEN=your_token
TICKETMASTER_API_KEY=your_key
VITE_MAPBOX_TOKEN=your_mapbox_token
```

2. Start services:

```
docker-compose up -d
```

3. Setup database + seed:

```
docker-compose exec backend npm run db:setup
docker-compose exec backend npm run db:seed
```

4. Trigger initial sync:

```
docker-compose exec backend npm run sync
```

5. Start the scheduler (optional for auto syncs):

```
docker-compose exec backend npm run scheduler
```

6. Visit UI: http://localhost:3000

## API Endpoints

- `GET /api/events`
- `GET /api/events/search?q=concert`
- `GET /api/events/nearby?latitude=52.9225&longitude=-1.4767&radius=5`
- `GET /api/events/calendar/:year/:month`
- `GET /api/events/:id`
- `GET /api/categories`
- `GET /api/venues`
- `POST /api/submissions`
- `GET /api/sync/trigger` (set `ADMIN_SYNC_TOKEN` and send `x-admin-token`)

## Notes

- Sync jobs are scheduled every 6 hours via Bull + Redis.
- PostGIS is required for nearby queries.
- Full-text search uses `search_vector` and `plainto_tsquery`.
