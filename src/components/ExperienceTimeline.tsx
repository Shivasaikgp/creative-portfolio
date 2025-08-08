import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import AnimatedCounter from './AnimatedCounter';
import type { Experience } from '../types';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  index,
  isExpanded,
  onToggleExpand
}) => {
  const isEven = index % 2 === 0;
  const { elementRef: ref, isIntersecting: isVisible } = useIntersectionObserver({ threshold: 0.2 });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                   (end.getMonth() - start.getMonth());
    
    if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    }
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    }
    
    return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center mb-8 md:mb-16 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col md:flex-row`}
    >
      {/* Timeline line connector - Desktop */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-blue-500 to-orange-500 opacity-30 hidden md:block" />
      
      {/* Timeline line connector - Mobile */}
      <div className="absolute left-6 top-0 w-px h-full bg-gradient-to-b from-blue-500 to-orange-500 opacity-30 md:hidden" />
      
      {/* Timeline dot - Desktop */}
      <motion.div 
        className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 hidden md:block"
        animate={isVisible ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Timeline dot - Mobile */}
      <motion.div 
        className="absolute left-4 top-8 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 md:hidden"
        animate={isVisible ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Experience Card */}
      <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8'} px-4 md:px-0`}>
        <motion.div
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
          onClick={onToggleExpand}
        >
          {/* Card Header */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-orange-50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <img
                    src={experience.companyLogo}
                    alt={`${experience.company} logo`}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/profile-placeholder.jpeg';
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {experience.role}
                  </h3>
                  <p className="text-blue-600 font-semibold">
                    {experience.company}
                  </p>
                </div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p className="font-medium">
                  {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                </p>
                <p className="text-xs">
                  {calculateDuration(experience.startDate, experience.endDate)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {experience.location}
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              {experience.description}
            </p>
          </div>

          {/* Achievements Section */}
          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h4>
            <div className="space-y-3">
              {experience.achievements.slice(0, isExpanded ? undefined : 2).map((achievement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                    {achievement.impact && (
                      <div className="mt-2 flex items-center space-x-2">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          {achievement.impact}
                        </span>
                        {achievement.metrics && typeof achievement.metrics === 'number' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={isVisible ? { scale: 1 } : { scale: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1, duration: 0.3 }}
                            className="text-lg font-bold text-blue-600"
                          >
                            <AnimatedCounter
                              value={achievement.metrics}
                              isVisible={isVisible}
                              suffix={achievement.impact.includes('%') ? '%' : achievement.impact.includes('DAU') ? '+' : ''}
                              decimals={achievement.metrics % 1 !== 0 ? 1 : 0}
                            />
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Expand/Collapse Button */}
            {experience.achievements.length > 2 && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
              >
                <span>{isExpanded ? 'Show Less' : `Show ${experience.achievements.length - 2} More`}</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
            )}

            {/* Technologies */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-6 pt-4 border-t border-gray-100"
              >
                <h5 className="text-sm font-semibold text-gray-900 mb-3">Technologies Used</h5>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05, duration: 0.2 }}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full hover:bg-blue-200 transition-colors duration-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experiences }) => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCardExpansion = (experienceId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(experienceId)) {
        newSet.delete(experienceId);
      } else {
        newSet.add(experienceId);
      }
      return newSet;
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A journey through my professional career, showcasing growth, achievements, and the impact I've made at each step.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Main timeline line - Desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 opacity-20 hidden md:block" />
          
          {/* Main timeline line - Mobile */}
          <div className="absolute left-6 top-0 w-px h-full bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 opacity-20 md:hidden" />
          
          {/* Experience Cards */}
          <div className="space-y-0 pl-16 md:pl-0">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                isExpanded={expandedCards.has(experience.id)}
                onToggleExpand={() => toggleCardExpansion(experience.id)}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Interested in working together? Let's discuss how I can contribute to your team.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get In Touch
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;