import React from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from '../hooks/useParallax';

interface ScrollProgressIndicatorProps {
  className?: string;
  color?: string;
  height?: string;
  position?: 'top' | 'bottom';
  showPercentage?: boolean;
}

const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  className = '',
  color = 'bg-gradient-to-r from-blue-500 to-purple-600',
  height = 'h-1',
  position = 'top',
  showPercentage = false
}) => {
  const progress = useScrollProgress();

  return (
    <div 
      className={`fixed ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 z-50 ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div className={`w-full ${height} bg-gray-200/20 backdrop-blur-sm`}>
        <motion.div
          className={`${height} ${color} origin-left`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>
      
      {showPercentage && (
        <motion.div
          className="absolute top-2 right-4 text-xs font-medium text-gray-600 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.05 ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {Math.round(progress * 100)}%
        </motion.div>
      )}
    </div>
  );
};

export default ScrollProgressIndicator;