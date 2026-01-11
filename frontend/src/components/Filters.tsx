import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '../services/api';
import { Category } from '../types/Event';
import { FiltersState } from '../hooks/useFilters';

interface FiltersProps {
  filters: FiltersState;
  onChange: (next: FiltersState) => void;
}

export const Filters = ({ filters, onChange }: FiltersProps) => {
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await categoriesApi.getAll();
      return response.data.data as Category[];
    }
  });

  return (
    <aside className="filters bg-white/70 backdrop-blur-xl rounded-2xl shadow-soft p-6 space-y-5">
      <div>
        <label className="text-sm font-semibold text-slate">Search</label>
        <input
          className="mt-2 w-full rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm"
          placeholder="Concerts, markets, workshops..."
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-slate">Category</label>
        <select
          className="mt-2 w-full rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm"
          value={filters.categoryId ?? ''}
          onChange={(event) =>
            onChange({
              ...filters,
              categoryId: event.target.value ? Number(event.target.value) : undefined
            })
          }
        >
          <option value="">All categories</option>
          {data?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.icon ? `${category.icon} ` : ''}{category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-semibold text-slate">Start</label>
          <input
            type="date"
            className="mt-2 w-full rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm"
            value={filters.startDate ?? ''}
            onChange={(event) => onChange({ ...filters, startDate: event.target.value || undefined })}
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate">End</label>
          <input
            type="date"
            className="mt-2 w-full rounded-xl border border-slate/20 bg-white px-3 py-2 text-sm"
            value={filters.endDate ?? ''}
            onChange={(event) => onChange({ ...filters, endDate: event.target.value || undefined })}
          />
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm font-semibold text-slate">
        <input
          type="checkbox"
          className="h-4 w-4 accent-emerald-600"
          checked={filters.isFree ?? false}
          onChange={(event) =>
            onChange({
              ...filters,
              isFree: event.target.checked ? true : undefined
            })
          }
        />
        Free events only
      </label>
    </aside>
  );
};
