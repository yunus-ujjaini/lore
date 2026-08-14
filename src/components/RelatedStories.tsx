import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Story } from '../../src/validation/schema';
import StoryCard from './StoryCard';

interface RelatedStoriesProps {
  stories: Story[];
}

export default function RelatedStories({ stories }: RelatedStoriesProps) {
  const navigate = useNavigate();

  if (stories.length === 0) {
    return null;
  }

  const handleStoryClick = (id: string) => {
    navigate(`/stories/${id}`);
  };

  return (
    <motion.section 
      className="related-stories"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="related-stories__title">Related Stories</h2>
      <div className="related-stories__scroll">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} onClick={handleStoryClick} />
        ))}
      </div>
    </motion.section>
  );
}
