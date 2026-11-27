import { Star } from 'lucide-react';
import Section from '../components/Section.jsx';
import { GithubIcon } from '../components/Icons.jsx';
import useInView from '../hooks/useInView.js';
import useGithubStats from '../hooks/useGithubStats.js';
import { site } from '../data/portfolio.js';

function Stat({ label, value }) {
  return (
    <div className="card p-5">
      <p className="font-display text-3xl font-semibold text-fg">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid animate-pulse gap-5 lg:grid-cols-3" aria-hidden="true">
      <div className="card h-28" />
      <div className="card h-28" />
      <div className="card h-28" />
      <div className="card h-48 lg:col-span-3" />
    </div>
  );
}

export default function GithubActivity() {
  const [ref, inView] = useInView();
  const { status, data } = useGithubStats(inView);

  return (
    <Section
      id="github"
      title="GitHub"
      intro="Live numbers from my public GitHub profile."
      className="border-t border-line"
    >
      <div ref={ref} aria-live="polite">
        {(status === 'idle' || status === 'loading') && <Skeleton />}

        {status === 'error' && (
          <div className="card p-6">
            <p className="text-fg">Live GitHub stats are not available right now.</p>
            <p className="mt-1 text-sm text-muted">You can still see everything on my profile.</p>
          </div>
        )}

        {status === 'success' && data && (
          <div className="grid gap-5 lg:grid-cols-3">
            <Stat label="Public repositories" value={data.profile.publicRepos} />
            <Stat label="Followers" value={data.profile.followers} />
            <Stat label="Following" value={data.profile.following} />

            {data.languages.length > 0 && (
              <div className="card p-6 lg:col-span-1">
                <h3 className="font-display text-lg font-semibold text-fg">Languages</h3>
                <p className="mt-1 text-sm text-muted">Share of my own repositories by main language.</p>
                <ul className="mt-5 space-y-3">
                  {data.languages.slice(0, 5).map((lang) => (
                    <li key={lang.name}>
                      <div className="flex justify-between text-sm">
                        <span className="text-fg">{lang.name}</span>
                        <span className="text-muted">{lang.percent}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-raised">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${lang.percent}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.repos.length > 0 && (
              <div className="card p-6 lg:col-span-2">
                <h3 className="font-display text-lg font-semibold text-fg">Recently active repositories</h3>
                <ul className="mt-4 divide-y divide-line">
                  {data.repos.slice(0, 4).map((repo) => (
                    <li key={repo.name} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-fg transition-colors hover:text-accent"
                          >
                            {repo.name}
                          </a>
                          {repo.description && (
                            <p className="mt-0.5 line-clamp-2 text-sm text-muted">{repo.description}</p>
                          )}
                        </div>
                        <div className="flex shrink-0 items-center gap-3 text-sm text-muted">
                          {repo.language && <span>{repo.language}</span>}
                          {repo.stars > 0 && (
                            <span className="inline-flex items-center gap-1">
                              <Star className="h-3.5 w-3.5" aria-hidden="true" />
                              {repo.stars}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8">
        <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          <GithubIcon className="h-4 w-4" />
          View GitHub profile
        </a>
      </div>
    </Section>
  );
}
