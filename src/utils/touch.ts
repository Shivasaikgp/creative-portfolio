/**
 * Touch interaction utilities for mobile devices
 */

export interface TouchGesture {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startTime: number;
  endTime: number;
}

export interface SwipeDirection {
  direction: 'left' | 'right' | 'up' | 'down' | null;
  distance: number;
  velocity: number;
}

/**
 * Touch gesture detection utilities
 */
export class TouchGestureDetector {
  private touchStart: { x: number; y: number; time: number } | null = null;
  private minSwipeDistance = 50;
  private maxSwipeTime = 300;

  /**
   * Handle touch start event
   */
  onTouchStart = (e: TouchEvent): void => {
    const touch = e.touches[0];
    this.touchStart = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
  };

  /**
   * Handle touch end event and detect swipe
   */
  onTouchEnd = (e: TouchEvent, callback: (swipe: SwipeDirection) => void): void => {
    if (!this.touchStart) return;

    const touch = e.changedTouches[0];
    const touchEnd = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    const deltaX = touchEnd.x - this.touchStart.x;
    const deltaY = touchEnd.y - this.touchStart.y;
    const deltaTime = touchEnd.time - this.touchStart.time;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const velocity = distance / deltaTime;

    // Check if it's a valid swipe
    if (distance >= this.minSwipeDistance && deltaTime <= this.maxSwipeTime) {
      let direction: 'left' | 'right' | 'up' | 'down' | null = null;

      // Determine primary direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }

      callback({ direction, distance, velocity });
    } else {
      callback({ direction: null, distance, velocity });
    }

    this.touchStart = null;
  };

  /**
   * Set minimum swipe distance
   */
  setMinSwipeDistance(distance: number): void {
    this.minSwipeDistance = distance;
  }

  /**
   * Set maximum swipe time
   */
  setMaxSwipeTime(time: number): void {
    this.maxSwipeTime = time;
  }
}

/**
 * Touch-friendly button utilities
 */
export class TouchButton {
  /**
   * Make an element touch-friendly by ensuring minimum touch target size
   */
  static makeTouchFriendly(element: HTMLElement): void {
    const computedStyle = window.getComputedStyle(element);
    const width = parseInt(computedStyle.width);
    const height = parseInt(computedStyle.height);

    // Minimum touch target size is 44px x 44px (iOS) or 48dp (Android)
    const minSize = 44;

    if (width < minSize || height < minSize) {
      element.style.minWidth = `${minSize}px`;
      element.style.minHeight = `${minSize}px`;
      element.style.display = 'inline-flex';
      element.style.alignItems = 'center';
      element.style.justifyContent = 'center';
    }
  }

  /**
   * Add touch feedback to an element
   */
  static addTouchFeedback(element: HTMLElement): () => void {
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

    // Return cleanup function
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchEnd);
      clearTimeout(touchTimeout);
    };
  }
}

/**
 * Mobile viewport utilities
 */
export class MobileViewport {
  /**
   * Check if device is mobile
   */
  static isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  /**
   * Check if device is tablet
   */
  static isTablet(): boolean {
    return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
  }

  /**
   * Check if device supports touch
   */
  static isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  /**
   * Get viewport dimensions
   */
  static getViewportDimensions(): { width: number; height: number } {
    return {
      width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
  }

  /**
   * Handle viewport height changes (useful for mobile browsers)
   */
  static handleViewportHeightChange(callback: (height: number) => void): () => void {
    const handleResize = () => {
      const height = window.innerHeight;
      callback(height);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    // Initial call
    handleResize();

    // Return cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }

  /**
   * Set CSS custom property for viewport height (fixes mobile browser issues)
   */
  static setViewportHeight(): void {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}

/**
 * Performance optimizations for mobile
 */
export class MobilePerformance {
  /**
   * Optimize images for mobile
   */
  static optimizeImages(): void {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add loading="lazy" for images not in viewport
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }

      // Add decoding="async" for better performance
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });
  }

  /**
   * Reduce animations on low-end devices
   */
  static adaptAnimationsForDevice(): void {
    // Check for low-end device indicators
    const isLowEnd = (
      navigator.hardwareConcurrency <= 2 ||
      (navigator as any).deviceMemory <= 2 ||
      (navigator as any).connection?.effectiveType === 'slow-2g' ||
      (navigator as any).connection?.effectiveType === '2g'
    );

    if (isLowEnd) {
      document.documentElement.classList.add('reduce-animations');
    }
  }

  /**
   * Optimize touch event listeners
   */
  static optimizeTouchEvents(): void {
    // Add passive event listeners for better scroll performance
    const passiveEvents = ['touchstart', 'touchmove', 'wheel'];
    
    passiveEvents.forEach(eventType => {
      document.addEventListener(eventType, () => {}, { passive: true });
    });
  }
}

/**
 * Mobile-specific UI patterns
 */
export class MobileUI {
  /**
   * Create a mobile-friendly modal
   */
  static createMobileModal(content: HTMLElement): HTMLElement {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4';
    
    const backdrop = document.createElement('div');
    backdrop.className = 'absolute inset-0 bg-black bg-opacity-50';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'relative bg-white rounded-t-lg sm:rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto';
    
    // Add pull-to-dismiss indicator for mobile
    if (MobileViewport.isMobile()) {
      const pullIndicator = document.createElement('div');
      pullIndicator.className = 'w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-4';
      modalContent.appendChild(pullIndicator);
    }
    
    modalContent.appendChild(content);
    modal.appendChild(backdrop);
    modal.appendChild(modalContent);
    
    return modal;
  }

  /**
   * Create a mobile-friendly dropdown
   */
  static createMobileDropdown(trigger: HTMLElement, items: HTMLElement[]): HTMLElement {
    const dropdown = document.createElement('div');
    dropdown.className = 'relative';
    
    const menu = document.createElement('div');
    menu.className = 'absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto';
    
    // On mobile, make dropdown full-width and add touch-friendly spacing
    if (MobileViewport.isMobile()) {
      menu.className += ' mt-2';
      items.forEach(item => {
        item.className += ' py-3 px-4 text-base';
      });
    }
    
    items.forEach(item => menu.appendChild(item));
    dropdown.appendChild(trigger);
    dropdown.appendChild(menu);
    
    return dropdown;
  }

  /**
   * Add pull-to-refresh functionality
   */
  static addPullToRefresh(container: HTMLElement, onRefresh: () => Promise<void>): () => void {
    let startY = 0;
    let currentY = 0;
    let isPulling = false;
    const threshold = 100;

    const handleTouchStart = (e: TouchEvent) => {
      if (container.scrollTop === 0) {
        startY = e.touches[0].clientY;
        isPulling = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling) return;
      
      currentY = e.touches[0].clientY;
      const pullDistance = currentY - startY;
      
      if (pullDistance > 0 && pullDistance < threshold * 2) {
        e.preventDefault();
        container.style.transform = `translateY(${pullDistance * 0.5}px)`;
        
        if (pullDistance > threshold) {
          container.classList.add('pull-to-refresh-ready');
        } else {
          container.classList.remove('pull-to-refresh-ready');
        }
      }
    };

    const handleTouchEnd = async () => {
      if (!isPulling) return;
      
      const pullDistance = currentY - startY;
      
      if (pullDistance > threshold) {
        container.classList.add('pull-to-refresh-loading');
        try {
          await onRefresh();
        } finally {
          container.classList.remove('pull-to-refresh-loading', 'pull-to-refresh-ready');
        }
      }
      
      container.style.transform = '';
      isPulling = false;
      startY = 0;
      currentY = 0;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }
}

/**
 * Responsive breakpoint utilities
 */
export class ResponsiveUtils {
  private static breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  };

  /**
   * Check if current viewport matches breakpoint
   */
  static matches(breakpoint: keyof typeof ResponsiveUtils.breakpoints): boolean {
    return window.innerWidth >= ResponsiveUtils.breakpoints[breakpoint];
  }

  /**
   * Get current breakpoint
   */
  static getCurrentBreakpoint(): keyof typeof ResponsiveUtils.breakpoints | 'xs' {
    const width = window.innerWidth;
    
    if (width >= ResponsiveUtils.breakpoints['2xl']) return '2xl';
    if (width >= ResponsiveUtils.breakpoints.xl) return 'xl';
    if (width >= ResponsiveUtils.breakpoints.lg) return 'lg';
    if (width >= ResponsiveUtils.breakpoints.md) return 'md';
    if (width >= ResponsiveUtils.breakpoints.sm) return 'sm';
    return 'xs';
  }

  /**
   * Listen for breakpoint changes
   */
  static onBreakpointChange(callback: (breakpoint: string) => void): () => void {
    let currentBreakpoint = ResponsiveUtils.getCurrentBreakpoint();

    const handleResize = () => {
      const newBreakpoint = ResponsiveUtils.getCurrentBreakpoint();
      if (newBreakpoint !== currentBreakpoint) {
        currentBreakpoint = newBreakpoint;
        callback(newBreakpoint);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }
}