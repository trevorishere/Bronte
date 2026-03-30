import { Bell, Search } from 'lucide-react';
import { IconButton } from './IconButton';

interface ActionButtonsProps {
  userInitials?: string;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export function ActionButtons({
  userInitials = 'LD',
  onThemeToggle,
  isDarkMode = false,
}: ActionButtonsProps) {

  return (
    <>
      {/* ================================================================ */}
      {/* DESKTOP LAYOUT: Search + Bell                                    */}
      {/* (Avatar lives in Sidebar bottom; mobile icons live in TopBar)   */}
      {/* ================================================================ */}
      <div className="hidden md:flex gap-[8px] items-center">
        {/* Search */}
        <IconButton
          icon={<Search className="shrink-0 size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={2} />}
          size={32}
          title="Search"
        />

        {/* Notifications */}
        <IconButton
          icon={<Bell className="shrink-0 size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={1.875} />}
          size={32}
          title="Notifications"
        />
      </div>
    </>
  );
}
