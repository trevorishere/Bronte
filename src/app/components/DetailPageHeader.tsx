import { ReactNode } from 'react';
import { Users, Mail, Calendar, Book, FolderOpen, UserRoundPlus, Plus, Info, MoreHorizontal } from 'lucide-react';
import type { IconSize } from './BaseIcon';

interface MetadataItemProps {
  icon?: ReactNode;
  label: string;
}

function MetadataItem({ icon, label }: MetadataItemProps) {
  return (
    <div className="flex items-center gap-[8px] shrink-0">
      {icon && (
        <div className="shrink-0 size-[16px] flex items-center justify-center">
          {icon}
        </div>
      )}
      <p
        style={{
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-regular)',
          fontSize: 'var(--font-size-14)',
          color: 'var(--muted-foreground)',
          letterSpacing: 'var(--letter-spacing-md)',
          lineHeight: 'normal',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </p>
    </div>
  );
}

interface DetailPageHeaderProps {
  title: string;
  badge?: ReactNode;
  /**
   * Render function — receives the size the header wants to use for this breakpoint.
   * Mobile uses 'large', desktop uses 'large' but positioned differently.
   * Example: icon={(size) => <TeamIcon size={size} />}
   */
  icon?: (size: IconSize) => ReactNode;
  metadata: Array<{
    icon?: 'email' | 'calendar' | 'users' | 'book' | 'folder' | ReactNode;
    label: string;
  }>;
  /** Called when the share button is tapped */
  onShareClick?: () => void;
  /** Called when the info button is tapped */
  onInfoClick?: () => void;
}

export function DetailPageHeader({ title, badge, icon, metadata, onShareClick, onInfoClick }: DetailPageHeaderProps) {
  const getIconElement = (iconType: 'email' | 'calendar' | 'users' | 'book' | 'folder' | ReactNode) => {
    if (typeof iconType !== 'string') {
      return iconType;
    }

    switch (iconType) {
      case 'email':
        return <Mail className="size-[16px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />;
      case 'calendar':
        return <Calendar className="size-[16px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />;
      case 'users':
        return <Users className="size-[16px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />;
      case 'book':
        return <Book className="size-[16px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />;
      case 'folder':
        return <FolderOpen className="size-[16px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />;
      default:
        return null;
    }
  };

  const actionBtnStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: '1px solid var(--border-interactive)',
    color: 'var(--foreground)',
    cursor: 'pointer',
  };

  const mobileActionHover = {
    onMouseOver: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = 'var(--bg-rollover)';
    },
    onMouseOut: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = 'transparent';
    },
  };

  return (
    <div className="shrink-0">

      {/* ================================================================ */}
      {/* MOBILE LAYOUT — action buttons only, left aligned              */}
      {/* ================================================================ */}
      <div className="md:hidden flex items-center gap-[8px] px-4 pt-3 pb-3">
        {onShareClick && (
          <button
            className="flex items-center justify-center size-[34px] rounded-xl transition-colors"
            style={actionBtnStyle}
            title="Share"
            onClick={onShareClick}
            {...mobileActionHover}
          >
            <UserRoundPlus className="size-[15px]" strokeWidth={2} />
          </button>
        )}
        <button
          className="flex items-center justify-center size-[34px] rounded-xl transition-colors"
          style={actionBtnStyle}
          title="New"
          {...mobileActionHover}
        >
          <Plus className="size-[15px]" strokeWidth={2.5} />
        </button>
        <button
          className="flex items-center justify-center size-[34px] rounded-xl transition-colors"
          style={actionBtnStyle}
          title="Info"
          onClick={onInfoClick}
          {...mobileActionHover}
        >
          <Info className="size-[15px]" strokeWidth={2} />
        </button>
      </div>

      {/* ================================================================ */}
      {/* DESKTOP LAYOUT — hidden; title shown in TopBar, actions in Toolbar */}
      {/* ================================================================ */}
      <div className="hidden pl-[32px] pr-[32px] pt-[16px] pb-[20px]">
        <div className="flex items-center justify-between gap-4">

          {/* Left: icon + title + badge + metadata */}
          <div className="flex items-center gap-5 min-w-0">
            {icon && (
              <div className="shrink-0">
                {icon('large')}
              </div>
            )}

            <div className="flex flex-col items-start gap-2 min-w-0">
              {/* Title + badge */}
              <div className="flex flex-row items-center gap-[12px]">
                <h2
                  className="font-medium"
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontSize: 'var(--font-size-24)',
                    color: 'var(--primary)',
                    letterSpacing: 'var(--letter-spacing-md)',
                    lineHeight: 'normal',
                  }}
                >
                  {title}
                </h2>
                {badge && <div>{badge}</div>}
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-[10px]">
                {metadata.map((item, index) => (
                  <MetadataItem
                    key={index}
                    icon={item.icon ? getIconElement(item.icon) : undefined}
                    label={item.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: action buttons */}
          <div className="shrink-0 flex items-center gap-[8px]">
            {onShareClick && (
              <button
                className="flex items-center gap-[6px] h-[32px] px-[12px] rounded-lg transition-colors"
                style={actionBtnStyle}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-rollover)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                title="Share"
                onClick={onShareClick}
              >
                <UserRoundPlus className="size-[14px]" strokeWidth={2} />
                <span style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-14)', letterSpacing: 'var(--letter-spacing-md)', color: 'var(--foreground)' }}>Share</span>
              </button>
            )}
            <button
              className="flex items-center gap-[6px] h-[32px] px-[12px] rounded-lg transition-colors"
              style={actionBtnStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-rollover)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              title="New"
            >
              <Plus className="size-[14px]" strokeWidth={2.5} style={{ color: 'white' }} />
              <span style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-14)', letterSpacing: 'var(--letter-spacing-md)', color: 'var(--foreground)' }}>New</span>
            </button>
            <button
              className="flex items-center justify-center size-[32px] rounded-lg transition-colors"
              style={actionBtnStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-rollover)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              title="More options"
            >
              <MoreHorizontal className="size-[15px]" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
