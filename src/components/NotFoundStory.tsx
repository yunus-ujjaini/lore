import { useNavigate } from 'react-router-dom';

interface NotFoundStoryProps {
  storyId?: string;
}

export default function NotFoundStory({ storyId }: NotFoundStoryProps) {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <p style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.5rem', color: '#5a4e3a', marginBottom: '0.5rem' }}>
        Tale Not Found
      </p>
      <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: 'italic', color: '#7a6d5a', marginBottom: '2rem' }}>
        {storyId
          ? `The tale "${storyId}" has not yet been recorded.`
          : 'This story has not yet been recorded.'}
      </p>
      <button
        onClick={() => navigate('/stories')}
        style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: '#b8852a', background: 'none', border: '1px solid #b8852a', padding: '0.6rem 1.5rem', cursor: 'pointer', textTransform: 'uppercase' }}
      >
        Return to Stories
      </button>
    </div>
  );
}
