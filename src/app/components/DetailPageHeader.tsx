import { ReactNode } from 'react';
import { Users, Mail, Calendar, Book, FolderOpen, Share2, Plus, MoreHorizontal } from 'lucide-react';
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
          fontWeight: 'var(--font-weight-medium)',
          fontSize: '14px',
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
}

export function DetailPageHeader({ title, badge, icon, metadata }: DetailPageHeaderProps) {
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
      e.currentTarget.style.backgroundColor = 'var(--muted)';
    },
    onMouseOut: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = 'transparent';
    },
  };

  return (
    <div className="shrink-0">

      {/* ================================================================ */}
      {/* MOBILE LAYOUT — centered profile card                           */}
      {/* ================================================================ */}
      <div className="md:hidden flex flex-col items-center gap-[10px] px-4 pt-6 pb-5 text-center">

        {/* Icon — large, centered */}
        {icon && (
          <div className="mb-1">
            {icon('large')}
          </div>
        )}

        {/* Title + badge */}
        <div className="flex flex-col items-center gap-[6px]">
          <h2
            className="font-bold leading-tight"
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: '22px',
              color: 'var(--primary)',
              letterSpacing: '0.22px',
            }}
          >
            {title}
          </h2>
          {badge && <div>{badge}</div>}
        </div>

        {/* Metadata — centered, wrapping */}
        {metadata.length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-[12px] gap-y-[6px]">
            {metadata.map((item, index) => (
              <MetadataItem
                key={index}
                icon={item.icon ? getIconElement(item.icon) : undefined}
                label={item.label}
              />
            ))}
          </div>
        )}

        {/* Action buttons — labeled row */}
        <div className="flex items-center gap-[8px] mt-1">
          <button
            className="flex items-center gap-[6px] px-[14px] h-[34px] rounded-xl transition-colors"
            style={actionBtnStyle}
            {...mobileActionHover}
          >
            <Share2 className="size-[13px]" strokeWidth={2} />
            <span style={{ fontFamily: 'var(--font-family)', fontSize: '13px', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-md)' }}>
              Share
            </span>
          </button>
          <button
            className="flex items-center gap-[6px] px-[14px] h-[34px] rounded-xl transition-colors"
            style={actionBtnStyle}
            {...mobileActionHover}
          >
            <Plus className="size-[13px]" strokeWidth={2.5} />
            <span style={{ fontFamily: 'var(--font-family)', fontSize: '13px', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-md)' }}>
              New
            </span>
          </button>
          <button
            className="flex items-center justify-center size-[34px] rounded-xl transition-colors"
            style={actionBtnStyle}
            title="More options"
            {...mobileActionHover}
          >
            <MoreHorizontal className="size-[15px]" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* DESKTOP LAYOUT — horizontal, icon left                          */}
      {/* ================================================================ */}
      <div className="hidden md:block pl-[40px] pr-[48px] pt-[24px] pb-[32px]">
        <div className="flex items-start justify-between gap-4">

          {/* Left: icon + title + badge + metadata */}
          <div className="flex items-start gap-4 min-w-0">
            {icon && (
              <div className="shrink-0 mt-1">
                {icon('large')}
              </div>
            )}

            <div className="flex flex-col items-start gap-3 min-w-0">
              {/* Title + badge */}
              <div className="flex flex-row items-center gap-[16px]">
                <h2
                  className="font-bold"
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontSize: '32px',
                    color: 'var(--primary)',
                    letterSpacing: '0.32px',
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

          {/* Right: action buttons — icon-only */}
          <div className="flex items-center gap-[6px] shrink-0 pt-2">
            <button
              className="flex items-center justify-center size-[32px] rounded-lg transition-colors"
              style={actionBtnStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              title="Share"
            >
              <Share2 className="size-[15px]" strokeWidth={2} />
            </button>
            <button
              className="flex items-center justify-center size-[32px] rounded-lg transition-colors"
              style={actionBtnStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              title="New"
            >
              <Plus className="size-[15px]" strokeWidth={2.5} />
            </button>
            <button
              className="flex items-center justify-center size-[32px] rounded-lg transition-colors"
              style={actionBtnStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
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
