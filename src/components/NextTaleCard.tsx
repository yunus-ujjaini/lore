import { useNavigate } from 'react-router-dom';
import type { Story } from '../validation/schema';

interface NextTaleCardProps {
  story: Story;
}

export default function NextTaleCard({ story }: NextTaleCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/stories/${story.id}`)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/stories/${story.id}`); } }}
      tabIndex={0}
      role="link"
      aria-label={`Next Tale: ${story.title}`}
      style={{ background: '#100e14', border: '1px solid #2e2530', padding: '2rem', cursor: 'pointer', transition: 'border-color 0.25s' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#8b1a1a'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#2e2530'; }}
    >
      <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.3em', color: '#7a6d5a', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
        Next Tale
      </p>
      <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.1rem', color: '#ddd0b8', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
        {story.title}
      </h4>
      <p style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: '0.95rem', color: '#7a6d5a', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {story.summary}
      </p>
      <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.15em', color: '#8b1a1a', textTransform: 'uppercase', marginTop: '1rem' }}>
        Continue Reading →
      </p>
    </div>
  );
}
