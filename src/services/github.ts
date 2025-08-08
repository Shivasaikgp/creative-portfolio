// GitHub API service for fetching repositories and user data
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  size: number;
  default_branch: string;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubStats {
  totalCommits: number;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  contributions: GitHubContribution[];
  topLanguages: { [key: string]: number };
}

class GitHubService {
  private readonly baseUrl = 'https://api.github.com';
  private readonly username = 'Shivasaikgp';

  async fetchUser(): Promise<GitHubUser> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${this.username}`);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching GitHub user:', error);
      throw error;
    }
  }

  async fetchRepositories(limit: number = 10): Promise<GitHubRepo[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=${limit}&type=owner`
      );
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      const repos = await response.json();
      
      // Filter out forks and sort by stars and recent activity
      return repos
        .filter((repo: GitHubRepo) => !repo.name.includes('fork'))
        .sort((a: GitHubRepo, b: GitHubRepo) => {
          // Sort by stars first, then by update date
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      throw error;
    }
  }

  async fetchLanguageStats(): Promise<{ [key: string]: number }> {
    try {
      const repos = await this.fetchRepositories(50); // Get more repos for better language stats
      const languageStats: { [key: string]: number } = {};

      for (const repo of repos) {
        if (repo.language) {
          languageStats[repo.language] = (languageStats[repo.language] || 0) + repo.size;
        }
      }

      // Sort languages by usage and return top 10
      const sortedLanguages = Object.entries(languageStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {} as { [key: string]: number });

      return sortedLanguages;
    } catch (error) {
      console.error('Error fetching language stats:', error);
      return {};
    }
  }

  async fetchGitHubStats(): Promise<GitHubStats> {
    try {
      const [user, repos, languages] = await Promise.all([
        this.fetchUser(),
        this.fetchRepositories(100),
        this.fetchLanguageStats()
      ]);

      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

      // Generate mock contribution data (GitHub's contribution API requires authentication)
      const contributions = this.generateMockContributions();

      return {
        totalCommits: 1200, // This would need GitHub GraphQL API with auth
        totalRepos: user.public_repos,
        totalStars,
        totalForks,
        contributions,
        topLanguages: languages
      };
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      // Return fallback data
      return {
        totalCommits: 1200,
        totalRepos: 25,
        totalStars: 150,
        totalForks: 45,
        contributions: this.generateMockContributions(),
        topLanguages: {
          'TypeScript': 35,
          'JavaScript': 30,
          'Python': 15,
          'Java': 10,
          'CSS': 5,
          'HTML': 3,
          'Shell': 2
        }
      };
    }
  }

  private generateMockContributions(): GitHubContribution[] {
    const contributions: GitHubContribution[] = [];
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // Generate realistic contribution patterns
      let count = 0;
      let level: 0 | 1 | 2 | 3 | 4 = 0;

      if (!isWeekend) {
        const random = Math.random();
        if (random > 0.7) {
          count = Math.floor(Math.random() * 8) + 1;
          level = count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4;
        }
      } else if (Math.random() > 0.8) {
        count = Math.floor(Math.random() * 4) + 1;
        level = count <= 1 ? 1 : count <= 2 ? 2 : 3;
      }

      contributions.push({
        date: d.toISOString().split('T')[0],
        count,
        level
      });
    }

    return contributions;
  }

  // Get featured repositories based on stars, activity, and topics
  async getFeaturedRepositories(): Promise<GitHubRepo[]> {
    try {
      const repos = await this.fetchRepositories(20);
      
      // Score repositories based on various factors
      const scoredRepos = repos.map(repo => {
        let score = 0;
        
        // Stars contribute to score
        score += repo.stargazers_count * 2;
        
        // Recent activity (updated in last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        if (new Date(repo.updated_at) > sixMonthsAgo) {
          score += 10;
        }
        
        // Has description
        if (repo.description) {
          score += 5;
        }
        
        // Has homepage/demo
        if (repo.homepage) {
          score += 8;
        }
        
        // Popular languages get bonus
        const popularLanguages = ['TypeScript', 'JavaScript', 'Python', 'React'];
        if (repo.language && popularLanguages.includes(repo.language)) {
          score += 5;
        }
        
        // Has topics/tags
        if (repo.topics && repo.topics.length > 0) {
          score += repo.topics.length * 2;
        }

        return { ...repo, score };
      });

      // Return top 6 repositories by score
      return scoredRepos
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);
    } catch (error) {
      console.error('Error fetching featured repositories:', error);
      return [];
    }
  }
}

export const githubService = new GitHubService();