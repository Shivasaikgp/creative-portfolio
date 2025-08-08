import React, { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from './';
import { useScrollSpy, useMobile } from '../hooks';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Main Layout Component with Section Management
 * 
 * Features:
 * - Semantic HTML structure with proper ARIA landmarks
 * - Responsive breakpoint system with mobile-first approach
 * - Scroll spy functionality for navigation highlighting
 * - Smooth scrolling behavior between sections
 * - Accessibility enhancements and keyboard navigation
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Define all section IDs for scroll spy with proper semantic structure
  const sectionIds = [
    'home',
    'about', 
    'skills',
    'experience',
    'projects',
    'education',
    'contact'
  ];

  const { isMobile, isTablet } = useMobile();
  
  const { activeSection, isScrolled, scrollProgress, scrollToSection } = useScrollSpy({
    sectionIds,
    // Responsive offset calculation for different screen sizes
    offset: isMobile ? 60 : isTablet ? 70 : 80,
    rootMargin: '-10% 0px -70% 0px' // Optimized for better section detection
  });

  // Enhanced smooth scrolling behavior with responsive scroll padding
  const updateScrollPadding = useCallback(() => {
    const header = document.querySelector('header');
    if (header) {
      const headerHeight = header.offsetHeight;
      const additionalPadding = window.innerWidth < 640 ? 10 : window.innerWidth < 1024 ? 15 : 20;
      document.documentElement.style.scrollPaddingTop = `${headerHeight + additionalPadding}px`;
    }
  }, []);

  useEffect(() => {
    // Apply smooth scrolling class to html element
    document.documentElement.classList.add('smooth-scroll');
    
    // Set initial scroll padding
    updateScrollPadding();
    
    // Update scroll padding on resize for responsive behavior
    const handleResize = () => {
      updateScrollPadding();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      document.documentElement.classList.remove('smooth-scroll');
    };
  }, [updateScrollPadding]);

  return (
    <div className="min-h-screen bg-slate-50 antialiased safe-area-padding">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary-600 text-white px-4 py-2 rounded-lg focus-visible transition-all duration-200"
      >
        Skip to main content
      </a>

      {/* Navigation Header with semantic landmark */}
      <Navigation
        activeSection={activeSection}
        onSectionChange={scrollToSection}
        isScrolled={isScrolled}
      />

      {/* Main Content with proper semantic structure and section management */}
      <main id="main-content" className="relative" role="main">
        {/* Responsive Animated Background Layer */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {/* Mobile-first responsive background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 via-transparent to-secondary-50/20 sm:from-primary-50/25 sm:to-secondary-50/25 lg:from-primary-50/30 lg:to-secondary-50/30" />
          
          {/* Responsive floating geometric shapes with mobile-first sizing */}
          <motion.div
            className="absolute top-16 left-2 w-12 h-12 sm:top-20 sm:left-4 sm:w-16 sm:h-16 md:left-10 md:w-20 md:h-20 bg-gradient-to-br from-primary-200/15 to-primary-300/15 sm:from-primary-200/20 sm:to-primary-300/20 rounded-full blur-xl"
            animate={{
              y: [0, -15, 0],
              x: [0, 8, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute top-32 right-2 w-16 h-16 sm:top-40 sm:right-4 sm:w-24 sm:h-24 md:right-20 md:w-32 md:h-32 bg-gradient-to-br from-secondary-200/15 to-secondary-300/15 sm:from-secondary-200/20 sm:to-secondary-300/20 rounded-full blur-xl"
            animate={{
              y: [0, 25, 0],
              x: [0, -12, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          <motion.div
            className="absolute bottom-32 left-1/4 w-14 h-14 sm:bottom-40 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-success-200/15 to-success-300/15 sm:from-success-200/20 sm:to-success-300/20 rounded-full blur-xl"
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>

        {/* Content Sections Container with responsive management */}
        <div className="relative z-10">
          {/* Section wrapper with proper semantic structure */}
          <div className="w-full">
            {children}
          </div>
        </div>
      </main>

      {/* Enhanced Back to Top Button with mobile-first responsive positioning */}
      <motion.button
        className={`fixed bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-40 p-2.5 sm:p-3 rounded-full glass-effect shadow-lg transition-all duration-300 focus-visible hover:shadow-xl touch-manipulation safe-area-bottom ${
          isScrolled 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        onClick={() => scrollToSection('home')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
        tabIndex={isScrolled ? 0 : -1}
        style={{ minWidth: '48px', minHeight: '48px' }}
      >
        <svg 
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </motion.button>

      {/* Responsive scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-primary-600 to-secondary-500 origin-left z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Section navigation helper for screen readers */}
      <nav className="sr-only" aria-label="Page sections">
        <ul>
          {sectionIds.map((sectionId) => (
            <li key={sectionId}>
              <a href={`#${sectionId}`} onClick={(e) => {
                e.preventDefault();
                scrollToSection(sectionId);
              }}>
                {sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} section
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Layout;