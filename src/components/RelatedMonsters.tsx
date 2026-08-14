import { motion } from 'framer-motion';
import type { Monster } from '../../src/validation/schema';
import MonsterMiniCard from './MonsterMiniCard';

interface RelatedMonstersProps {
  monsters: Monster[];
  onMonsterClick: (id: string) => void;
}

export default function RelatedMonsters({ monsters, onMonsterClick }: RelatedMonstersProps) {
  if (monsters.length === 0) {
    return null;
  }

  return (
    <motion.section 
      className="related-monsters"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="related-monsters__title">Related Monsters</h2>
      <div className="related-monsters__scroll">
        {monsters.map((monster) => (
          <MonsterMiniCard key={monster.id} monster={monster} onClick={onMonsterClick} />
        ))}
      </div>
    </motion.section>
  );
}
