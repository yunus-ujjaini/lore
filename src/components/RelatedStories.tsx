import { useNavigate } from 'react-router-dom';
import type { Story } from '../validation/schema';

interface RelatedStoriesProps {
  stories: Story[];
}

export default function RelatedStories({ stories }: RelatedStoriesProps) {
  const navigate = useNavigate();

  if (stories.length === 0) {
    return null;
  }

  return (
    <section style={{ marginTop: '4rem' }}>
      <div className="medallion-divider" style={{ marginBottom: '2rem' }}>
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.25em', color: '#b8852a', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          &#10022; Featured in Tales &#10022;
        </span>
      </div>

      <div style={{ display: 'grid', gap: '1px', background: '#2e2530' }}>
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => navigate(`/stories/${story.id}`)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/stories/${story.id}`); } }}
            tabIndex={0}
            role="link"
            aria-label={`Read ${story.title}`}
            style={{ background: '#100e14', cursor: 'pointer', padding: '1.25rem 1.5rem', transition: 'border-color 0.2s', borderLeft: '1px solid #2e2530' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = '#b8852a'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = '#2e2530'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', color: '#ddd0b8', letterSpacing: '0.03em', marginBottom: '0.35rem' }}>
                  {story.title}
                </h4>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.9rem', color: '#7a6d5a', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {story.summary}
                </p>
              </div>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: '#8b1a1a', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Read →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
