import type { Monster } from '../validation/schema';
import { stories } from '../content-loader';
import { CATEGORY_COLORS } from './FilterBar';

interface MonsterInfoProps {
  monster: Monster;
}

export default function MonsterInfo({ monster }: MonsterInfoProps) {
  const accentColor = CATEGORY_COLORS[monster.category] || '#3a2e1e';
  const relatedStoryCount = Object.values(stories).filter(s => s.monsterIds.includes(monster.id)).length;

  return (
    <div>
      {/* Detail header with category left rule */}
      <div style={{ borderLeft: `4px solid ${accentColor}`, paddingLeft: '1.5rem', marginBottom: '2.5rem' }}>
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a7d6a', border: '1px solid #8a7d6a', padding: '0.2rem 0.6rem', borderRadius: '2px', display: 'inline-block', marginBottom: '0.75rem' }}>
          {monster.category}
        </span>
        <h1 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: '#ddd0b8', letterSpacing: '0.05em', marginBottom: '0.75rem', lineHeight: 1.15 }}>
          {monster.name}
        </h1>
      </div>

      {/* Gold divider */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, #b8852a, transparent)', marginBottom: '2.5rem' }} />

      {/* Field Description */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: '#b8852a', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Field Description
        </h2>
        <p style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: '1.1rem', color: '#c0b09a', lineHeight: 1.8 }}>
          {monster.description}
        </p>
      </section>

      {/* Scholar's Notes */}
      {monster.lore && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: '#b8852a', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Scholar's Notes
          </h2>
          <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: 'italic', fontSize: '1.05rem', color: '#8a7d6a', lineHeight: 1.9, borderLeft: '2px solid #2e2530', paddingLeft: '1.25rem' }}>
            {monster.lore}
          </p>
        </section>
      )}

      {/* Known Weaknesses */}
      {monster.weaknesses && monster.weaknesses.length > 0 && (
        <section>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.25em', color: '#b8852a', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Known Weaknesses
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {monster.weaknesses.map((w) => (
              <span key={w} style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.1em', color: '#8a7d6a', border: '1px solid #2e2530', padding: '0.25rem 0.7rem', textTransform: 'uppercase' }}>
                {w}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Entry Details sidebar data (for mobile/inline display) */}
      <div style={{ marginTop: '2.5rem', background: '#100e14', border: '1px solid #2e2530', padding: '1.5rem' }}>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: '#7a6d5a', textTransform: 'uppercase', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #1c1820' }}>
          Entry Details
        </h3>
        <dl style={{ display: 'grid', gap: '0.75rem' }}>
          <div>
            <dt style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: '#5a4e3a', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Classification</dt>
            <dd style={{ fontFamily: "'Crimson Text', serif", fontSize: '1rem', color: '#ddd0b8' }}>{monster.category}</dd>
          </div>
          <div>
            <dt style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: '#5a4e3a', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Threat Rating</dt>
            <dd style={{ fontFamily: "'Crimson Text', serif", fontSize: '1rem', color: '#ddd0b8' }}>Level {monster.threatLevel}</dd>
          </div>
          <div>
            <dt style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: '#5a4e3a', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Recorded Tales</dt>
            <dd style={{ fontFamily: "'Crimson Text', serif", fontSize: '1rem', color: '#ddd0b8' }}>{relatedStoryCount}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
