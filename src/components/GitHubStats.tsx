import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { githubService, type GitHubStats as GitHubStatsType, type GitHubRepo } from '../services/github';
import AnimatedCounter from './AnimatedCounter';

interface GitHubStatsProps {
  className?: string;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({ className = '' }) => {
  const [stats, setStats] = useState<GitHubStatsType | null>(null);
  const [featuredRepos, setFeaturedRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const [statsData, reposData] = await Promise.all([
          githubService.fetchGitHubStats(),
          githubService.getFeaturedRepositories()
        ]);
        setStats(statsData);
        setFeaturedRepos(reposData);
      } catch (err) {
        setError('Failed to load GitHub data');
        console.error('Error fetching GitHub data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const getLanguageColor = (language: string): string => {
    const colors: { [key: string]: string } = {
      'TypeScript': 'bg-blue-500',
      'JavaScript': 'bg-yellow-500',
      'Python': 'bg-green-500',
      'Java': 'bg-red-500',
      'CSS': 'bg-purple-500',
      'HTML': 'bg-orange-500',
      'Shell': 'bg-gray-500',
      'Go': 'bg-cyan-500',
      'Rust': 'bg-orange-600',
      'C++': 'bg-pink-500'
    };
    return colors[language] || 'bg-slate-500';
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-slate-200 h-20 rounded-lg"></div>
            ))}
          </div>
          <div className="bg-slate-200 h-40 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className={`${className}`}>
        <div className="text-red-500 text-sm">{error || 'No data available'}</div>
      </div>
    );
  }

  const topLanguages = Object.entries(stats.topLanguages);
  const totalLanguageSize = topLanguages.reduce((sum, [, size]) => sum + size, 0);

  return (
    <div className={`${className}`}>
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            <AnimatedCounter value={stats.totalCommits} duration={2} />
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Total Commits</div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            <AnimatedCounter value={stats.totalRepos} duration={2} />
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Public Repos</div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            <AnimatedCounter value={stats.totalStars} duration={2} />
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Total Stars</div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            <AnimatedCounter value={stats.totalForks} duration={2} />
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Total Forks</div>
        </motion.div>
      </div>

      {/* Language Distribution */}
      <motion.div
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Most Used Languages
        </h3>
        
        {/* Language bars */}
        <div className="space-y-3">
          {topLanguages.slice(0, 5).map(([language, size], index) => {
            const percentage = (size / totalLanguageSize) * 100;
            return (
              <div key={language} className="flex items-center">
                <div className="w-20 text-sm text-slate-600 dark:text-slate-400">
                  {language}
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${getLanguageColor(language)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 1 }}
                    />
                  </div>
                </div>
                <div className="w-12 text-sm text-slate-600 dark:text-slate-400 text-right">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Featured Repositories */}
      {featuredRepos.length > 0 && (
        <motion.div
          className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Featured Repositories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredRepos.slice(0, 4).map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 truncate">
                    {repo.name}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 ml-2">
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center">
                        ⭐ {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center">
                        🍴 {repo.forks_count}
                      </span>
                    )}
                  </div>
                </div>
                
                {repo.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {repo.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  {repo.language && (
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)} mr-2`} />
                      {repo.language}
                    </div>
                  )}
                  
                  {repo.homepage && (
                    <span className="text-xs text-blue-600 dark:text-blue-400">
                      Live Demo →
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <a
              href="https://github.com/Shivasaikgp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
            >
              View all repositories on GitHub →
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GitHubStats;