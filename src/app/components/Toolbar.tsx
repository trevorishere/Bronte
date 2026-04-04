import { LayoutGrid, List } from 'lucide-react';
import { useState, ReactNode } from 'react';
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
  actionButtons
}: ToolbarProps) {
  const [isToggleHovered, setIsToggleHovered] = useState(false);
  const [hoveredToggle, setHoveredToggle] = useState<'list' | 'grid' | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const getIconColor = (mode: 'list' | 'grid') => {
    if (viewMode === mode) return 'var(--icon-toggle-active)';
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
        <div className="flex flex-wrap gap-[8px] items-center flex-1 min-w-0">
          {filters.map((filter) => {
            if ('type' in filter && filter.type === 'date') {
              const dateFilter = dateFilters[filter.label] || { start: null, end: null };
              return (
                <DateFilterDropdown
                  key={filter.label}
                  label={filter.label}
                  startDate={dateFilter.start}
                  endDate={dateFilter.end}
                  onDateChange={(start, end) => {
                    handleDateFilterChange(filter.label, start, end);
                  }}
                />
              );
            } else {
              return (
                <FilterDropdown
                  key={filter.label}
                  label={filter.label}
                  options={(filter as FilterConfig).options}
                  selectedValues={selectedFilters[filter.label] || []}
                  onSelectionChange={(values) => handleFilterChange(filter.label, values)}
                />
              );
            }
          })}
        </div>

        {/* Right Side: action buttons + view toggle */}
        <div className="flex items-center gap-[12px] shrink-0">
          {/* Page action buttons (Share, New, etc.) */}
          {actionButtons && (
            <>
              {actionButtons}
            </>
          )}

          {/* Toggle buttons */}
          <div
            className="flex items-center p-[4px] rounded-[12px] gap-[4px]"
            style={{ border: `1px solid var(--border-interactive)` }}
          >
            {/* List View Button */}
            <button
              onClick={() => onViewModeChange?.('list')}
              className="flex items-center justify-center size-[32px] rounded-[8px] p-[6px] transition-colors"
              style={{
                backgroundColor: viewMode === 'list' ? 'var(--muted)' : 'transparent',
                border: viewMode === 'list' ? '1px solid var(--border-interactive)' : '1px solid transparent',
              }}
              onMouseEnter={() => setHoveredToggle('list')}
              onMouseLeave={() => setHoveredToggle(null)}
            >
              <List size={18} strokeWidth={2} color={getIconColor('list')} />
            </button>

            {/* Grid View Button */}
            <button
              onClick={() => onViewModeChange?.('grid')}
              className="flex items-center justify-center size-[32px] rounded-[8px] p-[6px] transition-colors"
              style={{
                backgroundColor: viewMode === 'grid' ? 'var(--muted)' : 'transparent',
                border: viewMode === 'grid' ? '1px solid var(--border-interactive)' : '1px solid transparent',
              }}
              onMouseEnter={() => setHoveredToggle('grid')}
              onMouseLeave={() => setHoveredToggle(null)}
            >
              <LayoutGrid size={18} strokeWidth={2} color={getIconColor('grid')} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
