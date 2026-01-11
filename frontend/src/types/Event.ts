export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  color?: string;
}

export interface Venue {
  id: number;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

export interface Event {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  shortDescription?: string | null;
  startDate: string;
  endDate?: string | null;
  timezone?: string;
  locationName?: string | null;
  locationAddress?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  isFree: boolean;
  priceMin?: number | null;
  priceMax?: number | null;
  currency?: string;
  ticketUrl?: string | null;
  imageUrl?: string | null;
  category?: Category | null;
  venue?: Venue | null;
}
