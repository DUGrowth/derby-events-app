import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { MemoryCache } from './Cache';

const defaultCache = new MemoryCache();

export const createApiClient = (baseURL: string, headers?: Record<string, string>): AxiosInstance => {
  return axios.create({
    baseURL,
    headers: {
      'User-Agent': 'DerbyVision/1.0 (+https://dugrowth.github.io/derby-events-app)',
      ...headers
    }
  });
};

export const cachedRequest = async <T>(
  cacheKey: string,
  ttlMs: number,
  request: () => Promise<AxiosResponse<T>>
): Promise<T> => {
  return defaultCache.remember(cacheKey, ttlMs, async () => {
    const response = await request();
    return response.data;
  });
};

export const getJson = async <T>(
  client: AxiosInstance,
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await client.get<T>(url, config);
  return response.data;
};
