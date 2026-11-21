import { motion } from 'framer-motion';
import { ArrowDown, FileText, Mail } from 'lucide-react';
import { site, hireMeLink } from '../data/portfolio.js';
import { GithubIcon, LinkedinIcon } from '../components/Icons.jsx';
import Avatar from '../components/Avatar.jsx';

// The one orchestrated motion on the page: a short staggered entrance on load.
const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-36">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pb-20 sm:px-8 sm:pb-28 lg:grid-cols-[1.35fr_1fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Open to entry-level software roles
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={item}
            className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m {site.shortName}
          </motion.h1>

          <motion.p variants={item} className="mt-3 font-display text-xl font-medium text-accent sm:text-2xl">
            {site.role}, building full-stack and AI projects
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl leading-relaxed text-muted">
            I&apos;m a Computer Engineering undergraduate at GEC Rajkot who builds practical things with code: a RAG
            chatbot that cites the page behind each answer, a food delivery site backed by Java and MongoDB, and data
            analysis that turns raw campaign data into clear charts.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <a href={hireMeLink} className="btn btn-primary">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Hire me
            </a>
            <a href="#projects" className="btn btn-secondary">
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
              View projects
            </a>
            <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <FileText className="h-4 w-4" aria-hidden="true" />
              View resume
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-2">
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-muted transition-colors hover:text-fg" aria-label="GitHub profile">
              <GithubIcon className="h-6 w-6" />
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-muted transition-colors hover:text-fg" aria-label="LinkedIn profile">
              <LinkedinIcon className="h-6 w-6" />
            </a>
            <a href={`mailto:${site.email}`} className="ml-2 text-sm text-muted transition-colors hover:text-fg">
              {site.email}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
        >
          <Avatar />
        </motion.div>
      </div>
    </section>
  );
}
