import { useState, useRef } from 'react';

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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Variant-specific styles
  const gap = variant === 'detail' ? 'gap-0' : 'gap-[16px]';
  const activeBorderWidth = variant === 'detail' ? '2px' : '2px';
  const fontWeight = variant === 'detail' ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)';
  const fontSize = variant === 'detail' ? 'var(--font-size-14)' : 'var(--font-size-14)';

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      const nextTab = tabs[nextIndex];
      onTabChange(nextTab.id);
      tabRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      const prevTab = tabs[prevIndex];
      onTabChange(prevTab.id);
      tabRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <div
      className="md:h-[64px] shrink-0 w-full px-4 md:px-[24px] pt-[8px] md:pt-0 mb-[8px] md:mb-0"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div className="flex md:h-full items-end overflow-x-auto scrollbar-hide">
        <div
          role="tablist"
          className={`flex items-start ${gap} pt-[16px] min-w-max`}
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            const isHovered = hoveredTab === tab.id;

            return (
              <div
                key={tab.id}
                className="relative shrink-0"
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
                {/* Tab button */}
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  ref={el => { tabRefs.current[index] = el; }}
                  onClick={() => onTabChange(tab.id)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className="flex items-start pb-[18px] px-[12px] md:px-[16px]"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
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
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
