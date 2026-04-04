import { Star, Clock, UserRoundPlus, ShieldUser, Search, PanelLeftClose, X } from 'lucide-react';
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
  { id: 'recent',    label: 'Recent',    icon: 'Clock' },
  { id: 'favorites', label: 'Favorites', icon: 'Star' },
  { id: 'shared',    label: 'Shared',    icon: 'UserRoundPlus' },
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

  const textFade: React.CSSProperties = {
    opacity: isDesktopOpen ? 1 : 0,
    transition: 'opacity 0.12s ease',
  };

  const sidebarBody = (
    <div className="flex flex-col h-full pt-[20px] pb-[24px]">

      {/* ── HEADER ───────────────────────────────────────────────── */}
      <div className="shrink-0 w-full pl-[16px]">
        {/* Desktop collapsed: just the re-open button */}
        {!isDesktopOpen && (
          <div className="hidden md:flex h-[40px] items-center mb-[12px]">
            <IconButton
              icon={<PanelLeftClose className="size-[20px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />}
              onClick={onDesktopToggle}
              size={40}
              rounded="full"
              title="Open sidebar"
            />
          </div>
        )}

        {/* Logo row — always on mobile, only when expanded on desktop */}
        <div className={`flex items-center justify-between pb-[12px] pl-[12px] ${!isDesktopOpen ? 'flex md:hidden' : 'flex'}`}>
          <div
            className="h-[40px] flex items-center"
            style={{ fontFamily: 'Aleo, serif', fontWeight: 700, fontSize: '22px', letterSpacing: '0.3px', color: 'var(--primary)', whiteSpace: 'nowrap' }}
          >
            Bronte
          </div>
          {/* Mobile close */}
          <IconButton
            className="md:hidden"
            icon={<X className="size-[20px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />}
            onClick={onMobileClose}
            size={40}
            title="Close sidebar"
          />
          {/* Desktop collapse */}
          <div className="hidden md:flex items-center justify-center w-[52px] h-[40px]">
            <IconButton
              icon={<PanelLeftClose className="size-[20px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />}
              onClick={onDesktopToggle}
              size={40}
              rounded="full"
              title="Collapse sidebar"
            />
          </div>
        </div>

        {/* Search */}
        <div className="pr-[16px]" style={textFade}>
          <div
            className="flex items-center gap-[12px] px-[12px] py-[10px] rounded-[12px] transition-colors duration-150"
            style={{
              border: '1px solid var(--border-interactive)',
              cursor: 'default',
              backgroundColor: hoveredItem === 'search' ? 'var(--bg-nav-hover)' : 'transparent',
            }}
            onMouseEnter={() => setHoveredItem('search')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Search className="size-[20px] shrink-0" style={{ color: hoveredItem === 'search' ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)' }} strokeWidth={2} />
            <span style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-medium)',
              fontSize: 'var(--font-size-15)',
              letterSpacing: '0.3px',
              color: hoveredItem === 'search' ? 'var(--primary)' : 'var(--muted-foreground)',
              whiteSpace: 'nowrap',
              lineHeight: '20px',
              transition: 'color 150ms ease',
            }}>
              Search
            </span>
          </div>
        </div>
      </div>

      {/* ── TOP NAV (Recent / Favorites / Shared) ────────────────── */}
      <div className="shrink-0 w-full pt-[12px] px-[16px]">
        <div className="flex flex-col gap-px">
          {myWorkspaceItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="w-full rounded-[12px] transition-colors duration-150"
              style={{
                backgroundColor: navBg(item.id),
                maxWidth: !isDesktopOpen ? '44px' : undefined,
                overflow: 'hidden',
              }}
            >
              <div className="flex gap-[12px] items-center px-[12px] py-[10px]">
                <div className="shrink-0 size-[20px]">
                  {item.icon === 'Clock'         && <Clock         className="size-full" style={{ color: iconColor(item.id) }} />}
                  {item.icon === 'Star'          && <Star          className="size-full" style={{ color: iconColor(item.id) }} />}
                  {item.icon === 'UserRoundPlus' && <UserRoundPlus className="size-full" style={{ color: iconColor(item.id) }} />}
                </div>
                <p style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-15)',
                  letterSpacing: '0.3px',
                  lineHeight: '20px',
                  color: textColor(item.id),
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textAlign: 'left',
                  ...textFade,
                }} className="flex-1 min-w-0">
                  {item.label}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── TEAM WORKSPACES ──────────────────────────────────────── */}
      <div className="flex-1 min-h-0 w-full overflow-y-auto">
        {teamWorkspaces.length > 0 && (
          <div className="flex flex-col gap-px px-[16px] py-[10px]">
            {/* Section label */}
            <div className="flex items-center h-[32px]" style={textFade}>
              <p style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-11)',
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                color: 'var(--muted-foreground)',
                whiteSpace: 'nowrap',
              }}>
                Team Workspaces
              </p>
            </div>

            {teamWorkspaces.map((workspace) => (
              <button
                key={workspace.id}
                onClick={() => handleItemClick(workspace.id)}
                onMouseEnter={() => setHoveredItem(workspace.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="w-full rounded-[12px] transition-colors duration-150"
                style={{
                  backgroundColor: navBg(workspace.id),
                  maxWidth: !isDesktopOpen ? '48px' : undefined,
                  overflow: 'hidden',
                }}
              >
                <div className="flex gap-[10px] items-center pl-[10px] pr-[12px] py-[8px]">
                  {/* Workspace icon: 24×24 rounded-rect with initials */}
                  <div className="shrink-0 size-[24px] relative">
                    <svg className="size-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="4" stroke={iconColor(workspace.id)} strokeWidth="1.5" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p style={{
                        fontFamily: 'var(--font-family)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--font-size-8)',
                        letterSpacing: '0.3px',
                        color: iconColor(workspace.id),
                        whiteSpace: 'nowrap',
                      }}>
                        {getWorkspaceInitials(workspace.name)}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0" style={textFade}>
                    <p style={{
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontSize: 'var(--font-size-15)',
                      letterSpacing: '0.3px',
                      lineHeight: '20px',
                      color: textColor(workspace.id),
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textAlign: 'left',
                    }}>
                      {workspace.name}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── BOTTOM (Admin + User) ────────────────────────────────── */}
      <div className="shrink-0 w-full px-[16px]">
        <div className="flex flex-col gap-px">
          {/* Admin */}
          <button
            onClick={() => handleItemClick('admin')}
            onMouseEnter={() => setHoveredItem('admin')}
            onMouseLeave={() => setHoveredItem(null)}
            className="w-full rounded-[12px] transition-colors duration-150"
            style={{
              backgroundColor: navBg('admin'),
              maxWidth: !isDesktopOpen ? '44px' : undefined,
              overflow: 'hidden',
            }}
          >
            <div className="flex gap-[12px] items-center px-[12px] py-[9px]">
              <div className="shrink-0 size-[20px]">
                <ShieldUser className="size-full" style={{ color: iconColor('admin') }} />
              </div>
              <p style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: '14px',
                letterSpacing: '0.3px',
                lineHeight: '20px',
                color: textColor('admin'),
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'left',
                ...textFade,
              }} className="flex-1 min-w-0">
                Admin
              </p>
            </div>
          </button>

          {/* User */}
          <button
            onClick={() => handleItemClick('account')}
            onMouseEnter={() => setHoveredItem('account')}
            onMouseLeave={() => setHoveredItem(null)}
            className="w-full rounded-[12px] transition-colors duration-150"
            style={{
              backgroundColor: navBg('account'),
              maxWidth: !isDesktopOpen ? '48px' : undefined,
              overflow: 'hidden',
            }}
          >
            <div className="flex gap-[10px] items-center pl-[10px] pr-[12px] py-[8px]">
              <div
                className="shrink-0 size-[24px] rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--bg-account-avatar)' }}
              >
                <span style={{ fontFamily: 'var(--font-family)', fontWeight: 'bold', fontSize: '9px', color: 'white', letterSpacing: '0.5px' }}>LD</span>
              </div>
              <div className="flex-1 min-w-0" style={textFade}>
                <p className="truncate" style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-15)',
                  letterSpacing: '0.3px',
                  lineHeight: '18px',
                  color: textColor('account'),
                  textAlign: 'left',
                }}>
                  Lena Doe
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={onMobileClose} />
      )}

      {/* Desktop: spring-animated width */}
      <motion.div
        className="hidden md:flex flex-col shrink-0 overflow-hidden h-full bg-sidebar"
        animate={{ width: isDesktopOpen ? EXPANDED_WIDTH : COLLAPSED_WIDTH }}
        initial={false}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        style={{ borderRight: '1px solid var(--border-interactive)' }}
      >
        <div style={{ width: EXPANDED_WIDTH, height: '100%' }}>
          {sidebarBody}
        </div>
      </motion.div>

      {/* Mobile: slide-in */}
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
