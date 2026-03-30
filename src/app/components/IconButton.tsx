import { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: number;         // button size in px, default 32
  rounded?: 'full' | 'xl' | 'lg';  // default 'full'
  title?: string;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

export function IconButton({
  icon,
  onClick,
  size = 32,
  rounded = 'full',
  title,
  className = '',
  disabled,
  'aria-label': ariaLabel,
}: IconButtonProps) {
  const radiusClass = rounded === 'full' ? 'rounded-full' : rounded === 'xl' ? 'rounded-xl' : 'rounded-lg';

  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`flex items-center justify-center transition-colors shrink-0 ${radiusClass} ${className}`}
      style={{ width: size, height: size, backgroundColor: 'transparent', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', padding: 0 }}
      onMouseOver={(e) => { if (!disabled) e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'; }}
      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
    >
      {icon}
    </button>
  );
}
