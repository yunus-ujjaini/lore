import type { Category } from '../../content/categories';

interface CategoryFilterProps {
  categories: readonly Category[];
  selected: Category | null;
  onSelect: (category: Category | null) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="category-filter" role="group" aria-label="Filter by category">
      <span className="filter-label">CATEGORY</span>
      <div className="filter-pills">
        <button
          className={`filter-pill ${selected === null ? 'filter-pill--active' : ''}`}
          onClick={() => onSelect(null)}
          aria-pressed={selected === null}
          type="button"
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-pill ${selected === category ? 'filter-pill--active' : ''}`}
            onClick={() => onSelect(category)}
            aria-pressed={selected === category}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
