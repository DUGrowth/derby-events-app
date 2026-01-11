import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL
});

export const eventsApi = {
  getAll: (params?: Record<string, string | number | boolean>) => api.get('/events', { params }),
  getById: (id: number) => api.get(`/events/${id}`),
  search: (q: string) => api.get('/events/search', { params: { q } }),
  nearby: (lat: number, lng: number, radius: number) =>
    api.get('/events/nearby', { params: { latitude: lat, longitude: lng, radius } }),
  calendar: (year: number, month: number) => api.get(`/events/calendar/${year}/${month}`)
};

export const categoriesApi = {
  getAll: () => api.get('/categories')
};

export const submissionsApi = {
  submit: (payload: Record<string, unknown>) => api.post('/submissions', payload)
};
