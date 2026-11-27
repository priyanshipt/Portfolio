import Section from '../components/Section.jsx';
import { about } from '../data/portfolio.js';

export default function About() {
  return (
    <Section id="about" title="About me" intro="From a diploma to a degree, one project at a time.">
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="max-w-prose space-y-5 leading-relaxed text-muted">
          {about.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>

        <dl className="card h-fit divide-y divide-line">
          {about.facts.map((fact) => (
            <div key={fact.label} className="p-5">
              <dt className="text-sm text-muted">{fact.label}</dt>
              <dd className="mt-1 font-medium text-fg">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
