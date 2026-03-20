import { LucideIcon, IconSize } from './BaseIcon';
import { Users } from 'lucide-react';

interface SharedIconProps {
  size?: IconSize;
}

export function SharedIcon({ size = 'medium' }: SharedIconProps) {
  return <LucideIcon icon={Users} size={size} />;
}
