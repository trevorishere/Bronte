import { useEffect, useState } from 'react';

// SkeletonBox - single shimmering rectangle
function SkeletonBox({ width = '100%', height = '16px', borderRadius = '6px', className = '' }: {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}) {
  return (
    <div
      className={`skeleton-shimmer ${className}`}
      style={{ width, height, borderRadius, flexShrink: 0 }}
    />
  );
}

// Desktop table skeleton - mimics the DataTable row layout
function TableSkeleton({ rowCount = 8 }: { rowCount?: number }) {
  return (
    <div className="hidden md:flex flex-1 flex-col px-[24px] pb-[24px] min-h-0 overflow-hidden">
      {/* Header */}
      <div className="shrink-0 py-[16px] flex gap-[24px] pl-[20px] pr-[20px]">
        <SkeletonBox width="40%" height="14px" />
        <SkeletonBox width="20%" height="14px" />
        <SkeletonBox width="20%" height="14px" />
      </div>

      {/* Rows */}
      <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid var(--border-interactive)' }}>
        {Array.from({ length: rowCount }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-[16px] px-[20px]"
            style={{
              height: '56px',
              borderBottom: i < rowCount - 1 ? '1px solid var(--border-interactive)' : 'none',
            }}
          >
            <SkeletonBox width="32px" height="32px" borderRadius="50%" />
            <SkeletonBox width={`${30 + (i % 4) * 8}%`} height="14px" />
            <div className="flex-1" />
            <SkeletonBox width="12%" height="14px" />
            <SkeletonBox width="16%" height="14px" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Mobile list skeleton
function MobileListSkeleton({ rowCount = 8 }: { rowCount?: number }) {
  return (
    <div className="md:hidden flex-1 flex flex-col overflow-hidden pb-[72px]">
      <div className="flex flex-col">
        {Array.from({ length: rowCount }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 h-[64px] px-4"
          >
            <SkeletonBox width="40px" height="40px" borderRadius="50%" />
            <div className="flex-1 flex flex-col gap-[6px]">
              <SkeletonBox width={`${45 + (i % 3) * 12}%`} height="13px" />
              <SkeletonBox width={`${25 + (i % 4) * 7}%`} height="11px" />
            </div>
            <SkeletonBox width="28px" height="28px" borderRadius="50%" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Grid skeleton for desktop GridView
export function GridSkeleton({ itemCount = 8 }: { itemCount?: number }) {
  return (
    <div className="w-full h-full overflow-y-auto px-4 md:px-[40px] pb-2" style={{ backgroundColor: 'var(--background)' }}>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pt-8">
        {Array.from({ length: itemCount }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-[8px] rounded-[16px]"
            style={{
              backgroundColor: 'var(--bg-grid-card)',
              border: '1px solid var(--sidebar-border)',
              padding: '16px',
              paddingBottom: '20px',
            }}
          >
            <SkeletonBox width="100%" height="128px" borderRadius="12px" />
            <div style={{ marginTop: '8px' }}>
              <SkeletonBox width={`${50 + (i % 4) * 10}%`} height="16px" />
            </div>
            <SkeletonBox width="40%" height="14px" />
            <SkeletonBox width="30%" height="14px" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Combined skeleton that matches the DataTable layout (table on desktop, list on mobile)
export function DataTableSkeleton({ rowCount = 8 }: { rowCount?: number }) {
  return (
    <>
      <MobileListSkeleton rowCount={rowCount} />
      <TableSkeleton rowCount={rowCount} />
    </>
  );
}

// Hook for simulating a brief loading state on mount
export function useLoadingDelay(ms = 600): boolean {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), ms);
    return () => clearTimeout(timer);
  }, [ms]);
  return isLoading;
}
