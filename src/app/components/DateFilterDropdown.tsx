import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Calendar, X } from 'lucide-react';
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
          paddingLeft: hasSelection ? '4px' : '16px',
          paddingRight: '8px',
          height: '40px',
          minWidth: 'fit-content',
          cursor: 'pointer'
        }}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <div className="flex items-center min-w-0" style={{ gap: '12px' }}>
          {hasSelection ? (
            // Show pill when dates are selected - matches Owner filter selected state
            <div
              className="flex items-center gap-[12px] pr-[8px] pl-[12px]"
              style={{
                backgroundColor: 'var(--muted)',
                border: '1px solid var(--border-interactive)',
                borderRadius: '8px',
                height: '30px',
                maxWidth: '200px'
              }}
            >
              <Calendar className="size-[16px] shrink-0" style={{ color: 'var(--secondary-foreground)' }} strokeWidth={2} />
              <span
                className="truncate"
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-13)',
                  letterSpacing: 'var(--letter-spacing-md)',
                  color: 'var(--secondary-foreground)',
                  paddingTop: '1px',
                  whiteSpace: 'nowrap'
                }}
              >
                {formatDateRange()}
              </span>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onDateChange(null, null);
                }}
                className="flex items-center justify-center size-[14px] rounded-full hover:bg-background transition-colors cursor-pointer shrink-0"
              >
                <X className="size-[12px]" style={{ color: 'var(--secondary-foreground)' }} strokeWidth={2} />
              </div>
            </div>
          ) : (
            // Show label when nothing is selected - matches Owner filter default state
            <div
              className={`${isHovered || isOpen ? 'text-foreground' : 'secondary-foreground'}`}
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-regular)',
                lineHeight: 'var(--line-height-20)',
                fontSize: 'var(--font-size-14)',
                letterSpacing: 'var(--letter-spacing-md)',
                whiteSpace: 'nowrap',
                paddingBottom: '1px',
                textAlign: 'left'
              }}
            >
              {label}
            </div>
          )}

          {/* Chevron - matches Owner filter chevron */}
          <div className="flex items-center justify-center shrink-0 size-[20px]">
            <div className="shrink-0 size-[16px]">
              <svg
                className="block size-full transition-transform"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 16 16"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              >
                <g>
                  <path
                    d="M4 6L8 10L12 6"
                    stroke={isHovered || isOpen ? 'var(--border-interactive-hover)' : 'var(--border-interactive)'}
                    strokeLinecap="square"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
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