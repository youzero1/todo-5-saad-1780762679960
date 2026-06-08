import clsx from 'clsx';
import { FilterType } from '@/types';

type TodoFooterProps = {
  activeCount: number;
  completedCount: number;
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  onClearCompleted: () => void;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function TodoFooter({
  activeCount,
  completedCount,
  filter,
  setFilter,
  onClearCompleted,
}: TodoFooterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-gray-50 border-t border-gray-100">
      <span className="text-xs text-gray-400 min-w-[80px]">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <div className="flex gap-1">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'px-3 py-1 rounded-lg text-xs font-medium transition-all',
              filter === f.value
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <button
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className={clsx(
          'text-xs transition-colors min-w-[80px] text-right',
          completedCount > 0
            ? 'text-gray-400 hover:text-red-400'
            : 'text-gray-200 cursor-not-allowed'
        )}
      >
        Clear completed
      </button>
    </div>
  );
}
