interface EmptyStateProps {
  title?: string;
  description?: string;
  message?: string;
}

export function EmptyState({
  title,
  description,
  message
}: EmptyStateProps) {
  const displayTitle = title || (message ? 'Nothing here yet' : 'No data available');
  const displayDescription = description || message || 'There are no items to display at this time.';

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-[80px]">
      <div className="flex flex-col items-center gap-[28px] max-w-[360px]">

        {/* Illustration */}
        <svg
          width="180"
          height="160"
          viewBox="0 0 180 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Shadow ellipse */}
          <ellipse cx="90" cy="148" rx="52" ry="8" fill="currentColor" style={{ color: 'var(--border)', opacity: 0.5 }} />

          {/* Back document */}
          <rect x="54" y="28" width="84" height="104" rx="10" fill="currentColor" style={{ color: 'var(--border-interactive)' }} />
          <rect x="54" y="28" width="84" height="104" rx="10" stroke="currentColor" style={{ color: 'var(--border-interactive-hover)' }} strokeWidth="1.5" />
          {/* Lines on back doc */}
          <rect x="68" y="50" width="42" height="6" rx="3" fill="currentColor" style={{ color: 'var(--muted-foreground)', opacity: 0.25 }} />
          <rect x="68" y="62" width="54" height="6" rx="3" fill="currentColor" style={{ color: 'var(--muted-foreground)', opacity: 0.2 }} />
          <rect x="68" y="74" width="34" height="6" rx="3" fill="currentColor" style={{ color: 'var(--muted-foreground)', opacity: 0.15 }} />

          {/* Front document */}
          <rect x="42" y="18" width="84" height="104" rx="10" fill="currentColor" style={{ color: 'var(--background)' }} />
          <rect x="42" y="18" width="84" height="104" rx="10" stroke="currentColor" style={{ color: 'var(--border-interactive)' }} strokeWidth="1.5" />

          {/* Dashed placeholder lines on front doc */}
          <line x1="56" y1="42" x2="112" y2="42" stroke="currentColor" style={{ color: 'var(--border-interactive)' }} strokeWidth="5" strokeLinecap="round" strokeDasharray="6 5" />
          <line x1="56" y1="58" x2="98" y2="58" stroke="currentColor" style={{ color: 'var(--border-interactive)' }} strokeWidth="5" strokeLinecap="round" strokeDasharray="6 5" />
          <line x1="56" y1="74" x2="106" y2="74" stroke="currentColor" style={{ color: 'var(--border-interactive)' }} strokeWidth="5" strokeLinecap="round" strokeDasharray="6 5" />
          <line x1="56" y1="90" x2="88" y2="90" stroke="currentColor" style={{ color: 'var(--border-interactive)' }} strokeWidth="5" strokeLinecap="round" strokeDasharray="6 5" />

          {/* Magnifying glass circle */}
          <circle cx="118" cy="108" r="20" fill="currentColor" style={{ color: 'var(--background)' }} />
          <circle cx="118" cy="108" r="20" stroke="currentColor" style={{ color: 'var(--border-interactive-hover)' }} strokeWidth="1.5" />
          <circle cx="116" cy="106" r="9" stroke="currentColor" style={{ color: 'var(--bg-icon-container)' }} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="122" y1="113" x2="128" y2="119" stroke="currentColor" style={{ color: 'var(--bg-icon-container)' }} strokeWidth="2.5" strokeLinecap="round" />

          {/* Sparkle top-right */}
          <g style={{ color: 'var(--bg-icon-container)', opacity: 0.7 }}>
            <line x1="148" y1="22" x2="148" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="142" y1="28" x2="154" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="144" y1="24" x2="152" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="152" y1="24" x2="144" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Small dot accents */}
          <circle cx="36" cy="52" r="3.5" fill="currentColor" style={{ color: 'var(--border-interactive-hover)', opacity: 0.6 }} />
          <circle cx="26" cy="90" r="2.5" fill="currentColor" style={{ color: 'var(--border-interactive-hover)', opacity: 0.4 }} />
          <circle cx="158" cy="68" r="3" fill="currentColor" style={{ color: 'var(--bg-icon-container)', opacity: 0.4 }} />
        </svg>

        {/* Text */}
        <div className="flex flex-col items-center gap-[8px] text-center px-[24px]">
          <h3
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: '18px',
              lineHeight: '26px',
              color: 'var(--primary)',
            }}
          >
            {displayTitle}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-14)',
              lineHeight: 'var(--line-height-20)',
              color: 'var(--muted-foreground)',
            }}
          >
            {displayDescription}
          </p>
        </div>

      </div>
    </div>
  );
}
