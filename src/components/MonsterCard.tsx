import type { Monster } from '../validation/schema';

interface MonsterCardProps {
  monster: Monster;
  onClick: (id: string) => void;
}

export default function MonsterCard({ monster, onClick }: MonsterCardProps) {
  const imageUrl = `/images/monsters/${monster.image}`;

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
      <div className="monster-card__image">
        <img
          src={imageUrl}
          alt={`${monster.name} illustration`}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = '/images/placeholders/missing.png';
          }}
        />
      </div>
      <div className="monster-card__content">
        <div className="monster-card__header">
          <h3 className="monster-card__name">{monster.name}</h3>
          <span
            className={`monster-card__threat monster-card__threat--${monster.threatLevel}`}
            aria-label={`Threat level ${monster.threatLevel}`}
          >
            {monster.threatLevel}
          </span>
        </div>
        <span className="monster-card__category">{monster.category}</span>
      </div>
    </article>
  );
}
