import React, { useState } from 'react';
import type { SkillCategory } from '../types';
import SkillItem from './SkillItem';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface SkillCategoryCardProps {
  category: SkillCategory;
  index: number;
}

const categoryColors = {
  Frontend: 'from-blue-500 to-purple-600',
  Backend: 'from-green-500 to-teal-600',
  Database: 'from-orange-500 to-red-600',
  DevOps: 'from-purple-500 to-pink-600',
  Tools: 'from-gray-500 to-slate-600'
};

const categoryIcons = {
  Frontend: '🎨',
  Backend: '⚙️',
  Database: '🗄️',
  DevOps: '🚀',
  Tools: '🛠️'
};

const SkillCategoryCard: React.FC<SkillCategoryCardProps> = ({ category, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  const gradientClass = categoryColors[category.category];
  const categoryIcon = categoryIcons[category.category];

  return (
    <div 
      ref={elementRef}
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden border border-gray-100 transform ${
        isIntersecting 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-8 opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
      role="region"
      aria-labelledby={`skill-category-${category.category.toLowerCase()}`}
    >
      {/* Category Header */}
      <div className={`bg-gradient-to-r ${gradientClass} p-6 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">{categoryIcon}</span>
            <div className="text-right">
              <div className="text-sm opacity-90">Skills</div>
              <div className="text-2xl font-bold">{category.skills.length}</div>
            </div>
          </div>
          <h3 
            id={`skill-category-${category.category.toLowerCase()}`}
            className="text-2xl font-bold mb-1"
            role="heading"
            aria-level={3}
          >
            {category.category}
          </h3>
          <p className="text-sm opacity-90">
            {category.category === 'Frontend' && 'User Interface & Experience'}
            {category.category === 'Backend' && 'Server-side Development'}
            {category.category === 'Database' && 'Data Storage & Management'}
            {category.category === 'DevOps' && 'Deployment & Infrastructure'}
            {category.category === 'Tools' && 'Development & Productivity'}
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full"></div>
      </div>

      {/* Skills List */}
      <div className="p-6">
        <div 
          className="space-y-4"
          id={`skills-list-${category.category.toLowerCase()}`}
          role="list"
          aria-label={`${category.category} skills`}
        >
          {category.skills.slice(0, isExpanded ? category.skills.length : 3).map((skill, skillIndex) => (
            <SkillItem
              key={skill.name}
              skill={skill}
              index={skillIndex}
              categoryColor={gradientClass}
            />
          ))}
        </div>

        {/* Expand/Collapse Button */}
        {category.skills.length > 3 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 w-full py-2 px-4 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-expanded={isExpanded}
            aria-controls={`skills-list-${category.category.toLowerCase()}`}
            aria-label={isExpanded ? `Hide additional ${category.category} skills` : `Show ${category.skills.length - 3} more ${category.category} skills`}
          >
            {isExpanded ? 'Show Less' : `Show ${category.skills.length - 3} More`}
          </button>
        )}

        {/* Category Stats */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Avg. Proficiency</span>
            <span className="font-semibold">
              {Math.round(category.skills.reduce((sum, skill) => sum + skill.proficiency, 0) / category.skills.length)}%
            </span>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
    </div>
  );
};

export default SkillCategoryCard;