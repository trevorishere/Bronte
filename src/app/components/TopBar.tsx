import { ChevronLeft, Grid3x3, List, Search, Bell } from 'lucide-react';
import { ReactNode } from 'react';
import { ActionButtons } from './ActionButtons';
import { useMobileNav } from '../hooks/useMobileNav';

interface TopBarProps {
  title?: string;
  userInitials?: string;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  showBackButton?: boolean;
  onBackClick?: () => void;
  backButtonLabel?: string;
  pageIcon?: ReactNode;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  mobileActions?: ReactNode;
}

export function TopBar({
  title,
  userInitials = 'LD',
  onThemeToggle,
  isDarkMode = false,
  showBackButton = false,
  onBackClick,
  viewMode,
  onViewModeChange,
  mobileActions,
}: TopBarProps) {
  const { toggleSidebar } = useMobileNav();

  const backBtn = (extraClass = '') => (
    <button
      onClick={onBackClick}
      className={`flex items-center gap-[3px] rounded-lg transition-colors group ${extraClass}`}
      style={{ backgroundColor: 'transparent' }}
    >
      <ChevronLeft
        className="size-[18px] shrink-0 transition-colors group-hover:text-[color:var(--primary)]"
        style={{ color: 'var(--muted-foreground)' }}
        strokeWidth={2.5}
      />
      <span
        className="transition-colors group-hover:text-[color:var(--primary)]"
        style={{
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-medium)',
          fontSize: '14px',
          color: 'var(--muted-foreground)',
          letterSpacing: 'var(--letter-spacing-md)',
          lineHeight: 'normal',
        }}
      >
        Back
      </span>
    </button>
  );

  return (
    <div className="h-[72px] shrink-0 w-full" style={{ backgroundColor: 'var(--background)' }}>

      {/* ================================================================ */}
      {/* MOBILE LAYOUT                                                    */}
      {/* ================================================================ */}
      <div className="md:hidden flex items-center gap-1 pt-1 px-[16px] size-full">

        {/* Back or root title */}
        <div className="flex items-center flex-1 min-w-0">
          {showBackButton ? (
            backBtn()
          ) : title ? (
            <h1
              className="truncate text-[24px]"
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'bold',
                lineHeight: 'normal',
                color: 'var(--primary)',
                letterSpacing: 'var(--letter-spacing-md)',
              }}
            >
              {title}
            </h1>
          ) : null}
        </div>

        {/* Search + Bell */}
        <button
          className="flex items-center justify-center size-[40px] rounded-full transition-colors shrink-0"
          style={{ backgroundColor: 'transparent' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Search className="size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={2} />
        </button>
        <button
          className="flex items-center justify-center size-[40px] rounded-full transition-colors shrink-0"
          style={{ backgroundColor: 'transparent' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Bell className="size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={1.875} />
        </button>

        {/* Custom actions only — view toggle lives in MobileSortHeader (list) or GridView header (grid) */}
        {mobileActions && (
          <div className="flex items-center gap-1 shrink-0">
            {mobileActions}
          </div>
        )}
      </div>

      {/* ================================================================ */}
      {/* DESKTOP LAYOUT                                                   */}
      {/* ================================================================ */}
      <div className="hidden md:flex items-center justify-between pt-1 pl-[32px] pr-[32px] size-full">
        <div className="flex items-center flex-1 min-w-0">
          {showBackButton ? (
            backBtn()
          ) : title ? (
            <h1
              className="truncate text-[28px]"
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'bold',
                lineHeight: 'normal',
                color: 'var(--primary)',
                letterSpacing: 'var(--letter-spacing-md)',
              }}
            >
              {title}
            </h1>
          ) : null}
        </div>

        <ActionButtons
          userInitials={userInitials}
          onThemeToggle={onThemeToggle}
          isDarkMode={isDarkMode}
          onMenuClick={toggleSidebar}
        />
      </div>
    </div>
  );
}
