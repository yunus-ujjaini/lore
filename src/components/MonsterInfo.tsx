import { motion } from 'framer-motion';
import type { Monster } from '../../src/validation/schema';

interface MonsterInfoProps {
  monster: Monster;
}

export default function MonsterInfo({ monster }: MonsterInfoProps) {
  return (
    <motion.section 
      className="monster-info"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="monster-info__title">About the {monster.name}</h2>
      <p className="monster-info__category">Category: {monster.category}</p>
      <p className="monster-info__threat">Threat Level: {monster.threatLevel}</p>
    </motion.section>
  );
}
