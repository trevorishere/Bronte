import { useState, useRef, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';
import { ListFilter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DateRangePicker } from './DateRangePicker';

// ── Chevron ──────────────────────────────────────────────────────────────────

function ChevronIcon({ isOpen, isActive }: { isOpen: boolean; isActive: boolean }) {
  return (
    <div
      className="flex items-center justify-center shrink-0 size-[16px]"
      style={{
        transform: isActive ? 'translateX(4px)' : 'translateX(0px)',
        transition: 'transform 300ms cubic-bezier(0.42, 0, 0.58, 1)',
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
          transition: 'transform 0.2s ease',
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

// ── Variant definitions ──────────────────────────────────────────────────────

const labelVariants = {
  active: {
    top: -4,
    left: 12,
    scale: 0.85,
    paddingLeft: 4,
    paddingRight: 4,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const, delay: 0 },
  },
  inactive: {
    top: 24,
    left: 44,
    scale: 1,
    paddingLeft: 0,
    paddingRight: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const, delay: 0.05 },
  },
};

const labelBgVariants = {
  active:   { opacity: 1, transition: { duration: 0.5, delay: 0    } },
  inactive: { opacity: 0, transition: { duration: 0.5, delay: 0.05 } },
};

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
      setPanelPos({ top: rect.bottom + 4, left: rect.left });
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
        className="relative flex h-[48px] items-center bg-background group overflow-visible"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        style={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: (isHovered || isOpen)
            ? 'var(--border-interactive-hover)'
            : 'var(--border-interactive)',
          borderRadius: 'var(--radius-12)',
          minWidth: 'fit-content',
          transition: isActive
            ? 'border-color 300ms cubic-bezier(0.42, 0, 0.58, 1) 200ms'
            : 'border-color 300ms cubic-bezier(0.42, 0, 0.58, 1)',
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
          style={{ paddingLeft: '16px', paddingRight: '16px', gap: '12px' }}
        >
          {/* Icon — layout wrapper cancels parent scaleX; always 16px from left */}
          <motion.div layout className="shrink-0 flex items-center justify-center size-[18px]">
            <ListFilter
              className="size-[18px]"
              style={{ color: 'var(--muted-foreground)' }}
              strokeWidth={2}
            />
          </motion.div>

          {/* Middle slot: chip (active) or hidden spacer (inactive) */}
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
                    height: '32px',
                    backgroundColor: 'var(--bg-row-selected)',
                    border: '1px solid color-mix(in srgb, var(--border-interactive) 70%, transparent)',
                    borderRadius: '8px',
                    paddingLeft: '12px',
                    paddingRight: '8px',
                    gap: '8px',
                  }}
                >
                  <Calendar
                    className="size-[14px] shrink-0"
                    style={{ color: 'var(--foreground)' }}
                    strokeWidth={2}
                  />
                  <span
                    className="truncate"
                    style={{
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontSize: 'var(--font-size-15)',
                      color: 'var(--foreground)',
                      whiteSpace: 'nowrap',
                      maxWidth: '200px',
                    }}
                  >
                    {formatDateRange()}
                  </span>
                  <div
                    onClick={clearSelection}
                    className="flex items-center justify-center size-[16px] rounded cursor-pointer opacity-70 hover:opacity-100 transition-opacity shrink-0"
                    style={{ pointerEvents: 'auto' }}
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
                <span
                  aria-hidden="true"
                  style={{
                    visibility: 'hidden',
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-regular)',
                    fontSize: 'var(--font-size-15)',
                    letterSpacing: 'var(--letter-spacing-md)',
                    whiteSpace: 'nowrap',
                    display: 'block',
                  }}
                >
                  {label}
                </span>
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
        {/* Label text */}
        <span
          style={{
            position: 'relative',
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-regular)',
            fontSize: 'var(--font-size-15)',
            letterSpacing: 'var(--letter-spacing-md)',
            lineHeight: 'var(--line-height-20)',
            whiteSpace: 'nowrap',
            display: 'block',
            color: isActive ? 'var(--border-interactive)' : 'var(--foreground)',
            transition: isActive
              ? 'color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
              : 'color 300ms cubic-bezier(0.4, 0, 0.2, 1) 50ms',
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
            style={{
              position: 'fixed',
              top: panelPos.top,
              left: panelPos.left,
              zIndex: 9999,
              transformOrigin: 'top center',
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
