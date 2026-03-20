import { ArrowUp, ArrowDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SortOption {
  key: string;
  label: string;
}

interface MobileSortHeaderProps {
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  sortOptions: SortOption[];
  onSortChange: (columnKey: string) => void;
}

export function MobileSortHeader({ 
  sortColumn, 
  sortDirection, 
  sortOptions,
  onSortChange
}: MobileSortHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const activeSortOption = sortOptions.find(opt => opt.key === sortColumn);
  const sortLabel = activeSortOption?.label || 'Sort';

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleSortOptionClick = (key: string) => {
    // If clicking the currently selected option, toggle the sort direction
    if (key === sortColumn) {
      onSortChange(key); // This will toggle the direction
    } else {
      // Otherwise, select the new column
      onSortChange(key);
    }
    setIsMenuOpen(false);
  };

  return (
    <div ref={menuRef} className="relative shrink-0 px-4 pb-2 h-[40px] flex items-center">
      <div className="flex items-center justify-between w-full">
        {/* Active Sort Column - Opens dropdown when clicked */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-1"
        >
          <span
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-medium)',
              fontSize: '14px',
              color: 'var(--primary)',
              letterSpacing: '0.2px'
            }}
          >
            {sortLabel}
          </span>
          {sortDirection === 'desc' ? (
            <ArrowDown className="size-4" style={{ color: 'var(--primary)' }} strokeWidth={2} />
          ) : (
            <ArrowUp className="size-4" style={{ color: 'var(--primary)' }} strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Dropdown Menu - Left aligned with sort label */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ 
              duration: 0.25,
              type: 'spring',
              stiffness: 400,
              damping: 25
            }}
            className="absolute top-full left-4 mt-1 bg-background shadow-lg z-50 overflow-hidden p-[8px]"
            style={{
              border: '1px solid var(--border-interactive-hover)',
              borderRadius: 'var(--radius-16)',
              minWidth: '144px',
              transformOrigin: 'top center'
            }}
          >
            {sortOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleSortOptionClick(option.key)}
                className="w-full px-[12px] py-[10px] transition-colors rounded-xl text-left"
                style={{
                  backgroundColor: sortColumn === option.key ? 'var(--muted)' : 'transparent',
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: 'var(--font-size-14)',
                  lineHeight: 'var(--line-height-20)',
                  color: sortColumn === option.key ? 'var(--primary)' : 'var(--foreground)'
                }}
                onMouseOver={(e) => {
                  if (sortColumn !== option.key) {
                    e.currentTarget.style.backgroundColor = 'var(--muted)';
                    e.currentTarget.style.color = 'var(--primary)';
                  }
                }}
                onMouseOut={(e) => {
                  if (sortColumn !== option.key) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--foreground)';
                  }
                }}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
