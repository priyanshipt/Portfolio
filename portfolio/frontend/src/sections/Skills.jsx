import Section from '../components/Section.jsx';
import { skillGroups } from '../data/portfolio.js';

export default function Skills() {
  return (
    <Section
      id="skills"
      title="Technical skills"
      intro="The tools I have used in my projects and coursework, grouped by what I use them for."
      className="border-y border-line bg-surface/40"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title} className="card p-6">
            <h3 className="font-display text-lg font-semibold text-fg">{group.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li key={skill} className="chip !text-fg/90">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
