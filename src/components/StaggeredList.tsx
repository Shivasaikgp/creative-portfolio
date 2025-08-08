import React, { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useStaggeredAnimation } from '../hooks/useScrollAnimation';

interface StaggeredListProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  stagger?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
}

const StaggeredList: React.FC<StaggeredListProps> = ({
  children,
  className = '',
  itemClassName = '',
  stagger = 0.1,
  duration = 0.6,
  direction = 'up',
  threshold = 0.1
}) => {
  const { containerRef, getItemAnimation } = useStaggeredAnimation(
    children.length,
    { stagger, duration, threshold }
  );

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 30, x: 0 };
      case 'down':
        return { y: -30, x: 0 };
      case 'left':
        return { y: 0, x: 30 };
      case 'right':
        return { y: 0, x: -30 };
      default:
        return { y: 30, x: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <div ref={containerRef} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          className={itemClassName}
          initial={{ 
            opacity: 0, 
            scale: 0.9,
            ...initialPos
          }}
          animate={getItemAnimation(index).animate}
          transition={{
            duration,
            ease: 'easeOut',
            type: 'spring' as const,
            stiffness: 100,
            damping: 15
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

export default StaggeredList;