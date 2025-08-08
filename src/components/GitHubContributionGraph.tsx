import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { githubService, type GitHubContribution } from '../services/github';

interface GitHubContributionGraphProps {
  className?: string;
}

const GitHubContributionGraph: React.FC<GitHubContributionGraphProps> = ({ className = '' }) => {
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        const stats = await githubService.fetchGitHubStats();
        setContributions(stats.contributions);
      } catch (err) {
        setError('Failed to load contribution data');
        console.error('Error fetching contributions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const getLevelColor = (level: number): string => {
    const colors = {
      0: 'bg-slate-100 dark:bg-slate-800',
      1: 'bg-green-200 dark:bg-green-900',
      2: 'bg-green-300 dark:bg-green-700',
      3: 'bg-green-400 dark:bg-green-600',
      4: 'bg-green-500 dark:bg-green-500'
    };
    return colors[level as keyof typeof colors] || colors[0];
  };

  const getWeekData = (contributions: GitHubContribution[]) => {
    const weeks: GitHubContribution[][] = [];
    let currentWeek: GitHubContribution[] = [];

    contributions.forEach((contribution, index) => {
      const date = new Date(contribution.date);
      const dayOfWeek = date.getDay();

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentWeek.push(contribution);

      if (index === contributions.length - 1) {
        weeks.push(currentWeek);
      }
    });

    return weeks;
  };

  const getMonthLabels = (contributions: GitHubContribution[]) => {
    const months: { name: string; weekIndex: number }[] = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    contributions.forEach((contribution, index) => {
      const date = new Date(contribution.date);
      const weekIndex = Math.floor(index / 7);
      
      if (date.getDate() === 1 || (index === 0)) {
        months.push({
          name: monthNames[date.getMonth()],
          weekIndex
        });
      }
    });

    return months;
  };

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 rounded mb-4 w-48"></div>
          <div className="grid grid-cols-53 gap-1">
            {Array.from({ length: 371 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-slate-200 rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className}`}>
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    );
  }

  const weeks = getWeekData(contributions);
  const monthLabels = getMonthLabels(contributions);
  const totalContributions = contributions.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className={`${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
          GitHub Activity
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {totalContributions} contributions in the last year
        </p>
      </div>

      <div className="relative">
        {/* Month labels */}
        <div className="flex mb-2 text-xs text-slate-500 dark:text-slate-400">
          {monthLabels.map((month, index) => (
            <div
              key={index}
              className="absolute"
              style={{ left: `${month.weekIndex * 16}px` }}
            >
              {month.name}
            </div>
          ))}
        </div>

        {/* Day labels */}
        <div className="flex flex-col text-xs text-slate-500 dark:text-slate-400 mr-2 mt-6">
          <div className="h-3 flex items-center">Mon</div>
          <div className="h-3"></div>
          <div className="h-3 flex items-center">Wed</div>
          <div className="h-3"></div>
          <div className="h-3 flex items-center">Fri</div>
          <div className="h-3"></div>
          <div className="h-3 flex items-center">Sun</div>
        </div>

        {/* Contribution grid */}
        <div className="flex gap-1 mt-6 ml-8">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const contribution = week[dayIndex];
                return (
                  <motion.div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm ${
                      contribution 
                        ? getLevelColor(contribution.level)
                        : 'bg-slate-100 dark:bg-slate-800'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: weekIndex * 0.01 + dayIndex * 0.002,
                      duration: 0.2 
                    }}
                    whileHover={{ scale: 1.2 }}
                    title={
                      contribution
                        ? `${contribution.count} contributions on ${contribution.date}`
                        : `No contributions`
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-4 text-xs text-slate-500 dark:text-slate-400">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default GitHubContributionGraph;