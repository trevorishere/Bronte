import { ReactNode, ComponentType } from 'react';
import { LucideProps } from 'lucide-react';

export type IconSize = 'small' | 'medium' | 'large' | 'x-large';

export interface BaseIconProps {
  size?: IconSize;
  backgroundColor: string;
  borderRadius: 'round' | 'rounded';
  children: ReactNode;
  className?: string;
}

// Shared size configuration for all icons
export const iconSizeConfig = {
  small: {
    containerSize: 'size-[24px]',
    fontSize: '10px',
    letterSpacing: '0.5px',
    iconSize: 12,
  },
  medium: {
    containerSize: 'size-[32px]',
    fontSize: '12px',
    letterSpacing: '0.5px',
    iconSize: 16,
  },
  large: {
    containerSize: 'size-[48px]',
    fontSize: '20px',
    letterSpacing: '0.5px',
    iconSize: 24,
  },
  'x-large': {
    containerSize: 'size-[64px]',
    fontSize: '28px',
    letterSpacing: '0.5px',
    iconSize: 32,
  },
};

// Border radius configuration based on size and shape
export const getBorderRadius = (size: IconSize, shape: 'round' | 'rounded'): string => {
  if (shape === 'round') {
    return 'var(--radius-round)';
  }
  
  // Rounded shape has size-specific border radius
  const radiusMap: Record<IconSize, string> = {
    small: 'var(--radius-4)',
    medium: 'var(--radius-8)',
    large: 'var(--radius-16)',
    'x-large': 'var(--radius-24)',
  };
  
  return radiusMap[size];
};

/**
 * BaseIcon - Shared foundation for all icon components
 * Handles consistent sizing, border radius, and layout
 */
export function BaseIcon({
  size = 'medium',
  backgroundColor,
  borderRadius,
  children,
  className = ''
}: BaseIconProps) {
  const config = iconSizeConfig[size];
  const radius = getBorderRadius(size, borderRadius);

  return (
    <div
      className={`${config.containerSize} flex items-center justify-center shrink-0 ${className}`}
      style={{ 
        backgroundColor,
        borderRadius: radius
      }}
    >
      {children}
    </div>
  );
}

/**
 * IconText - Shared text rendering for icons with initials/letters
 * Provides consistent typography across all text-based icons
 */
export interface IconTextProps {
  text: string;
  size: IconSize;
  color?: string;
}

export function IconText({ text, size, color = 'white' }: IconTextProps) {
  const config = iconSizeConfig[size];

  return (
    <p 
      className="font-semibold leading-none not-italic text-center whitespace-nowrap flex items-center justify-center"
      style={{ 
        fontFamily: 'var(--font-family)',
        fontSize: config.fontSize,
        letterSpacing: config.letterSpacing,
        color
      }}
    >
      {text}
    </p>
  );
}

/**
 * LucideIcon - Template for icon components that use a lucide-react icon
 * Eliminates the boilerplate pattern repeated across AdminIcon, FavoritesIcon, etc.
 */
export interface LucideIconProps {
  icon: ComponentType<LucideProps>;
  size?: IconSize;
  backgroundColor?: string;
  borderRadius?: 'round' | 'rounded';
  color?: string;
}

export function LucideIcon({
  icon: Icon,
  size = 'medium',
  backgroundColor = 'var(--foreground)',
  borderRadius = 'rounded',
  color = 'white',
}: LucideIconProps) {
  const iconSize = iconSizeConfig[size].iconSize;

  return (
    <BaseIcon size={size} backgroundColor={backgroundColor} borderRadius={borderRadius}>
      <Icon size={iconSize} strokeWidth={2} style={{ color }} />
    </BaseIcon>
  );
}
