import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { stories, monsters } from '../content-loader';
import { useStoryData } from '../hooks/useStoryData';
import RelatedMonsters from '../components/RelatedMonsters';
import NotFoundStory from '../components/NotFoundStory';
import BackNavigation from '../components/BackNavigation';
import DropCap from '../components/DropCap';
import SectionHeader from '../components/SectionHeader';
import FogTransition from '../components/FogTransition';
import StoryEnding from '../components/StoryEnding';
import ReadingProgressBar from '../components/ReadingProgressBar';
import NextTaleCard from '../components/NextTaleCard';
import Particles from '../components/Particles';
import { Link } from 'react-router-dom';
import '../styles/stories.css';

export default function StoryReaderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStoryById, getNextStory } = useStoryData(stories);

  // Scroll to top when page loads or id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const story = id ? getStoryById(id) : undefined;

  // Get related monsters
  const relatedMonsters = story?.monsterIds
    ? story.monsterIds
        .map(monsterId => monsters[monsterId])
        .filter((m): m is NonNullable<typeof m> => m !== undefined)
    : [];

  const handleMonsterClick = (monsterId: string) => {
    navigate(`/bestiary/${monsterId}`);
  };

  const nextStory = id ? getNextStory(id) : undefined;

  if (!story) {
    return <NotFoundStory storyId={id} />;
  }

  const imageUrl = story.image ? `${import.meta.env.BASE_URL}images/stories/${story.image}` : null;

  // Get sections (support both legacy content and new sections format)
  const sections = story.sections || (story.content ? [{ id: 'section-1', title: story.title, content: story.content }] : []);

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="story-reader"
        data-testid="story-reader"
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ReadingProgressBar />
        {/* Back Navigation */}
        <BackNavigation to="/stories" label="Back to Stories" />

        {/* Hero Section with entrance animation */}
        <motion.section 
          className="story-reader__hero"
          data-testid="story-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {imageUrl && (
            <motion.img
              src={imageUrl}
              alt={`${story.title} illustration`}
              className="story-reader__hero-image"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = `${import.meta.env.BASE_URL}images/placeholders/missing.png`;
              }}
            />
          )}
          <div className="story-reader__hero-overlay" />
          <Particles count={50} />
          
          <motion.div 
            className="story-reader__hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="story-reader__title">{story.title}</h1>
            <p className="story-reader__summary">{story.summary}</p>
          </motion.div>
        </motion.section>

        {/* Story Content Sections */}
        <section className="story-content" data-testid="story-content">
          {sections.map((section, index) => (
            <div key={section.id}>
              {index > 0 && <FogTransition />}
              <motion.div
                className="story-content__section"
                data-testid="story-section"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SectionHeader index={index} title={section.title} />
                <DropCap>
                  <p className="story-content__section-text">{section.content}</p>
                </DropCap>
              </motion.div>
            </div>
          ))}
          <StoryEnding />
        </section>

        {/* Related Monsters */}
        <RelatedMonsters monsters={relatedMonsters} onMonsterClick={handleMonsterClick} />

        {/* Next Tale */}
        {nextStory && <NextTaleCard story={nextStory} />}

        {/* Navigation */}
        <nav className="story-navigation" aria-label="Story navigation">
          <Link to="/stories" className="story-navigation__link">Return to Stories</Link>
          <Link to="/bestiary" className="story-navigation__link">Explore Bestiary</Link>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
}
