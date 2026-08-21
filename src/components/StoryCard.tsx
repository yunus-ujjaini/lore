import type { Story } from '../validation/schema';
import { monsters } from '../content-loader';

interface StoryCardProps {
  story: Story;
  index: number;
  onClick?: (id: string) => void;
}

export default function StoryCard({ story, index, onClick }: StoryCardProps) {
  const relatedMonsterNames = story.monsterIds
    .map(id => monsters[id]?.name)
    .filter(Boolean);

  const sectionCount = story.sections?.length || (story.content ? 1 : 0);

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
      role={onClick ? 'link' : undefined}
      aria-label={`Read story: ${story.title}`}
      style={{ cursor: onClick ? 'pointer' : undefined }}
    >
      <div style={{ padding: '1.75rem' }}>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.25em', color: '#5a4e3a', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
          Tale {String(index + 1).padStart(2, '0')}
        </p>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.05rem', fontWeight: 600, color: '#ddd0b8', letterSpacing: '0.04em', lineHeight: 1.3, marginBottom: '0.75rem' }}>
          {story.title}
        </h3>
        <p style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: '0.95rem', color: '#8a7d6a', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1rem' }}>
          {story.summary}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.9rem', borderTop: '1px solid #1c1820', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {relatedMonsterNames.map((name) => (
              <span key={name} style={{ fontFamily: "'Cinzel', serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: '#7a6d5a', border: '1px solid #1c1820', padding: '0.15rem 0.5rem', textTransform: 'uppercase' }}>
                {name}
              </span>
            ))}
          </div>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: '#5a4e3a', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            {sectionCount} {sectionCount === 1 ? 'chapter' : 'chapters'}
          </span>
        </div>
      </div>
    </article>
  );
}
