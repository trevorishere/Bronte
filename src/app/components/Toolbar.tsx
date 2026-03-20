import { Grid3x3, List } from 'lucide-react';
import { useState } from 'react';
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
  onDateFilterChange
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
      <div className="hidden md:flex h-[104px] shrink-0 w-full pl-[28px] pr-[48px] items-center justify-between">
        
        {/* Filter Buttons Section - Left Side */}
        <div className="flex flex-wrap gap-[8px] items-center">
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

        {/* View Toggle Section - Right Side */}
        {/* Button Width: 40px each */}
        {/* Button Height: 40px */}
        {/* Border: 1px solid, changes on hover */}
        <div 
          className="flex h-[40px] overflow-hidden rounded-xl transition-colors" 
          style={{ border: `1px solid ${isToggleHovered ? 'var(--border-interactive-hover)' : 'var(--border-interactive)'}` }}
          onMouseEnter={() => setIsToggleHovered(true)}
          onMouseLeave={() => setIsToggleHovered(false)}
        >
          {/* List View Button */}
          <button
            onClick={() => onViewModeChange?.('list')}
            className={`flex items-center justify-center size-[40px] pb-[2px] transition-colors ${
              viewMode === 'list' ? 'bg-background' : 'bg-transparent'
            }`}
            style={{
              borderRight: `1px solid ${isToggleHovered ? 'var(--border-interactive-hover)' : 'var(--border-interactive)'}`
            }}
            onMouseEnter={() => setHoveredToggle('list')}
            onMouseLeave={() => setHoveredToggle(null)}
          >
            <List 
              size={18}
              strokeWidth={2}
              color={getIconColor('list')}
            />
          </button>

          {/* Grid View Button */}
          <button
            onClick={() => onViewModeChange?.('grid')}
            className={`flex items-center justify-center size-[40px] pb-[2px] transition-colors ${
              viewMode === 'grid' ? 'bg-background' : 'bg-transparent'
            }`}
            onMouseEnter={() => setHoveredToggle('grid')}
            onMouseLeave={() => setHoveredToggle(null)}
          >
            <Grid3x3 
              size={18}
              strokeWidth={2}
              color={getIconColor('grid')}
            />
          </button>
        </div>
      </div>
    </>
  );
}
