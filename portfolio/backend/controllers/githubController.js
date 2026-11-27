import { env } from '../config/env.js';
import * as cache from '../utils/cache.js';

const TTL = 15 * 60 * 1000;
const CACHE_KEY = 'github-stats';

async function gh(path) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-api',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (env.github.token) headers.Authorization = `Bearer ${env.github.token}`;

  const response = await fetch(`https://api.github.com${path}`, {
    headers,
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`GitHub responded with ${response.status}`);
  return response.json();
}

async function buildStats() {
  const username = env.github.username;
  const [user, repos] = await Promise.all([
    gh(`/users/${username}`),
    gh(`/users/${username}/repos?per_page=100&sort=pushed&type=owner`),
  ]);

  // Forks are excluded so the language chart reflects code she wrote.
  const own = repos.filter((repo) => !repo.fork);

  const counts = {};
  own.forEach((repo) => {
    if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
  });
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const languages = Object.entries(counts)
    .map(([name, count]) => ({ name, count, percent: total ? Math.round((count / total) * 100) : 0 }))
    .sort((a, b) => b.count - a.count);

  return {
    profile: {
      username: user.login,
      url: user.html_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
    },
    languages,
    repos: own.slice(0, 6).map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      url: repo.html_url,
      updatedAt: repo.pushed_at,
    })),
    fetchedAt: new Date().toISOString(),
  };
}

export async function getGithubStats(req, res, next) {
  try {
    const fresh = cache.getFresh(CACHE_KEY);
    if (fresh) return res.json(fresh);

    try {
      const stats = await buildStats();
      cache.set(CACHE_KEY, stats, TTL);
      return res.json(stats);
    } catch (error) {
      console.error('GitHub fetch failed:', error.message);
      const stale = cache.getStale(CACHE_KEY);
      if (stale) return res.json({ ...stale, stale: true });
      return res.status(503).json({ message: 'GitHub data is temporarily unavailable.' });
    }
  } catch (error) {
    return next(error);
  }
}
