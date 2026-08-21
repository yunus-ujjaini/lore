import type { Monster } from '../validation/schema';
import ThreatStars from './ThreatStars';
import { CATEGORY_COLORS } from './FilterBar';

interface MonsterCardProps {
  monster: Monster;
  relatedStoryCount: number;
  onClick: (id: string) => void;
}

export default function MonsterCard({ monster, relatedStoryCount, onClick }: MonsterCardProps) {
  const imageUrl = `${import.meta.env.BASE_URL}images/monsters/${monster.image}`;
  const accentColor = CATEGORY_COLORS[monster.category] || '#3a2e1e';

  return (
    <article
      className="monster-card"
      onClick={() => onClick(monster.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(monster.id);
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={`View details for ${monster.name}`}
    >
      <div
        className="monster-card__topbar"
        style={{ height: '3px', background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
      />
      <div className="monster-card__content">
        <div className="monster-card__header">
          <h3 className="monster-card__name">{monster.name}</h3>
          <ThreatStars level={monster.threatLevel} size={12} />
        </div>
        <span className="monster-card__category">{monster.category}</span>
        <p className="monster-card__description">{monster.description}</p>
        <div className="monster-card__footer">
          <span className="monster-card__tales">
            {relatedStoryCount} {relatedStoryCount === 1 ? 'tale' : 'tales'}
          </span>
          <span className="monster-card__cta">Read Entry →</span>
        </div>
      </div>
    </article>
  );
}
