import { Grid3x3, List, ChevronDown } from 'lucide-react';
import svgPaths from "../../imports/svg-2hg6thd8pt";
import { useState, useCallback } from 'react';
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

  return (
    <div className="h-[104px] shrink-0 w-full px-[24px] flex items-center justify-between">
      {/* Filters */}
      <div className="flex gap-[16px] items-center">
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

      {/* View Toggle */}
      <div 
        className="flex h-[36px] overflow-hidden rounded-lg transition-colors" 
        style={{ border: `1px solid ${isToggleHovered ? 'var(--border-interactive-hover)' : 'var(--border-interactive)'}` }}
        onMouseEnter={() => setIsToggleHovered(true)}
        onMouseLeave={() => setIsToggleHovered(false)}
      >
        <button
          onClick={() => onViewModeChange?.('list')}
          className={`flex items-center justify-center size-[36px] transition-colors ${
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
        <button
          onClick={() => onViewModeChange?.('grid')}
          className={`flex items-center justify-center size-[36px] transition-colors ${
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
  );
}