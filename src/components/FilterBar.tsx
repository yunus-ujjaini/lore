import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import ThreatFilter from './ThreatFilter';
import type { Category } from '../../content/categories';
import type { FilterState } from '../types/ui';

interface FilterBarProps {
  categories: readonly Category[];
  filterState: FilterState;
  searchInput: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  onCategorySelect: (category: Category | null) => void;
  onThreatSelect: (level: number | null) => void;
}

export default function FilterBar({
  categories,
  filterState,
  searchInput,
  onSearchChange,
  onSearchClear,
  onCategorySelect,
  onThreatSelect,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
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
  );
}
