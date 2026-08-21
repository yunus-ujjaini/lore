import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { stories } from '../content-loader';
import StoryCard from '../components/StoryCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function StoriesPage() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const storyList = Object.values(stories);

  const handleStoryClick = (id: string) => {
    navigate(`/stories/${id}`);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <motion.header
        style={{ position: 'relative', padding: '5rem 2rem 4rem', textAlign: 'center', overflow: 'hidden' }}
        initial={prefersReduced ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(26,36,21,0.5) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.35em', color: '#b8852a', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Recorded Accounts
        </p>
        <h1 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#ddd0b8', letterSpacing: '0.08em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
          THE TALES
        </h1>
        <div className="medallion-divider" style={{ maxWidth: '400px', margin: '0 auto 1.5rem' }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: '#b8852a' }}>&#10022;</span>
        </div>
        <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#8a7d6a', maxWidth: '600px', margin: '0 auto' }}>
          Every contract leaves a story. Most are better forgotten. These are the ones worth remembering.
        </p>
      </motion.header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: '#7a6d5a', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          {storyList.length} tales recorded
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gridAutoRows: '1fr', gap: '1rem' }}>
          {storyList.map((story, index) => (
            <motion.div key={story.id} variants={itemVariants}>
              <StoryCard story={story} index={index} onClick={handleStoryClick} />
            </motion.div>
          ))}
        </div>

        <div style={{ height: '4rem' }} />
      </div>
    </div>
  );
}
