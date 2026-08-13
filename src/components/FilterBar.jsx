/**
 * FilterBar component — three tab buttons to filter the todo list.
 *
 * Uses role="tablist" / role="tab" so screen readers announce it as a
 * navigation widget rather than a plain button group.
 *
 * Props:
 *  @param {'all'|'active'|'completed'} filter       - Currently active filter.
 *  @param {(f: string) => void}        onFilterChange - Called with the new filter value.
 */

/** The ordered list of available filters. */
const FILTERS = [
  { value: 'all',       label: 'All Tasks'   },
  { value: 'active',    label: 'Active'      },
  { value: 'completed', label: 'Completed'   },
];

const FilterBar = ({ filter, onFilterChange }) => {
  return (
    <div
      role="tablist"
      aria-label="Filter todos"
      className="flex gap-1 mb-5 bg-slate-100/80 p-1 rounded-xl border border-slate-200/50"
    >
      {FILTERS.map(({ value, label }) => {
        const isActive = filter === value;

        return (
          <button
            key={value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(value)}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer text-center select-none ${
              isActive
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60'   // active tab
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/40'     // inactive tab
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
