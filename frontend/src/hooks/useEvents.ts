import { useQuery } from '@tanstack/react-query';
import { eventsApi } from '../services/api';
import { Event } from '../types/Event';

interface EventsResponse {
  data: Event[];
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export const useEvents = (params: Record<string, string | number | boolean>) => {
  return useQuery({
    queryKey: ['events', params],
    queryFn: async (): Promise<EventsResponse> => {
      const response = await eventsApi.getAll(params);
      return response.data as EventsResponse;
    }
  });
};
