import { HelpCircle, Bell, Moon, Sun } from 'lucide-react';
import svgPaths from "../../imports/svg-2hg6thd8pt";
import { useState } from 'react';

interface TopBarProps {
  title: string;
  userInitials?: string;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export function TopBar({ 
  title, 
  userInitials = 'LD',
  onThemeToggle,
  isDarkMode = false
}: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="h-[64px] shrink-0 w-full">
      <div className="flex items-center justify-between px-[24px] size-full">
        {/* Title */}
        <div className="flex gap-[8px] items-center">
          <p className="text-primary" style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-semibold)', lineHeight: 'var(--line-height-normal)', fontSize: 'var(--font-size-20)', letterSpacing: 'var(--letter-spacing-md)', whiteSpace: 'nowrap' }}>
            {title}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[8px] items-center">
          {/* Help Button */}
          <button 
            className="flex items-center justify-center shrink-0 size-[32px] rounded-full transition-colors"
            style={{ backgroundColor: 'transparent' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={() => console.log('Help clicked')}
          >
            <div className="shrink-0 size-[20px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g clipPath="url(#clip0_help)">
                  <path d={svgPaths.p3111f900} stroke="var(--icon)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                  <path d={svgPaths.p2bf069e0} stroke="var(--icon)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                  <path d="M10 14.1669H10.0087" stroke="var(--icon)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
                </g>
                <defs>
                  <clipPath id="clip0_help">
                    <rect fill="white" height="20" width="20" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </button>

          {/* Notifications Button */}
          <button 
            className="relative flex items-center justify-center shrink-0 size-[32px] rounded-full transition-colors"
            style={{ backgroundColor: 'transparent' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="shrink-0 size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={1.875} />
            {showNotifications && (
              <div className="absolute top-0 right-0 size-[8px] bg-destructive rounded-full"></div>
            )}
          </button>

          {/* Dark/Light Toggle */}
          <button 
            className="flex items-center justify-center shrink-0 size-[32px] rounded-full transition-colors"
            style={{ backgroundColor: 'transparent' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={onThemeToggle}
          >
            {isDarkMode ? (
              <Sun className="shrink-0 size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={1.875} />
            ) : (
              <Moon className="shrink-0 size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={1.875} />
            )}
          </button>

          {/* Account Icon */}
          <div className="flex items-center">
            <div className="flex items-center justify-center overflow-clip shrink-0 size-[32px] rounded-full" style={{ backgroundColor: 'var(--bg-account-avatar)' }}>
              <p style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-bold)', lineHeight: 'var(--line-height-normal)', fontSize: 'var(--font-size-13)', textAlign: 'center', color: 'var(--text-white)', letterSpacing: 'var(--letter-spacing-sm)', whiteSpace: 'nowrap' }}>
                {userInitials}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}