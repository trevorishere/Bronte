import { LayoutGrid, List, Plus } from 'lucide-react';
import { useState, useReducer, ReactNode } from 'react';
import { motion } from 'motion/react';
import { FilterDropdown } from './FilterDropdown';
import { DateFilterDropdown } from './DateFilterDropdown';

interface FilterConfig {
  label: string;
  options: string[];
}

interface DateFilterConfig {
  label: string;
  type: 'date';
}

interface ToolbarProps {
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  filters?: (FilterConfig | DateFilterConfig)[];
  selectedFilters?: Record<string, string[]>;
  onFilterChange?: (filterLabel: string, values: string[]) => void;
  dateFilters?: Record<string, { start: Date | null; end: Date | null }>;
  onDateFilterChange?: (filterLabel: string, start: Date | null, end: Date | null) => void;
  /** Desktop-only action buttons rendered to the right of filters */
  actionButtons?: ReactNode;
  /** Called when the New… button is clicked (desktop only, rendered right of view toggle) */
  onAddClick?: () => void;
}

export function Toolbar({
  viewMode = 'list',
  onViewModeChange,
  filters = [
    { label: 'Owner', options: ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Emma Brown'] },
    { label: 'Workspace', options: ['Chemistry', 'Math', 'Physics', 'Biology'] },
    { label: 'Last Modified', type: 'date' as const }
  ],
  selectedFilters = {},
  onFilterChange,
  dateFilters = {},
  onDateFilterChange,
  actionButtons,
  onAddClick
}: ToolbarProps) {
  // Incremented by onAnimationComplete callbacks so layout="position" siblings
  // get a fresh Toolbar render to snapshot before→after x-positions and animate.
  const [, forceRerender] = useReducer(x => x + 1, 0);

  const [isToggleHovered, setIsToggleHovered] = useState(false);
  const [hoveredToggle, setHoveredToggle] = useState<'list' | 'grid' | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isNewHovered, setIsNewHovered] = useState(false);

  const getIconColor = (mode: 'list' | 'grid') => {
    if (viewMode === mode) return 'var(--foreground)';
    if (hoveredToggle === mode) return 'var(--icon-toggle-hover)';
    return 'var(--icon-toggle-inactive)';
  };

  const handleFilterChange = (label: string, values: string[]) => {
    onFilterChange?.(label, values);
  };

  const handleDateFilterChange = (label: string, start: Date | null, end: Date | null) => {
    onDateFilterChange?.(label, start, end);
  };

  // Count active filters
  const activeFilterCount = Object.values(selectedFilters).flat().length + 
    Object.values(dateFilters).filter(df => df.start || df.end).length;

  return (
    <>
      {/* ================================================================ */}
      {/* MOBILE LAYOUT: Toolbar for Mobile Devices                       */}
      {/* Currently hidden - Mobile view toggle moved to TopBar           */}
      {/* This section reserved for future mobile-specific toolbar        */}
      {/* features such as collapsible filters or sort controls           */}
      {/* ================================================================ */}
      {/* Uncomment and customize when adding mobile toolbar features:
      <div className="md:hidden min-h-[60px] w-full px-[16px] py-[12px]">
        Mobile toolbar content here
        - Collapsible filter button
        - Sort dropdown
        - Other mobile-specific controls
      </div>
      */}

      {/* ================================================================ */}
      {/* DESKTOP LAYOUT: Toolbar for Desktop Devices                     */}
      {/* Height: 104px fixed                                             */}
      {/* Padding: 28px left, 48px right                                  */}
      {/* Layout: Filter Buttons (left) + View Toggle (right)             */}
      {/* Gap: 8px between filter buttons                                 */}
      {/* ================================================================ */}
      <div className="hidden md:flex h-[104px] shrink-0 w-full px-[24px] items-center justify-between gap-[16px]">

        {/* Filter Buttons Section - Left Side */}
        <div className="flex gap-[8px] items-center flex-1 min-w-0">
          {filters.map((filter) => {
            if ('type' in filter && filter.type === 'date') {
              const dateFilter = dateFilters[filter.label] || { start: null, end: null };
              return (
                <motion.div
                  key={filter.label}
                  layout="position"
                  transition={{ layout: { type: 'spring', bounce: 0, duration: 0.5 } }}
                >
                  <DateFilterDropdown
                    label={filter.label}
                    startDate={dateFilter.start}
                    endDate={dateFilter.end}
                    onDateChange={(start, end) => {
                      handleDateFilterChange(filter.label, start, end);
                    }}
                    onAnimationComplete={forceRerender}
                  />
                </motion.div>
              );
            } else {
              return (
                <motion.div
                  key={filter.label}
                  layout="position"
                  transition={{ layout: { type: 'spring', bounce: 0, duration: 0.5 } }}
                >
                  <FilterDropdown
                    label={filter.label}
                    options={(filter as FilterConfig).options}
                    selectedValues={selectedFilters[filter.label] || []}
                    onSelectionChange={(values) => handleFilterChange(filter.label, values)}
                    onAnimationComplete={forceRerender}
                  />
                </motion.div>
              );
            }
          })}
        </div>

        {/* Right Side: action buttons + view toggle + New button */}
        <div className="flex items-center gap-[12px] shrink-0">
          {/* Page action buttons (Share, etc.) */}
          {actionButtons && (
            <>
              {actionButtons}
            </>
          )}

          {/* Toggle buttons */}
          <div
            className="flex items-center py-[4px] px-[4px] rounded-[12px] gap-[4px] h-[40px]"
            style={{ border: `1px solid ${isToggleHovered ? 'var(--border-interactive-hover)' : 'var(--border)'}`, transition: `border-color var(--transition-duration) var(--transition-timing)` }}
            onMouseEnter={() => setIsToggleHovered(true)}
            onMouseLeave={() => setIsToggleHovered(false)}
          >
            {/* List View Button */}
            <button
              onClick={() => onViewModeChange?.('list')}
              className="flex items-center justify-center size-[32px] rounded-[8px] p-[6px]"
              style={{
                backgroundColor: viewMode === 'list' ? 'var(--bg-row-selected)' : 'transparent',
                border: viewMode === 'list' ? '1px solid color-mix(in srgb, var(--border) 70%, transparent)' : '1px solid transparent',
                color: getIconColor('list'),
                transition: 'color var(--duration-default) var(--ease-standard), background-color var(--duration-default) var(--ease-standard), border-color var(--duration-default) var(--ease-standard)',
              }}
              onMouseEnter={() => setHoveredToggle('list')}
              onMouseLeave={() => setHoveredToggle(null)}
            >
              <List size={20} strokeWidth={2} />
            </button>

            {/* Grid View Button */}
            <button
              onClick={() => onViewModeChange?.('grid')}
              className="flex items-center justify-center size-[32px] rounded-[8px] p-[6px]"
              style={{
                backgroundColor: viewMode === 'grid' ? 'var(--bg-row-selected)' : 'transparent',
                border: viewMode === 'grid' ? '1px solid color-mix(in srgb, var(--border) 70%, transparent)' : '1px solid transparent',
                color: getIconColor('grid'),
                transition: 'color var(--duration-default) var(--ease-standard), background-color var(--duration-default) var(--ease-standard), border-color var(--duration-default) var(--ease-standard)',
              }}
              onMouseEnter={() => setHoveredToggle('grid')}
              onMouseLeave={() => setHoveredToggle(null)}
            >
              <LayoutGrid size={20} strokeWidth={2} />
            </button>
          </div>

          {/* New… button — right of view toggle */}
          <button
            onClick={onAddClick}
            className="flex items-center gap-[8px] h-[40px] rounded-[12px]"
            style={{
              border: 'none',
              paddingLeft: '15px',
              paddingRight: '17px',
              cursor: 'pointer',
              backgroundColor: isNewHovered ? 'var(--btn-primary-hover)' : 'var(--btn-primary-bg)',
              transition: 'background-color var(--duration-default) var(--ease-standard)',
            }}
            onMouseEnter={() => setIsNewHovered(true)}
            onMouseLeave={() => setIsNewHovered(false)}
          >
            <Plus className="size-[18px] shrink-0" style={{ color: 'var(--btn-primary-text)' }} strokeWidth={2.5} />
            <span style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-15)', letterSpacing: 'var(--letter-spacing-button)', color: 'var(--btn-primary-text)', whiteSpace: 'nowrap' }}>New…</span>
          </button>
        </div>
      </div>
    </>
  );
}
