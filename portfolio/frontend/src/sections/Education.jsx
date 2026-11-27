import { GraduationCap, Briefcase, Award } from 'lucide-react';
import Section from '../components/Section.jsx';
import { education, internships, certifications } from '../data/portfolio.js';

function Timeline({ icon: Icon, heading, children }) {
  return (
    <div>
      <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold text-fg">
        <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
        {heading}
      </h3>
      <ol className="mt-6 space-y-6 border-l border-line pl-6">{children}</ol>
    </div>
  );
}

export default function Education() {
  return (
    <Section
      id="education"
      title="Education and experience"
      intro="Academic record, hands-on training and certifications."
      className="border-t border-line bg-surface/40"
    >
      <div className="grid gap-14 lg:grid-cols-2">
        <Timeline icon={GraduationCap} heading="Education">
          {education.map((item) => (
            <li key={item.title} className="relative">
              <span className="absolute -left-[1.85rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-ink" aria-hidden="true" />
              <p className="text-sm text-muted">{item.period}</p>
              <h4 className="mt-1 font-semibold text-fg">{item.title}</h4>
              <p className="text-sm text-muted">{item.place}</p>
              <p className="mt-1 text-sm font-medium text-accent">{item.note}</p>
            </li>
          ))}
        </Timeline>

        <Timeline icon={Briefcase} heading="Internships and training">
          {internships.map((item) => (
            <li key={item.place} className="relative">
              <span className="absolute -left-[1.85rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-ink" aria-hidden="true" />
              <p className="text-sm text-muted">{item.period}</p>
              <h4 className="mt-1 font-semibold text-fg">{item.place}</h4>
              <p className="text-sm text-muted">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
              {item.tech.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </Timeline>
      </div>

      <div className="mt-16">
        <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold text-fg">
          <Award className="h-5 w-5 text-accent" aria-hidden="true" />
          Certifications and events
        </h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {certifications.map((cert) => (
            <li key={cert.title} className="card flex items-start justify-between gap-4 p-5">
              <div>
                <p className="font-medium text-fg">{cert.title}</p>
                <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
              </div>
              <span className="shrink-0 text-sm text-muted">{cert.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
