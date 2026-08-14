import { motion } from 'framer-motion';
import type { Monster } from '../../src/validation/schema';

interface MonsterHeroProps {
  monster: Monster;
}

export default function MonsterHero({ monster }: MonsterHeroProps) {
  const imageUrl = `/images/monsters/${monster.image}`;

  return (
    <section className="monster-hero">
      <motion.img
        src={imageUrl}
        alt={`${monster.name} illustration`}
        className="monster-hero__image"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.src = '/images/placeholders/missing.png';
        }}
      />
      <div className="monster-hero__overlay" />
      
      <motion.div 
        className="monster-hero__content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="monster-hero__name">{monster.name}</h1>
        <p className="monster-hero__category">{monster.category}</p>
        <span
          className={`monster-hero__threat monster-hero__threat--${monster.threatLevel}`}
          aria-label={`Threat level ${monster.threatLevel}`}
        >
          {monster.threatLevel}
        </span>
        <p className="monster-hero__description">{monster.description}</p>
      </motion.div>
    </section>
  );
}
