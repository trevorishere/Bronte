import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'text' | 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'text', 
  children, 
  className = '',
  style = {},
  onMouseEnter,
  onMouseLeave,
  ...props 
}: ButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const baseStyles: React.CSSProperties = {
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--font-size-15)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-20)',
    letterSpacing: 'var(--letter-spacing-md)',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    transition: `background-color var(--transition-duration) var(--transition-timing), color var(--transition-duration) var(--transition-timing)`,
    border: 'none',
    ...style,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    text: {
      padding: '8px 16px',
      borderRadius: 'var(--radius-8)',
      border: '1px solid var(--border-interactive)',
      backgroundColor: isHovered && !props.disabled ? 'var(--muted)' : 'transparent',
      color: 'var(--foreground)',
    },
    primary: {
      padding: '8px 16px',
      borderRadius: 'var(--radius-8)',
      backgroundColor: isHovered && !props.disabled ? 'var(--btn-primary-hover)' : 'var(--btn-primary-bg)',
      color: 'var(--btn-primary-text)',
    },
    secondary: {
      padding: '8px 16px',
      borderRadius: 'var(--radius-8)',
      border: '1px solid var(--border-interactive)',
      backgroundColor: isHovered && !props.disabled ? 'var(--muted)' : 'var(--background)',
      color: 'var(--foreground)',
    },
    danger: {
      padding: '8px 16px',
      borderRadius: 'var(--radius-8)',
      backgroundColor: isHovered && !props.disabled ? 'var(--destructive-hover)' : 'var(--destructive)',
      color: 'var(--destructive-foreground)',
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
  };

  if (props.disabled) {
    combinedStyles.opacity = 0.5;
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <button
      {...props}
      className={className}
      style={combinedStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}