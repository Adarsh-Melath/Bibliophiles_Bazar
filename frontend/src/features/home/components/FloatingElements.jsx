import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Sparkles, Feather } from 'lucide-react';

export function FloatingElements() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles only on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5,
      type: ['book', 'sparkle', 'feather'][
        Math.floor(Math.random() * 3)
      ],
    }));

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-tan opacity-20"
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            rotate: 0,
          }}
          animate={{
            y: [
              `${particle.y}vh`,
              `${particle.y - 20}vh`,
              `${particle.y}vh`,
            ],
            x: [
              `${particle.x}vw`,
              `${particle.x + 5}vw`,
              `${particle.x}vw`,
            ],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: particle.delay,
          }}
        >
          {particle.type === 'book' && (
            <Book size={particle.size} />
          )}
          {particle.type === 'sparkle' && (
            <Sparkles size={particle.size} />
          )}
          {particle.type === 'feather' && (
            <Feather size={particle.size} />
          )}
        </motion.div>
      ))}
    </div>
  );
}