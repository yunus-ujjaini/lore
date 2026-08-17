import type { Monster } from '../../src/validation/schema';

interface MonsterMiniCardProps {
  monster: Monster;
  onClick: (id: string) => void;
}

export default function MonsterMiniCard({ monster, onClick }: MonsterMiniCardProps) {
  const imageUrl = `${import.meta.env.BASE_URL}images/monsters/${monster.image}`;

  return (
    <article
      className="monster-mini-card"
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
      <div className="monster-mini-card__image">
        <img
          src={imageUrl}
          alt={`${monster.name} illustration`}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = `${import.meta.env.BASE_URL}images/placeholders/missing.png`;
          }}
        />
      </div>
      <div className="monster-mini-card__content">
        <h4 className="monster-mini-card__name">{monster.name}</h4>
        <p className="monster-mini-card__info">
          {monster.category} · Threat {monster.threatLevel}
        </p>
      </div>
    </article>
  );
}
