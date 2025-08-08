import React, { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '../hooks/useParallax';

interface ParallaxContainerProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: number;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  offset = 0
}) => {
  const scrollY = useParallax();

  const getTransform = () => {
    const movement = (scrollY - offset) * speed;
    
    switch (direction) {
      case 'up':
        return { y: -movement };
      case 'down':
        return { y: movement };
      case 'left':
        return { x: -movement };
      case 'right':
        return { x: movement };
      default:
        return { y: -movement };
    }
  };

  return (
    <motion.div
      className={className}
      style={getTransform()}
      transition={{ type: 'tween', ease: 'linear', duration: 0 }}
    >
      {children}
    </motion.div>
  );
};

// Floating shapes component for background parallax effects
export const FloatingShapes: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => {
  const scrollY = useParallax();

  const shapes = [
    { id: 1, size: 'w-20 h-20', color: 'bg-blue-500/10', speed: 0.3, offset: 0 },
    { id: 2, size: 'w-32 h-32', color: 'bg-purple-500/10', speed: 0.5, offset: 200 },
    { id: 3, size: 'w-16 h-16', color: 'bg-green-500/10', speed: 0.2, offset: 400 },
    { id: 4, size: 'w-24 h-24', color: 'bg-orange-500/10', speed: 0.4, offset: 600 },
    { id: 5, size: 'w-40 h-40', color: 'bg-pink-500/10', speed: 0.6, offset: 800 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute rounded-full ${shape.size} ${shape.color} blur-sm`}
          style={{
            left: `${20 + (shape.id * 15)}%`,
            top: `${10 + (shape.id * 20)}%`,
            y: -(scrollY - shape.offset) * shape.speed,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 20 + shape.id * 5,
              repeat: Infinity,
              ease: 'linear',
            },
            scale: {
              duration: 4 + shape.id,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxContainer;