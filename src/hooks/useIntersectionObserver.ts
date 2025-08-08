import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Overloaded function signatures
export function useIntersectionObserver(
  options?: UseIntersectionObserverOptions
): { elementRef: RefObject<HTMLDivElement>; isIntersecting: boolean };

export function useIntersectionObserver(
  elementRef: RefObject<HTMLElement>,
  options?: UseIntersectionObserverOptions
): boolean;

export function useIntersectionObserver(
  elementRefOrOptions?: RefObject<HTMLElement> | UseIntersectionObserverOptions,
  optionsParam?: UseIntersectionObserverOptions
) {
  // Determine if first parameter is a ref or options
  const isRefProvided = elementRefOrOptions && 'current' in elementRefOrOptions;
  const elementRef = isRefProvided 
    ? elementRefOrOptions as RefObject<HTMLElement>
    : useRef<HTMLDivElement>(null);
  const options = isRefProvided ? optionsParam || {} : elementRefOrOptions || {};
  
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = false } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        
        if (isCurrentlyIntersecting && !hasTriggered) {
          setIsIntersecting(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(isCurrentlyIntersecting);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  // Return different values based on usage pattern
  if (isRefProvided) {
    return isIntersecting;
  } else {
    return { elementRef, isIntersecting };
  }
}