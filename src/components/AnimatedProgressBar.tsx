import React, { useEffect, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedProgressBarProps {
  percentage: number;
  color: string;
  delay?: number;
  duration?: number;
  height?: string;
  showPercentage?: boolean;
  className?: string;
  'aria-label'?: string;
}

const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  percentage,
  color,
  delay = 0,
  duration = 1500,
  height = 'h-3',
  showPercentage = true,
  className = '',
  'aria-label': ariaLabel
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        // Animate the percentage with easing
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function (ease-out cubic)
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentPercentage = Math.round(percentage * easeOut);
          
          setAnimatedPercentage(currentPercentage);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isIntersecting, percentage, delay, duration]);

  return (
    <div ref={elementRef} className={`relative ${className}`}>
      <div 
        className={`w-full ${height} bg-gray-200 rounded-full overflow-hidden shadow-inner`}
        role="progressbar"
        aria-valuenow={animatedPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel || `Progress: ${animatedPercentage}%`}
      >
        <div
          className={`${height} bg-gradient-to-r ${color} rounded-full transition-all duration-300 ease-out relative overflow-hidden`}
          style={{ width: `${animatedPercentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" aria-hidden="true"></div>
        </div>
      </div>
      
      {showPercentage && (
        <div className="absolute -top-8 right-0 text-sm font-semibold text-gray-700">
          <span className="tabular-nums">{animatedPercentage}%</span>
        </div>
      )}
    </div>
  );
};

export default AnimatedProgressBar;