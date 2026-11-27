export default function Section({ id, title, intro, children, className = '' }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <header className="mb-12 max-w-2xl">
          <h2
            id={`${id}-title`}
            className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
          >
            {title}
          </h2>
          {intro && <p className="mt-4 leading-relaxed text-muted">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
