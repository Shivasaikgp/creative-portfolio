import { useState, useEffect, useCallback, useRef } from 'react';

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
  rootMargin?: string;
}

export const useScrollSpy = ({ 
  sectionIds, 
  offset = 100,
  rootMargin = '-20% 0px -80% 0px'
}: UseScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ticking = useRef(false);

  // Enhanced scroll handling with responsive throttling for better performance
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          
          // Responsive scroll threshold based on screen size
          const scrollThreshold = window.innerWidth < 640 ? 30 : window.innerWidth < 1024 ? 40 : 50;
          
          // Update scroll state with responsive threshold
          setIsScrolled(scrollY > scrollThreshold);
          
          // Calculate scroll progress with better precision
          const maxScroll = documentHeight - windowHeight;
          const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
          setScrollProgress(progress);
          
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Initial call to set correct state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced Intersection Observer for better section detection
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sectionElements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    // Enhanced observer options for better mobile and desktop experience
    const observerOptions: IntersectionObserverInit = {
      rootMargin,
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    };

    // Track which sections are currently intersecting
    const intersectingSections = new Map<string, number>();

    sectionElements.forEach((section) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            intersectingSections.delete(entry.target.id);
          }

          // Find the section with the highest intersection ratio
          let maxRatio = 0;
          let mostVisibleSection = sectionIds[0];

          intersectingSections.forEach((ratio, sectionId) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              mostVisibleSection = sectionId;
            }
          });

          // Only update if we have a significant intersection or if it's the first section
          if (maxRatio > 0.1 || mostVisibleSection === sectionIds[0]) {
            setActiveSection(mostVisibleSection);
          }
        });
      }, observerOptions);

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
      intersectingSections.clear();
    };
  }, [sectionIds, rootMargin]);

  // Enhanced smooth scroll to section with mobile-first responsive offset
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Mobile-first responsive offset calculation
      let responsiveOffset = offset;
      
      if (window.innerWidth < 640) {
        // Mobile: smaller offset
        responsiveOffset = offset - 25;
      } else if (window.innerWidth < 768) {
        // Small tablet: medium offset
        responsiveOffset = offset - 15;
      } else if (window.innerWidth < 1024) {
        // Tablet: slightly reduced offset
        responsiveOffset = offset - 10;
      }
      // Desktop and larger: use full offset
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - responsiveOffset;

      // Enhanced smooth scrolling with better error handling
      try {
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      } catch {
        // Fallback for older browsers with smooth animation
        const startPosition = window.scrollY;
        const targetPosition = Math.max(0, offsetPosition);
        const distance = targetPosition - startPosition;
        const duration = 500; // 500ms animation
        let startTime: number | null = null;

        const animateScroll = (currentTime: number) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          
          // Easing function for smooth animation
          const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          const easedProgress = easeInOutCubic(progress);
          
          window.scrollTo(0, startPosition + distance * easedProgress);
          
          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };
        
        requestAnimationFrame(animateScroll);
      }

      // Update URL hash without triggering scroll
      if (history.replaceState) {
        history.replaceState(null, '', `#${sectionId}`);
      }
    }
  }, [offset]);

  return {
    activeSection,
    isScrolled,
    scrollProgress,
    scrollToSection,
  };
};