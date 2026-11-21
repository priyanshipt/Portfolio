import { useEffect, useState } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { navLinks, site } from '../data/portfolio.js';
import useActiveSection from '../hooks/useActiveSection.js';

const ids = navLinks.map((link) => link.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const linkClass = (id) =>
    `rounded-md px-3 py-2 text-sm transition-colors ${
      active === id ? 'text-fg' : 'text-muted hover:text-fg'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line bg-ink/90 backdrop-blur' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <a href="#home" className="font-display text-lg font-semibold tracking-tight text-fg">
          {site.shortName}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={linkClass(link.id)}
                aria-current={active === link.id ? 'true' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-secondary !py-2">
              <FileText className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="rounded-md p-2 text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-ink md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`block ${linkClass(link.id)} !py-3 text-base`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full"
                onClick={() => setOpen(false)}
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                View resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
