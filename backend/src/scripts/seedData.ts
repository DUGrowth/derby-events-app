import { sequelize } from '../config/database';
import { Category, EventSource } from '../models';

const seed = async (): Promise<void> => {
  await sequelize.authenticate();

  const sources = [
    { name: 'Eventbrite', type: 'api', url: 'https://www.eventbrite.com' },
    { name: 'Ticketmaster', type: 'api', url: 'https://www.ticketmaster.co.uk' },
    { name: 'Derby City Council', type: 'scraper', url: 'https://www.derby.gov.uk/events/' },
    { name: 'Visit Derby', type: 'scraper', url: 'https://www.visitderby.co.uk/whats-on' },
    { name: 'User Submitted', type: 'user_submitted', url: null }
  ];

  for (const source of sources) {
    await EventSource.findOrCreate({
      where: { name: source.name },
      defaults: source
    });
  }

  const categories = [
    { name: 'Music & Concerts', slug: 'music', icon: '🎵', color: '#FF6B6B' },
    { name: 'Arts & Theatre', slug: 'arts', icon: '🎭', color: '#4ECDC4' },
    { name: 'Sports & Fitness', slug: 'sports', icon: '⚽', color: '#45B7D1' },
    { name: 'Food & Drink', slug: 'food', icon: '🍽️', color: '#FFA07A' },
    { name: 'Community & Social', slug: 'community', icon: '👥', color: '#98D8C8' },
    { name: 'Family & Kids', slug: 'family', icon: '👶', color: '#FFD93D' },
    { name: 'Business & Networking', slug: 'business', icon: '💼', color: '#6C5CE7' },
    { name: 'Markets & Fairs', slug: 'markets', icon: '🛍️', color: '#FF9800' }
  ];

  for (const category of categories) {
    await Category.findOrCreate({
      where: { slug: category.slug },
      defaults: category
    });
  }
};

seed()
  .then(() => {
    console.log('Seed data inserted.');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
