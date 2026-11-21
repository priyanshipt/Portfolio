import Section from '../components/Section.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { projects, site } from '../data/portfolio.js';
import { GithubIcon } from '../components/Icons.jsx';

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      intro="Selected work from my resume and GitHub. Each card lists what I built and the technologies behind it."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-10">
        <a href={`${site.github}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          <GithubIcon className="h-4 w-4" />
          Browse all repositories
        </a>
      </div>
    </Section>
  );
}
