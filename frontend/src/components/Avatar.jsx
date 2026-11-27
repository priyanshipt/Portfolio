import { useState } from 'react';
import { site } from '../data/portfolio.js';

/**
 * Profile photo slot.
 * To use a real photo: save it as  frontend/public/profile.jpg  (portrait, ideally 800x1000).
 * No code changes needed. Until the file exists, the placeholder below is shown.
 * The frame keeps a fixed 4:5 ratio, so the layout never shifts.
 */
export default function Avatar() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px]">
      {/* offset outline frame */}
      <div
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-accent/40"
        aria-hidden="true"
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface">
        {!failed ? (
          <img
            src="/profile.jpg"
            alt={`Portrait of ${site.shortName}`}
            width="800"
            height="1000"
            fetchpriority="high"
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-raised to-surface"
            role="img"
            aria-label="Profile photo placeholder"
          >
            <span className="font-display text-7xl font-semibold tracking-tight text-accent/90">
              {site.initials}
            </span>
            <span className="mt-3 text-xs text-muted">Photo coming soon</span>
          </div>
        )}
      </div>
    </div>
  );
}
