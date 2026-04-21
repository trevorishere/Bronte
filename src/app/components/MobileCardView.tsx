import { Star, MoreHorizontal, ShieldCheck, Code2, PenLine } from 'lucide-react';
import { getMetadataString } from '../utils/getMetadataString';
import { useState, useRef } from 'react';
import { Avatar, roleColors, Role } from './Avatar';
import { TeamIcon } from './TeamIcon';
import { WorkspaceIcon } from './WorkspaceIcon';
import { ProjectIcon } from './ProjectIcon';
import { RowData } from './DataTable';
import { DropdownMenu, createDefaultMenuItems, MenuItem } from './DropdownMenu';
import { toast } from 'sonner';
import { accounts } from '../data/accounts';

interface MobileCardViewProps {
  data: RowData[];
  onRowClick?: (row: RowData) => void;
  onRowDoubleClick?: (row: RowData) => void;
  onStarClick?: (row: RowData, isStarred: boolean) => void;
  starredItems?: Set<string>;
  onSortChange?: (columnKey: string) => void;
  viewMode?: 'grid' | 'list';
}

export function MobileCardView({
  data,
  onRowClick,
  onRowDoubleClick,
  onStarClick,
  starredItems,
  viewMode = 'list',
}: MobileCardViewProps) {
  const [openMenuRowId, setOpenMenuRowId] = useState<string | null>(null);
  const moreButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const renderIcon = (row: RowData, size: 'small' | 'medium' | 'large' = 'medium') => {
    const iconType = row.iconType || 'user';
    if (iconType === 'user' || iconType === 'account') {
      const account = accounts.find(acc => acc.name === (row.name || row.accountName || row.teamName));
      const role = row.role || account?.role || 'Creator';
      return <Avatar size={size} name={row.name || row.accountName || row.teamName} role={role as any} />;
    } else if (iconType === 'team') {
      return <TeamIcon size={size} />;
    } else if (iconType === 'workspace') {
      return <WorkspaceIcon size={size} name={row.name || row.workspaceName || ''} />;
    } else if (iconType === 'project' || iconType === 'folder' || iconType === 'file' || iconType === 'book') {
      return <ProjectIcon size={size} />;
    }
    return null;
  };

  // Grid View Rendering
  if (viewMode === 'grid') {
    return (
      <>
        <div className="grid grid-cols-2 gap-[16px] px-[16px] pt-[8px] pb-[80px]">
          {data.map((row) => {
            const primaryName = row.name || row.projectName || row.accountName || row.teamName || row.workspaceName;
            const isStarred = starredItems?.has(row.id) || false;

            // Title lines: account=1, team/workspace=2, project=3
            const titleLines = row.iconType === 'account' ? 1
              : row.iconType === 'team' || row.iconType === 'workspace' ? 2
              : 3;
            const titleHeight = titleLines * 22;

            return (
              <div
                key={row.id}
                onClick={() => (onRowDoubleClick ?? onRowClick)?.(row)}
                className="flex flex-col gap-[8px] p-[16px] rounded-[16px] cursor-pointer"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--background) 96%, white)',
                  border: '1px solid var(--sidebar-border)',
                  boxShadow: '0px 0px 6px 0px rgba(0,0,0,0.02), 0px 1px 5px 0px rgba(0,0,0,0.04), 0px 4px 9px 0px rgba(50,50,93,0.05)',
                }}
              >
                {/* Icon area — fixed height, centered */}
                <div className="h-[104px] flex items-center justify-center w-full shrink-0">
                  {renderIcon(row, 'large')}
                </div>

                {/* Content section — fills remaining height, pushes actions to bottom */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Text group — 12px gap for accounts, 8px for all others */}
                  <div className={`flex flex-col ${row.iconType === 'account' ? 'gap-[12px]' : 'gap-[8px]'}`}>
                    {/* Title */}
                    <p
                      className={titleLines === 1 ? 'line-clamp-1' : titleLines === 2 ? 'line-clamp-2' : 'line-clamp-3'}
                      style={{
                        fontFamily: 'var(--font-family)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontSize: '16px',
                        lineHeight: '22px',
                        height: `${titleHeight}px`,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        letterSpacing: '0.3px',
                        color: 'var(--foreground)',
                      }}
                    >
                      {primaryName}
                    </p>

                    {/* Type-specific metadata */}
                    {row.iconType === 'account' ? (
                      <div className="flex flex-col gap-[4px]">
                        {/* Compact role badge */}
                        {row.role && (() => {
                          const role = row.role as Role;
                          const colors = roleColors[role];
                          const roleIconMap: Record<Role, React.ReactNode> = {
                            Admin:     <ShieldCheck className="size-[10px] shrink-0" strokeWidth={2} />,
                            Developer: <Code2       className="size-[10px] shrink-0" strokeWidth={2} />,
                            Creator:   <PenLine     className="size-[10px] shrink-0" strokeWidth={2} />,
                          };
                          return (
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
                              <span style={{
                                fontFamily: 'var(--font-family)',
                                fontWeight: 'var(--font-weight-medium)',
                                fontSize: '11px',
                                letterSpacing: '0.2px',
                                color: 'var(--role-pill-text)',
                                whiteSpace: 'nowrap',
                                lineHeight: 'normal',
                              }}>
                                {role}
                              </span>
                            </div>
                          );
                        })()}
                        {/* Access level */}
                        {row.accessLevel && (
                          <p style={{
                            fontFamily: 'var(--font-family)',
                            fontWeight: 'var(--font-weight-regular)',
                            fontSize: '12px',
                            lineHeight: '18px',
                            letterSpacing: 'var(--letter-spacing-md)',
                            color: 'var(--muted-foreground)',
                          }}>
                            {row.accessLevel}
                          </p>
                        )}
                      </div>
                    ) : row.iconType === 'workspace' ? (
                      <div className="flex flex-col gap-[2px]">
                        {row.workspaceProjectCount != null && (
                          <p style={{
                            fontFamily: 'var(--font-family)',
                            fontWeight: 'var(--font-weight-regular)',
                            fontSize: '12px',
                            lineHeight: '18px',
                            letterSpacing: 'var(--letter-spacing-md)',
                            color: 'var(--muted-foreground)',
                          }}>
                            {row.workspaceProjectCount} {row.workspaceProjectCount === 1 ? 'Project' : 'Projects'}
                          </p>
                        )}
                        {row.workspaceMemberCount != null && (
                          <p style={{
                            fontFamily: 'var(--font-family)',
                            fontWeight: 'var(--font-weight-regular)',
                            fontSize: '12px',
                            lineHeight: '18px',
                            letterSpacing: 'var(--letter-spacing-md)',
                            color: 'var(--muted-foreground)',
                          }}>
                            {row.workspaceMemberCount} {row.workspaceMemberCount === 1 ? 'Member' : 'Members'}
                          </p>
                        )}
                      </div>
                    ) : (
                      // project (default)
                      <div className="flex flex-col gap-[2px]">
                        {row.owner && (
                          <p style={{
                            fontFamily: 'var(--font-family)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontSize: '12px',
                            lineHeight: '20px',
                            letterSpacing: 'var(--letter-spacing-md)',
                            color: 'var(--muted-foreground)',
                          }}>
                            {row.owner}
                          </p>
                        )}
                        {row.accountCount != null && (
                          <p style={{
                            fontFamily: 'var(--font-family)',
                            fontWeight: 'var(--font-weight-regular)',
                            fontSize: '12px',
                            lineHeight: '20px',
                            letterSpacing: 'var(--letter-spacing-md)',
                            color: 'var(--muted-foreground)',
                          }}>
                            {row.accountCount} {row.accountCount === 1 ? 'Member' : 'Members'}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom actions: star + ellipsis, right-aligned */}
                  <div className="flex items-center justify-end pt-[4px]">
                    <button
                      className="flex items-center justify-center size-[32px] rounded-full transition-colors"
                      style={{ backgroundColor: 'transparent', color: 'var(--icon)' }}
                      onClick={(e) => { e.stopPropagation(); onStarClick?.(row, !isStarred); }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      title={isStarred ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Star size={16} fill={isStarred ? 'currentColor' : 'none'} strokeWidth={2} style={{ color: 'var(--icon)' }} />
                    </button>
                    <button
                      ref={(el) => el && moreButtonRefs.current.set(row.id, el)}
                      className="flex items-center justify-center size-[32px] rounded-full transition-colors"
                      style={{ backgroundColor: 'transparent', color: 'var(--icon)' }}
                      onClick={(e) => { e.stopPropagation(); setOpenMenuRowId(openMenuRowId === row.id ? null : row.id); }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      title="More options"
                    >
                      <MoreHorizontal size={16} strokeWidth={1.875} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Grid mode dropdown menus */}
        {data.map((row) => {
          const anchorRef = { current: moreButtonRefs.current.get(row.id) || null };
          const menuItems = createDefaultMenuItems(
            row.name || row.projectName || row.accountName || row.teamName || row.workspaceName || '',
            () => { toast.success(`Rename: ${row.name}`); setOpenMenuRowId(null); },
            () => { toast.success(`Share: ${row.name}`); setOpenMenuRowId(null); },
            () => { toast.success(`Duplicate: ${row.name}`); setOpenMenuRowId(null); },
            () => { toast.success(`Move: ${row.name}`); setOpenMenuRowId(null); },
            () => { toast.success(`Delete: ${row.name}`); setOpenMenuRowId(null); }
          );
          return (
            <DropdownMenu
              key={`grid-menu-${row.id}`}
              items={menuItems}
              isOpen={openMenuRowId === row.id}
              onClose={() => setOpenMenuRowId(null)}
              anchorRef={anchorRef}
            />
          );
        })}
      </>
    );
  }

  // List View Rendering (default)
  return (
    <>
      <div className="flex flex-col">
        {data.map((row) => {
          const primaryName = row.name || row.projectName || row.accountName || row.teamName || row.workspaceName;

          const metaLine = getMetadataString(row);

          return (
            <div
              key={row.id}
              onClick={() => (onRowDoubleClick ?? onRowClick)?.(row)}
              className="flex items-center gap-3 h-[64px] cursor-pointer px-4"
            >
              {/* Icon */}
              <div className="shrink-0">
                {renderIcon(row)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col">
                <p
                  className="truncate"
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontSize: '15px',
                    lineHeight: '21px',
                    letterSpacing: 'var(--letter-spacing-md)',
                    color: 'var(--primary)',
                  }}
                >
                  {primaryName}
                </p>
                {metaLine && (
                  <p
                    className="truncate"
                    style={{
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-regular)',
                      fontSize: '11px',
                      letterSpacing: 'var(--letter-spacing-md)',
                      lineHeight: 'normal',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {metaLine}
                  </p>
                )}
              </div>

              {/* More Button - always visible on mobile */}
              <button
                ref={(el) => el && moreButtonRefs.current.set(row.id, el)}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuRowId(openMenuRowId === row.id ? null : row.id);
                }}
                className="flex items-center justify-center size-[36px] rounded-full shrink-0"
                style={{ color: 'var(--icon)', backgroundColor: 'transparent' }}
              >
                <MoreHorizontal size={20} strokeWidth={1.875} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Dropdown Menus */}
      {data.map((row) => {
        const anchorRef = { current: moreButtonRefs.current.get(row.id) || null };
        const menuItems = createDefaultMenuItems(
          row.name || row.projectName || row.accountName || row.teamName || row.workspaceName || '',
          () => { toast.success(`Rename: ${row.name}`); setOpenMenuRowId(null); },
          () => { toast.success(`Share: ${row.name}`); setOpenMenuRowId(null); },
          () => { toast.success(`Duplicate: ${row.name}`); setOpenMenuRowId(null); },
          () => { toast.success(`Move: ${row.name}`); setOpenMenuRowId(null); },
          () => { toast.success(`Delete: ${row.name}`); setOpenMenuRowId(null); }
        );

        const menuItemsWithFavorite: MenuItem[] = [
          {
            id: 'favorite',
            label: starredItems?.has(row.id) ? 'Remove from Favorites' : 'Add to Favorites',
            icon: <Star className="size-4" fill={starredItems?.has(row.id) ? 'currentColor' : 'none'} />,
            onClick: () => {
              const isStarred = starredItems?.has(row.id) || false;
              onStarClick?.(row, !isStarred);
              setOpenMenuRowId(null);
            },
          },
          ...menuItems
        ];

        return (
          <DropdownMenu
            key={`menu-${row.id}`}
            items={menuItemsWithFavorite}
            isOpen={openMenuRowId === row.id}
            onClose={() => setOpenMenuRowId(null)}
            anchorRef={anchorRef}
          />
        );
      })}
    </>
  );
}
