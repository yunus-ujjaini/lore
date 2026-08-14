import { motion } from 'framer-motion';
import BackNavigation from './BackNavigation';

interface NotFoundStoryProps {
  storyId?: string;
}

export default function NotFoundStory({ storyId }: NotFoundStoryProps) {
  return (
    <motion.div 
      className="not-found-story"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackNavigation to="/stories" label="Return to Stories" />
      <h1 className="not-found-story__title">Story Not Found</h1>
      <p className="not-found-story__message">
        {storyId 
          ? `This tale could not be found: "${storyId}"`
          : 'This tale could not be found in the Bestiary.'}
      </p>
    </motion.div>
  );
}
