import { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
}

interface TabNavProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'detail'; // 'detail' for detail pages with stronger visual emphasis
}

export function TabNav({ tabs, activeTab, onTabChange, variant = 'default' }: TabNavProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  // Variant-specific styles
  const gap = variant === 'detail' ? 'gap-0' : 'gap-[16px]';
  const activeBorderWidth = variant === 'detail' ? '2px' : '2px';
  const fontWeight = variant === 'detail' ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)';
  const fontSize = variant === 'detail' ? 'var(--font-size-14)' : 'var(--font-size-14)';

  return (
    <div 
      className="h-[64px] shrink-0 w-full px-4 md:px-[24px] mb-[12px]"
      style={{ borderBottom: '1px solid var(--border-interactive)' }}
    >
      <div className="flex h-full items-end overflow-x-auto scrollbar-hide">
        <div className={`flex items-start ${gap} pt-[16px] min-w-max`}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isHovered = hoveredTab === tab.id;
            
            return (
              <div
                key={tab.id}
                className="relative shrink-0 cursor-pointer"
                onClick={() => onTabChange(tab.id)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                {/* Border indicator */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    borderBottom: isActive 
                      ? `${activeBorderWidth} solid var(--primary)` 
                      : '2px solid transparent'
                  }}
                />
                {/* Content */}
                <div className="flex items-start pb-[18px] px-[12px] md:px-[16px]">
                  <p
                    style={{
                      fontFamily: 'var(--font-family)',
                      fontWeight: "var(--font-weight-medium)",
                      fontSize: "var(--font-size-15)",
                      letterSpacing: 'var(--letter-spacing-md)',
                      lineHeight: 'var(--line-height-normal)',
                      color: (isActive || isHovered) ? 'var(--primary)' : 'var(--foreground)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tab.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}