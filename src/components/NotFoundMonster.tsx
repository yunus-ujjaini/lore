import { motion } from 'framer-motion';
import BackNavigation from './BackNavigation';

interface NotFoundMonsterProps {
  monsterId?: string;
}

export default function NotFoundMonster({ monsterId }: NotFoundMonsterProps) {
  return (
    <motion.div 
      className="not-found"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackNavigation to="/bestiary" label="Return to Bestiary" />
      <h1 className="not-found__title">Monster Not Found</h1>
      <p className="not-found__message">
        {monsterId 
          ? `The creature "${monsterId}" could not be found in the Bestiary.`
          : 'This creature could not be found in the Bestiary.'}
      </p>
    </motion.div>
  );
}
