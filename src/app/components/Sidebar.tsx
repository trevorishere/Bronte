import { Star, Clock, Users, Settings } from 'lucide-react';
import svgPaths from "../../imports/svg-2hg6thd8pt";
import { useState } from 'react';

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
}

const myWorkspaceItems = [
  { id: 'recent', label: 'Recent', icon: 'recent', fontWeight: 'var(--font-weight-medium)' },
  { id: 'favorites', label: 'Favorites', icon: 'favorites', fontWeight: 'var(--font-weight-regular)' },
  { id: 'shared', label: 'Shared with me', icon: 'shared', fontWeight: 'var(--font-weight-regular)' },
  { id: 'admin', label: 'Admin', icon: 'admin', fontWeight: 'var(--font-weight-regular)' },
];

export function Sidebar({ 
  myWorkspaces = [], 
  teamWorkspaces = [],
  activeItem = 'recent',
  onItemClick 
}: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full w-[296px] shrink-0 bg-sidebar" style={{ borderRight: '1px solid var(--border-interactive)' }}>
      {/* Logo */}
      <div className="h-[64px] shrink-0 w-full">
        <div className="flex flex-row items-center size-full">
          <div className="flex items-center pl-[24px] py-[19px] size-full">
            <div className="h-[26px] shrink-0">
              <div className="flex gap-[8px] h-full items-center">
                <div className="flex items-center justify-center">
                  <div className="flex flex-col justify-center leading-[0] text-[22px] tracking-[0.3px] whitespace-nowrap text-primary" style={{ fontFamily: 'Aleo, serif', fontWeight: 700 }}>
                    <p className="leading-[normal]">Bronte</p>
                  </div>
                </div>
                <div className="flex items-center justify-center px-[6px] py-[2px] rounded" style={{ backgroundColor: 'var(--bg-beta-badge)' }}>
                  <p style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-extrabold)', lineHeight: 'var(--line-height-15)', fontSize: 'var(--font-size-10)', color: 'var(--text-white)', letterSpacing: 'var(--letter-spacing-lg)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>BETA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col flex-1 min-h-0 w-full">
        {/* Top Navigation */}
        <div className="shrink-0 w-full">
          <div className="flex flex-col items-start p-[12px] w-full">
            {myWorkspaceItems.map(item => (
              <button
                key={item.id}
                onClick={() => onItemClick?.(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`h-[36px] w-full rounded-xl transition-all duration-150 ease-in-out ${activeItem === item.id ? 'bg-accent' : ''}`}
                style={{
                  backgroundColor: activeItem === item.id ? 'var(--accent)' : (hoveredItem === item.id ? 'var(--bg-nav-hover)' : 'transparent')
                }}
              >
                <div className="flex gap-[12px] items-center p-[12px] size-full">
                  <div className="shrink-0 size-[20px]">
                    {item.icon === 'recent' && (
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                        <g clipPath="url(#clip0_1_687)">
                          <path d={svgPaths.p2df95170} stroke={activeItem === item.id ? 'var(--foreground)' : (hoveredItem === item.id ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.80556" />
                          <path d={svgPaths.pe1cfb00} stroke={activeItem === item.id ? 'var(--foreground)' : (hoveredItem === item.id ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)')} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.80556" />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_687">
                            <rect fill="white" height="20" width="20" />
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                    {item.icon === 'favorites' && (
                      <Star 
                        className="size-full" 
                        style={{ color: activeItem === item.id ? 'var(--foreground)' : (hoveredItem === item.id ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)') }}
                      />
                    )}
                    {item.icon === 'shared' && (
                      <Users 
                        className="size-full" 
                        style={{ color: activeItem === item.id ? 'var(--foreground)' : (hoveredItem === item.id ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)') }}
                      />
                    )}
                    {item.icon === 'admin' && (
                      <Settings 
                        className="size-full" 
                        style={{ color: activeItem === item.id ? 'var(--foreground)' : (hoveredItem === item.id ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)') }}
                      />
                    )}
                  </div>
                  <p 
                    className={`${activeItem === item.id || hoveredItem === item.id ? 'text-primary' : 'text-foreground'} flex-1 min-w-0`}
                    style={{ fontFamily: 'var(--font-family)', fontWeight: item.fontWeight, lineHeight: 'var(--line-height-20)', fontSize: 'var(--font-size-14)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left' }}
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
          <div className="flex flex-col items-start p-[12px] pb-[24px]">
            {/* Team Workspaces */}
            {teamWorkspaces.length > 0 && (
              <div className="w-full">
                <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-11)', textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-lg)', padding: '8px 12px' }}>
                  Team Workspaces
                </p>
                {teamWorkspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    onClick={() => onItemClick?.(workspace.id)}
                    onMouseEnter={() => setHoveredItem(workspace.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`h-[36px] w-full rounded-xl transition-all duration-150 ease-in-out ${
                      activeItem === workspace.id ? 'bg-accent' : ''
                    }`}
                    style={{
                      backgroundColor: activeItem === workspace.id ? 'var(--accent)' : (hoveredItem === workspace.id ? 'var(--bg-nav-hover)' : 'transparent')
                    }}
                  >
                    <div className="flex gap-[12px] items-center p-[12px] size-full">
                      <div className="shrink-0 size-[20px]">
                        <div className="relative size-full">
                          <div className="absolute inset-[5%]">
                            <div className="absolute inset-[-4.17%]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
                                <path d={svgPaths.p2b51b800} stroke={activeItem === workspace.id ? 'var(--foreground)' : (hoveredItem === workspace.id ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)')} strokeWidth="1.5" />
                              </svg>
                            </div>
                          </div>
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <p style={{ 
                              fontFamily: 'var(--font-family)', 
                              fontWeight: 'var(--font-weight-semibold)', 
                              fontSize: 'var(--font-size-9)', 
                              whiteSpace: 'nowrap',
                              color: activeItem === workspace.id ? 'var(--foreground)' : (hoveredItem === workspace.id ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)')
                            }}>
                              {workspace.icon}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p 
                          className={`${activeItem === workspace.id || hoveredItem === workspace.id ? 'text-primary' : 'text-foreground'}`}
                          style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-regular)', lineHeight: 'var(--line-height-20)', fontSize: 'var(--font-size-14)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left' }}
                        >
                          {workspace.name}
                        </p>
                      </div>
                      {workspace.count !== undefined && (
                        <div className="shrink-0 size-[20px] flex items-center justify-center rounded-full bg-secondary">
                          <p className={`${activeItem === workspace.id || hoveredItem === workspace.id ? 'text-primary' : 'text-foreground'}`} style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-regular)', fontSize: 'var(--font-size-10)' }}>
                            {workspace.count}
                          </p>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}