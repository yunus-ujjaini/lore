import { Link } from 'react-router-dom';
import type { Story } from '../validation/schema';

interface NextTaleCardProps {
  story: Story;
}

export default function NextTaleCard({ story }: NextTaleCardProps) {
  const imageUrl = story.image
    ? `${import.meta.env.BASE_URL}images/stories/${story.image}`
    : null;

  return (
    <Link
      to={`/lore/stories/${story.id}`}
      className="next-tale-card"
      aria-label={`Next Tale: ${story.title}`}
    >
      <span className="next-tale-card__label">Next Tale</span>
      <div className="next-tale-card__content">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`${story.title} illustration`}
            className="next-tale-card__image"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = `${import.meta.env.BASE_URL}images/placeholders/missing.png`;
            }}
          />
        )}
        <div className="next-tale-card__text">
          <h3 className="next-tale-card__title">{story.title}</h3>
          <p className="next-tale-card__summary">{story.summary}</p>
        </div>
      </div>
      <span className="next-tale-card__arrow">→</span>
    </Link>
  );
}
