import { Star, Clock, UserRoundPlus, ShieldUser, FolderOpen, X, ChevronsLeftRightEllipsis, Search, PanelLeftClose } from 'lucide-react';
import { IconButton } from './IconButton';
import { getWorkspaceInitials } from './WorkspaceIcon';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface WorkspaceItem {
  id: string;
  name: string;
  icon: string;
  count?: number;
}

interface SidebarProps {
  myWorkspaces?: WorkspaceItem[];
  teamWorkspaces?: WorkspaceItem[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  isDesktopOpen?: boolean;
  onDesktopToggle?: () => void;
}

const myWorkspaceItems = [
  { id: 'recent', label: 'Recent', icon: 'Clock', fontWeight: 'var(--font-weight-medium)' },
  { id: 'favorites', label: 'Favorites', icon: 'Star', fontWeight: 'var(--font-weight-medium)' },
  { id: 'shared', label: 'Shared', icon: 'UserRoundPlus', fontWeight: 'var(--font-weight-medium)' },
];

const COLLAPSED_WIDTH = 68;
const EXPANDED_WIDTH = 280;

export function Sidebar({
  myWorkspaces = [],
  teamWorkspaces = [],
  activeItem = 'recent',
  onItemClick,
  isMobileOpen = false,
  onMobileClose,
  isDesktopOpen = true,
  onDesktopToggle,
}: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) onMobileClose?.();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileOpen, onMobileClose]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const handleItemClick = (id: string) => {
    onItemClick?.(id);
    onMobileClose?.();
  };

  const iconColor = (id: string) =>
    activeItem === id ? 'var(--foreground)'
    : hoveredItem === id ? 'var(--icon-nav-hover)'
    : 'var(--muted-foreground)';

  const textColor = (id: string) =>
    activeItem === id || hoveredItem === id ? 'var(--primary)' : 'var(--foreground)';

  const navBg = (id: string) =>
    activeItem === id ? 'var(--accent)'
    : hoveredItem === id ? 'var(--bg-nav-hover)'
    : 'transparent';

  // Fade style for text elements — fade out when sidebar is collapsed on desktop
  const textFade: React.CSSProperties = {
    opacity: isDesktopOpen ? 1 : 0,
    transition: 'opacity 0.12s ease',
  };

  const sidebarBody = (
    <>
      {/* Logo — Desktop collapsed: only the open chevron */}
      {!isDesktopOpen && (
        <div className="hidden md:flex h-[64px] shrink-0 items-center px-[12px] w-full">
          <IconButton
            icon={<PanelLeftClose className="size-[18px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />}
            onClick={onDesktopToggle}
            size={40}
            rounded="full"
            title="Open sidebar"
          />
        </div>
      )}

      {/* Logo — Full header: always on mobile, desktop only when expanded */}
      <div className={`h-[64px] shrink-0 w-full ${!isDesktopOpen ? 'flex md:hidden' : 'flex'}`}>
        <div className="flex flex-row items-center size-full">
          <div className="flex items-center pl-[24px] py-[20px] size-full">
            <div className="h-[40px] shrink-0">
              <div className="flex gap-[16px] h-full items-center">
                <div className="flex flex-col justify-center leading-[0] text-[22px] tracking-[0.5px] whitespace-nowrap text-primary" style={{ fontFamily: 'Aleo, serif', fontWeight: 700 }}>
                  <p className="leading-[normal]">Bronte</p>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Close Button */}
          <IconButton
            className="md:hidden mr-4"
            icon={<X className="size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={2} />}
            onClick={onMobileClose}
            size={32}
            title="Close sidebar"
          />
          {/* Desktop Collapse Button */}
          <IconButton
            className="hidden md:flex mr-2"
            icon={<PanelLeftClose className="size-[20px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />}
            onClick={onDesktopToggle}
            size={40}
            rounded="full"
            title="Collapse sidebar"
          />
        </div>
      </div>

      {/* Search field — between header and nav */}
      <div className="shrink-0 px-[12px] py-[4px]" style={textFade}>
        <div
          className="flex items-center gap-[12px] h-[40px] px-[12px]"
          style={{ backgroundColor: 'var(--muted)', borderRadius: 'var(--radius-12)' }}
        >
          <Search className="size-[20px] shrink-0" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />
          <span style={{
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--font-size-15)',
            color: 'var(--muted-foreground)',
            letterSpacing: 'var(--letter-spacing-md)',
            whiteSpace: 'nowrap',
          }}>
            Search...
          </span>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col flex-1 min-h-0 w-full">
        {/* Top Navigation */}
        <div className="shrink-0 w-full">
          <div className="flex flex-col items-start gap-[2px] px-[12px] py-[12px] w-full">
            {myWorkspaceItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="h-[36px] w-full rounded-xl transition-all duration-150 ease-in-out"
                style={{ backgroundColor: navBg(item.id), maxWidth: !isDesktopOpen ? '44px' : undefined, overflow: 'hidden', transition: 'background-color 150ms ease-in-out, max-width 0.2s ease' }}
              >
                <div className="flex gap-[12px] items-center p-[12px] size-full">
                  <div className="shrink-0 size-[20px]">
                    {item.icon === 'Clock' && <Clock className="size-full" style={{ color: iconColor(item.id) }} />}
                    {item.icon === 'Star' && <Star className="size-full" style={{ color: iconColor(item.id) }} />}
                    {item.icon === 'UserRoundPlus' && <UserRoundPlus className="size-full" style={{ color: iconColor(item.id) }} />}
                    {item.icon === 'FolderOpen' && <FolderOpen className="size-full" style={{ color: iconColor(item.id) }} />}
                    {item.icon === 'ShieldUser' && <ShieldUser className="size-full" style={{ color: iconColor(item.id) }} />}
                  </div>
                  <p style={{ fontFamily: 'var(--font-family)', fontWeight: item.fontWeight, lineHeight: 'var(--line-height-20)', fontSize: 'var(--font-size-15)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: 'var(--letter-spacing-md)', textAlign: 'left', color: textColor(item.id), ...textFade }} className="flex-1 min-w-0">
                    {item.label}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Workspace Sections - Scrollable */}
        <div className="flex-1 min-h-0 w-full overflow-y-auto">
          <div className="flex flex-col items-start px-[12px] pt-[4px] pb-[24px]">
            {teamWorkspaces.length > 0 && (
              <div className="w-full ">
                <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-11)', textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-lg)', padding: '8px 12px', ...textFade }}>
                  Team Workspaces
                </p>
                {teamWorkspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    onClick={() => handleItemClick(workspace.id)}
                    onMouseEnter={() => setHoveredItem(workspace.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="h-[36px] w-full rounded-xl transition-all duration-150 ease-in-out"
                    style={{ backgroundColor: navBg(workspace.id), maxWidth: !isDesktopOpen ? '48px' : undefined, overflow: 'hidden', transition: 'background-color 150ms ease-in-out, max-width 0.2s ease' }}
                  >
                    <div className="flex gap-[12px] items-center p-[12px] size-full">
                      <div className="shrink-0 size-[24px]">
                        <div className="relative size-full">
                          <svg className="size-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="18" height="18" rx="4" stroke={iconColor(workspace.id)} strokeWidth="1.5" />
                          </svg>
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <p style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-8)', letterSpacing: 'var(--letter-spacing-md)', whiteSpace: 'nowrap', color: iconColor(workspace.id) }}>
                              {getWorkspaceInitials(workspace.name)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0" style={textFade}>
                        <p style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-medium)', lineHeight: 'var(--line-height-20)', fontSize: 'var(--font-size-15)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: 'var(--letter-spacing-md)', textAlign: 'left', color: textColor(workspace.id) }}>
                          {workspace.name}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Admin + User Avatar */}
        <div className="shrink-0 w-full">
          <div className="flex flex-col items-start px-[12px] w-full">
            {/* Admin nav item */}
            <button
              onClick={() => handleItemClick('admin')}
              onMouseEnter={() => setHoveredItem('admin')}
              onMouseLeave={() => setHoveredItem(null)}
              className="h-[36px] w-full rounded-xl transition-all duration-150 ease-in-out"
              style={{ backgroundColor: navBg('admin'), maxWidth: !isDesktopOpen ? '44px' : undefined, overflow: 'hidden', transition: 'background-color 150ms ease-in-out, max-width 0.2s ease' }}
            >
              <div className="flex gap-[12px] items-center p-[12px] size-full">
                <div className="shrink-0 size-[20px]">
                  <ShieldUser className="size-full" style={{ color: iconColor('admin') }} />
                </div>
                <p style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-medium)', lineHeight: 'var(--line-height-20)', fontSize: 'var(--font-size-15)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: 'var(--letter-spacing-md)', textAlign: 'left', color: textColor('admin'), ...textFade }} className="flex-1 min-w-0">
                  Admin
                </p>
              </div>
            </button>

            {/* User Avatar — 16px top padding */}
            <button
              onClick={() => handleItemClick('account')}
              onMouseEnter={() => setHoveredItem('account')}
              onMouseLeave={() => setHoveredItem(null)}
              className="h-[54px] w-full rounded-xl transition-all duration-150 ease-in-out mt-1 mb-4"
              style={{ backgroundColor: navBg('account'), maxWidth: !isDesktopOpen ? '54px' : undefined, overflow: 'hidden', transition: 'background-color 150ms ease-in-out, max-width 0.2s ease' }}
            >
              <div className="flex gap-[12px] items-center px-[12px] py-[12px] size-full">
                <div className="shrink-0 size-[32px] rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-account-avatar)' }}>
                  <span style={{ fontFamily: 'var(--font-family)', fontWeight: 'bold', fontSize: '12px', color: 'white', letterSpacing: '0.5px' }}>LD</span>
                </div>
                <div className="flex flex-col min-w-0 flex-1 text-left" style={textFade}>
                  <p className="truncate" style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-medium)', fontSize: '15px', color: activeItem === 'account' ? 'var(--primary)' : 'var(--foreground)', letterSpacing: 'var(--letter-spacing-md)', lineHeight: '20px' }}>
                    Lena Doe
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onMobileClose} />
      )}

      {/* Desktop: spring-animated width collapse */}
      <motion.div
        className="hidden md:flex flex-col shrink-0 overflow-hidden h-full bg-sidebar relative"
        animate={{ width: isDesktopOpen ? EXPANDED_WIDTH : COLLAPSED_WIDTH }}
        initial={false}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        style={{ borderRight: '1px solid var(--border-interactive)' }}
      >
        <div style={{ width: EXPANDED_WIDTH, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {sidebarBody}
        </div>
      </motion.div>

      {/* Mobile: fixed position with translate animation */}
      <div
        className={`
          flex flex-col h-full w-[280px] shrink-0 bg-sidebar z-50
          fixed inset-y-0 left-0 md:hidden
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ borderRight: '1px solid var(--border-interactive)' }}
      >
        {sidebarBody}
      </div>
    </>
  );
}
