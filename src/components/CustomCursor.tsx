import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../utils/cursor';

interface CustomCursorProps {
  enabled?: boolean;
  size?: number;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  enabled = true,
  size = 20
}) => {
  const { position, isPointer, isHidden } = useCursor();
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    if (!enabled) return;

    // Add cursor trail effect
    const trailPoint = { x: position.x, y: position.y, id: Date.now() };
    setTrail(prev => [...prev.slice(-8), trailPoint]);

    // Clean up old trail points
    const cleanup = setTimeout(() => {
      setTrail(prev => prev.filter(point => Date.now() - point.id < 500));
    }, 100);

    return () => clearTimeout(cleanup);
  }, [position, enabled]);

  if (!enabled || isHidden) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 mix-blend-difference">
      {/* Main cursor */}
      <motion.div
        className="absolute rounded-full border-2 border-white"
        style={{
          left: position.x - size / 2,
          top: position.y - size / 2,
          width: size,
          height: size,
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Cursor dot */}
      <motion.div
        className="absolute rounded-full bg-white"
        style={{
          left: position.x - 2,
          top: position.y - 2,
          width: 4,
          height: 4,
        }}
        animate={{
          scale: isPointer ? 0 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Trail effect */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            className="absolute rounded-full bg-white"
            style={{
              left: point.x - 1,
              top: point.y - 1,
              width: 2,
              height: 2,
            }}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ 
              opacity: 0.8 - (index * 0.1),
              scale: 1 - (index * 0.1),
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;