import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { monsters, stories } from '../content-loader';
import MonsterHero from '../components/MonsterHero';
import MonsterInfo from '../components/MonsterInfo';
import RelatedStories from '../components/RelatedStories';
import BackNavigation from '../components/BackNavigation';
import NotFoundMonster from '../components/NotFoundMonster';
import '../styles/monster-details.css';

export default function MonsterDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Scroll to top when page loads or id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  const monster = id ? monsters[id] : undefined;
  
  // Filter related stories
  const relatedStories = id 
    ? Object.values(stories).filter(story => story.monsterIds.includes(id))
    : [];

  if (!monster) {
    return <NotFoundMonster monsterId={id} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="monster-details"
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <BackNavigation />
        <MonsterHero monster={monster} />
        <MonsterInfo monster={monster} />
        <RelatedStories stories={relatedStories} />
      </motion.div>
    </AnimatePresence>
  );
}
