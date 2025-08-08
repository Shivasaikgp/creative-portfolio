import { useEffect, useState } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

export interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  stagger?: number;
  duration?: number;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
    duration = 0.6
  } = options;

  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce
  });

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isIntersecting, delay]);

  return {
    elementRef,
    isIntersecting,
    shouldAnimate,
    animationProps: {
      initial: { opacity: 0, y: 50 },
      animate: shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
      transition: { duration, ease: 'easeOut' }
    }
  };
};

export const useStaggeredAnimation = (
  itemCount: number,
  options: ScrollAnimationOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    stagger = 0.1,
    duration = 0.6
  } = options;

  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce
  });

  const [animatedItems, setAnimatedItems] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  );

  useEffect(() => {
    if (isIntersecting) {
      animatedItems.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedItems(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * stagger * 1000);
      });
    }
  }, [isIntersecting, itemCount, stagger]);

  const getItemAnimation = (index: number) => ({
    initial: { opacity: 0, y: 30, scale: 0.9 },
    animate: animatedItems[index] 
      ? { opacity: 1, y: 0, scale: 1 } 
      : { opacity: 0, y: 30, scale: 0.9 },
    transition: { 
      duration, 
      ease: 'easeOut',
      type: 'spring' as const,
      stiffness: 100,
      damping: 15
    }
  });

  return {
    containerRef: elementRef,
    isIntersecting,
    getItemAnimation
  };
};

export const useCounterAnimation = (
  targetValue: number,
  options: ScrollAnimationOptions & { 
    startValue?: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
  } = {}
) => {
  const {
    threshold = 0.3,
    triggerOnce = true,
    duration = 2,
    startValue = 0,
    decimals = 0
  } = options;

  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce
  });

  const [currentValue, setCurrentValue] = useState(startValue);

  useEffect(() => {
    if (isIntersecting) {
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const value = startValue + (targetValue - startValue) * easeOutQuart;
        
        setCurrentValue(value);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isIntersecting, targetValue, startValue, duration]);

  const formatValue = (value: number) => {
    return value.toFixed(decimals);
  };

  return {
    elementRef,
    currentValue: formatValue(currentValue),
    isAnimating: isIntersecting && currentValue < targetValue
  };
};