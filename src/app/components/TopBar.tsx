import { ChevronLeft, Grid3x3, List } from 'lucide-react';
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
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export function TopBar({ 
  title, 
  userInitials = 'LD',
  onThemeToggle,
  isDarkMode = false,
  showBackButton = false,
  onBackClick,
  backButtonLabel = 'Back',
  viewMode,
  onViewModeChange
}: TopBarProps) {
  const { toggleSidebar } = useMobileNav();

  return (
    <div className="h-[72px] shrink-0 w-full">
      
      {/* ================================================================ */}
      {/* MOBILE LAYOUT: TopBar for Mobile Devices                        */}
      {/* Height: 72px                                                    */}
      {/* Padding: 16px horizontal                                        */}
      {/* Layout: Title (left) + View Toggle (right, if provided)         */}
      {/* ================================================================ */}
      <div className="md:hidden flex items-center justify-between pt-1 px-[16px] size-full">
        {/* Title with optional back button - Mobile */}
        {title && (
          <div className="flex gap-[8px] items-center flex-1 min-w-0">
            {showBackButton && (
              <button
                onClick={onBackClick}
                className="size-[32px] flex items-center justify-center pr-[2px] rounded-full transition-colors shrink-0"
                style={{ backgroundColor: 'transparent' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <ChevronLeft className="size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={3} />
              </button>
            )}
            <h1 
              className={`truncate ${backButtonLabel && showBackButton ? 'text-[16px]' : 'text-[24px]'}`}
              style={{ 
                fontFamily: 'var(--font-family)', 
                fontWeight: 'bold',
                lineHeight: 'normal',
                color: 'var(--primary)',
                letterSpacing: 'var(--letter-spacing-md)'
              }}
            >
              {backButtonLabel && showBackButton ? backButtonLabel : title}
            </h1>
          </div>
        )}

        {/* Spacer when no title */}
        {!title && <div className="flex-1" />}

        {/* Mobile View Toggle - Only show if viewMode is provided */}
        {viewMode && onViewModeChange && (
          <button
            onClick={() => onViewModeChange(viewMode === 'grid' ? 'list' : 'grid')}
            className="flex items-center justify-center size-[40px] rounded-full transition-colors shrink-0"
            style={{ backgroundColor: 'transparent' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {viewMode === 'grid' ? (
              <List className="size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={2} />
            ) : (
              <Grid3x3 className="size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={2} />
            )}
          </button>
        )}
      </div>

      {/* ================================================================ */}
      {/* DESKTOP LAYOUT: TopBar for Desktop Devices                      */}
      {/* Height: 72px                                                    */}
      {/* Padding: 32px left, 32px right                                  */}
      {/* Layout: Title (left) + Action Buttons (right)                   */}
      {/* ================================================================ */}
      <div className="hidden md:flex items-center justify-between pt-1 pl-[32px] pr-[32px] size-full">
        {/* Title with optional back button - Desktop */}
        {title && (
          <div className="flex gap-[8px] items-center flex-1 min-w-0">
            {showBackButton && (
              <button
                onClick={onBackClick}
                className="size-[32px] flex items-center justify-center pr-[2px] rounded-full transition-colors shrink-0"
                style={{ backgroundColor: 'transparent' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <ChevronLeft className="size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={3} />
              </button>
            )}
            <h1 
              className={`truncate ${backButtonLabel && showBackButton ? 'text-[24px]' : 'text-[28px]'}`}
              style={{ 
                fontFamily: 'var(--font-family)', 
                fontWeight: 'bold',
                lineHeight: 'normal',
                color: 'var(--primary)',
                letterSpacing: 'var(--letter-spacing-md)'
              }}
            >
              {backButtonLabel && showBackButton ? backButtonLabel : title}
            </h1>
          </div>
        )}

        {/* Spacer when no title */}
        {!title && <div className="flex-1" />}

        {/* Desktop Action Buttons - Help, Notifications, Theme, User Menu */}
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
