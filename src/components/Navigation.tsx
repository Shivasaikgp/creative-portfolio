import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { NavigationProps } from '../types';

const Navigation: React.FC<NavigationProps> = ({ 
  activeSection, 
  onSectionChange, 
  isScrolled 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'github', label: 'GitHub' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  // Enhanced keyboard navigation and focus management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        // Return focus to menu button
        const menuButton = document.querySelector('.mobile-menu-button') as HTMLButtonElement;
        menuButton?.focus();
      }
      
      // Handle arrow key navigation in desktop menu
      if (!isMobileMenuOpen && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        const activeElement = document.activeElement;
        const navButtons = Array.from(document.querySelectorAll('nav[aria-label="Main navigation"] button'));
        const currentIndex = navButtons.indexOf(activeElement as HTMLButtonElement);
        
        if (currentIndex !== -1) {
          e.preventDefault();
          let nextIndex;
          if (e.key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % navButtons.length;
          } else {
            nextIndex = currentIndex === 0 ? navButtons.length - 1 : currentIndex - 1;
          }
          (navButtons[nextIndex] as HTMLButtonElement).focus();
        }
      }
      
      // Handle arrow key navigation in mobile menu
      if (isMobileMenuOpen && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        const activeElement = document.activeElement;
        const mobileNavButtons = Array.from(document.querySelectorAll('#mobile-menu nav button'));
        const currentIndex = mobileNavButtons.indexOf(activeElement as HTMLButtonElement);
        
        if (currentIndex !== -1) {
          e.preventDefault();
          let nextIndex;
          if (e.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % mobileNavButtons.length;
          } else {
            nextIndex = currentIndex === 0 ? mobileNavButtons.length - 1 : currentIndex - 1;
          }
          (mobileNavButtons[nextIndex] as HTMLButtonElement).focus();
        }
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
      
      // Focus first menu item when mobile menu opens
      setTimeout(() => {
        const firstMenuItem = document.querySelector('#mobile-menu nav button') as HTMLButtonElement;
        firstMenuItem?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass-effect shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-xl">IIT</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-heading font-semibold text-slate-900">
                  Shivasai Nadigadda
                </h1>
                <p className="text-xs lg:text-sm text-slate-600">
                  IIT Kharagpur
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleSectionClick(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md ${
                    activeSection === item.id
                      ? 'text-primary-600'
                      : 'text-slate-700 hover:text-primary-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-500"
                      layoutId="activeIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      aria-hidden="true"
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden mobile-menu-button p-2 rounded-lg text-slate-700 hover:text-primary-600 hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Mobile Menu */}
            <motion.div
              id="mobile-menu"
              className="mobile-menu fixed top-0 right-0 h-full w-80 max-w-[85vw] sm:max-w-[75vw] glass-effect shadow-2xl z-50 lg:hidden safe-area-padding"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-lg flex items-center justify-center" aria-hidden="true">
                      <span className="text-white font-bold text-lg">IIT</span>
                    </div>
                    <div>
                      <h2 id="mobile-menu-title" className="text-lg font-heading font-semibold text-slate-900">
                        Shivasai
                      </h2>
                      <p className="text-sm text-slate-600">
                        IIT Kharagpur
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-slate-700 hover:text-primary-600 hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    whileTap={{ scale: 0.95 }}
                    aria-label="Close mobile menu"
                  >
                    <X className="w-6 h-6" aria-hidden="true" />
                  </motion.button>
                </div>

                {/* Mobile Menu Items */}
                <nav className="flex-1 py-6" role="navigation" aria-label="Mobile navigation">
                  {navigationItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleSectionClick(item.id)}
                      className={`mobile-nav-item w-full text-left px-6 py-4 text-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset touch-manipulation ${
                        activeSection === item.id
                          ? 'text-primary-600 bg-primary-50/50'
                          : 'text-slate-700 hover:text-primary-600 hover:bg-white/5 active:bg-white/10'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.98 }}
                      aria-current={activeSection === item.id ? 'page' : undefined}
                      aria-label={`Navigate to ${item.label} section`}
                      style={{ minHeight: '56px' }}
                    >
                      <div className="flex items-center justify-between">
                        {item.label}
                        {activeSection === item.id && (
                          <motion.div
                            className="w-2 h-2 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-white/10">
                  <p className="text-sm text-slate-600 text-center">
                    Software Engineer • IIT Kharagpur
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;