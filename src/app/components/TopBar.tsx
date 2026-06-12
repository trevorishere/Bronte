import { ChevronLeft, ChevronRight, MoreHorizontal, UserRoundPlus, Info } from 'lucide-react';
import { ReactNode, useRef, useState, useEffect, cloneElement, isValidElement } from 'react';
import { useNavigate } from 'react-router';
import { ActionButtons } from './ActionButtons';
import { IconButton } from './IconButton';
import type { IconSize } from './BaseIcon';
import type { BreadcrumbEntry } from '../contexts/NavigationContext';

// ============================================================
// Internal BreadcrumbNav component
// entries = full trail including current page as last item
// Two-line layout on both mobile and desktop:
//   Line 1 — ancestor trail (chevrons between, none after last)
//   Line 2 — current page title
// ============================================================
function BreadcrumbNav({ entries, titleSuffix, titleIcon, ancMaxLen = 14, badgeIconOnly = false, isMobile = false }: {
  entries: BreadcrumbEntry[];
  titleSuffix?: ReactNode;
  /** Icon rendered to the left of the page title. Receives 'large' on desktop, 'medium' on mobile. */
  titleIcon?: (size: IconSize) => ReactNode;
  ancMaxLen?: number;
  badgeIconOnly?: boolean;
  isMobile?: boolean;
}) {
  const navigate = useNavigate();

  const truncate = (label: string, max = ancMaxLen) =>
    label.length > max ? label.slice(0, max) + '…' : label;

  if (entries.length === 0) return null;

  const ancestors = entries.slice(0, -1);
  const current = entries[entries.length - 1];

  // Max 2 visible ancestors; if more, show first + ellipsis + last
  let visibleAncestors: BreadcrumbEntry[];
  let showEllipsis = false;
  let firstAncestor: BreadcrumbEntry | null = null;

  if (ancestors.length <= 2) {
    visibleAncestors = ancestors;
  } else {
    firstAncestor = ancestors[0];
    visibleAncestors = [ancestors[ancestors.length - 1]];
    showEllipsis = true;
  }

  const handleAncestorClick = (entry: BreadcrumbEntry, indexInFull: number) => {
    const ancestorsUpToThis = entries.slice(0, indexInFull);
    navigate(entry.path, { state: { breadcrumbs: ancestorsUpToThis } });
  };

  const ancFontSize = isMobile ? '13px' : '14px';
  const ancTruncLen = isMobile ? 10 : ancMaxLen;
  const rowGap = isMobile ? 8 : 4;

  return (
    <div className="flex flex-col min-w-0 w-full" style={{ gap: rowGap }}>
      {/* Row 1: ancestor trail — chevrons between items, none after last */}
      {ancestors.length > 0 && (
        <div className="flex items-center overflow-hidden" style={{ gap: 2 }}>
          {showEllipsis && firstAncestor && (
            <>
              <button
                className="whitespace-nowrap transition-colors"
                style={{ fontFamily: 'var(--font-family)', fontSize: ancFontSize, color: 'var(--muted-foreground)', letterSpacing: 'var(--letter-spacing-md)' }}
                onClick={() => handleAncestorClick(firstAncestor!, 0)}
                title={firstAncestor.label}
                aria-label={firstAncestor.label}
              >
                {truncate(firstAncestor.label, ancTruncLen)}
              </button>
              <ChevronRight className="size-[11px] shrink-0" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />
              <MoreHorizontal className="size-[13px] shrink-0" style={{ color: 'var(--muted-foreground)' }} />
              <ChevronRight className="size-[11px] shrink-0" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />
            </>
          )}
          {visibleAncestors.map((entry, i) => {
            const idx = entries.findIndex(e => e.path === entry.path);
            const isLast = i === visibleAncestors.length - 1;
            return (
              <div key={entry.path} className="flex items-center shrink-0" style={{ gap: 2 }}>
                <button
                  className="whitespace-nowrap transition-colors"
                  style={{ fontFamily: 'var(--font-family)', fontSize: ancFontSize, color: 'var(--muted-foreground)', letterSpacing: 'var(--letter-spacing-md)' }}
                  onClick={() => handleAncestorClick(entry, idx)}
                  title={entry.label}
                  aria-label={entry.label}
                >
                  {truncate(entry.label, ancTruncLen)}
                </button>
                {!isLast && (
                  <ChevronRight className="size-[11px] shrink-0" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />
                )}
              </div>
            );
          })}
        </div>
      )}
      {/* Row 2: icon + current page title + suffix */}
      <div className="flex items-center min-w-0 overflow-hidden" style={{ gap: '16px' }}>
        {titleIcon && (
          <div className="shrink-0">{titleIcon('medium')}</div>
        )}
        <div className="flex items-center gap-[8px] min-w-0 overflow-hidden">
          <h1
            className="font-medium truncate min-w-0"
            style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-24)', color: 'var(--primary)', letterSpacing: 'var(--letter-spacing-md)', lineHeight: 'normal' }}
            title={current.label}
          >
            {current.label}
          </h1>
          {titleSuffix && (
            <span className="shrink-0">
              {isValidElement(titleSuffix)
                ? cloneElement(titleSuffix as React.ReactElement<{ iconOnly?: boolean }>, { iconOnly: badgeIconOnly })
                : titleSuffix}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TopBar
// ============================================================
interface TopBarProps {
  title?: string;
  userInitials?: string;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  showBackButton?: boolean;
  onBackClick?: () => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  mobileActions?: ReactNode;
  /** Node rendered after the current page label in the breadcrumb (e.g. a role pill) */
  titleSuffix?: ReactNode;
  /** Icon rendered to the left of the page title. Receives 'large' on desktop, 'medium' on mobile. */
  titleIcon?: (size: IconSize) => ReactNode;
  /** Full breadcrumb trail including current page as last item. When provided, replaces the back button. */
  breadcrumbs?: BreadcrumbEntry[];
  /** Called when the Info button is clicked */
  onInfoClick?: () => void;
  /** Called when the Share button is clicked */
  onShareClick?: () => void;
  /** Hide the Share action button */
  hideShare?: boolean;
  /** Number of members with access — shown as a badge on the Share button */
  shareCount?: number;
  /** Hide the Info (ⓘ) action button */
  hideInfo?: boolean;
}

export function TopBar({
  title,
  userInitials = 'LD',
  onThemeToggle,
  isDarkMode = false,
  showBackButton = false,
  onBackClick,
  viewMode,
  onViewModeChange,
  mobileActions,
  titleSuffix,
  titleIcon,
  breadcrumbs,
  onInfoClick,
  onShareClick,
  hideShare = false,
  hideInfo = false,
  shareCount = 0,
}: TopBarProps) {
  const backBtn = (extraClass = '') => (
    <button
      onClick={onBackClick}
      className={`flex items-center gap-[4px] rounded-lg transition-colors group ${extraClass}`}
      style={{ backgroundColor: 'transparent' }}
    >
      <ChevronLeft
        className="size-[18px] shrink-0 transition-colors group-hover:text-[color:var(--primary)]"
        style={{ color: 'var(--muted-foreground)' }}
        strokeWidth={2.5}
      />
      <span
        className="transition-colors group-hover:text-[color:var(--primary)]"
        style={{
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-regular)',
          fontSize: 'var(--font-size-14)',
          color: 'var(--muted-foreground)',
          letterSpacing: 'var(--letter-spacing-md)',
          lineHeight: 'normal',
        }}
      >
        Back
      </span>
    </button>
  );

  const hasBreadcrumbs = breadcrumbs && breadcrumbs.length > 0;
  const showBorder = hasBreadcrumbs || showBackButton;

  // Responsive breadcrumb: measure left section width to derive truncation level + badge mode
  const leftRef = useRef<HTMLDivElement>(null);
  const [ancMaxLen, setAncMaxLen] = useState(14);
  const [badgeIconOnly, setBadgeIconOnly] = useState(false);
  const [isShareHovered, setIsShareHovered] = useState(false);
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  useEffect(() => {
    if (!leftRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      // Priority: shorten ancestors → collapse badge → title truncates via CSS
      setAncMaxLen(w < 480 ? 6 : w < 600 ? 10 : 14);
      setBadgeIconOnly(w < 360);
    });
    observer.observe(leftRef.current);
    return () => observer.disconnect();
  }, []);

  const renderLeft = () => {
    if (hasBreadcrumbs) {
      return <BreadcrumbNav entries={breadcrumbs} titleSuffix={titleSuffix} ancMaxLen={ancMaxLen} badgeIconOnly={badgeIconOnly} />;
    }
    if (showBackButton) {
      return backBtn();
    }
    if (title) {
      return null; // title rendered separately per breakpoint
    }
    return null;
  };

  return (
    <div
      className="shrink-0 w-full"
      style={{
        backgroundColor: 'var(--background)',
        borderBottom: /*showBorder ? '1px solid var(--border-interactive)' :*/ 'none',
      }}
    >
      {/* ================================================================ */}
      {/* MOBILE LAYOUT                                                    */}
      {/* ================================================================ */}
      <div className="md:hidden flex items-center gap-1 pt-[28px] pb-[24px] px-[16px] w-full">
        <div className="flex items-center flex-1 min-w-0 gap-[10px] overflow-hidden">
          {hasBreadcrumbs ? (
            <BreadcrumbNav entries={breadcrumbs} titleSuffix={titleSuffix} titleIcon={titleIcon} ancMaxLen={ancMaxLen} badgeIconOnly={badgeIconOnly} isMobile={true} />
          ) : showBackButton ? (
            backBtn()
          ) : title ? (
            <div className="flex items-center min-w-0 overflow-hidden" style={{ gap: '16px' }}>
              {titleIcon && <div className="shrink-0">{titleIcon('medium')}</div>}
              <h1
                className="truncate text-[24px] font-medium"
                style={{
                  fontFamily: 'var(--font-family)',
                  lineHeight: 'normal',
                  color: 'var(--primary)',
                  letterSpacing: 'var(--letter-spacing-md)',
                }}
              >
                {title}
              </h1>
            </div>
          ) : null}
        </div>

        {mobileActions && (
          <div className="flex items-center gap-1 shrink-0">
            {mobileActions}
          </div>
        )}
      </div>

      {/* ================================================================ */}
      {/* DESKTOP LAYOUT                                                   */}
      {/* ================================================================ */}
      <div className="hidden md:flex items-start gap-[24px] pt-[28px] pb-[8px] pl-[24px] pr-[24px] w-full">
        <div ref={leftRef} className="flex items-center flex-1 min-w-0 gap-[16px] overflow-hidden">
          {hasBreadcrumbs ? (
            <BreadcrumbNav entries={breadcrumbs} titleSuffix={titleSuffix} titleIcon={titleIcon} ancMaxLen={ancMaxLen} badgeIconOnly={badgeIconOnly} />
          ) : showBackButton ? (
            backBtn()
          ) : title ? (
            <div className="flex items-center min-w-0 overflow-hidden" style={{ gap: '16px' }}>
              {titleIcon && <div className="shrink-0">{titleIcon('medium')}</div>}
              <h1
                className="truncate text-[24px] font-medium"
                style={{
                  fontFamily: 'var(--font-family)',
                  lineHeight: 'normal',
                  color: 'var(--primary)',
                  letterSpacing: 'var(--letter-spacing-md)',
                }}
              >
                {title}
              </h1>
            </div>
          ) : null}
        </div>

        {/* Top bar actions: Share, Info — offset to sit alongside the ancestor row */}
        <div className="flex items-center gap-[8px] shrink-0 mt-[-2px]">
          {!hideShare && (
          <button
            className="flex items-center gap-[8px] h-[40px] rounded-[12px]"
            style={{ border: `1px solid ${isShareHovered ? 'var(--border-interactive-hover)' : 'var(--border)'}`, paddingLeft: '12px', paddingRight: '12px', paddingTop: '1px', paddingBottom: '1px', backgroundColor: isShareHovered ? 'var(--bg-rollover)' : 'transparent', color: isShareHovered ? 'var(--primary)' : 'var(--foreground)', cursor: 'pointer', transition: `background-color var(--transition-duration) var(--transition-timing), color var(--transition-duration) var(--transition-timing), border-color var(--transition-duration) var(--transition-timing)` }}
            onMouseEnter={() => setIsShareHovered(true)}
            onMouseLeave={() => setIsShareHovered(false)}
            title="Share"
            onClick={onShareClick}
          >
            <UserRoundPlus className="size-[18px] shrink-0" style={{ color: isShareHovered ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)', transition: `color var(--transition-duration) var(--transition-timing)` }} strokeWidth={2} />
            <span style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-15)', letterSpacing: 'var(--letter-spacing-button)', whiteSpace: 'nowrap' }}>Share</span>
            {shareCount > 0 && (
              <div style={{
                width: 24,
                height: 24,
                borderRadius: 8,
                backgroundColor: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-family)',
                fontWeight: 600,
                fontSize: 'var(--font-size-13)',
                lineHeight: '20px',
                color: 'var(--foreground)',
                flexShrink: 0,
              }}>
                {shareCount}
              </div>
            )}
          </button>
          )}
          {!hideInfo && (
          <button
            className="flex items-center justify-center size-[40px] rounded-[12px]"
            style={{ border: `1px solid ${isInfoHovered ? 'var(--border-interactive-hover)' : 'var(--border)'}`, paddingLeft: '13px', paddingRight: '13px', paddingTop: '1px', paddingBottom: '1px', backgroundColor: isInfoHovered ? 'var(--bg-rollover)' : 'transparent', color: isInfoHovered ? 'var(--primary)' : 'var(--foreground)', cursor: 'pointer', transition: `background-color var(--transition-duration) var(--transition-timing), color var(--transition-duration) var(--transition-timing), border-color var(--transition-duration) var(--transition-timing)` }}
            onMouseEnter={() => setIsInfoHovered(true)}
            onMouseLeave={() => setIsInfoHovered(false)}
            title="Info"
            onClick={onInfoClick}
          >
            <Info className="size-[18px] shrink-0" strokeWidth={2} />
          </button>
          )}
        </div>
      </div>
    </div>
  );
}
