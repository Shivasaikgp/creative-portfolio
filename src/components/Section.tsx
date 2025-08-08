import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'alternate';
}

const Section: React.FC<SectionProps> = ({ 
  id, 
  title, 
  children, 
  className = '',
  background = 'default'
}) => {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      id={id}
      className={`relative py-12 sm:py-16 lg:py-24 ${
        background === 'alternate' 
          ? 'bg-white/50 backdrop-blur-sm' 
          : 'bg-transparent'
      } ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px 0px -100px 0px" }}
      variants={sectionVariants}
      role="region"
      aria-labelledby={title ? `${id}-heading` : undefined}
    >
      <div className="container-responsive">
        {/* Section Header */}
        {title && (
          <motion.div 
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            variants={childVariants}
          >
            <h2 
              id={`${id}-heading`}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-slate-900 mb-4"
            >
              {title}
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-500 mx-auto rounded-full" />
          </motion.div>
        )}

        {/* Section Content */}
        <motion.div
          variants={childVariants}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Section;