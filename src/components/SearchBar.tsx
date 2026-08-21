interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '1.25rem' }}>
      <input
        type="text"
        className="search-input"
        placeholder="Search monsters..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search monsters"
      />
      {value && (
        <button
          onClick={onClear}
          aria-label="Clear search"
          type="button"
          style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#7a6d5a', fontSize: '1.2rem', cursor: 'pointer', lineHeight: 1 }}
        >
          ×
        </button>
      )}
    </div>
  );
}
