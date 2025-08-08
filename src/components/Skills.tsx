import React from 'react';
import { motion } from 'framer-motion';
import type { SkillCategory } from '../types';
import SkillCategoryCard from './SkillCategoryCard';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useStaggeredAnimation } from '../hooks/useScrollAnimation';
import { FloatingShapes } from './ParallaxContainer';

interface SkillsProps {
  skillCategories: SkillCategory[];
}

const Skills: React.FC<SkillsProps> = ({ skillCategories }) => {
  const { elementRef: headerRef, isIntersecting: headerVisible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  const { elementRef: summaryRef, isIntersecting: summaryVisible } = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true
  });

  return (
    <section 
      id="skills" 
      className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden"
      aria-label="Technical skills and expertise"
    >
      {/* Enhanced Background with Floating Shapes */}
      <FloatingShapes className="opacity-60" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transform transition-all duration-1000 ${
            headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            role="heading"
            aria-level={2}
          >
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise across different domains, 
            built through years of hands-on experience and continuous learning.
          </p>
        </div>

        {/* Skills Grid - Enhanced with Staggered Animations */}
        <SkillsGrid skillCategories={skillCategories} />

        {/* Skills Summary with Animation */}
        <div 
          ref={summaryRef}
          className={`mt-16 text-center transform transition-all duration-1000 delay-500 ${
            summaryVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20">
            <span className="text-2xl font-bold text-blue-600 tabular-nums">
              {skillCategories.reduce((total, cat) => total + cat.skills.length, 0)}+
            </span>
            <span className="text-gray-700 font-medium">Technologies Mastered</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Separate component for staggered skills grid animation
const SkillsGrid: React.FC<{ skillCategories: SkillCategory[] }> = ({ skillCategories }) => {
  const { containerRef, getItemAnimation } = useStaggeredAnimation(
    skillCategories.length,
    { stagger: 0.15, duration: 0.8, threshold: 0.1 }
  );

  return (
    <div 
      ref={containerRef}
      className="mobile-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
    >
      {skillCategories.map((category, index) => (
        <motion.div 
          key={category.category}
          className={`${
            skillCategories.length === 5 && index >= 3 
              ? 'sm:col-span-2 lg:col-span-1 xl:col-span-1' 
              : ''
          }`}
          initial={getItemAnimation(index).initial}
          animate={getItemAnimation(index).animate}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
            type: 'spring' as const,
            stiffness: 100,
            damping: 15
          }}
        >
          <SkillCategoryCard
            category={category}
            index={index}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Skills;