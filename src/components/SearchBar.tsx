interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search for monsters..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search monsters"
      />
      {value && (
        <button
          className="search-bar__clear"
          onClick={onClear}
          aria-label="Clear search"
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
}
