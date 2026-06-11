import { useState, useRef, useEffect } from 'react';
import { X, Check, Search, ListFilter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

// Label position / scale
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
    top: 24,   // half of 48px button height — y:'-50%' centers the text on this point
    left: 44,  // 16px pad + 16px icon + 12px gap
    scale: 1,
    paddingLeft: 0,
    paddingRight: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const, delay: 0.05 },
  },
};

// Background fill that creates the border-cut effect (fades in/out)
const labelBgVariants = {
  active:   { opacity: 1, transition: { duration: 0.5, delay: 0    } },
  inactive: { opacity: 0, transition: { duration: 0.5, delay: 0.05 } },
};

// ── Component ────────────────────────────────────────────────────────────────

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  isMulti?: boolean;
  /** Called when the exit animation finishes and new content has mounted.
   *  Toolbar uses this to force a re-render so layout="position" siblings
   *  can snapshot their before/after positions and animate. */
  onAnimationComplete?: () => void;
}

export function FilterDropdown({
  label,
  options,
  selectedValues,
  onSelectionChange,
  isMulti = false,
  onAnimationComplete,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [hoveredOptionX, setHoveredOptionX] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isActive = selectedValues.length > 0;
  const selectedValue = selectedValues.length > 0 ? selectedValues[0] : null;

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        panelRef.current && !panelRef.current.contains(target)
      ) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Focus search on open
  useEffect(() => {
    if (isOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [isOpen]);

  const toggleOption = (option: string) => {
    const isSelected = selectedValues.includes(option);
    if (isMulti) {
      onSelectionChange(
        isSelected ? selectedValues.filter(v => v !== option) : [...selectedValues, option]
      );
    } else {
      if (isSelected) {
        onSelectionChange([]);
      } else {
        onSelectionChange([option]);
        setIsOpen(false);
        setSearchQuery('');
      }
    }
  };

  const removeOption = (e: React.MouseEvent, option: string) => {
    e.stopPropagation();
    onSelectionChange(selectedValues.filter(v => v !== option));
  };

  const filteredOptions = options.filter(option =>
    option && option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPanelPos({ top: rect.bottom + 4, left: rect.left });
    }
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative" ref={triggerRef}>
      {/* ── TRIGGER BUTTON ───────────────────────────────────────────────── */}
      <motion.button
        layout
        className="relative flex h-[48px] items-center bg-background group overflow-visible"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        style={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: (isHovered || isOpen)
            ? 'var(--border-interactive-hover)'
            : 'var(--border-interactive)',
          borderRadius: 'var(--radius-12)',
          minWidth: 'fit-content',
          // Border-color transitions in sync with the width/chip animation:
          //   selecting   → 100ms delay, 250ms duration  (label+chip timing)
          //   deselecting → 0ms delay,   250ms duration  (chip fade timing)
          //   hover only  → 150ms quick response (isActive=false path)
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
        {/*
          Icon and chevron live in the outer row at all times — same position,
          same size, 100% opacity regardless of state.
          AnimatePresence mode="wait" serialises exit → enter so the DOM width
          only changes once the outgoing element has fully left.
          Both chip and spacer have a 100ms exit so:
            select:   spacer fades out (100ms) → chip mounts at t=100ms → width/chip/adjacent all start at t=100ms
            deselect: chip  fades out (100ms) → spacer mounts at t=100ms → width/adjacent start at t=100ms
          All three (width, chip opacity, adjacent position) share 250ms ease-in-out → done at t=350ms.
        */}
        <div
          className="flex items-center h-full"
          style={{ paddingLeft: '16px', paddingRight: '16px', gap: '12px' }}
        >
          {/* Icon — layout wrapper applies inverse scale to cancel out the parent button's
              layout transform, keeping the icon at constant size and position at all times */}
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
                {/* Chip — text + X only; icon stays outside */}
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
                  <span
                    className="truncate"
                    style={{
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontSize: 'var(--font-size-15)',
                      color: 'var(--foreground)',
                      whiteSpace: 'nowrap',
                      maxWidth: '160px',
                    }}
                  >
                    {selectedValue}
                  </span>
                  <div
                    onClick={(e) => removeOption(e, selectedValue!)}
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

          {/* Chevron — always at the right, rides with the width animation */}
          <ChevronIcon isOpen={isOpen} isActive={isHovered || isOpen} />
        </div>
      </motion.button>

      {/* ── FLOATING LABEL ───────────────────────────────────────────────── */}
      {/*
        Lives outside motion.button so it is never inside the layout scaleX
        transform. The outer div.relative is the containing block — its top-left
        corner is flush with the button's, so top/left values map identically.
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
            // Smooth color transition in both directions, timed with the label position animation
            transition: isActive
              ? 'color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'    // select:   immediate
              : 'color 300ms cubic-bezier(0.4, 0, 0.2, 1) 50ms',  // deselect: 50ms delay matches variant
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
            className="bg-background shadow-lg overflow-hidden p-[8px]"
            style={{
              position: 'fixed',
              top: panelPos.top,
              left: panelPos.left,
              border: `1px solid var(--border-interactive-hover)`,
              borderRadius: 'var(--radius-16)',
              zIndex: 9999,
              minWidth: '280px',
              transformOrigin: 'top center',
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.25, type: 'spring', stiffness: 400, damping: 25 }}
          >
            {/* Search field */}
            <div
              className="flex items-center gap-[8px] px-[12px] py-[8px] rounded-lg"
              style={{ border: `1px solid var(--border)`, backgroundColor: 'var(--background)' }}
            >
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent"
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-15)',
                  lineHeight: 'var(--line-height-20)',
                  color: 'var(--foreground)',
                }}
              />
              <Search className="size-[16px] shrink-0" style={{ color: 'var(--foreground)' }} strokeWidth={2} />
            </div>

            {/* Options list */}
            <div
              role="listbox"
              className="mt-[8px] flex flex-col gap-[1px]"
              style={{ maxHeight: '240px', overflowY: 'auto' }}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = selectedValues.includes(option);
                  const isHovering = hoveredOption === option;
                  return (
                    <button
                      key={option}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => toggleOption(option)}
                      onMouseEnter={() => setHoveredOption(option)}
                      onMouseLeave={() => setHoveredOption(null)}
                      className="group w-full flex items-center justify-between px-[12px] py-[8px] transition-colors rounded-xl"
                      style={{
                        backgroundColor: isSelected
                          ? 'var(--accent)'
                          : isHovering ? 'var(--muted)' : 'transparent',
                      }}
                    >
                      <span
                        className={`${isHovering ? 'text-primary' : 'text-foreground'} truncate`}
                        style={{
                          fontFamily: 'var(--font-family)',
                          fontWeight: 'var(--font-weight-regular)',
                          fontSize: 'var(--font-size-15)',
                          lineHeight: 'var(--line-height-20)',
                          textAlign: 'left',
                        }}
                      >
                        {option}
                      </span>
                      {isSelected && (
                        <div className="relative size-[20px] ml-[8px] shrink-0">
                          <div className="absolute inset-0 flex items-center justify-center transition-opacity pointer-events-none md:group-hover:opacity-0">
                            <Check className="size-[14px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />
                          </div>
                          <div
                            role="button"
                            onClick={(e) => removeOption(e, option)}
                            onMouseEnter={() => setHoveredOptionX(option)}
                            onMouseLeave={() => setHoveredOptionX(null)}
                            className="absolute inset-0 flex items-center justify-center rounded-full cursor-pointer transition-opacity opacity-0 pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto"
                            style={{ backgroundColor: 'var(--bg-icon-hover)' }}
                          >
                            <X
                              className="size-[11px]"
                              style={{
                                color: hoveredOptionX === option
                                  ? 'var(--primary)'
                                  : 'var(--foreground)',
                              }}
                              strokeWidth={2}
                            />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })
              ) : (
                <div
                  className="px-[12px] py-[10px]"
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-regular)',
                    fontSize: 'var(--font-size-15)',
                    lineHeight: 'var(--line-height-20)',
                    color: 'var(--foreground)',
                    opacity: 0.5,
                  }}
                >
                  No matches found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
