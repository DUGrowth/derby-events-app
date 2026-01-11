import * as cheerio from 'cheerio';
import { BaseScraper, ScrapedEvent } from './BaseScraper';

export class VisitDerbyScraper extends BaseScraper {
  private baseUrl = 'https://www.visitderby.co.uk/whats-on';

  constructor() {
    super('Visit Derby');
  }

  async fetchEvents(): Promise<ScrapedEvent[]> {
    const html = await this.fetchHtml(this.baseUrl);
    const $ = cheerio.load(html);
    const events: ScrapedEvent[] = [];

    const cards = $('.card, article, .event-card, .listing-item').toArray();

    for (const card of cards) {
      const node = $(card);
      const title = node.find('h2, h3, .title').first().text().trim();
      const url = node.find('a').first().attr('href');
      const description = node.find('p').first().text().trim();
      const timeNode = node.find('time').first();
      const dateAttr = timeNode.attr('datetime') ?? timeNode.attr('data-start');

      if (!title || !dateAttr) {
        continue;
      }

      const date = new Date(dateAttr);
      if (Number.isNaN(date.getTime())) {
        continue;
      }

      events.push({
        id: `${title}-${date.toISOString().slice(0, 10)}`,
        title,
        description,
        startDate: date.toISOString(),
        endDate: null,
        url: url ? new URL(url, this.baseUrl).toString() : this.baseUrl,
        locationName: 'Derby',
        locationAddress: 'Derby, UK'
      });
    }

    await this.sleep(2000);
    return events;
  }
}
