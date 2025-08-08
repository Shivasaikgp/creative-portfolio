import { useEffect, useState } from 'react';
import { MobileViewport, MobilePerformance, ResponsiveUtils } from '../utils/touch';

/**
 * Hook for mobile-specific functionality and optimizations
 */
export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(MobileViewport.isMobile());
  const [isTablet, setIsTablet] = useState(MobileViewport.isTablet());
  const [isTouchDevice, setIsTouchDevice] = useState(MobileViewport.isTouchDevice());
  const [currentBreakpoint, setCurrentBreakpoint] = useState(ResponsiveUtils.getCurrentBreakpoint());
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Set initial mobile optimizations
    MobileViewport.setViewportHeight();
    MobilePerformance.optimizeImages();
    MobilePerformance.adaptAnimationsForDevice();
    MobilePerformance.optimizeTouchEvents();

    // Handle viewport height changes
    const cleanupViewportHeight = MobileViewport.handleViewportHeightChange((height) => {
      setViewportHeight(height);
      MobileViewport.setViewportHeight();
    });

    // Handle breakpoint changes
    const cleanupBreakpoint = ResponsiveUtils.onBreakpointChange((breakpoint) => {
      setCurrentBreakpoint(breakpoint as any);
    });

    // Update device detection on resize (for responsive testing)
    const handleResize = () => {
      setIsMobile(MobileViewport.isMobile());
      setIsTablet(MobileViewport.isTablet());
      setIsTouchDevice(MobileViewport.isTouchDevice());
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cleanupViewportHeight();
      cleanupBreakpoint();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isTouchDevice,
    currentBreakpoint,
    viewportHeight,
    viewport: MobileViewport.getViewportDimensions(),
  };
};

/**
 * Hook for touch gesture detection
 */
export const useTouchGesture = (
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down', distance: number, velocity: number) => void
) => {
  useEffect(() => {
    if (!onSwipe) return;

    let touchStart: { x: number; y: number; time: number } | null = null;
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStart = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart) return;

      const touch = e.changedTouches[0];
      const touchEnd = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };

      const deltaX = touchEnd.x - touchStart.x;
      const deltaY = touchEnd.y - touchStart.y;
      const deltaTime = touchEnd.time - touchStart.time;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const velocity = distance / deltaTime;

      if (distance >= minSwipeDistance && deltaTime <= maxSwipeTime) {
        let direction: 'left' | 'right' | 'up' | 'down';

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          direction = deltaX > 0 ? 'right' : 'left';
        } else {
          direction = deltaY > 0 ? 'down' : 'up';
        }

        onSwipe(direction, distance, velocity);
      }

      touchStart = null;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipe]);
};

/**
 * Hook for responsive breakpoint detection
 */
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(ResponsiveUtils.getCurrentBreakpoint());

  useEffect(() => {
    const cleanup = ResponsiveUtils.onBreakpointChange((newBreakpoint) => {
      setBreakpoint(newBreakpoint as any);
    });

    return cleanup;
  }, []);

  return {
    breakpoint,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2Xl: breakpoint === '2xl',
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
  };
};

/**
 * Hook for touch-friendly button behavior
 */
export const useTouchButton = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Make button touch-friendly
    const computedStyle = window.getComputedStyle(element);
    const width = parseInt(computedStyle.width);
    const height = parseInt(computedStyle.height);

    const minSize = 44;
    if (width < minSize || height < minSize) {
      element.style.minWidth = `${minSize}px`;
      element.style.minHeight = `${minSize}px`;
      element.style.display = 'inline-flex';
      element.style.alignItems = 'center';
      element.style.justifyContent = 'center';
    }

    // Add touch feedback
    let touchTimeout: number;

    const handleTouchStart = () => {
      element.classList.add('touch-active');
      clearTimeout(touchTimeout);
    };

    const handleTouchEnd = () => {
      touchTimeout = setTimeout(() => {
        element.classList.remove('touch-active');
      }, 150);
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchEnd);
      clearTimeout(touchTimeout);
    };
  }, [ref]);
};