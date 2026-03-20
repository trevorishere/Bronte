import { LucideIcon, IconSize } from './BaseIcon';
import { Clock } from 'lucide-react';

interface RecentIconProps {
  size?: IconSize;
}

export function RecentIcon({ size = 'medium' }: RecentIconProps) {
  return <LucideIcon icon={Clock} size={size} />;
}
