import { LucideIcon, IconSize } from './BaseIcon';
import { ShieldUser } from 'lucide-react';

interface AdminIconProps {
  size?: IconSize;
}

export function AdminIcon({ size = 'medium' }: AdminIconProps) {
  return <LucideIcon icon={ShieldUser} size={size} />;
}
