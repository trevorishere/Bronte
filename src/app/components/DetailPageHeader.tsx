import { ReactNode } from 'react';
import { Users, FolderOpen, Mail, Calendar, Book, Share2, Plus, MoreHorizontal } from 'lucide-react';
import svgPaths from '../../imports/svg-5os55zlvdm';

interface MetadataItemProps {
  icon: ReactNode;
  label: string;
  fontSize?: '15px' | '16px';
}

function MetadataItem({ icon, label, fontSize = '14px' }: MetadataItemProps) {
  return (
    <div className="flex items-center gap-[12px] h-[24px]">
      {/* Ensure all icons are wrapped in a consistent 16px container */}
      <div className="relative shrink-0 size-[16px] flex items-center justify-center">
        {icon}
      </div>
      <p 
        className="font-regular"
        style={{ 
          fontFamily: 'var(--font-family)',
          fontSize,
          color: 'var(--secondary-foreground)',
          letterSpacing: fontSize === '12px' ? '0.13px' : '0.14px',
          lineHeight: 'normal'
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
  metadata: Array<{
    icon?: 'email' | 'calendar' | 'users' | 'book' | ReactNode;
    label: string;
  }>;
}

export function DetailPageHeader({ title, badge, metadata }: DetailPageHeaderProps) {
  const getIconElement = (iconType: 'email' | 'calendar' | 'users' | 'book' | ReactNode) => {
    if (typeof iconType !== 'string') {
      return iconType;
    }

    switch (iconType) {
      case 'email':
        return <Mail className="size-[18px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />;
      case 'calendar':
        return <Calendar className="size-[18px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />;
      case 'users':
        return <Users className="size-[18px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />;
      case 'book':
        return <Book className="size-[18px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />;
      default:
        return null;
    }
  };

  return (
    <div className="shrink-0 px-4 md:pl-[40px] md:pr-[48px] pt-6 md:pt-[16px] pb-4 md:pb-[40px]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col items-start gap-2 min-w-0">
          {/* Title and optional badge */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-[16px]">
            <h2
              className="font-bold text-left text-[28px] md:text-[32px]"
              style={{
                fontFamily: 'var(--font-family)',
                color: 'var(--primary)',
                letterSpacing: '0.32px',
                lineHeight: 'normal'
              }}
            >
              {title}
            </h2>
            {badge && <div className="self-start md:self-auto">{badge}</div>}
          </div>

          {/* Metadata - Horizontal layout with 24px spacing */}
          <div className="flex items-center gap-[24px]">
            {metadata.map((item, index) => (
              <MetadataItem
                key={index}
                icon={item.icon ? getIconElement(item.icon) : null}
                label={item.label}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons: Share, + New, More */}
        <div className="flex items-center gap-[8px] shrink-0 pt-1 md:pt-2">
          {/* Share */}
          <button
            className="flex items-center gap-[6px] h-[32px] px-[12px] rounded-lg transition-colors"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid var(--border-interactive)',
              color: 'var(--foreground)',
              fontFamily: 'var(--font-family)',
              fontSize: '13px',
              fontWeight: 'var(--font-weight-medium)',
              letterSpacing: 'var(--letter-spacing-md)',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Share2 className="size-[14px] shrink-0" strokeWidth={2} />
            <span className="hidden md:inline">Share</span>
          </button>

          {/* + New */}
          <button
            className="flex items-center gap-[6px] h-[32px] px-[12px] rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--background)',
              fontFamily: 'var(--font-family)',
              fontSize: '13px',
              fontWeight: 'var(--font-weight-medium)',
              letterSpacing: 'var(--letter-spacing-md)',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            <Plus className="size-[14px] shrink-0" strokeWidth={2.5} />
            <span className="hidden md:inline">New</span>
          </button>

          {/* More */}
          <button
            className="flex items-center justify-center size-[32px] rounded-lg transition-colors"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid var(--border-interactive)',
              color: 'var(--foreground)',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <MoreHorizontal className="size-[16px]" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}