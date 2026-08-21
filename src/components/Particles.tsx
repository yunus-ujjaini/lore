import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

interface ParticlesProps {
  count?: number;
}

interface Particle {
  id: number;
  width: number;
  height: number;
  left: number;
  top: number;
  animationDuration: number;
  animationDelay: number;
}

export default function Particles({ count = 50 }: ParticlesProps) {
  const shouldReduceMotion = useReducedMotion();

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      width: Math.random() * 6 + 2,
      height: Math.random() * 6 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 20 + 10,
      animationDelay: Math.random() * 10,
    }));
  }, [count]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: `${p.width}px`,
            height: `${p.height}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDuration: `${p.animationDuration}s`,
            animationDelay: `${p.animationDelay}s`,
          }}
        />
      ))}
      <style>{`
        .particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(201, 184, 150, 0.15);
          animation: particle-float linear infinite;
        }
        @keyframes particle-float {
          0%, 100% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
