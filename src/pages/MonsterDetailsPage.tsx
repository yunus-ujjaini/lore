import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { monsters, stories } from '../content-loader';
import MonsterHero from '../components/MonsterHero';
import MonsterInfo from '../components/MonsterInfo';
import RelatedStories from '../components/RelatedStories';
import BackNavigation from '../components/BackNavigation';
import NotFoundMonster from '../components/NotFoundMonster';

export default function MonsterDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const monster = id ? monsters[id] : undefined;
  const relatedStories = id
    ? Object.values(stories).filter(story => story.monsterIds.includes(id))
    : [];

  if (!monster) {
    return <NotFoundMonster monsterId={id} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ minHeight: '100vh' }}
      >
        <MonsterHero monster={monster} />

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 2rem 0' }}>
          <BackNavigation to="/bestiary" label="Bestiary" />
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
          <MonsterInfo monster={monster} />
          <RelatedStories stories={relatedStories} />
        </div>

        <div style={{ height: '5rem' }} />
      </motion.div>
    </AnimatePresence>
  );
}
