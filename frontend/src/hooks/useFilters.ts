import { useMemo, useState } from 'react';

export interface FiltersState {
  search: string;
  categoryId?: number;
  startDate?: string;
  endDate?: string;
  isFree?: boolean;
}

export const useFilters = () => {
  const [filters, setFilters] = useState<FiltersState>({
    search: ''
  });

  const queryParams = useMemo(() => {
    const params: Record<string, string | number | boolean> = {};
    if (filters.categoryId) params.categoryId = filters.categoryId;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    if (filters.isFree !== undefined) params.isFree = filters.isFree;
    return params;
  }, [filters]);

  return { filters, setFilters, queryParams };
};
