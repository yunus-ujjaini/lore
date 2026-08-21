import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import ThreatFilter from './ThreatFilter';
import type { Category } from '../../content/categories';
import type { FilterState } from '../types/ui';

interface FilterBarProps {
  categories: readonly Category[];
  filterState: FilterState;
  searchInput: string;
  filteredCount: number;
  totalCount: number;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  onCategorySelect: (category: Category | null) => void;
  onThreatSelect: (level: number | null) => void;
  onReset: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Beasts: '#5a4a3a',
  Vampires: '#5a1a3a',
  Necrophages: '#3a5a1a',
  Specters: '#1a2a5a',
  'Cursed Ones': '#5a2a1a',
  Hybrids: '#4a3a5a',
  Elementa: '#5a4a1a',
  Insectoids: '#2a4a1a',
  Draconids: '#4a3a1a',
  Relicts: '#2a1a4a',
};

export { CATEGORY_COLORS };

export default function FilterBar({
  categories,
  filterState,
  searchInput,
  filteredCount,
  totalCount,
  onSearchChange,
  onSearchClear,
  onCategorySelect,
  onThreatSelect,
  onReset,
}: FilterBarProps) {
  const hasFilters = filterState.search || filterState.category || filterState.threatLevel;

  return (
    <div className="filter-bar">
      <div className="filter-bar__panel">
        <SearchBar value={searchInput} onChange={onSearchChange} onClear={onSearchClear} />
        <div className="filter-bar__filters">
          <CategoryFilter
            categories={categories}
            selected={filterState.category}
            onSelect={onCategorySelect}
          />
          <ThreatFilter
            selected={filterState.threatLevel}
            onSelect={onThreatSelect}
          />
        </div>
      </div>

      <div className="filter-bar__results">
        <span className="results-count">
          {filteredCount} {filteredCount === 1 ? 'entry' : 'entries'} found
        </span>
        {hasFilters && (
          <button className="results-reset" onClick={onReset} type="button">
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
}
