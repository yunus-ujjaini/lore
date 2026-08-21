import { useScroll, useSpring, motion, useReducedMotion } from 'framer-motion';

export default function ReadingProgressBar() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) {
    return (
      <div
        className="progress-bar"
        role="progressbar"
        aria-label="Reading progress"
        style={{ width: '100%', transform: 'none' }}
      />
    );
  }

  return (
    <motion.div
      className="progress-bar"
      style={{ scaleX, width: '100%' }}
      role="progressbar"
      aria-label="Reading progress"
    />
  );
}
