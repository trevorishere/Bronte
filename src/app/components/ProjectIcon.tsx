import { LucideIcon, IconSize } from './BaseIcon';
import { Book } from 'lucide-react';

interface ProjectIconProps {
  size?: IconSize;
}

export function ProjectIcon({ size = 'medium' }: ProjectIconProps) {
  return <LucideIcon icon={Book} size={size} backgroundColor="var(--bg-icon-container)" />;
}
