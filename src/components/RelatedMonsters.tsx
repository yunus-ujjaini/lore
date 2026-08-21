import type { Monster } from '../validation/schema';
import ThreatStars from './ThreatStars';
import { CATEGORY_COLORS } from './FilterBar';

interface RelatedMonstersProps {
  monsters: Monster[];
  onMonsterClick: (id: string) => void;
}

export default function RelatedMonsters({ monsters, onMonsterClick }: RelatedMonstersProps) {
  if (monsters.length === 0) {
    return null;
  }

  return (
    <section style={{ marginBottom: '3rem' }}>
      <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: '#7a6d5a', textTransform: 'uppercase', marginBottom: '1rem' }}>
        Monsters Encountered
      </h3>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {monsters.map((monster) => (
          <div
            key={monster.id}
            onClick={() => onMonsterClick(monster.id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onMonsterClick(monster.id); } }}
            tabIndex={0}
            role="link"
            aria-label={`View ${monster.name} in bestiary`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#100e14', border: '1px solid #2e2530', cursor: 'pointer', transition: 'border-color 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#b8852a'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#2e2530'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.9rem', color: '#ddd0b8', marginBottom: '0.2rem' }}>
                  {monster.name}
                </p>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.1em', color: '#7a6d5a', textTransform: 'uppercase' }}>
                  {monster.category}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ThreatStars level={monster.threatLevel} size={12} />
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: '#8b1a1a', textTransform: 'uppercase' }}>
                Bestiary →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
