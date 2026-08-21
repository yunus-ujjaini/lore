import ThreatStars from './ThreatStars';

interface ThreatFilterProps {
  selected: number | null;
  onSelect: (level: number | null) => void;
}

const THREAT_LEVELS = [1, 2, 3, 4, 5] as const;

export default function ThreatFilter({ selected, onSelect }: ThreatFilterProps) {
  return (
    <div className="filter-bar__group" role="group" aria-label="Filter by threat level">
      <span className="filter-label">Threat Level</span>
      <div className="filter-pills">
        <button
          className={`filter-pill ${selected === null ? 'filter-pill--active' : ''}`}
          onClick={() => onSelect(null)}
          aria-pressed={selected === null}
          type="button"
        >
          All
        </button>
        {THREAT_LEVELS.map((level) => (
          <button
            key={level}
            className={`filter-pill ${selected === level ? 'filter-pill--active' : ''}`}
            onClick={() => onSelect(level)}
            aria-pressed={selected === level}
            aria-label={`Threat level ${level}`}
            type="button"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <ThreatStars level={level} max={level} size={11} />
          </button>
        ))}
      </div>
    </div>
  );
}
