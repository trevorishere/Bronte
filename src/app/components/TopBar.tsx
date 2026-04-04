import { ChevronLeft, Plus, Share2, Info } from 'lucide-react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { ActionButtons } from './ActionButtons';
import { IconButton } from './IconButton';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './ui/breadcrumb';
import type { BreadcrumbEntry } from '../contexts/NavigationContext';

// ============================================================
// Internal BreadcrumbNav component
// entries = full trail including current page as last item
// ============================================================
function BreadcrumbNav({ entries, titleSuffix }: { entries: BreadcrumbEntry[]; titleSuffix?: ReactNode }) {
  const navigate = useNavigate();

  const truncate = (label: string, max = 22) =>
    label.length > max ? label.slice(0, max) + '…' : label;

  if (entries.length === 0) return null;

  const ancestors = entries.slice(0, -1);
  const current = entries[entries.length - 1];

  // Determine which ancestors to show
  // Max 2 visible ancestors; if more, show first + ellipsis + last
  let visibleAncestors: BreadcrumbEntry[];
  let showEllipsis = false;
  let firstAncestor: BreadcrumbEntry | null = null;

  if (ancestors.length <= 2) {
    visibleAncestors = ancestors;
  } else {
    firstAncestor = ancestors[0];
    visibleAncestors = [ancestors[ancestors.length - 1]]; // only last ancestor before current
    showEllipsis = true;
  }

  const handleAncestorClick = (entry: BreadcrumbEntry, indexInFull: number) => {
    // Pass the ancestors up-to-but-not-including this entry as state
    const ancestorsUpToThis = entries.slice(0, indexInFull);
    navigate(entry.path, { state: { breadcrumbs: ancestorsUpToThis } });
  };

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-[16px] md:text-[16px] flex-nowrap">
        {/* First ancestor (when ellipsis applies) */}
        {showEllipsis && firstAncestor && (() => {
          const idx = 0; // firstAncestor is always at index 0 in entries
          return (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <button
                    className="whitespace-nowrap"
                    onClick={() => handleAncestorClick(firstAncestor!, idx)}
                    title={firstAncestor.label}
                  >
                    {truncate(firstAncestor.label)}
                  </button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis className="size-[16px]" />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          );
        })()}

        {/* Visible ancestors */}
        {visibleAncestors.map((entry) => {
          // Find the real index in the full entries array
          const idx = entries.findIndex(e => e.path === entry.path);
          return (
            <BreadcrumbItem key={entry.path}>
              <BreadcrumbLink asChild>
                <button
                  className="whitespace-nowrap"
                  onClick={() => handleAncestorClick(entry, idx)}
                  title={entry.label}
                >
                  {truncate(entry.label)}
                </button>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
          );
        })}

        {/* Current page — not clickable */}
        <BreadcrumbItem className="flex items-center gap-[8px]">
          <BreadcrumbPage
            className="font-semibold whitespace-nowrap"
            style={{ fontSize: '28px', color: 'var(--primary)', letterSpacing: 'var(--letter-spacing-lg)', lineHeight: 'normal' }}
            title={current.label}
          >
            {truncate(current.label, 30)}
          </BreadcrumbPage>
          {titleSuffix && <span className="shrink-0">{titleSuffix}</span>}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
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
  /** Full breadcrumb trail including current page as last item. When provided, replaces the back button. */
  breadcrumbs?: BreadcrumbEntry[];
  /** Called when the Info button is clicked */
  onInfoClick?: () => void;
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
  breadcrumbs,
  onInfoClick,
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
          fontSize: '14px',
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

  const renderLeft = () => {
    if (hasBreadcrumbs) {
      return <BreadcrumbNav entries={breadcrumbs} titleSuffix={titleSuffix} />;
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
      className="h-[64px] shrink-0 w-full"
      style={{
        backgroundColor: 'var(--background)',
        borderBottom: /*showBorder ? '1px solid var(--border)' :*/ 'none',
      }}
    >
      {/* ================================================================ */}
      {/* MOBILE LAYOUT                                                    */}
      {/* ================================================================ */}
      <div className="md:hidden flex items-center gap-1 pt-1 px-[16px] size-full">
        <div className="flex items-center flex-1 min-w-0 gap-[10px] overflow-hidden">
          {hasBreadcrumbs ? (
            <BreadcrumbNav entries={breadcrumbs} titleSuffix={titleSuffix} />
          ) : showBackButton ? (
            backBtn()
          ) : title ? (
            <h1
              className="truncate text-[24px]"
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'medium',
                lineHeight: 'normal',
                color: 'var(--primary)',
                letterSpacing: 'var(--letter-spacing-lg)',
              }}
            >
              {title}
            </h1>
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
      <div className="hidden md:flex items-center justify-between pt-1 pl-[24px] pr-[24px] size-full">
        <div className="flex items-center flex-1 min-w-0 gap-[16px] overflow-hidden">
          {hasBreadcrumbs ? (
            <BreadcrumbNav entries={breadcrumbs} titleSuffix={titleSuffix} />
          ) : showBackButton ? (
            backBtn()
          ) : title ? (
            <h1
              className="truncate text-[28px] font-semibold"
              style={{
                fontFamily: 'var(--font-family)',
                lineHeight: 'normal',
                color: 'var(--primary)',
                letterSpacing: 'var(--letter-spacing-lg)',
              }}
            >
              {title}
            </h1>
          ) : null}
        </div>

        {/* Top bar actions: Add, Share, Info */}
        <div className="flex items-center gap-[8px] shrink-0">
          <button
            className="flex items-center gap-[8px] h-[40px] rounded-[12px] transition-colors"
            style={{ border: '1px solid var(--border-interactive)', paddingLeft: '11px', paddingRight: '13px', paddingTop: '1px', paddingBottom: '1px', backgroundColor: 'transparent', cursor: 'pointer' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            title="Add"
          >
            <Plus className="size-[18px] shrink-0" style={{ color: 'var(--secondary-foreground)' }} strokeWidth={2.5} />
            <span style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-semibold)', fontSize: '15px', letterSpacing: '0.32px', color: 'var(--secondary-foreground)', whiteSpace: 'nowrap' }}>Add…</span>
          </button>
          <button
            className="flex items-center gap-[8px] h-[40px] rounded-[12px] transition-colors"
            style={{ border: '1px solid var(--border-interactive)', paddingLeft: '11px', paddingRight: '13px', paddingTop: '1px', paddingBottom: '1px', backgroundColor: 'transparent', cursor: 'pointer' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            title="Share"
          >
            <Share2 className="size-[18px] shrink-0" style={{ color: 'var(--secondary-foreground)' }} strokeWidth={2} />
            <span style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-semibold)', fontSize: '15px', letterSpacing: '0.32px', color: 'var(--secondary-foreground)', whiteSpace: 'nowrap' }}>Share</span>
          </button>
          <button
            className="flex items-center justify-center size-[40px] rounded-[12px] transition-colors"
            style={{ border: '1px solid var(--border-interactive)', paddingLeft: '13px', paddingRight: '13px', paddingTop: '1px', paddingBottom: '1px', backgroundColor: 'transparent', cursor: 'pointer' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            title="Info"
            onClick={onInfoClick}
          >
            <Info className="size-[18px] shrink-0" style={{ color: 'var(--secondary-foreground)' }} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
