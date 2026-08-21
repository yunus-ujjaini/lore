import { motion, useReducedMotion } from 'framer-motion';
import type { Monster } from '../validation/schema';
import ThreatStars from './ThreatStars';
import { CATEGORY_COLORS } from './FilterBar';

interface MonsterHeroProps {
  monster: Monster;
}

export default function MonsterHero({ monster }: MonsterHeroProps) {
  const imageUrl = `${import.meta.env.BASE_URL}images/monsters/${monster.image}`;
  const prefersReduced = useReducedMotion();

  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '80vh', overflow: 'hidden', background: '#100e14' }}>
      <motion.img
        src={imageUrl}
        alt={`${monster.name} illustration`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        initial={prefersReduced ? false : { scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.src = `${import.meta.env.BASE_URL}images/placeholders/missing.png`;
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,7,10,0.9) 0%, rgba(8,7,10,0.3) 50%, transparent 100%)' }} />

      <motion.div
        style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a7d6a', display: 'inline-block', marginBottom: '0.75rem', border: '1px solid #8a7d6a', padding: '0.2rem 0.6rem', borderRadius: '2px' }}>
          {monster.category}
        </span>
        <h1 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: '#ddd0b8', letterSpacing: '0.05em', marginBottom: '0.75rem', lineHeight: 1.15 }}>
          {monster.name}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThreatStars level={monster.threatLevel} size={16} />
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.2em', color: '#7a6d5a', textTransform: 'uppercase' }}>
            Threat Level {monster.threatLevel}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
