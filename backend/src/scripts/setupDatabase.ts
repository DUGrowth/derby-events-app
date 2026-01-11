import { sequelize, ensurePostgis } from '../config/database';
import '../models';

const setup = async (): Promise<void> => {
  await ensurePostgis();
  await sequelize.sync();

  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_venues_location ON venues USING GIST(location)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_events_location ON events USING GIST(location)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_events_category ON events(category_id)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_events_source ON events(source_id)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_events_status ON events(status)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_events_search ON events USING GIN(search_vector)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_bus_stops_location ON bus_stops USING GIST(location)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_roadworks_location ON roadworks USING GIST(location)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_air_quality_location ON air_quality USING GIST(location)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_food_hygiene_location ON food_hygiene_ratings USING GIST(location)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_crime_incidents_location ON crime_incidents USING GIST(location)');
  await sequelize.query('CREATE INDEX IF NOT EXISTS idx_cameras_location ON cameras USING GIST(location)');

  await sequelize.query(`
    CREATE OR REPLACE FUNCTION events_search_trigger() RETURNS trigger AS $$
    BEGIN
      NEW.search_vector :=
        setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(NEW.location_name, '')), 'C');
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  await sequelize.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'events_search_update') THEN
        CREATE TRIGGER events_search_update
          BEFORE INSERT OR UPDATE ON events
          FOR EACH ROW EXECUTE FUNCTION events_search_trigger();
      END IF;
    END $$;
  `);
};

setup()
  .then(() => {
    console.log('Database setup complete.');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
