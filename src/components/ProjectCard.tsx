import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../types';
import LazyImage from './LazyImage';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

// Technology color mapping for consistent styling
const getTechnologyColor = (tech: string): string => {
  const colorMap: Record<string, string> = {
    'React': 'bg-blue-100 text-blue-800',
    'TypeScript': 'bg-blue-100 text-blue-700',
    'JavaScript': 'bg-yellow-100 text-yellow-800',
    'Node.js': 'bg-green-100 text-green-800',
    'Python': 'bg-green-100 text-green-700',
    'Express': 'bg-gray-100 text-gray-800',
    'MongoDB': 'bg-green-100 text-green-700',
    'PostgreSQL': 'bg-blue-100 text-blue-700',
    'MySQL': 'bg-orange-100 text-orange-800',
    'Redis': 'bg-red-100 text-red-800',
    'Docker': 'bg-blue-100 text-blue-600',
    'AWS': 'bg-orange-100 text-orange-700',
    'Tailwind CSS': 'bg-cyan-100 text-cyan-800',
    'CSS3': 'bg-blue-100 text-blue-600',
    'HTML5': 'bg-orange-100 text-orange-700',
    'Next.js': 'bg-gray-100 text-gray-800',
    'Vue.js': 'bg-green-100 text-green-700',
    'Angular': 'bg-red-100 text-red-700',
    'Socket.io': 'bg-gray-100 text-gray-700',
    'GraphQL': 'bg-pink-100 text-pink-800',
    'JWT': 'bg-purple-100 text-purple-800',
    'Stripe': 'bg-purple-100 text-purple-700',
    'Framer Motion': 'bg-pink-100 text-pink-700',
    'Chart.js': 'bg-orange-100 text-orange-700',
    'Prisma': 'bg-indigo-100 text-indigo-800',
    'Flask': 'bg-gray-100 text-gray-700',
    'Django': 'bg-green-100 text-green-800',
    'Scikit-learn': 'bg-orange-100 text-orange-700',
    'TensorFlow': 'bg-orange-100 text-orange-800',
    'Pandas': 'bg-blue-100 text-blue-700',
    'NumPy': 'bg-blue-100 text-blue-600',
    'Kubernetes': 'bg-blue-100 text-blue-700',
    'Nginx': 'bg-green-100 text-green-700',
    'Prometheus': 'bg-orange-100 text-orange-700',
    'Jupyter': 'bg-orange-100 text-orange-600',
    'Matplotlib': 'bg-blue-100 text-blue-600',
    'Cloudinary': 'bg-blue-100 text-blue-700',
    'PWA': 'bg-purple-100 text-purple-700',
    'Vercel': 'bg-gray-100 text-gray-800',
    'Netlify': 'bg-teal-100 text-teal-800',
    'Heroku': 'bg-purple-100 text-purple-700',
    'NextAuth.js': 'bg-gray-100 text-gray-700',
    'Vite': 'bg-purple-100 text-purple-700',
    'Local Storage': 'bg-gray-100 text-gray-600',
    'Geolocation API': 'bg-blue-100 text-blue-600',
    'OpenWeather API': 'bg-blue-100 text-blue-700'
  };
  
  return colorMap[tech] || 'bg-gray-100 text-gray-700';
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleImageLoad = () => {
    // Image loaded successfully
  };

  const handleImageError = () => {
    // Handle image error
  };

  return (
    <motion.article
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-labelledby={`project-title-${project.id}`}
      aria-describedby={`project-description-${project.id}`}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            Featured
          </span>
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <motion.div
          className="w-full h-full transition-transform duration-500 group-hover:scale-110"
        >
          <LazyImage
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </motion.div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <div className="text-center space-y-4">
            <motion.button
              onClick={() => onViewDetails(project)}
              className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View details for ${project.title} project`}
            >
              View Details
            </motion.button>
            
            <div className="flex space-x-3 justify-center">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`View live demo of ${project.title} (opens in new tab)`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              )}
              
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`View source code for ${project.title} on GitHub (opens in new tab)`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Project Title and Category */}
        <div className="flex items-start justify-between mb-3">
          <h3 
            id={`project-title-${project.id}`}
            className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200"
            role="heading"
            aria-level={3}
          >
            {project.title}
          </h3>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium ml-2 whitespace-nowrap">
            {project.category}
          </span>
        </div>

        {/* Project Description */}
        <p 
          id={`project-description-${project.id}`}
          className="text-gray-600 text-sm mb-4 line-clamp-3"
        >
          {project.description}
        </p>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-md text-xs font-medium ${getTechnologyColor(tech)}`}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Project Timeline */}
        <div className="flex items-center text-xs text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date(project.startDate).toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
          })}
          {project.endDate && (
            <>
              {' - '}
              {new Date(project.endDate).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })}
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;