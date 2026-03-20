import { Star, Clock, UserRoundPlus, ShieldUser, FolderOpen, X } from 'lucide-react';
import { getWorkspaceInitials } from './WorkspaceIcon';
import { useState, useEffect } from 'react';

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
}

const myWorkspaceItems = [
  { id: 'recent', label: 'Recent', icon: 'Clock', fontWeight: 'var(--font-weight-medium)' },
  { id: 'favorites', label: 'Favorites', icon: 'Star', fontWeight: 'var(--font-weight-medium)' },
  { id: 'shared', label: 'Shared', icon: 'UserRoundPlus', fontWeight: 'var(--font-weight-medium)' },
];

export function Sidebar({ 
  myWorkspaces = [], 
  teamWorkspaces = [],
  activeItem = 'recent',
  onItemClick,
  isMobileOpen = false,
  onMobileClose
}: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        onMobileClose?.();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileOpen, onMobileClose]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleItemClick = (id: string) => {
    onItemClick?.(id);
    onMobileClose?.(); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          flex flex-col h-full w-[280px] shrink-0 bg-sidebar z-50
          fixed md:static inset-y-0 left-0
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        style={{ borderRight: '1px solid var(--border-interactive)' }}
      >
        {/* Logo */}
        <div className="h-[72px] shrink-0 w-full">
          <div className="flex flex-row items-center size-full">
            <div className="flex items-center pl-[24px] py-[24px] size-full">
              <div className="h-[26px] shrink-0">
                <div className="flex gap-[8px] h-full items-center">
                  <div className="flex items-center justify-center">
                    <div className="flex flex-col justify-center leading-[0] text-[22px] tracking-[0.3px] whitespace-nowrap text-primary" style={{ fontFamily: 'Aleo, serif', fontWeight: 700 }}>
                      <p className="leading-[normal]">Bronte</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile Close Button */}
            <button
              className="md:hidden mr-4 flex items-center justify-center size-[32px] rounded-full transition-colors"
              style={{ backgroundColor: 'transparent' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              onClick={onMobileClose}
            >
              <X className="size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col flex-1 min-h-0 w-full">
          {/* Top Navigation */}
          <div className="shrink-0 w-full">
            <div className="flex flex-col items-start px-[12px] pt-[4px] pb-[12px] w-full">
              {myWorkspaceItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`h-[40px] w-full rounded-xl transition-all duration-150 ease-in-out ${activeItem === item.id ? 'bg-accent' : ''}`}
                  style={{
                    backgroundColor: activeItem === item.id ? 'var(--accent)' : (hoveredItem === item.id ? 'var(--bg-nav-hover)' : 'transparent')
                  }}
                >
                  <div className="flex gap-[12px] items-center p-[12px] size-full">
                    <div className="shrink-0 size-[20px]">
                      {item.icon === 'Clock' && (
                        <Clock 
                          className="size-full" 
                          style={{ color: activeItem === item.id ? 'var(--foreground)' : (hoveredItem === item.id ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)') }}
                        />
                      )}
                      {item.icon === 'Star' && (
                        <Star 
                          className="size-full" 
                          style={{ color: activeItem === item.id ? 'var(--foreground)' : (hoveredItem === item.id ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)') }}
                        />
                      )}
                      {item.icon === 'UserRoundPlus' && (
                        <UserRoundPlus
                          className="size-full" 
                          style={{ color: activeItem === item.id ? 'var(--foreground)' : (hoveredItem === item.id ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)') }}
                        />
                      )}
                      {item.icon === 'FolderOpen' && (
                        <FolderOpen
                          className="size-full" 
                          style={{ color: activeItem === item.id ? 'var(--foreground)' : (hoveredItem === item.id ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)') }}
                        />
                      )}
                      {item.icon === 'ShieldUser' && (
                        <ShieldUser 
                          className="size-full" 
                          style={{ color: activeItem === item.id ? 'var(--foreground)' : (hoveredItem === item.id ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)') }}
                        />
                      )}
                    </div>
                    <p 
                      style={{ 
                        fontFamily: 'var(--font-family)', 
                        fontWeight: item.fontWeight, 
                        lineHeight: 'var(--line-height-20)', 
                        fontSize: 'var(--font-size-14)', 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        letterSpacing: 'var(--letter-spacing-md)',
                        textAlign: 'left',
                        color: activeItem === item.id ? 'var(--primary)' : (hoveredItem === item.id ? 'var(--primary)' : 'var(--foreground)')
                      }}
                      className="flex-1 min-w-0"
                    >
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
              {/* Team Workspaces */}
              {teamWorkspaces.length > 0 && (
                <div className="w-full">
                  <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-11)', textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-lg)', padding: '8px 12px' }}>
                    Team Workspaces
                  </p>
                  {teamWorkspaces.map((workspace) => (
                    <button
                      key={workspace.id}
                      onClick={() => handleItemClick(workspace.id)}
                      onMouseEnter={() => setHoveredItem(workspace.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`h-[40px] w-full rounded-xl transition-all duration-150 ease-in-out ${
                        activeItem === workspace.id ? 'bg-accent' : ''
                      }`}
                      style={{
                        backgroundColor: activeItem === workspace.id ? 'var(--accent)' : (hoveredItem === workspace.id ? 'var(--bg-nav-hover)' : 'transparent')
                      }}
                    >
                      <div className="flex gap-[12px] items-center pl-[10px] pr-[12px] py-[12px] size-full">
                        <div className="shrink-0 size-[24px]">
                          <div className="relative size-full">
                            <svg 
                              className="size-full" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect 
                                x="3" 
                                y="3" 
                                width="18" 
                                height="18" 
                                rx="4" 
                                stroke={activeItem === workspace.id ? 'var(--foreground)' : (hoveredItem === workspace.id ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)')} 
                                strokeWidth="1.5"
                              />
                            </svg>
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                              <p style={{ 
                                fontFamily: 'var(--font-family)', 
                                fontWeight: 'var(--font-weight-semibold)', 
                                fontSize: 'var(--font-size-8)', 
                                letterSpacing: 'var(--letter-spacing-md)',
                                whiteSpace: 'nowrap',
                                color: activeItem === workspace.id ? 'var(--foreground)' : (hoveredItem === workspace.id ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)')
                              }}>
                                {getWorkspaceInitials(workspace.name)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p 
                            style={{ 
                              fontFamily: 'var(--font-family)', 
                              fontWeight: 'var(--font-weight-regular)', 
                              lineHeight: 'var(--line-height-20)', 
                              fontSize: 'var(--font-size-14)', 
                              whiteSpace: 'nowrap', 
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis', 
                              letterSpacing: 'var(--letter-spacing-md)',
                              textAlign: 'left',
                              color: activeItem === workspace.id ? 'var(--primary)' : (hoveredItem === workspace.id ? 'var(--primary)' : 'var(--foreground)')
                            }}
                          >
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
          <div className="shrink-0 w-full" style={{ borderTop: '1px solid var(--border-interactive)' }}>
            <div className="flex flex-col items-start px-[12px] pt-[8px] pb-[12px] w-full">
              {/* Admin nav item */}
              <button
                onClick={() => handleItemClick('admin')}
                onMouseEnter={() => setHoveredItem('admin')}
                onMouseLeave={() => setHoveredItem(null)}
                className={`h-[40px] w-full rounded-xl transition-all duration-150 ease-in-out`}
                style={{
                  backgroundColor: activeItem === 'admin' ? 'var(--accent)' : (hoveredItem === 'admin' ? 'var(--bg-nav-hover)' : 'transparent')
                }}
              >
                <div className="flex gap-[12px] items-center p-[12px] size-full">
                  <div className="shrink-0 size-[20px]">
                    <ShieldUser
                      className="size-full"
                      style={{ color: activeItem === 'admin' ? 'var(--foreground)' : (hoveredItem === 'admin' ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)') }}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-medium)',
                      lineHeight: 'var(--line-height-20)',
                      fontSize: 'var(--font-size-14)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      letterSpacing: 'var(--letter-spacing-md)',
                      textAlign: 'left',
                      color: activeItem === 'admin' ? 'var(--primary)' : (hoveredItem === 'admin' ? 'var(--primary)' : 'var(--foreground)')
                    }}
                    className="flex-1 min-w-0"
                  >
                    Admin
                  </p>
                </div>
              </button>

              {/* User Avatar */}
              <button
                onClick={() => handleItemClick('account')}
                onMouseEnter={() => setHoveredItem('account')}
                onMouseLeave={() => setHoveredItem(null)}
                className="h-[52px] w-full rounded-xl transition-all duration-150 ease-in-out"
                style={{
                  backgroundColor: activeItem === 'account' ? 'var(--accent)' : (hoveredItem === 'account' ? 'var(--bg-nav-hover)' : 'transparent')
                }}
              >
                <div className="flex gap-[10px] items-center px-[10px] py-[8px] size-full">
                  {/* Avatar circle */}
                  <div
                    className="shrink-0 size-[32px] rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--bg-account-avatar)' }}
                  >
                    <span style={{ fontFamily: 'var(--font-family)', fontWeight: 'bold', fontSize: '12px', color: 'white', letterSpacing: '0.5px' }}>
                      LD
                    </span>
                  </div>
                  {/* Name + email */}
                  <div className="flex flex-col min-w-0 flex-1 text-left">
                    <p
                      className="truncate"
                      style={{
                        fontFamily: 'var(--font-family)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontSize: '13px',
                        color: activeItem === 'account' ? 'var(--primary)' : 'var(--foreground)',
                        letterSpacing: 'var(--letter-spacing-md)',
                        lineHeight: '18px',
                      }}
                    >
                      Lena Doe
                    </p>
                    <p
                      className="truncate"
                      style={{
                        fontFamily: 'var(--font-family)',
                        fontWeight: 'var(--font-weight-regular)',
                        fontSize: '11px',
                        color: 'var(--muted-foreground)',
                        letterSpacing: 'var(--letter-spacing-md)',
                        lineHeight: '15px',
                      }}
                    >
                      lena.doe@university.edu
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}