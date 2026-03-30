import { useState, useRef, useEffect } from 'react';
import { X, Check, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
}

export function FilterDropdown({
  label,
  options,
  selectedValues,
  onSelectionChange
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
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

  const selectOption = (option: string) => {
    onSelectionChange([option]);
    setIsOpen(false);
    setSearchQuery('');
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectionChange([]);
  };

  // Filter options based on search query
  const filteredOptions = options.filter(option =>
    option && option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedValue = selectedValues.length > 0 ? selectedValues[0] : null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex h-[40px] items-center pr-[8px] transition-colors bg-background group"
        style={{
          border: `1px solid ${isHovered || isOpen ? 'var(--border-interactive-hover)' : 'var(--border-interactive)'}`,
          borderRadius: 'var(--radius-12)',
          paddingLeft: selectedValue ? '4px' : '16px',
          minWidth: 'fit-content'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center min-w-0" style={{ gap: '12px' }}>
          {selectedValue ? (
            // Show pill when item is selected - 32px height
            <div
              className="flex items-center gap-[12px] pl-[12px] pr-[8px]"
              style={{
                backgroundColor: 'var(--muted)',
                border: '1px solid var(--border-interactive)',
                borderRadius: '8px',
                height: '30px',
                maxWidth: '200px'
              }}
            >
              <span
                className="truncate"
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-14)',
                  color: 'var(--secondary-foreground)',
                  paddingTop: '1px',
                  whiteSpace: 'nowrap'
                }}
              >
                {selectedValue}
              </span>
              <div
                onClick={clearSelection}
                className="flex items-center justify-center size-[14px] rounded-full hover:bg-background transition-colors cursor-pointer shrink-0"
              >
                <X className="size-[12px]" style={{ color: 'var(--secondary-foreground)' }} strokeWidth={2} />
              </div>
            </div>
          ) : (
            // Show label when nothing is selected
            <div
              className={`${isHovered || isOpen ? 'text-foreground' : 'secondary-foreground'}`}
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-regular)',
                lineHeight: 'var(--line-height-20)',
                fontSize: 'var(--font-size-14)',
                letterSpacing: 'var(--letter-spacing-md)',
                whiteSpace: 'nowrap',
                textAlign: 'left'
              }}
            >
              {label}
            </div>
          )}

          {/* Chevron */}
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
                    stroke={isHovered || isOpen ? 'var(--foreground)' : 'var(--muted-foreground)'}
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
                  border: `1px solid var(--border-interactive)`,
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
                    fontSize: 'var(--font-size-14)',
                    lineHeight: 'var(--line-height-20)',
                    color: 'var(--foreground)'
                  }}
                />
                <Search className="size-[16px] shrink-0" style={{ color: 'var(--foreground)' }} strokeWidth={2} />
              </div>
            </div>

            {/* Options List */}
            <div 
              className="mt-[8px]"
              style={{
                maxHeight: '240px',
                overflowY: 'auto'
              }}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = selectedValue === option;
                  return (
                    <button
                      key={option}
                      onClick={() => selectOption(option)}
                      onMouseEnter={() => setHoveredOption(option)}
                      onMouseLeave={() => setHoveredOption(null)}
                      className="w-full flex items-center justify-between px-[12px] py-[10px] transition-colors rounded-xl"
                      style={{
                        backgroundColor: hoveredOption === option ? 'var(--muted)' : 'transparent'
                      }}
                    >
                      <span
                        className={`${hoveredOption === option ? 'text-primary' : 'text-foreground'} truncate`}
                        style={{
                          fontFamily: 'var(--font-family)',
                          fontWeight: 'var(--font-weight-regular)',
                          fontSize: 'var(--font-size-14)',
                          lineHeight: 'var(--line-height-20)',
                          textAlign: 'left'
                        }}
                      >
                        {option}
                      </span>
                      {isSelected && (
                        <Check className="size-[16px] shrink-0 ml-[8px]" style={{ color: 'var(--primary)' }} strokeWidth={2} />
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
                    fontSize: 'var(--font-size-14)',
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
