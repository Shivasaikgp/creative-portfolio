import React, { useState } from 'react';
import type { Skill } from '../types';
import AnimatedProgressBar from './AnimatedProgressBar';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface SkillItemProps {
  skill: Skill;
  index: number;
  categoryColor: string;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, index, categoryColor }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  const getProficiencyLevel = (proficiency: number) => {
    if (proficiency >= 90) return { level: 'Expert', color: 'text-green-600' };
    if (proficiency >= 75) return { level: 'Advanced', color: 'text-blue-600' };
    if (proficiency >= 60) return { level: 'Intermediate', color: 'text-yellow-600' };
    return { level: 'Beginner', color: 'text-gray-600' };
  };

  const proficiencyInfo = getProficiencyLevel(skill.proficiency);

  return (
    <div 
      ref={elementRef}
      className={`group relative transform transition-all duration-700 ${
        isIntersecting 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-4 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      onFocus={() => setShowDetails(true)}
      onBlur={() => setShowDetails(false)}
      role="listitem"
      tabIndex={0}
      aria-label={`${skill.name} skill: ${skill.proficiency}% proficiency, ${skill.yearsOfExperience} years experience`}
    >
      {/* Main Skill Display */}
      <div className="flex flex-col gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer hover:shadow-md border border-transparent hover:border-gray-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-2xl transform transition-transform duration-300 group-hover:scale-110">
                {skill.icon}
              </span>
            </div>
            <div>
              <h4 
                className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors"
                role="heading"
                aria-level={4}
              >
                {skill.name}
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className={`${proficiencyInfo.color} font-medium`}>
                  {proficiencyInfo.level}
                </span>
                <span>•</span>
                <span>{skill.yearsOfExperience}y exp</span>
              </div>
            </div>
          </div>
          
          {/* Proficiency Badge */}
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900 mb-1">
              {skill.proficiency}%
            </div>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <AnimatedProgressBar
          percentage={skill.proficiency}
          color={categoryColor}
          delay={index * 150}
          duration={1200}
          height="h-2"
          showPercentage={false}
          className="mt-2"
          aria-label={`${skill.name} proficiency: ${skill.proficiency}%`}
        />
      </div>

      {/* Detailed Information Tooltip */}
      {showDetails && (
        <div className="absolute left-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{skill.icon}</span>
            <h5 className="font-semibold text-gray-900">{skill.name}</h5>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Proficiency:</span>
              <span className={`font-medium ${proficiencyInfo.color}`}>
                {skill.proficiency}% ({proficiencyInfo.level})
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Experience:</span>
              <span className="font-medium text-gray-900">
                {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Related Projects */}
          {skill.relatedProjects.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <h6 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Related Projects
              </h6>
              <div className="flex flex-wrap gap-1">
                {skill.relatedProjects.slice(0, 3).map((project, idx) => (
                  <span 
                    key={idx}
                    className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                  >
                    {project}
                  </span>
                ))}
                {skill.relatedProjects.length > 3 && (
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-md">
                    +{skill.relatedProjects.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Tooltip Arrow */}
          <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default SkillItem;