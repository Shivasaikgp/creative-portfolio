import { motion } from 'framer-motion';
import { Section } from './';
import { useIntersectionObserver } from '../hooks';
import type { Education as EducationType, Certification, LeadershipPosition } from '../types';

interface EducationProps {
  education: EducationType;
  certifications: Certification[];
  leadershipPositions?: LeadershipPosition[];
}

const Education: React.FC<EducationProps> = ({ education, certifications, leadershipPositions = [] }) => {
  const { elementRef: ref, isIntersecting: isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  };

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'Professional': return 'from-purple-500 to-purple-700';
      case 'Expert': return 'from-red-500 to-red-700';
      case 'Specialist': return 'from-blue-500 to-blue-700';
      default: return 'from-green-500 to-green-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Professional': return 'from-blue-500 to-blue-700';
      case 'Community': return 'from-green-500 to-green-700';
      default: return 'from-purple-500 to-purple-700';
    }
  };

  return (
    <Section id="education" title="Education & Achievements" background="alternate">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-6xl mx-auto"
      >
        {/* Main Education Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-slate-200 hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Institution Logo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center p-4 shadow-lg">
                <img
                  src={education.logo}
                  alt={`${education.institution} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Education Details */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
                {education.degree}
              </h3>
              <p className="text-xl text-blue-600 font-semibold mb-2">
                {education.institution}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-4">
                <span className="text-slate-600 font-medium">{education.year}</span>
                {education.gpa && (
                  <>
                    <span className="hidden sm:block text-slate-400">•</span>
                    <span className="text-slate-600 font-medium">
                      CGPA: <span className="text-green-600 font-bold">{education.gpa}</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <h4 className="text-xl font-bold text-slate-800 mb-6 text-center lg:text-left">
              Academic Achievements & Leadership
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {education.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:border-blue-200 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-slate-700 text-sm leading-relaxed">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Leadership Positions Section */}
        {leadershipPositions.length > 0 && (
          <motion.div variants={itemVariants} className="mb-12">
            <h4 className="text-2xl font-bold text-slate-800 mb-8 text-center">
              Leadership & Positions of Responsibility
            </h4>
            <div className="space-y-6">
              {leadershipPositions.map((position, index) => (
                <motion.div
                  key={index}
                  variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(position.type)} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {position.type === 'Academic' ? '🎓' : position.type === 'Professional' ? '💼' : '🌟'}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h5 className="text-xl font-bold text-slate-800 mb-1 sm:mb-0">
                          {position.title}
                        </h5>
                        <span className="text-sm text-slate-500 font-medium">
                          {position.duration}
                        </span>
                      </div>
                      <p className="text-blue-600 font-semibold mb-3">{position.organization}</p>
                      <p className="text-slate-600 mb-4 leading-relaxed">{position.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {position.achievements.map((achievement, achIndex) => (
                          <motion.div
                            key={achIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: achIndex * 0.1 }}
                            className="flex items-start gap-2 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200"
                          >
                            <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                            <p className="text-slate-700 text-sm leading-relaxed">{achievement}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Certifications Section */}
        <motion.div variants={itemVariants}>
          <h4 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            Professional Certifications
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {cert.badge && (
                        <span className="text-2xl">{cert.badge}</span>
                      )}
                      <span className={`px-2 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${getLevelColor(cert.level)}`}>
                        {cert.level || 'Certified'}
                      </span>
                    </div>
                    <h5 className="font-bold text-slate-800 text-sm leading-tight mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {cert.name}
                    </h5>
                    <p className="text-blue-600 font-medium text-sm mb-1">{cert.issuer}</p>
                    <p className="text-slate-500 text-xs">
                      {new Date(cert.date).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-3">
                    <motion.div 
                      className={`w-10 h-10 bg-gradient-to-br ${getLevelColor(cert.level)} rounded-lg flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
                
                {cert.credentialUrl && (
                  <motion.a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 group-hover:translate-x-1"
                    whileHover={{ x: 4 }}
                  >
                    View Credential
                    <motion.svg 
                      className="w-3 h-3 ml-1" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      whileHover={{ x: 2 }}
                    >
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </motion.svg>
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default Education;