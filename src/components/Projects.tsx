import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useIntersectionObserver } from '../hooks';
import { useStaggeredAnimation } from '../hooks/useScrollAnimation';
import { FloatingShapes } from './ParallaxContainer';
import type { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

// Filter categories for the projects
const filterCategories = [
  'All',
  'Full Stack',
  'Frontend',
  'Backend',
  'Machine Learning',
  'Mobile'
];

// Technology filters for advanced filtering
const technologyFilters = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'MongoDB',
  'PostgreSQL',
  'Docker',
  'AWS'
];

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedTechFilter, setSelectedTechFilter] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Intersection observer for lazy loading
  const isLoadMoreVisible = useIntersectionObserver(loadMoreRef as React.RefObject<HTMLElement>, {
    threshold: 0.1,
  });

  // Load more projects when intersection observer triggers
  useEffect(() => {
    if (isLoadMoreVisible && visibleProjects < filteredProjects.length) {
      setVisibleProjects(prev => Math.min(prev + 6, filteredProjects.length));
    }
  }, [isLoadMoreVisible]);

  // Filter projects based on selected category, technology, and search query
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(project => project.category === selectedFilter);
    }

    // Filter by technology
    if (selectedTechFilter) {
      filtered = filtered.filter(project => 
        project.technologies.includes(selectedTechFilter)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [projects, selectedFilter, selectedTechFilter, searchQuery]);

  // Sort projects to show featured ones first
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  }, [filteredProjects]);

  // Get visible projects for lazy loading
  const displayedProjects = useMemo(() => {
    return sortedProjects.slice(0, visibleProjects);
  }, [sortedProjects, visibleProjects]);

  const handleViewDetails = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleFilterChange = useCallback((filter: string) => {
    setSelectedFilter(filter);
    setVisibleProjects(6);
  }, []);

  const handleTechFilterChange = useCallback((tech: string | null) => {
    setSelectedTechFilter(tech);
    setVisibleProjects(6);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleProjects(6);
  }, []);

  return (
    <section 
      id="projects" 
      className="py-20 bg-gray-50 relative overflow-hidden"
      aria-label="Featured projects and portfolio"
    >
      {/* Background with floating shapes */}
      <FloatingShapes className="opacity-40" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            role="heading"
            aria-level={2}
          >
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of my recent work, featuring full-stack applications, 
            innovative solutions, and creative implementations across various technologies.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-md mx-auto mb-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              aria-label="Search projects by name, description, or technology"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        {/* Category Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          role="group"
          aria-label="Filter projects by category"
        >
          {filterCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-manipulation text-sm sm:text-base ${
                selectedFilter === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md active:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={selectedFilter === category}
              aria-label={`Filter projects by ${category} category`}
              style={{ minHeight: '44px' }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Technology Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          role="group"
          aria-label="Filter projects by technology"
        >
          <button
            onClick={() => handleTechFilterChange(null)}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 touch-manipulation ${
              selectedTechFilter === null
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
            }`}
            aria-pressed={selectedTechFilter === null}
            aria-label="Show all technologies"
            style={{ minHeight: '36px' }}
          >
            All Tech
          </button>
          {technologyFilters.map((tech) => (
            <button
              key={tech}
              onClick={() => handleTechFilterChange(tech)}
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 touch-manipulation ${
                selectedTechFilter === tech
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
              }`}
              aria-pressed={selectedTechFilter === tech}
              aria-label={`Filter projects by ${tech} technology`}
              style={{ minHeight: '36px' }}
            >
              {tech}
            </button>
          ))}
        </motion.div>

        {/* Projects Count */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-600">
            Showing {displayedProjects.length} of {sortedProjects.length} projects
            {sortedProjects.length !== projects.length && ` (filtered from ${projects.length} total)`}
          </p>
        </motion.div>

        {/* Enhanced Masonry Grid Layout with Staggered Animation */}
        <ProjectsGrid 
          projects={displayedProjects}
          onViewDetails={handleViewDetails}
        />

        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try selecting a different category to see more projects.</p>
          </motion.div>
        )}

        {/* Lazy Loading Trigger */}
        {visibleProjects < sortedProjects.length && (
          <div ref={loadMoreRef} className="text-center mt-12">
            <motion.div
              className="inline-flex items-center space-x-2 text-gray-600"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <span className="ml-2">Loading more projects...</span>
            </motion.div>
          </div>
        )}

        {/* Manual Load More Button (fallback) */}
        {visibleProjects < sortedProjects.length && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <button 
              onClick={() => setVisibleProjects(prev => Math.min(prev + 6, sortedProjects.length))}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`Load ${Math.min(6, sortedProjects.length - visibleProjects)} more projects`}
            >
              Load More Projects ({sortedProjects.length - visibleProjects} remaining)
            </button>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={closeModal} />
    </section>
  );
};

// Enhanced Projects Grid with Staggered Animation
const ProjectsGrid: React.FC<{
  projects: Project[];
  onViewDetails: (project: Project) => void;
}> = ({ projects, onViewDetails }) => {
  const { containerRef, getItemAnimation } = useStaggeredAnimation(
    projects.length,
    { stagger: 0.1, duration: 0.6, threshold: 0.1 }
  );

  return (
    <div 
      ref={containerRef}
      className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-6 lg:gap-8 space-y-4 sm:space-y-6 lg:space-y-8 px-4"
      role="list"
      aria-label="Projects gallery"
    >
      <AnimatePresence mode="wait">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="break-inside-avoid mb-4 sm:mb-6 lg:mb-8 mobile-card"
            initial={getItemAnimation(index).initial}
          animate={getItemAnimation(index).animate}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
            type: 'spring' as const,
            stiffness: 100,
            damping: 15
          }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            role="listitem"
          >
            <ProjectCard
              project={project}
              onViewDetails={onViewDetails}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Projects;