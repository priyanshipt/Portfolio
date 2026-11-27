import { Bot, BarChart3, UtensilsCrossed, PenLine, Ship, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons.jsx';

const icons = { bot: Bot, chart: BarChart3, food: UtensilsCrossed, pen: PenLine, ship: Ship };

function Thumbnail({ project, tall }) {
  const Icon = icons[project.icon] || Bot;
  const height = tall ? 'h-48 lg:h-full lg:min-h-[18rem]' : 'h-40';

  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        loading="lazy"
        className={`${height} w-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${height} relative flex w-full items-center justify-center overflow-hidden bg-raised`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(#223049 1px, transparent 1px), linear-gradient(90deg, #223049 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface text-accent">
        <Icon className="h-8 w-8" strokeWidth={1.5} />
      </div>
    </div>
  );
}

export default function ProjectCard({ project }) {
  const { featured } = project;

  return (
    <article
      className={`card group flex overflow-hidden transition-colors duration-200 hover:border-accent/50 ${
        featured ? 'flex-col lg:col-span-2 lg:flex-row' : 'flex-col'
      }`}
    >
      <div className={featured ? 'lg:w-2/5 lg:shrink-0' : ''}>
        <Thumbnail project={project} tall={featured} />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-xl font-semibold tracking-tight text-fg">{project.title}</h3>
          {featured && <span className="rounded-md bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">Featured</span>}
          {project.badge && <span className="chip">{project.badge}</span>}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-4 space-y-2 text-sm text-fg/90">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-2.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tech.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        {(project.repos.length > 0 || project.demo) && (
          <div className="mt-6 flex flex-wrap gap-3 pt-1">
            {project.repos.map((repo) => (
              <a
                key={repo.href}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary !py-2"
              >
                <GithubIcon className="h-4 w-4" />
                {repo.label}
              </a>
            ))}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary !py-2">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Live demo
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
