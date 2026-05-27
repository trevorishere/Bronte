import { useState, useRef, useEffect } from 'react';
import { X, Check, Search, ListFilter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function ChevronIcon({ isOpen, isActive }: { isOpen: boolean; isActive: boolean }) {
  return (
    <div className="flex items-center justify-center shrink-0 size-[14px]">
      <svg
        className="block size-full transition-transform"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
        style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
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

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  isMulti?: boolean;
}

export function FilterDropdown({
  label,
  options,
  selectedValues,
  onSelectionChange,
  isMulti = false
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [hoveredOptionX, setHoveredOptionX] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
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

  // Filter options based on search query
  const filteredOptions = options.filter(option =>
    option && option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedValue = selectedValues.length > 0 ? selectedValues[0] : null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex h-[40px] items-center pr-[12px] transition-colors bg-background group"
        style={{
          border: `1px solid ${isHovered || isOpen ? 'var(--border-interactive-hover)' : 'var(--border-interactive)'}`,
          borderRadius: 'var(--radius-12)',
          paddingLeft: selectedValue ? '6px' : '0px',
          minWidth: 'fit-content'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue ? (
          /* ── SELECTED: icon inside chip ── */
          <div className="flex items-center h-[40px] shrink-0" style={{ gap: '12px' }}>
            {/* Chip with filter icon inside */}
            <div
              className="flex items-center gap-[8px] pl-[6px] pr-[8px] shrink-0"
              style={{
                backgroundColor: 'var(--muted)',
                border: '1px solid var(--border-interactive)',
                borderRadius: '8px',
                height: '28px',
                maxWidth: '220px'
              }}
            >
              <ListFilter
                className="size-[16px] shrink-0"
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
                  whiteSpace: 'nowrap'
                }}
              >
                {selectedValue}
              </span>
              <div
                onClick={(e) => removeOption(e, selectedValue!)}
                className="flex items-center justify-center size-[12px] rounded-full hover:opacity-70 transition-opacity cursor-pointer shrink-0"
              >
                <X className="size-[10px]" style={{ color: 'var(--foreground)' }} strokeWidth={2.5} />
              </div>
            </div>
            {/* Chevron */}
            <ChevronIcon isOpen={isOpen} isActive={isHovered || isOpen} />
          </div>
        ) : (
          /* ── UNSELECTED: icon in its own padded wrapper ── */
          <div className="flex items-center h-[40px] shrink-0">
            {/* Filter icon wrapper */}
            <div className="flex items-center justify-center shrink-0" style={{ paddingLeft: '12px', paddingRight: '8px', paddingTop: '12px', paddingBottom: '12px' }}>
              <ListFilter
                className="size-[16px] shrink-0"
                style={{ color: 'var(--foreground)' }}
                strokeWidth={2}
              />
            </div>
            {/* Label + chevron */}
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

      {/* Dropdown Menu - separate shape */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 bg-background shadow-lg overflow-hidden p-[8px]"
            style={{
              border: `1px solid var(--border-interactive-hover)`,
              borderRadius: 'var(--radius-16)',
              top: '48px',
              zIndex: 100,
              minWidth: '280px',
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
            {/* Search Field */}
            <div>
              <div
                className="flex items-center gap-[8px] px-[12px] py-[8px] rounded-lg"
                style={{
                  border: `1px solid var(--border)`,
                  backgroundColor: 'var(--background)'
                }}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 outline-none bg-transparent"
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-regular)',
                    fontSize: 'var(--font-size-15)',
                    lineHeight: 'var(--line-height-20)',
                    color: 'var(--foreground)'
                  }}
                />
                <Search className="size-[16px] shrink-0" style={{ color: 'var(--foreground)' }} strokeWidth={2} />
              </div>
            </div>

            {/* Options List */}
            <div
              className="mt-[8px] flex flex-col gap-[1px]"
              style={{
                maxHeight: '240px',
                overflowY: 'auto'
              }}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = selectedValues.includes(option);
                  const isHovering = hoveredOption === option;
                  return (
                    <button
                      key={option}
                      onClick={() => toggleOption(option)}
                      onMouseEnter={() => setHoveredOption(option)}
                      onMouseLeave={() => setHoveredOption(null)}
                      className="group w-full flex items-center justify-between px-[12px] py-[8px] transition-colors rounded-xl"
                      style={{
                        backgroundColor: isSelected ? 'var(--accent)' : isHovering ? 'var(--muted)' : 'transparent'
                      }}
                    >
                      <span
                        className={`${isHovering ? 'text-primary' : 'text-foreground'} truncate`}
                        style={{
                          fontFamily: 'var(--font-family)',
                          fontWeight: 'var(--font-weight-regular)',
                          fontSize: 'var(--font-size-15)',
                          lineHeight: 'var(--line-height-20)',
                          textAlign: 'left'
                        }}
                      >
                        {option}
                      </span>
                      {isSelected && (
                        <div className="relative size-[20px] ml-[8px] shrink-0">
                          {/* Check: visible by default, hidden on desktop hover */}
                          <div className="absolute inset-0 flex items-center justify-center transition-opacity pointer-events-none md:group-hover:opacity-0">
                            <Check className="size-[14px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />
                          </div>
                          {/* X: hidden on mobile + desktop default, visible on desktop hover */}
                          <div
                            role="button"
                            onClick={(e) => removeOption(e, option)}
                            onMouseEnter={() => setHoveredOptionX(option)}
                            onMouseLeave={() => setHoveredOptionX(null)}
                            className="absolute inset-0 flex items-center justify-center rounded-full cursor-pointer transition-opacity opacity-0 pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto"
                            style={{ backgroundColor: 'var(--bg-icon-hover)' }}
                          >
                            <X className="size-[11px]" style={{ color: hoveredOptionX === option ? 'var(--primary)' : 'var(--foreground)' }} strokeWidth={2} />
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
                    opacity: 0.5
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
