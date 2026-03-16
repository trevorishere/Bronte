import { Grid3x3, List, ChevronDown } from 'lucide-react';
import svgPaths from "../../imports/svg-2hg6thd8pt";
import { useState } from 'react';

interface ToolbarProps {
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  filters?: Array<{
    label: string;
    value: string;
    options: string[];
  }>;
  onFilterChange?: (filterLabel: string, value: string) => void;
}

export function Toolbar({ 
  viewMode = 'list',
  onViewModeChange,
  filters = [
    { label: 'Owner', value: '', options: ['All Owners', 'Me', 'Others'] },
    { label: 'Workspace', value: '', options: ['All Workspaces', 'Chemistry', 'Math'] }
  ],
  onFilterChange
}: ToolbarProps) {
  const [hoveredFilter, setHoveredFilter] = useState<number | null>(null);
  const [isToggleHovered, setIsToggleHovered] = useState(false);
  const [hoveredToggle, setHoveredToggle] = useState<'list' | 'grid' | null>(null);

  const getIconColor = (mode: 'list' | 'grid') => {
    if (viewMode === mode) return 'var(--icon-toggle-active)';
    if (hoveredToggle === mode) return 'var(--icon-toggle-hover)';
    return 'var(--icon-toggle-inactive)';
  };

  return (
    <div className="h-[104px] shrink-0 w-full px-[24px] flex items-center justify-between">
      {/* Filters */}
      <div className="flex gap-[16px] items-center">
        {filters.map((filter, index) => (
          <div key={index} className="relative">
            <button 
              className="flex h-[40px] items-center justify-between pl-[16px] pr-[12px] w-[240px] transition-colors bg-background group"
              style={{
                border: '1px solid var(--border-interactive)',
                borderRadius: 'var(--radius-16)'
              }}
              onMouseEnter={() => setHoveredFilter(index)}
              onMouseLeave={() => setHoveredFilter(null)}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-interactive-hover)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-interactive)';
              }}
            >
              <div className="flex-1 h-[20px]">
                <div className="flex items-center size-full">
                  <div 
                    className={`${hoveredFilter === index ? 'text-primary' : 'text-foreground'}`}
                    style={{ fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-medium)', lineHeight: 'var(--line-height-20)', fontSize: 'var(--font-size-14)', whiteSpace: 'nowrap' }}
                  >
                    {filter.label}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center px-[4px] shrink-0 size-[20px]">
                <div className="shrink-0 size-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g>
                      <path 
                        d="M4 6L8 10L12 6" 
                        stroke={hoveredFilter === index ? 'var(--primary)' : 'var(--foreground)'} 
                        strokeLinecap="square" 
                        strokeLinejoin="round" 
                        strokeWidth="1.5" 
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </button>
          </div>
        ))}
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