import { LucideIcon, IconSize } from './BaseIcon';
import { UsersRound } from 'lucide-react';

interface TeamIconProps {
  size?: IconSize;
}

export function TeamIcon({ size = 'medium' }: TeamIconProps) {
  return <LucideIcon icon={UsersRound} size={size} backgroundColor="var(--icon-team-bg)" borderRadius="round" />;
}
