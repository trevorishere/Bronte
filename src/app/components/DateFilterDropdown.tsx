import { useState, useRef, useEffect } from 'react';
import { X, ListFilter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DateRangePicker } from './DateRangePicker';
import { labelVariants, labelBgVariants } from '../constants/animation';
import { ts } from '../utils/textStyles';

// ── Chevron ──────────────────────────────────────────────────────────────────

function ChevronIcon({ isOpen, isActive }: { isOpen: boolean; isActive: boolean }) {
  return (
    <div
      className="flex items-center justify-center shrink-0 size-[16px]"
      style={{
        transform: isActive ? 'translateX(4px)' : 'translateX(0px)',
        transition: 'transform var(--duration-default) var(--ease-standard)',
      }}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
        style={{
          transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
          color: 'var(--foreground)',
          transition: 'transform var(--duration-fast) ease',
        }}
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          strokeLinecap="square"
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

interface DateFilterDropdownProps {
  label: string;
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
  /** Called when the exit animation finishes and new content has mounted.
   *  Toolbar uses this to force a re-render so layout="position" siblings
   *  can snapshot their before/after positions and animate. */
  onAnimationComplete?: () => void;
}

export function DateFilterDropdown({
  label,
  startDate,
  endDate,
  onDateChange,
  onAnimationComplete,
}: DateFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isChipXHovered, setIsChipXHovered] = useState(false);
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isActive = !!(startDate || endDate);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        panelRef.current && !panelRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const formatDateRange = (): string => {
    const fmt = (d: Date) => {
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const y = d.getFullYear();
      return `${m}/${day}/${y}`;
    };
    if (startDate && endDate) return `${fmt(startDate)} – ${fmt(endDate)}`;
    if (startDate) return fmt(startDate);
    if (endDate)   return `To ${fmt(endDate)}`;
    return '';
  };

  const handleToggle = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPanelPos({ top: rect.bottom + 8, left: rect.left });
    }
    setIsOpen(prev => !prev);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDateChange(null, null);
  };

  return (
    <div className="relative" ref={triggerRef}>
      {/* ── TRIGGER BUTTON ───────────────────────────────────────────────── */}
      <motion.button
        layout
        className="relative flex h-[40px] items-center bg-background group overflow-visible"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        style={{
          borderRadius: 'var(--radius-12)',
          minWidth: 'fit-content',
          boxShadow: (isHovered || isOpen)
            ? '0 0 0 1px var(--border-interactive-hover)'
            : '0 0 0 1px var(--border)',
          transition: isActive
            ? `box-shadow var(--duration-default) var(--ease-standard) var(--duration-fast)`
            : `box-shadow var(--duration-default) var(--ease-standard)`,
        }}
        transition={{
          layout: { type: 'spring', bounce: 0, duration: 0.5 },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleToggle}
      >
        {/* ── BUTTON CONTENT ───────────────────────────────────────────── */}
        <div
          className="flex items-center h-full"
          style={{ paddingLeft: isActive ? '8px' : '14px', paddingRight: '12px', gap: '12px' }}
        >
          {/* Middle slot: chip (active) or icon+label spacer (inactive) */}
          <AnimatePresence mode="wait" onExitComplete={onAnimationComplete}>
            {isActive ? (
              <motion.div
                key="active"
                layout
                className="flex items-center shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5, delay: 0 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                {/* Chip — calendar icon + date text + X */}
                <div
                  className="flex items-center shrink-0"
                  style={{
                    height: '28px',
                    backgroundColor: 'var(--bg-selected)',
                    border: '1px solid color-mix(in srgb, var(--border) 70%, transparent)',
                    borderRadius: 'var(--radius-8)',
                    paddingLeft: '12px',
                    paddingRight: '4px',
                    gap: '12px',
                  }}
                >
                  <span
                    className="truncate"
                    style={{
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontSize: 'var(--font-size-14)',
                      color: 'var(--foreground)',
                      whiteSpace: 'nowrap',
                      maxWidth: '200px',
                    }}
                  >
                    {formatDateRange()}
                  </span>
                  <div
                    onClick={clearSelection}
                    onMouseEnter={() => setIsChipXHovered(true)}
                    onMouseLeave={() => setIsChipXHovered(false)}
                    className="flex items-center justify-center p-[4px] rounded-[4px] cursor-pointer shrink-0"
                    style={{
                      pointerEvents: 'auto',
                      opacity: isChipXHovered ? 1 : 0.7,
                      backgroundColor: isChipXHovered ? 'var(--bg-icon-hover)' : 'transparent',
                      transition: 'opacity var(--duration-default) var(--ease-standard), background-color var(--duration-default) var(--ease-standard)',
                    }}
                  >
                    <X className="size-[12px]" style={{ color: 'var(--foreground)' }} strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Hidden spacer — sets button width to label text width.
                 motion.div so AnimatePresence mode="wait" holds it in DOM
                 for 100ms on exit, delaying the chip mount until t=100ms. */
              <motion.div
                key="inactive"
                layout
                className="shrink-0"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                {/* Invisible spacer — reserves same width as floating icon+label */}
                <div
                  aria-hidden="true"
                  style={{
                    visibility: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span style={{ display: 'block', width: '20px', height: '20px', flexShrink: 0 }} />
                  <span
                    style={{
                      ...ts.body,
                      fontSize: 'var(--font-size-15)',
                      whiteSpace: 'nowrap',
                      display: 'block',
                    }}
                  >
                    {label}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chevron — always in the outer row */}
          <ChevronIcon isOpen={isOpen} isActive={isHovered || isOpen} />
        </div>
      </motion.button>

      {/* ── FLOATING LABEL ───────────────────────────────────────────────── */}
      {/*
        Sibling of motion.button (not a child) so it is never inside the layout
        scaleX transform. The outer div.relative is the containing block.
        y:'-50%' keeps the label center pinned to the 'top' value at all times.
      */}
      <motion.div
        aria-hidden="true"
        initial="inactive"
        animate={isActive ? 'active' : 'inactive'}
        variants={labelVariants}
        style={{
          position: 'absolute',
          y: '-50%',
          transformOrigin: 'left center',
          pointerEvents: 'none',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background — fades in to create the border-cut effect */}
        <motion.div
          variants={labelBgVariants}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '-4px',
            right: '-4px',
            backgroundColor: 'var(--background)',
            zIndex: -1,
          }}
        />
        {/* Filter icon — animates up with the label as a nav-item-style unit */}
        <ListFilter
          className="shrink-0"
          style={{
            width: isActive ? '15px' : '20px',
            height: isActive ? '15px' : '20px',
            marginRight: isActive ? '6px' : '12px',
            color: isActive ? 'var(--border-interactive-hover)' : (isHovered || isOpen) ? 'var(--primary)' : 'var(--foreground)',
            transition: isActive
              ? `color var(--duration-default) var(--ease-standard), width var(--duration-default) var(--ease-standard), height var(--duration-default) var(--ease-standard), margin-right var(--duration-default) var(--ease-standard)`
              : `color var(--duration-default) var(--ease-standard) 50ms, width var(--duration-default) var(--ease-standard) 50ms, height var(--duration-default) var(--ease-standard) 50ms, margin-right var(--duration-default) var(--ease-standard) 50ms`,
          }}
          strokeWidth={2}
        />
        {/* Label text */}
        <span
          style={{
            position: 'relative',
            fontFamily: 'var(--font-family)',
            fontWeight: isActive ? 'var(--font-weight-regular)' : 'var(--font-weight-medium)',
            fontSize: isActive ? '14px' : 'var(--font-size-15)',
            letterSpacing: 'var(--letter-spacing-body)',
            lineHeight: 'var(--line-height-20)',
            whiteSpace: 'nowrap',
            display: 'block',
            color: isActive ? 'var(--border-interactive-hover)' : (isHovered || isOpen) ? 'var(--primary)' : 'var(--foreground)',
            transition: isActive
              ? `color var(--duration-default) var(--ease-standard), font-size var(--duration-default) var(--ease-standard), font-weight var(--duration-default) var(--ease-standard)`
              : `color var(--duration-default) var(--ease-standard) 50ms, font-size var(--duration-default) var(--ease-standard) 50ms, font-weight var(--duration-default) var(--ease-standard) 50ms`,
          }}
        >
          {label}
        </span>
      </motion.div>

      {/* ── DROPDOWN PANEL ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            className="pb-[8px]"
            style={{
              position: 'fixed',
              top: panelPos.top,
              left: panelPos.left,
              zIndex: 9999,
              transformOrigin: 'top center',
              border: `1px solid var(--border)`,
              borderRadius: 'var(--radius-16)',
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.25, type: 'spring', stiffness: 400, damping: 25 }}
          >
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onDateChange={onDateChange}
              onClose={() => setIsOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
