import { ArrowUp, Mail } from 'lucide-react';
import { site } from '../data/portfolio.js';
import { GithubIcon, LinkedinIcon } from './Icons.jsx';

export default function Footer() {
  const linkClass = 'rounded-md p-2 text-muted transition-colors hover:text-fg';

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-10 sm:px-8 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold text-fg">{site.name}</p>
          <p className="mt-1 text-sm text-muted">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>

        <div className="flex items-center gap-1">
          <a href={site.github} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label="GitHub profile">
            <GithubIcon />
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label="LinkedIn profile">
            <LinkedinIcon />
          </a>
          <a href={`mailto:${site.email}`} className={linkClass} aria-label={`Email ${site.email}`}>
            <Mail className="h-5 w-5" />
          </a>
          <a href="#home" className="btn btn-secondary ml-3 !py-2">
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
