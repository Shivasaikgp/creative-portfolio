// Preloader utility for critical components and resources
export class ComponentPreloader {
  private static preloadedComponents = new Set<string>();
  private static preloadPromises = new Map<string, Promise<any>>();

  /**
   * Preload a component dynamically
   */
  static async preloadComponent(componentName: string, importFn: () => Promise<any>): Promise<any> {
    if (this.preloadedComponents.has(componentName)) {
      return this.preloadPromises.get(componentName);
    }

    const promise = importFn().catch(error => {
      console.warn(`Failed to preload component ${componentName}:`, error);
      this.preloadedComponents.delete(componentName);
      this.preloadPromises.delete(componentName);
      throw error;
    });

    this.preloadedComponents.add(componentName);
    this.preloadPromises.set(componentName, promise);

    return promise;
  }

  /**
   * Preload critical components that are likely to be needed soon
   */
  static preloadCriticalComponents(): void {
    // Preload components that are likely to be viewed first
    const criticalComponents = [
      {
        name: 'Skills',
        importFn: () => import('../components/Skills')
      },
      {
        name: 'ExperienceTimeline', 
        importFn: () => import('../components/ExperienceTimeline')
      }
    ];

    criticalComponents.forEach(({ name, importFn }) => {
      // Use requestIdleCallback if available, otherwise use setTimeout
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          this.preloadComponent(name, importFn);
        });
      } else {
        setTimeout(() => {
          this.preloadComponent(name, importFn);
        }, 100);
      }
    });
  }

  /**
   * Preload images that are likely to be needed
   */
  static preloadImages(imageUrls: string[]): Promise<void[]> {
    const imagePromises = imageUrls.map(url => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
      });
    });

    return Promise.allSettled(imagePromises).then(results => {
      const failed = results.filter(result => result.status === 'rejected');
      if (failed.length > 0) {
        console.warn(`Failed to preload ${failed.length} images`);
      }
      return results.map(() => undefined);
    });
  }

  /**
   * Preload critical resources based on user behavior
   */
  static setupIntelligentPreloading(): () => void {
    let scrollTimeout: number;
    let hasPreloadedNext = false;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        // When user scrolls 25% down, preload remaining components
        if (scrollPercent > 25 && !hasPreloadedNext) {
          hasPreloadedNext = true;
          
          const remainingComponents = [
            {
              name: 'Projects',
              importFn: () => import('../components/Projects')
            },
            {
              name: 'Education',
              importFn: () => import('../components/Education')
            },
            {
              name: 'Contact',
              importFn: () => import('../components/Contact')
            }
          ];

          remainingComponents.forEach(({ name, importFn }) => {
            this.preloadComponent(name, importFn);
          });
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }
}

/**
 * Resource hints for better loading performance
 */
export class ResourceHints {
  /**
   * Add DNS prefetch for external domains
   */
  static addDNSPrefetch(domains: string[]): void {
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });
  }

  /**
   * Add preconnect for critical external resources
   */
  static addPreconnect(urls: string[]): void {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  /**
   * Add resource hints for fonts and critical assets
   */
  static setupResourceHints(): void {
    // Add DNS prefetch for common external domains
    this.addDNSPrefetch([
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'cdn.jsdelivr.net'
    ]);

    // Add preconnect for critical resources
    this.addPreconnect([
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ]);
  }
}

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  /**
   * Measure and log component loading times
   */
  static measureComponentLoad(componentName: string, startTime: number): void {
    const loadTime = performance.now() - startTime;
    console.log(`Component ${componentName} loaded in ${loadTime.toFixed(2)}ms`);
    
    // Report to analytics if available
    if ('gtag' in window) {
      (window as any).gtag('event', 'timing_complete', {
        name: `component_load_${componentName}`,
        value: Math.round(loadTime)
      });
    }
  }

  /**
   * Monitor Core Web Vitals
   */
  static monitorWebVitals(): void {
    // Monitor Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch {
        console.warn('LCP monitoring not supported');
      }
    }

    // Monitor First Input Delay (FID)
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.processingStart) {
              console.log('FID:', entry.processingStart - entry.startTime);
            }
          });
        });
        observer.observe({ entryTypes: ['first-input'] });
      } catch {
        console.warn('FID monitoring not supported');
      }
    }
  }
}