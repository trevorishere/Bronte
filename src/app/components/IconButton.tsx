import { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: number;         // button size in px, default 32
  rounded?: 'full' | 'xl' | 'lg';  // default 'full'
  title?: string;
  className?: string;
  disabled?: boolean;
  noHover?: boolean;     // suppress the rollover background change
  'aria-label'?: string;
}

export function IconButton({
  icon,
  onClick,
  size = 40,
  rounded = 'full',
  title,
  className = '',
  disabled,
  noHover = false,
  'aria-label': ariaLabel,
}: IconButtonProps) {
  const radiusClass = rounded === 'full' ? 'rounded-full' : rounded === 'xl' ? 'rounded-xl' : 'rounded-lg';

  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`flex items-center justify-center shrink-0 ${radiusClass} ${className}`}
      style={{
        width: size, height: size,
        backgroundColor: 'transparent',
        color: 'var(--foreground)',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: 0,
        transition: `background-color var(--transition-duration) var(--transition-timing), color var(--transition-duration) var(--transition-timing)`,
      }}
      onMouseOver={(e) => {
        if (!disabled && !noHover) e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)';
        if (!disabled) e.currentTarget.style.color = 'var(--primary)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'var(--foreground)';
      }}
    >
      {icon}
    </button>
  );
}
