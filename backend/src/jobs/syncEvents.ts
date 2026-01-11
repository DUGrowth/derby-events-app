import { sequelize } from '../config/database';
import { EventbriteAggregator } from '../services/aggregators/EventbriteAggregator';
import { TicketmasterAggregator } from '../services/aggregators/TicketmasterAggregator';
import { DerbyCouncilScraper } from '../services/scrapers/DerbyCouncilScraper';
import { VisitDerbyScraper } from '../services/scrapers/VisitDerbyScraper';

export const syncAllEvents = async (): Promise<void> => {
  const aggregators = [
    new EventbriteAggregator(),
    new TicketmasterAggregator()
  ];

  const scrapers = [
    new DerbyCouncilScraper(),
    new VisitDerbyScraper()
  ];

  for (const aggregator of aggregators) {
    try {
      await aggregator.syncEvents();
    } catch (error) {
      console.error(`[sync] ${aggregator.constructor.name} failed`, error);
    }
  }

  for (const scraper of scrapers) {
    try {
      await scraper.syncEvents();
    } catch (error) {
      console.error(`[sync] ${scraper.constructor.name} failed`, error);
    }
  }
};

const run = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await syncAllEvents();
  } finally {
    await sequelize.close();
  }
};

if (require.main === module) {
  run().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
