import { Star, MoreHorizontal } from 'lucide-react';
import { useState, useRef } from 'react';
import { Avatar } from './Avatar';
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
  onStarClick?: (row: RowData, isStarred: boolean) => void;
  onMoreClick?: (row: RowData) => void;
  starredItems?: Set<string>;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSortChange?: (columnKey: string) => void;
  viewMode?: 'grid' | 'list';
  onRename?: (row: RowData, newName: string) => void;
}

export function MobileCardView({
  data,
  onRowClick,
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
      const role = row.role || account?.role || 'Viewer';
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
      <div className="grid grid-cols-2 gap-2 p-3">
        {data.map((row) => {
          const primaryName = row.name || row.projectName || row.accountName || row.teamName || row.workspaceName;

          return (
            <div
              key={row.id}
              onClick={() => onRowClick?.(row)}
              className="relative flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer"
              style={{
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border-interactive)',
              }}
            >
              {/* Ellipsis button - always visible, top-right */}
              <button
                ref={(el) => el && moreButtonRefs.current.set(row.id, el)}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuRowId(openMenuRowId === row.id ? null : row.id);
                }}
                className="absolute top-1.5 right-1.5 flex items-center justify-center size-[28px] rounded-full"
                style={{ color: 'var(--icon)', backgroundColor: 'transparent' }}
              >
                <MoreHorizontal size={16} strokeWidth={1.875} />
              </button>

              {/* Icon */}
              <div className="shrink-0 mt-1">
                {renderIcon(row, 'large')}
              </div>

              {/* Name */}
              <p
                className="text-center w-full line-clamp-2"
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: 'var(--primary)',
                }}
              >
                {primaryName}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  // List View Rendering (default)
  return (
    <>
      <div className="flex flex-col">
        {data.map((row) => {
          const primaryName = row.name || row.projectName || row.accountName || row.teamName || row.workspaceName;
          const owner = row.owner || row.sharedBy;
          const memberCount = row.members || (row.teamName && '6 Members');

          return (
            <div
              key={row.id}
              onClick={() => onRowClick?.(row)}
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
                    lineHeight: '22px',
                    color: 'var(--primary)',
                  }}
                >
                  {primaryName}
                </p>
                {(owner || memberCount) && (
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
                    {owner && memberCount ? `${owner} · ${memberCount}` : owner || memberCount}
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
