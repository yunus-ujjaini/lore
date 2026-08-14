import type { Story } from '../../src/validation/schema';

interface StoryCardProps {
  story: Story;
  onClick?: (id: string) => void;
}

export default function StoryCard({ story, onClick }: StoryCardProps) {
  const imageUrl = story.image ? `/images/stories/${story.image}` : null;

  // Get related monster names
  const relatedMonsterNames = story.monsterIds.length > 0
    ? `Related: ${story.monsterIds.join(', ')}`
    : '';

  return (
    <article
      className="story-card"
      onClick={onClick ? () => onClick(story.id) : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(story.id);
        }
      } : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "link" : undefined}
      aria-label={`Read story: ${story.title}`}
    >
      <div className="story-card__image">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${story.title} illustration`}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '/images/placeholders/missing.png';
            }}
          />
        ) : (
          <span style={{ color: '#8a9a88', fontSize: '0.75rem' }}>No image</span>
        )}
      </div>
      <div className="story-card__content">
        <h3 className="story-card__title">{story.title}</h3>
        <p className="story-card__summary">{story.summary}</p>
        {relatedMonsterNames && (
          <span className="story-card__monsters">{relatedMonsterNames}</span>
        )}
      </div>
    </article>
  );
}
