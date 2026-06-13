import { useState, useRef, useEffect } from 'react';
import { X, Check, ListFilter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SearchInput } from './SearchInput';
import { labelVariants, labelBgVariants } from '../constants/animation';
import { ts } from '../utils/textStyles';

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
          color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
          transition: 'transform var(--duration-fast) ease, color 300ms cubic-bezier(0.2,0,0.5,1)',
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
  const [isChipXHovered, setIsChipXHovered] = useState(false);
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
      setPanelPos({ top: rect.bottom + 8, left: rect.left });
    }
    setIsOpen(prev => !prev);
  };

  return (
    <div
      className="relative"
      ref={triggerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── TRIGGER BUTTON ───────────────────────────────────────────────── */}
      <motion.button
        layout
        className="relative flex h-[40px] items-center bg-background group overflow-visible"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
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
          style={{ paddingLeft: isActive ? '6px' : '12px', paddingRight: '12px', gap: '12px' }}
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
                {/* Chip — text + X only; icon stays outside */}
                <div
                  className="flex items-center shrink-0"
                  style={{
                    height: '28px',
                    backgroundColor: 'var(--bg-selected)',
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
                      maxWidth: '160px',
                    }}
                  >
                    {selectedValue}
                  </span>
                  <div
                    onClick={(e) => removeOption(e, selectedValue!)}
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
                    <X className="size-[12px]" style={{ color: isChipXHovered ? 'var(--primary)' : 'var(--foreground)' }} strokeWidth={2.5} />
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
        {/* Filter icon — animates up with the label as a nav-item-style unit.
            Timing is hardcoded (not var()) so the transition shorthand parses
            reliably — cubic-bezier() inside var() can silently fail to parse. */}
        <ListFilter
          className="shrink-0"
          style={{
            width: isActive ? '14px' : '16px',
            height: isActive ? '14px' : '16px',
            marginRight: isActive ? '6px' : '10px',
            color: (isActive || isOpen) ? 'var(--foreground)' : isHovered ? 'var(--icon-nav-hover)' : 'var(--muted-foreground)',
            transition: isActive
              ? `color 300ms cubic-bezier(0.2,0,0.5,1), width 300ms cubic-bezier(0.2,0,0.5,1), height 300ms cubic-bezier(0.2,0,0.5,1), margin-right 300ms cubic-bezier(0.2,0,0.5,1)`
              : `color 300ms cubic-bezier(0.2,0,0.5,1) 50ms, width 300ms cubic-bezier(0.2,0,0.5,1) 50ms, height 300ms cubic-bezier(0.2,0,0.5,1) 50ms, margin-right 300ms cubic-bezier(0.2,0,0.5,1) 50ms`,
          }}
          strokeWidth={2}
        />
        {/* Label text */}
        <span
          style={{
            position: 'relative',
            fontFamily: 'var(--font-family)',
            fontWeight: isActive ? 'var(--font-weight-regular)' : 'var(--font-weight-medium)',
            fontSize: isActive ? '13px' : 'var(--font-size-15)',
            letterSpacing: 'var(--letter-spacing-body)',
            lineHeight: 'var(--line-height-20)',
            whiteSpace: 'nowrap',
            display: 'block',
            color: 'var(--foreground)',
            transition: isActive
              ? `font-size 300ms cubic-bezier(0.2,0,0.5,1), font-weight 300ms cubic-bezier(0.2,0,0.5,1)`
              : `font-size 300ms cubic-bezier(0.2,0,0.5,1) 50ms, font-weight 300ms cubic-bezier(0.2,0,0.5,1) 50ms`,
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
            className="bg-background shadow-lg overflow-hidden pt-[8px] px-[8px] pb-[16px]"
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
            <SearchInput
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
            />

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
                      className="group w-full flex items-center justify-between px-[16px] h-[40px] shrink-0 transition-colors rounded-xl"
                      style={{
                        backgroundColor: isSelected
                          ? 'var(--bg-selected)'
                          : isHovering ? 'var(--bg-rollover)' : 'transparent',
                      }}
                    >
                      <span
                        className="truncate"
                        style={{
                          fontFamily: 'var(--font-family)',
                          fontWeight: 'var(--font-weight-regular)',
                          fontSize: 'var(--font-size-15)',
                          lineHeight: 'var(--line-height-20)',
                          textAlign: 'left',
                          color: (isHovering || isSelected) ? 'var(--primary)' : 'var(--foreground)',
                          transition: `color var(--duration-default) var(--ease-standard)`,
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
                  className="px-[16px] py-[10px]"
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
