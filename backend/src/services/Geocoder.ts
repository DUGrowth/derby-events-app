import axios from 'axios';

export interface GeocodeResult {
  latitude: number;
  longitude: number;
  displayName?: string;
}

export class Geocoder {
  private api = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org',
    headers: {
      'User-Agent': 'DerbyEventsBot/1.0 (admin@example.com)'
    }
  });

  async geocode(query: string): Promise<GeocodeResult | null> {
    const response = await this.api.get('/search', {
      params: {
        q: query,
        format: 'json',
        limit: 1
      }
    });

    const match = response.data?.[0];
    if (!match) {
      return null;
    }

    return {
      latitude: Number(match.lat),
      longitude: Number(match.lon),
      displayName: match.display_name
    };
  }
}
