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
        className="reading-progress-bar"
        role="progressbar"
        aria-label="Reading progress"
      />
    );
  }

  return (
    <motion.div
      className="reading-progress-bar"
      style={{ scaleX }}
      role="progressbar"
      aria-label="Reading progress"
    />
  );
}
