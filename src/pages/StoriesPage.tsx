import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { stories } from '../content-loader';
import { useStoryData } from '../hooks/useStoryData';
import StoryCard from '../components/StoryCard';
import '../styles/stories.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function StoriesPage() {
  const navigate = useNavigate();
  const { stories: storyList } = useStoryData(stories);

  const handleStoryClick = (id: string) => {
    navigate(`/stories/${id}`);
  };

  return (
    <div className="stories-page">
      {/* Hero Section with entrance animation */}
      <motion.header 
        className="stories-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="stories-hero__title">STORIES</h1>
        <p className="stories-hero__subtitle">Tales from the Continent</p>
        <p className="stories-hero__description">Discover the stories behind the monsters</p>
      </motion.header>

      {/* Story Grid with staggered card appearance */}
      <motion.div 
        className="stories-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {storyList.map((story) => (
          <motion.div key={story.id} variants={itemVariants}>
            <StoryCard story={story} onClick={handleStoryClick} />
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '2rem', color: '#8a9a88', fontSize: '0.875rem' }}>
        {storyList.length} stories — data-driven from content layer
      </footer>
    </div>
  );
}
