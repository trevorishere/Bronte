import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'text' | 'primary' | 'secondary';
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
    fontSize: 'var(--font-size-14)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-20)',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s, color 0.2s',
    border: 'none',
    ...style,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    text: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: '1px solid var(--border-interactive)',
      backgroundColor: isHovered && !props.disabled ? 'var(--muted)' : 'transparent',
      color: 'var(--foreground)',
    },
    primary: {
      padding: '8px 16px',
      borderRadius: '8px',
      backgroundColor: isHovered && !props.disabled ? 'var(--accent-hover)' : 'var(--accent)',
      color: 'var(--primary)',
    },
    secondary: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: '1px solid var(--border-interactive)',
      backgroundColor: isHovered && !props.disabled ? 'var(--border-interactive-hover)' : 'var(--background)',
      color: 'var(--foreground)',
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
