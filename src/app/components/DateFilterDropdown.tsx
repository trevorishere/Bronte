import { useState, useRef, useEffect } from 'react';
import { Calendar, X, ListFilter } from 'lucide-react';

function ChevronIcon({ isOpen, isActive }: { isOpen: boolean; isActive: boolean }) {
  return (
    <div className="flex items-center justify-center shrink-0 size-[14px]">
      <svg
        className="block size-full transition-transform"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        <path
          d="M3 5L7 9L11 5"
          stroke={isActive ? 'var(--foreground)' : 'var(--muted-foreground)'}
          strokeLinecap="square"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
import { DateRangePicker } from './DateRangePicker';
import { motion, AnimatePresence } from 'motion/react';

interface DateFilterDropdownProps {
  label: string;
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
}

export function DateFilterDropdown({
  label,
  startDate,
  endDate,
  onDateChange
}: DateFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const formatDateRange = (): string => {
    if (!startDate && !endDate) return label;
    
    const formatShort = (date: Date) => {
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.getDate();
      return `${month} ${day}`;
    };

    if (startDate && endDate) {
      return `${formatShort(startDate)} - ${formatShort(endDate)}`;
    } else if (startDate) {
      return `From ${formatShort(startDate)}`;
    } else if (endDate) {
      return `To ${formatShort(endDate)}`;
    }
    
    return label;
  };

  const hasSelection = startDate || endDate;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center transition-colors bg-background group"
        style={{
          border: `1px solid ${isHovered || isOpen ? 'var(--border-interactive-hover)' : 'var(--border-interactive)'}`,
          borderRadius: 'var(--radius-12)',
          paddingLeft: hasSelection ? '6px' : '0px',
          paddingRight: '12px',
          height: '40px',
          minWidth: 'fit-content',
          cursor: 'pointer'
        }}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {hasSelection ? (
          /* ── SELECTED: icon + calendar inside chip ── */
          <div className="flex items-center h-[40px] shrink-0" style={{ gap: '12px' }}>
            <div
              className="flex items-center gap-[8px] pl-[6px] pr-[8px] shrink-0"
              style={{
                backgroundColor: 'var(--muted)',
                border: '1px solid var(--border-interactive)',
                borderRadius: '8px',
                height: '28px',
                maxWidth: '240px'
              }}
            >
              <ListFilter
                className="size-[16px] shrink-0"
                style={{ color: 'var(--foreground)' }}
                strokeWidth={2}
              />
              <Calendar className="size-[14px] shrink-0" style={{ color: 'var(--foreground)' }} strokeWidth={2} />
              <span
                className="truncate"
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-15)',
                  letterSpacing: 'var(--letter-spacing-md)',
                  color: 'var(--foreground)',
                  whiteSpace: 'nowrap'
                }}
              >
                {formatDateRange()}
              </span>
              <div
                onClick={(e) => { e.stopPropagation(); onDateChange(null, null); }}
                className="flex items-center justify-center size-[12px] rounded-full hover:opacity-70 transition-opacity cursor-pointer shrink-0"
              >
                <X className="size-[10px]" style={{ color: 'var(--foreground)' }} strokeWidth={2.5} />
              </div>
            </div>
            <ChevronIcon isOpen={isOpen} isActive={isHovered || isOpen} />
          </div>
        ) : (
          /* ── UNSELECTED: icon in padded wrapper ── */
          <div className="flex items-center h-[40px] shrink-0">
            <div className="flex items-center justify-center shrink-0" style={{ paddingLeft: '12px', paddingRight: '8px', paddingTop: '12px', paddingBottom: '12px' }}>
              <ListFilter
                className="size-[16px] shrink-0"
                style={{ color: 'var(--foreground)' }}
                strokeWidth={2}
              />
            </div>
            <div className="flex items-center shrink-0" style={{ gap: '12px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
                  lineHeight: 'var(--line-height-20)',
                  fontSize: 'var(--font-size-15)',
                  letterSpacing: 'var(--letter-spacing-md)',
                  color: 'var(--foreground)',
                  whiteSpace: 'nowrap'
                }}
              >
                {label}
              </span>
              <ChevronIcon isOpen={isOpen} isActive={isHovered || isOpen} />
            </div>
          </div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-50 mt-[4px]"
            style={{
              left: 0,
              top: '100%',
              transformOrigin: 'top center'
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ 
              duration: 0.25,
              type: 'spring',
              stiffness: 400,
              damping: 25
            }}
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