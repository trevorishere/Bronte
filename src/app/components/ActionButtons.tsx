import { Bell, Search } from 'lucide-react';

interface ActionButtonsProps {
  userInitials?: string;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  onMenuClick?: () => void;
}

export function ActionButtons({
  userInitials = 'LD',
  onThemeToggle,
  isDarkMode = false,
  onMenuClick
}: ActionButtonsProps) {

  return (
    <>
      {/* ================================================================ */}
      {/* DESKTOP LAYOUT: Search + Bell                                    */}
      {/* (Avatar lives in Sidebar bottom; mobile icons live in TopBar)   */}
      {/* ================================================================ */}
      <div className="hidden md:flex gap-[8px] items-center">
        {/* Search */}
        <button
          className="flex items-center justify-center shrink-0 size-[32px] rounded-full transition-colors"
          style={{ backgroundColor: 'transparent' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Search className="shrink-0 size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={2} />
        </button>

        {/* Notifications */}
        <button
          className="relative flex items-center justify-center shrink-0 size-[32px] rounded-full transition-colors"
          style={{ backgroundColor: 'transparent' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Bell className="shrink-0 size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={1.875} />
        </button>
      </div>
    </>
  );
}
