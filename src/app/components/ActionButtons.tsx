import { Bell, Moon, Sun, Menu } from 'lucide-react';
import svgPaths from "../../imports/svg-2hg6thd8pt";
import { useState, useRef } from 'react';
import { DropdownMenu, MenuItem } from './DropdownMenu';

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
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userButtonRef = useRef<HTMLDivElement>(null);

  const userMenuItems: MenuItem[] = [
    {
      id: 'help',
      label: 'Help',
      icon: (
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g clipPath="url(#clip0_help)">
            <path d={svgPaths.p3111f900} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
            <path d={svgPaths.p2bf069e0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
            <path d="M10 14.1669H10.0087" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          </g>
          <defs>
            <clipPath id="clip0_help">
              <rect fill="white" height="20" width="20" />
            </clipPath>
          </defs>
        </svg>
      ),
      onClick: () => console.log('Help clicked'),
    },
    {
      id: 'theme',
      label: isDarkMode ? 'Light Mode' : 'Dark Mode',
      icon: isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />,
      onClick: () => onThemeToggle?.(),
    },
  ];

  return (
    <>
      {/* ================================================================ */}
      {/* MOBILE LAYOUT: Action Buttons for Mobile                        */}
      {/* Only shows Menu button (hamburger)                              */}
      {/* Button Size: 32px                                               */}
      {/* Icon Size: 20px                                                 */}
      {/* Gap: 8px between buttons                                        */}
      {/* ================================================================ */}
      <div className="md:hidden flex gap-[8px] items-center">
        {/* Mobile Menu Button */}
        <button 
          className="flex items-center justify-center shrink-0 size-[32px] rounded-full transition-colors"
          style={{ backgroundColor: 'transparent' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          onClick={onMenuClick}
        >
          <Menu className="shrink-0 size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={1.875} />
        </button>
      </div>

      {/* ================================================================ */}
      {/* DESKTOP LAYOUT: Action Buttons for Desktop                      */}
      {/* Shows: Notifications + User Avatar with Dropdown                */}
      {/* Button Size: 32px                                               */}
      {/* Icon Size: 20px                                                 */}
      {/* Gap: 8px between buttons                                        */}
      {/* ================================================================ */}
      <div className="hidden md:flex gap-[8px] items-center">
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

        {/* Account Avatar with Dropdown */}
        <div className="flex items-center" ref={userButtonRef}>
          <button
            className="flex items-center justify-center overflow-clip shrink-0 size-[32px] rounded-full transition-colors cursor-pointer"
            style={{ backgroundColor: 'var(--bg-account-avatar)' }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <p style={{ 
              fontFamily: 'var(--font-family)', 
              fontWeight: 'var(--font-weight-bold)', 
              lineHeight: 'var(--line-height-normal)', 
              fontSize: 'var(--font-size-13)', 
              textAlign: 'center', 
              color: 'var(--text-white)', 
              letterSpacing: 'var(--letter-spacing-sm)', 
              whiteSpace: 'nowrap' 
            }}>
              {userInitials}
            </p>
          </button>
        </div>

        {/* User Menu Dropdown */}
        <DropdownMenu
          items={userMenuItems}
          isOpen={showUserMenu}
          onClose={() => setShowUserMenu(false)}
          anchorRef={userButtonRef}
        />
      </div>
    </>
  );
}
