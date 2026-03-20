import { LucideIcon, IconSize } from './BaseIcon';
import { Users } from 'lucide-react';

interface TeamIconProps {
  size?: IconSize;
}

export function TeamIcon({ size = 'medium' }: TeamIconProps) {
  return <LucideIcon icon={Users} size={size} backgroundColor="var(--icon-team-bg)" borderRadius="round" />;
}
