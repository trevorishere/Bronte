import { Star, MoreHorizontal, List, ShieldCheck, Code2, PenLine } from 'lucide-react';
import { IconButton } from './IconButton';
import { useState, useRef, useEffect } from 'react';
import { WorkspaceIcon } from './WorkspaceIcon';
import { TeamIcon } from './TeamIcon';
import { Avatar, roleColors, Role } from './Avatar';
import { ProjectIcon } from './ProjectIcon';
import { DropdownMenu, createDefaultMenuItems } from './DropdownMenu';
import { accounts } from '../data/accounts';
import { toast } from 'sonner';

export interface GridItemData {
  id: string;
  name: string;
  owner: string;
  iconType?: 'project' | 'workspace' | 'team' | 'account';
  workspace?: string;
  team?: string;
  // Additional metadata
  members?: number;
  membersCount?: number;
  sharedBy?: string;
  dateCreated?: string;
  lastModified?: string;
  role?: string;
  accessLevel?: string;
  projectCount?: number;
  // Computed counts for metadata display
  accountCount?: number;
  teamProjectCount?: number;
  workspaceProjectCount?: number;
  workspaceMemberCount?: number;
}

interface GridViewProps {
  data: GridItemData[];
  onItemClick?: (item: GridItemData) => void;
  onItemDoubleClick?: (item: GridItemData) => void;
  onStarClick?: (item: GridItemData, isStarred: boolean) => void;
  favorites?: Set<string>;
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export function GridView({
  data,
  onItemClick,
  onItemDoubleClick,
  onStarClick,
  favorites = new Set(),
  onViewModeChange,
}: GridViewProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [hoveredFavorite, setHoveredFavorite] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const moreButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedCard) {
        setSelectedCard(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCard]);

  const renderPictogram = (item: GridItemData) => {
    return (
      <div className="w-full h-[104px] flex items-center justify-center">
        {item.iconType === 'workspace' && item.name && (
          <WorkspaceIcon name={item.name} size="x-large" />
        )}
        {item.iconType === 'team' && (
          <TeamIcon size="x-large" />
        )}
        {item.iconType === 'account' && (
          <Avatar
            name={item.name}
            role={accounts.find(acc => acc.name === item.name)?.role || item.role || 'Creator'}
            size="x-large"
          />
        )}
        {item.iconType === 'project' && (
          <ProjectIcon size="x-large" />
        )}
      </div>
    );
  };

  const roleIconMap: Record<Role, React.ReactNode> = {
    Admin:     <ShieldCheck className="size-[10px] shrink-0" strokeWidth={2} />,
    Developer: <Code2       className="size-[10px] shrink-0" strokeWidth={2} />,
    Creator:   <PenLine     className="size-[10px] shrink-0" strokeWidth={2} />,
  };

  // fontSize deliberately excluded — applied via Tailwind className for responsive sizing
  const metaLineStyle = (semibold?: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-family)',
    fontWeight: semibold ? 'var(--font-weight-semibold)' : 'var(--font-weight-regular)',
    lineHeight: '20px',
    letterSpacing: 'var(--letter-spacing-md)',
    color: 'var(--muted-foreground)',
  });
  // Responsive metadata class: 12px mobile, 14px desktop
  const metaClass = 'text-[12px] md:text-[14px]';

  const renderCardMetadata = (item: GridItemData) => {
    if (item.iconType === 'account' && item.role) {
      const role = item.role as Role;
      const colors = roleColors[role];
      return (
        <div className="flex flex-col gap-[3px]">
          <div
            className="inline-flex items-center gap-[4px] self-start py-[3px] pl-[8px] pr-[10px] rounded-[8px]"
            style={{
              backgroundColor: colors?.rgba,
              border: `1px solid ${colors?.border}`,
            }}
          >
            <span style={{ color: 'var(--role-pill-text)', display: 'flex', alignItems: 'center' }}>
              {roleIconMap[role]}
            </span>
            {/* Pill text: 11px mobile, 12px desktop */}
            <span className="text-[11px] md:text-[12px]" style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-medium)',
              letterSpacing: '0.2px',
              color: 'var(--role-pill-text)',
              whiteSpace: 'nowrap',
              lineHeight: 'normal',
            }}>
              {role}
            </span>
          </div>
          {item.accessLevel && (
            <span className={metaClass} style={metaLineStyle()}>{item.accessLevel}</span>
          )}
        </div>
      );
    }

    if (item.iconType === 'team') {
      return (
        <div className="flex flex-col">
          {item.owner && <p className={metaClass} style={metaLineStyle(true)}>{item.owner}</p>}
          {item.membersCount != null && <p className={metaClass} style={metaLineStyle()}>{item.membersCount} {item.membersCount === 1 ? 'Member' : 'Members'}</p>}
        </div>
      );
    }

    if (item.iconType === 'workspace') {
      return (
        <div className="flex flex-col">
          {item.workspaceProjectCount != null && <p className={metaClass} style={metaLineStyle(true)}>{item.workspaceProjectCount} {item.workspaceProjectCount === 1 ? 'Project' : 'Projects'}</p>}
          {item.workspaceMemberCount != null && <p className={metaClass} style={metaLineStyle()}>{item.workspaceMemberCount} {item.workspaceMemberCount === 1 ? 'Member' : 'Members'}</p>}
        </div>
      );
    }

    // project (default)
    return (
      <div className="flex flex-col">
        {item.owner && <p className={metaClass} style={metaLineStyle(true)}>{item.owner}</p>}
        {item.accountCount != null && <p className={metaClass} style={metaLineStyle()}>{item.accountCount} {item.accountCount === 1 ? 'Member' : 'Members'}</p>}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>

      {/* Mobile header row — matches MobileSortHeader height/position, toggle on right */}
      {onViewModeChange && (
        <div className="md:hidden shrink-0 px-4 h-[40px] mt-[8px] flex items-center justify-end">
          <IconButton
            icon={<List className="size-[16px]" style={{ color: 'var(--icon)' }} strokeWidth={2} />}
            onClick={() => onViewModeChange('list')}
            size={36}
            title="Switch to list view"
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 md:px-[40px] pb-[80px] md:pb-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pt-4 md:pt-8">
        {data.map((item) => {
          const isStarred = favorites.has(item.id);
          const isHovered = hoveredCard === item.id;
          const isSelected = selectedCard === item.id;

          // Title lines: account=1, team/workspace=2, project=3
          const titleLines = item.iconType === 'account' ? 1
            : item.iconType === 'team' || item.iconType === 'workspace' ? 2
            : 3;
          const titleHeight = titleLines * 22; // 22px, 44px, or 66px

          return (
            <div
              key={item.id}
              className="flex flex-col gap-[8px] rounded-[16px] cursor-pointer transition-shadow"
              style={{
                backgroundColor: isSelected
                  ? 'transparent'
                  : isHovered
                  ? 'var(--muted)'
                  : 'color-mix(in srgb, var(--background) 96%, white)',
                border: '1px solid var(--sidebar-border)',
                padding: '16px',
                boxShadow: isHovered
                  ? '0px 0px 6px 0px rgba(0,0,0,0.025), 0px 1px 5px 0px rgba(0,0,0,0.04), 0px 6px 15px 0px rgba(50,50,93,0.075)'
                  : '0px 0px 6px 0px rgba(0,0,0,0.025), 0px 1px 5px 0px rgba(0,0,0,0.04), 0px 4px 9px 0px rgba(50,50,93,0.055)',
                transition: `background-color var(--transition-duration) var(--transition-timing)`,
              }}
              onClick={() => {
                setSelectedCard(selectedCard === item.id ? null : item.id);
                onItemClick?.(item);
              }}
              onDoubleClick={() => onItemDoubleClick?.(item)}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Pictogram */}
              {renderPictogram(item)}

              {/* Content section — fills remaining height, pushes buttons to bottom */}
              <div className="flex-1 flex flex-col justify-between">
                {/* Text group — 12px gap for accounts, 8px for all others */}
                <div className={`flex flex-col ${item.iconType === 'account' ? 'gap-[12px]' : 'gap-[8px]'}`}>
                  {/* Title */}
                  <h3
                    className={`text-[16px] font-medium leading-[22px] ${titleLines === 1 ? 'line-clamp-1' : titleLines === 2 ? 'line-clamp-2' : 'line-clamp-3'}`}
                    style={{
                      color: (isHovered || isSelected) ? 'var(--primary)' : 'var(--foreground)',
                      height: `${titleHeight}px`,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      letterSpacing: 'var(--letter-spacing-md)',
                      wordWrap: 'break-word',
                    }}
                    title={item.name}
                  >
                    {item.name}
                  </h3>

                  {/* Type-specific metadata */}
                  {renderCardMetadata(item)}
                </div>

                {/* Buttons row — hidden on desktop until card is hovered; always visible on mobile */}
                <div
                  className={`flex items-center justify-end pt-[4px] ${(isHovered || isSelected || openMenuId === item.id) ? 'opacity-100' : 'opacity-100 md:opacity-0'}`}
                  style={{ transition: `opacity var(--transition-duration) var(--transition-timing)` }}
                >
                  <button
                    className="size-[32px] flex items-center justify-center rounded-full shrink-0"
                    style={{
                      backgroundColor: hoveredFavorite === `${item.id}-favorite` ? 'var(--bg-icon-hover)' : 'transparent',
                      transition: `background-color var(--transition-duration) var(--transition-timing)`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onStarClick?.(item, !isStarred);
                    }}
                    onMouseEnter={() => setHoveredFavorite(`${item.id}-favorite`)}
                    onMouseLeave={() => setHoveredFavorite(null)}
                  >
                    <Star
                      className="size-[16px]"
                      fill={isStarred ? 'currentColor' : 'none'}
                      style={{ color: 'var(--text-foreground)' }}
                      strokeWidth={1.5}
                    />
                  </button>
                  <button
                    ref={(el) => el && moreButtonRefs.current.set(item.id, el)}
                    className="size-[32px] flex items-center justify-center rounded-full shrink-0"
                    style={{
                      backgroundColor: hoveredFavorite === `${item.id}-more` || openMenuId === item.id ? 'var(--bg-icon-hover)' : 'transparent',
                      transition: `background-color var(--transition-duration) var(--transition-timing)`,
                    }}
                    onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === item.id ? null : item.id); }}
                    onMouseEnter={() => setHoveredFavorite(`${item.id}-more`)}
                    onMouseLeave={() => setHoveredFavorite(null)}
                    title="More options"
                  >
                    <MoreHorizontal className="size-[16px]" style={{ color: 'var(--text-foreground)' }} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>

      {/* Dropdown menus — rendered outside the grid to avoid overflow clipping */}
      {data.map((item) => {
        const anchorRef = { current: moreButtonRefs.current.get(item.id) || null };
        const menuItems = createDefaultMenuItems(
          item.name,
          () => { toast.success(`Rename: ${item.name}`); setOpenMenuId(null); },
          () => { toast.success(`Share: ${item.name}`); setOpenMenuId(null); },
          () => { toast.success(`Duplicate: ${item.name}`); setOpenMenuId(null); },
          () => { toast.success(`Move: ${item.name}`); setOpenMenuId(null); },
          () => { toast.success(`Delete: ${item.name}`); setOpenMenuId(null); }
        );
        return (
          <DropdownMenu
            key={`menu-${item.id}`}
            items={menuItems}
            isOpen={openMenuId === item.id}
            onClose={() => setOpenMenuId(null)}
            anchorRef={anchorRef as React.RefObject<HTMLElement>}
          />
        );
      })}
    </div>
  );
}