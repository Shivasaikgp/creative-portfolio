import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import Section from './Section';
import GitHubStats from './GitHubStats';
import GitHubContributionGraph from './GitHubContributionGraph';
import { useIntersectionObserver } from '../hooks';

const GitHubSection: React.FC = () => {
  const { elementRef: ref, isIntersecting: isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <Section
      id="github"
      title="Open Source Journey"
      className="py-20 bg-gradient-to-br from-slate-50 to-white"
      aria-label="GitHub Activity and Open Source Contributions"
    >
      <div className="container-responsive" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="p-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg">
              <Github className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gradient">
              Open Source Journey
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Passionate about contributing to the open source community and building projects that make a difference. 
            Here's a glimpse into my coding activity and the projects I've been working on.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8"
          >
            <a
              href="https://github.com/Shivasaikgp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              <Github className="w-5 h-5" />
              Visit GitHub Profile
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* GitHub Statistics */}
          <motion.div variants={itemVariants}>
            <GitHubStats className="mb-12" />
          </motion.div>

          {/* GitHub Contribution Graph */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <GitHubContributionGraph />
            </div>
          </motion.div>

          {/* Additional GitHub Insights */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Active Developer</h3>
              <p className="text-slate-600 text-sm">
                Consistently contributing to open source projects and maintaining personal repositories
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Collaborative</h3>
              <p className="text-slate-600 text-sm">
                Engaging with the developer community through code reviews and discussions
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Innovative</h3>
              <p className="text-slate-600 text-sm">
                Building creative solutions and experimenting with cutting-edge technologies
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default GitHubSection;