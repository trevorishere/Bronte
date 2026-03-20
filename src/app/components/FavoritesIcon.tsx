import { LucideIcon, IconSize } from './BaseIcon';
import { Star } from 'lucide-react';

interface FavoritesIconProps {
  size?: IconSize;
}

export function FavoritesIcon({ size = 'medium' }: FavoritesIconProps) {
  return <LucideIcon icon={Star} size={size} />;
}
