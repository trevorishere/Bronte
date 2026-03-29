import { Star, MoreHorizontal, List } from 'lucide-react';
import { useState } from 'react';
import { WorkspaceIcon } from './WorkspaceIcon';
import { TeamIcon } from './TeamIcon';
import { Avatar } from './Avatar';
import { ProjectIcon } from './ProjectIcon';
import { DropdownMenu } from './DropdownMenu';
import { accounts } from '../data/accounts';

export interface GridItemData {
  id: string;
  name: string;
  owner: string;
  iconType?: 'project' | 'workspace' | 'team' | 'account';
  workspace?: string;
  team?: string;
  // Additional metadata
  members?: number;
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
  const [hoveredFavorite, setHoveredFavorite] = useState<string | null>(null);

  const getRandomMembers = (id: string) => {
    // Generate consistent random number based on ID
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 5 + (hash % 96); // 5-100
  };

  const getPictogramColor = (iconType: string | undefined) => {
    // Each icon type has one consistent color
    if (iconType === 'project') {
      return '#D58C6F'; // Orange for projects
    }
    if (iconType === 'workspace') {
      return '#6BA0D2'; // Blue for workspaces
    }
    if (iconType === 'team') {
      return '#8B7AB8'; // Purple for teams
    }
    if (iconType === 'account') {
      return '#7CB8A2'; // Green for accounts
    }
    return '#6BA0D2';
  };

  const renderPictogram = (item: GridItemData) => {
    return (
      <div className="w-full h-[128px] flex items-center justify-center">
        {item.iconType === 'workspace' && item.name && (
          <WorkspaceIcon name={item.name} size="x-large" />
        )}
        {item.iconType === 'team' && (
          <TeamIcon size="x-large" />
        )}
        {item.iconType === 'account' && (
          <Avatar
            name={item.name}
            role={accounts.find(acc => acc.name === item.name)?.role || item.role || 'Viewer'}
            size="x-large"
          />
        )}
        {item.iconType === 'project' && (
          <ProjectIcon size="x-large" />
        )}
      </div>
    );
  };

  const metaTextStyle = {
    fontFamily: 'var(--font-family)',
    fontSize: '13px',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--muted-foreground)',
    letterSpacing: 'var(--letter-spacing-md)',
  };

  const renderMetadata = (item: GridItemData) => {
    // Projects: "Owner Name"
    if (item.iconType === 'project') {
      return (
        <span style={metaTextStyle}>
          {item.owner}
        </span>
      );
    }

    // Teams: "Y Projects"
    if (item.iconType === 'team') {
      const projCount = item.teamProjectCount ?? 0;
      return (
        <span style={metaTextStyle}>
          {projCount} Project{projCount !== 1 ? 's' : ''}
        </span>
      );
    }

    // Workspaces: "X Projects • Y Accounts"
    if (item.iconType === 'workspace') {
      const projCount = item.workspaceProjectCount ?? 0;
      const memberCount = item.workspaceMemberCount ?? 0;
      return (
        <span style={metaTextStyle}>
          {projCount} Project{projCount !== 1 ? 's' : ''} • {memberCount} Account{memberCount !== 1 ? 's' : ''}
        </span>
      );
    }

    // Accounts: "Role • Access Level"
    if (item.iconType === 'account') {
      const role = item.role || '';
      const accessLevel = item.accessLevel || '';
      return (
        <span style={metaTextStyle}>
          {role}{accessLevel ? ` • ${accessLevel}` : ''}
        </span>
      );
    }

    return null;
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>

      {/* Mobile header row — matches MobileSortHeader height/position, toggle on right */}
      {onViewModeChange && (
        <div className="md:hidden shrink-0 px-4 h-[40px] flex items-center justify-end">
          <button
            onClick={() => onViewModeChange('list')}
            className="flex items-center justify-center size-[40px] rounded-full transition-colors"
            style={{ backgroundColor: 'transparent' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <List className="size-[20px]" style={{ color: 'var(--icon)' }} strokeWidth={2} />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 md:px-[40px] pb-[80px] md:pb-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pt-4 md:pt-8">
        {data.map((item) => {
          const isStarred = favorites.has(item.id);
          const isHovered = hoveredCard === item.id;

          return (
            <div
              key={item.id}
              className="flex flex-col gap-[8px] rounded-[16px] cursor-pointer transition-shadow"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--background) 96%, white)',
                border: '1px solid var(--sidebar-border)',
                padding: '16px',
                paddingBottom: '20px',
                boxShadow: isHovered
                  ? '0px 0px 6px 0px rgba(0,0,0,0.025), 0px 1px 5px 0px rgba(0,0,0,0.04), 0px 6px 15px 0px rgba(50,50,93,0.075)'
                  : '0px 0px 6px 0px rgba(0,0,0,0.025), 0px 1px 5px 0px rgba(0,0,0,0.04), 0px 4px 9px 0px rgba(50,50,93,0.055)',
              }}
              onClick={() => onItemClick?.(item)}
              onDoubleClick={() => onItemDoubleClick?.(item)}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Pictogram */}
              <div style={{ marginBottom: '16px' }}>
                {renderPictogram(item)}
              </div>

              {/* Title - Two lines with fixed height */}
              <h3
                className="text-[16px] font-semibold leading-[24px]"
                style={{ 
                  color: 'var(--foreground)',
                  height: '48px', // Reserve space for 2 lines (24px * 2)
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  letterSpacing: 'var(--letter-spacing-md)',
                  wordWrap: 'break-word'
                }}
                title={item.name}
              >
                {item.name}
              </h3>

              {/* Owner */}
              <p
                className="text-[14px] font-normal leading-[21px]"
                style={{ color: 'var(--muted-foreground)', letterSpacing: 'var(--letter-spacing-md)' }}
              >
                {item.owner}
              </p>

              {/* Metadata and Actions */}
              <div className="flex items-center justify-between">
                {renderMetadata(item)}

                {/* Icon Buttons */}
                <div className="flex gap-[8px] items-center">
                  {/* Favorite Button */}
                  <button
                    className="size-[32px] flex items-center justify-center rounded-full transition-colors"
                    style={{
                      backgroundColor:
                        hoveredFavorite === `${item.id}-favorite`
                          ? 'var(--bg-nav-hover)'
                          : 'transparent',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onStarClick?.(item, !isStarred);
                    }}
                    onMouseEnter={() => setHoveredFavorite(`${item.id}-favorite`)}
                    onMouseLeave={() => setHoveredFavorite(null)}
                  >
                    <Star
                      size={16}
                      fill={isStarred ? 'currentColor' : 'none'}
                      style={{ color: 'var(--icon)' }}
                      strokeWidth={2}
                    />
                  </button>

                  {/* More Menu */}
                  <div style={{ position: 'relative', zIndex: 10 }}>
                    <DropdownMenu
                      trigger={
                        <button
                          className="size-[32px] flex items-center justify-center rounded-full transition-colors"
                          style={{
                            backgroundColor:
                              hoveredFavorite === `${item.id}-more`
                                ? 'var(--bg-nav-hover)'
                                : 'transparent',
                          }}
                          onClick={(e) => e.stopPropagation()}
                          onMouseEnter={() => setHoveredFavorite(`${item.id}-more`)}
                          onMouseLeave={() => setHoveredFavorite(null)}
                        >
                          <MoreHorizontal size={16} style={{ color: 'var(--icon)' }} />
                        </button>
                      }
                      items={[
                        { label: 'Open', action: () => console.log('Open', item.name) },
                        { label: 'Rename', action: () => console.log('Rename', item.name) },
                        { label: 'Duplicate', action: () => console.log('Duplicate', item.name) },
                        { type: 'separator' },
                        { label: 'Delete', action: () => console.log('Delete', item.name) },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}