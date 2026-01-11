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

## GitHub Pages (Frontend)

1. Create GitHub Actions secrets in the repo:
   - `VITE_API_URL` = public backend URL (e.g. https://your-api.example.com/api)
   - `VITE_MAPBOX_TOKEN` = Mapbox token

2. Push to `main`. The workflow builds `frontend/` and deploys to Pages.

3. In GitHub repo settings, set Pages source to **GitHub Actions** if not already enabled.

The frontend will be served at:
`https://dugrowth.github.io/derby-events-app/`

## Free Hosting Recommendation (Render + Supabase)

Backend (Render):

1. Create a new **Web Service** on Render from this repo.
2. Set **Root Directory** to `backend`.
3. Build Command:
   ```
   npm install && npm run build
   ```
4. Start Command:
   ```
   npm run start
   ```
5. Environment variables:
   - `DATABASE_URL` = Supabase direct connection string (preferred)
   - `REDIS_URL` = `redis://localhost:6379` (unused if you only use cron trigger)
   - `EVENTBRITE_API_TOKEN`
   - `TICKETMASTER_API_KEY`
   - `DERBY_LATITUDE=52.9225`
   - `DERBY_LONGITUDE=-1.4767`
   - `DERBY_SEARCH_RADIUS_MI=10`
   - `FRONTEND_URL=https://dugrowth.github.io/derby-events-app`
   - `ADMIN_SYNC_TOKEN` = a long random string

Sync scheduling (GitHub Actions):

1. Add these GitHub secrets:
   - `SYNC_TRIGGER_URL` = `https://<your-render-service>.onrender.com/api/sync/trigger`
   - `ADMIN_SYNC_TOKEN` = same value as backend
2. The workflow in `.github/workflows/sync.yml` will call it every 6 hours.

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
