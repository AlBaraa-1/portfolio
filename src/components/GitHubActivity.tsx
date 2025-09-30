import React, { useEffect, useState } from 'react';
import { GitBranch, Star, GitCommitVertical as GitCommit, Calendar } from 'lucide-react';

interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  language: string;
  updated: string;
  url: string;
}

interface GitHubStats {
  repos: number;
  stars: number;
  followers: number;
}

const GitHubActivity: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const username = 'AlBaraa-1';

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        ]);

        if (userRes.ok && reposRes.ok) {
          const userData = await userRes.json();
          const reposData = await reposRes.json();

          setStats({
            repos: userData.public_repos,
            stars: reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0),
            followers: userData.followers
          });

          setRepos(
            reposData.map((repo: any) => ({
              name: repo.name,
              description: repo.description || 'No description available',
              stars: repo.stargazers_count,
              language: repo.language || 'Unknown',
              updated: new Date(repo.updated_at).toLocaleDateString(),
              url: repo.html_url
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-current border-r-transparent"
             style={{ color: 'var(--accent)' }}></div>
        <p className="mt-4" style={{ color: 'var(--text-secondary)' }}>Loading GitHub activity...</p>
      </div>
    );
  }

  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="terminal-prompt" style={{ color: 'var(--accent)' }}>
              GitHub Activity
            </span>
          </h2>
          <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
            Live feed from my GitHub repositories
          </p>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl border transition-all duration-300 hover:scale-105"
                 style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3 mb-2">
                <GitBranch className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {stats.repos}
                </h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Public Repositories</p>
            </div>

            <div className="p-6 rounded-xl border transition-all duration-300 hover:scale-105"
                 style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {stats.stars}
                </h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total Stars</p>
            </div>

            <div className="p-6 rounded-xl border transition-all duration-300 hover:scale-105"
                 style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3 mb-2">
                <GitCommit className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {stats.followers}
                </h3>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Followers</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <div
              key={repo.name}
              className="p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
              onClick={() => window.open(repo.url, '_blank')}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold flex-1" style={{ color: 'var(--text-primary)' }}>
                  {repo.name}
                </h3>
                {repo.stars > 0 && (
                  <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--accent)' }}>
                    <Star className="w-4 h-4" />
                    {repo.stars}
                  </div>
                )}
              </div>

              <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                {repo.description}
              </p>

              <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--accent)' }}></span>
                  {repo.language}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {repo.updated}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => window.open(`https://github.com/${username}`, '_blank')}
            className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            View Full Profile on GitHub
          </button>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
