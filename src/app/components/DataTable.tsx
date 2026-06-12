import { useState, useEffect, useRef } from 'react';
import { Star, MoreHorizontal, ArrowUp, ArrowDown, File } from 'lucide-react';
import { toast } from 'sonner';
import { DropdownMenu, createDefaultMenuItems } from './DropdownMenu';
import { Avatar, RoleBadge } from './Avatar';
import { progressPillColors } from '../constants/progressColors';
import { TeamIcon } from './TeamIcon';
import { WorkspaceIcon } from './WorkspaceIcon';
import { ProjectIcon } from './ProjectIcon';
import { RenameModal } from './RenameModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { MoveModal } from './MoveModal';
import { RenameActionDrawer, DeleteActionDrawer, MoveActionDrawer } from './MobileActionDrawers';
import { MobileCardView } from './MobileCardView';
import { MobileSortHeader } from './MobileSortHeader';
import { OwnerModal } from './OwnerModal';
import { useIsMobile } from '../hooks/useIsMobile';
import { accounts } from '../data/accounts';
import type { Account } from '../data/accounts';
import { ts } from '../utils/textStyles';

// ========================================
// TYPE DEFINITIONS
// ========================================

export interface Column {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  align?: 'left' | 'right'; // Right-aligned columns use flex justify-end for pixel-perfect alignment
}

export interface RowData {
  id: string;
  iconType?: string; // Controls which icon component to render (user/team/folder/file)
  [key: string]: any;
}


interface DataTableProps {
  columns: Column[];
  data: RowData[];
  onRowClick?: (row: RowData) => void;
  onRowDoubleClick?: (row: RowData) => void;
  onStarClick?: (row: RowData, isStarred: boolean) => void;
  onMoreClick?: (row: RowData) => void;
  onShare?: (row: RowData) => void;
  onRename?: (row: RowData, newName: string) => void;
  onDelete?: (row: RowData) => void;
  onDuplicate?: (copy: RowData) => void;
  onMemberCountClick?: (row: RowData) => void;
  onSelectionChange?: (row: RowData | null) => void;
  starredItems?: Set<string>;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

const MEMBER_COUNT_KEYS = new Set(['accountCount', 'membersCount', 'memberCount']);

// ========================================
// PROGRESS PILL
// ========================================

function ProgressPill({ value }: { value: string }) {
  const displayValue = value || 'Not Started';
  const isNotStarted = displayValue === 'Not Started';
  const category = !isNotStarted
    ? (value.startsWith('In Progress') ? 'In Progress' : value === 'In Review' ? 'In Review' : 'Done')
    : null;
  const bg = isNotStarted ? 'var(--bg-icon-hover)' : progressPillColors[category!];
  // Strip any trailing "(N%)" from the label — percentage lives in data only
  const label = displayValue.replace(/\s*\(\d+%\)$/, '');
  return (
    <div
      className="inline-flex items-center justify-center h-[32px] rounded-[8px] shrink-0"
      style={{ paddingLeft: '12px', paddingRight: '12px', backgroundColor: bg }}
    >
      <span style={{
        ...ts.body,
        color: isNotStarted ? 'var(--muted-foreground)' : 'var(--role-pill-text)',
        whiteSpace: 'nowrap',
        lineHeight: 'normal',
      }}>
        {label}
      </span>
    </div>
  );
}

export function DataTable({
  columns,
  data,
  onRowClick,
  onRowDoubleClick,
  onStarClick,
  onMoreClick,
  onShare,
  onRename,
  onDelete,
  onDuplicate,
  onMemberCountClick,
  onSelectionChange,
  starredItems,
  viewMode,
  onViewModeChange
}: DataTableProps) {
  // ========================================
  // DEFAULT SORT LOGIC
  // ========================================
  // Priority: 1) Activity/Date columns (desc), 2) Name columns (asc), 3) First sortable (asc)
  const getDefaultSort = (): SortConfig => {
    // Priority 1: Activity/Recency columns (descending - newest first)
    const activityColumns = ['lastModified', 'dateModified', 'lastActive', 'created', 'dateCreated'];
    const activityColumn = columns.find(col =>
      col.sortable && activityColumns.includes(col.key)
    );
    if (activityColumn) {
      return { key: activityColumn.key, direction: 'desc' };
    }

    // Priority 2: Name column (ascending - A-Z)
    const nameColumns = ['name', 'projectName', 'accountName', 'teamName', 'workspaceName'];
    const nameColumn = columns.find(col =>
      col.sortable && nameColumns.includes(col.key)
    );
    if (nameColumn) {
      return { key: nameColumn.key, direction: 'asc' };
    }

    // Priority 3: First sortable column (ascending - fallback)
    const firstSortableColumn = columns.find(col => col.sortable);
    if (firstSortableColumn) {
      return { key: firstSortableColumn.key, direction: 'asc' };
    }

    return null;
  };

  // ========================================
  // STATE MANAGEMENT
  // ========================================
  const [sortConfig, setSortConfig] = useState<SortConfig>(getDefaultSort());
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<string | null>(null); // Toggle-able selection (click same row to deselect)
  const [hoveredHeader, setHoveredHeader] = useState<string | null>(null);
  const [clickedColumns, setClickedColumns] = useState<Set<string>>(() => {
    // Initialize with the default sorted column so it appears as "clicked"
    const defaultSort = getDefaultSort();
    return defaultSort ? new Set([defaultSort.key]) : new Set();
  });
  const [openMenuRowId, setOpenMenuRowId] = useState<string | null>(null);

  const isMobile = useIsMobile();

  // Owner Modal State
  const [ownerModalAccount, setOwnerModalAccount] = useState<Account | null>(null);

  // Rename Modal State
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [rowToRename, setRowToRename] = useState<RowData | null>(null);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<RowData | null>(null);

  // Move Modal State
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [rowToMove, setRowToMove] = useState<RowData | null>(null);

  // Refs
  const moreButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map()); // For dropdown menu positioning

  // ========================================
  // SORT HANDLER
  // ========================================
  // Smart sorting:  click uses column-specific default direction,
  // subsequent clicks toggle between asc/desc
  const handleSort = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    let direction: 'asc' | 'desc';

    // Check if this column has been clicked before
    const hasBeenClicked = clickedColumns.has(columnKey);

    // If this column is already sorted AND has been clicked before, toggle the direction
    if (sortConfig && sortConfig.key === columnKey && hasBeenClicked) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
      //  click: set initial direction based on column type
      // Date columns default to desc (newest ), other columns default to asc (A-Z)
      direction = isDateColumn(columnKey) ? 'desc' : 'asc';
    }

    // Mark this column as clicked
    setClickedColumns(prev => new Set(prev).add(columnKey));
    setSortConfig({ key: columnKey, direction });
  };

  const isDateColumn = (key: string) => {
    return key === 'lastModified' || key === 'created' || key === 'dateModified' || key === 'dateCreated';
  };

  const parseDateString = (dateStr: string): Date => {
    // Parse dates in formats like "Nov 3, 2022" or "Jan 15, 2023"
    const date = new Date(dateStr);
    return date;
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue === bValue) return 0;

    let comparison = 0;

    // Special handling for date columns
    if (isDateColumn(sortConfig.key)) {
      const aDate = parseDateString(aValue);
      const bDate = parseDateString(bValue);
      comparison = aDate.getTime() - bDate.getTime();
    } else {
      // String comparison for other columns
      comparison = aValue < bValue ? -1 : 1;
    }

    return sortConfig.direction === 'asc' ? comparison : -comparison;
  });

  const displayData = sortedData;

  const handleDuplicate = (row: RowData) => {
    const copy: RowData = { ...row, id: `${row.id}-copy-${Date.now()}`, name: `Copy of ${row.name}` };
    onDuplicate?.(copy);
    toast.success(`"${row.name}" duplicated`);
    setOpenMenuRowId(null);
  };

  const handleStarClick = (e: React.MouseEvent, row: RowData) => {
    e.stopPropagation();
    const isStarred = starredItems?.has(row.id) || false;
    onStarClick?.(row, !isStarred);
  };

  const handleMoreClick = (e: React.MouseEvent, row: RowData) => {
    e.stopPropagation();
    setOpenMenuRowId(openMenuRowId === row.id ? null : row.id);
  };

  const handleRowClick = (row: RowData) => {
    // Toggle behavior: clicking the same row deselects it
    if (selectedRow === row.id) {
      setSelectedRow(null);
      onSelectionChange?.(null);
      onRowClick?.(row);
    } else {
      setSelectedRow(row.id);
      onSelectionChange?.(row);
      onRowClick?.(row);
    }
  };

  const handleRowDoubleClick = (row: RowData) => {
    onRowDoubleClick?.(row);
  };

  // Clear selection when ESC key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedRow) {
        setSelectedRow(null);
        onSelectionChange?.(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedRow]);

  // ========================================
  // RESPONSIVE COLUMN HIDING
  // ========================================
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(Infinity);

  useEffect(() => {
    const el = tableContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Handle clicking on empty space in the table area
  const handleTableAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only clear selection if clicking directly on the scrollable area (not bubbled from rows)
    if (e.target === e.currentTarget) {
      setSelectedRow(null);
      onSelectionChange?.(null);
    }
  };

  const getRowBackgroundColor = (rowId: string) => {
    if (selectedRow === rowId) {
      return 'var(--bg-selected)';
    }
    return 'var(--background)';
  };

  // Determine which columns to show based on container width
  const visibleColumns = (() => {
    const iconColWidth = 116;
    const nameColMin = 200;
    const middleColMin = 140;
    const lastNumericW = 140;
    const lastTextW = 140;
    const lastIsNumeric = columns[columns.length - 1]?.align === 'right';
    const lastW = lastIsNumeric ? lastNumericW : lastTextW;
    const middleCount = Math.max(0, columns.length - 2);
    const totalMin = nameColMin + middleCount * middleColMin + lastW + iconColWidth;

    if (containerWidth >= totalMin || columns.length <= 2) return columns;

    // Find candidates to hide
    const hasCreated = columns.some(c => c.key === 'created' || c.key === 'dateCreated');
    const numericIndices = columns
      .map((c, i) => (i > 0 && c.align === 'right' ? i : -1))
      .filter(i => i >= 0);
    const hasNumeric = numericIndices.length > 0;

    if (hasCreated && hasNumeric) {
      // Hide Created On first
      return columns.filter(c => c.key !== 'created' && c.key !== 'dateCreated');
    }
    if (hasNumeric) {
      // Hide last numeric column
      const lastNumericIdx = numericIndices[numericIndices.length - 1];
      return columns.filter((_, i) => i !== lastNumericIdx);
    }
    if (hasCreated) {
      return columns.filter(c => c.key !== 'created' && c.key !== 'dateCreated');
    }
    return columns;
  })();

  return (
    <>
      {/* Mobile Card View - Only visible on mobile */}
      <div className="md:hidden flex-1 flex flex-col overflow-hidden">
        {/* Mobile Sort Header — 16px gap below TabNav */}
        <div className="shrink-0 mt-[16px] mb-[16px]">
          <MobileSortHeader
            sortColumn={sortConfig?.key || 'lastModified'}
            sortDirection={sortConfig?.direction || 'desc'}
            sortOptions={columns.filter(col => col.sortable).map(col => ({ key: col.key, label: col.label }))}
            onSortChange={handleSort}
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
          />
        </div>

        {/* Scrollable Card List */}
        <div className="flex-1 overflow-auto pb-[72px]">
          <MobileCardView
            data={displayData}
            onRowClick={onRowClick}
            onRowDoubleClick={onRowDoubleClick}
            onStarClick={onStarClick}
            starredItems={starredItems}
            viewMode={viewMode}
            onRename={(row, newName) => { onRename?.(row, newName); toast.success(`Renamed to "${newName}"`); }}
            onShare={(row) => { onShare?.(row); }}
            onDuplicate={(row) => handleDuplicate(row)}
            onMove={(_row, _destId, destLabel) => { toast.success(`Moved to ${destLabel}`); }}
            onDelete={(row) => { onDelete?.(row); toast.success(`"${row.name || row.projectName || row.accountName || row.teamName || ''}" deleted`); }}
          />
        </div>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div ref={tableContainerRef} className="hidden md:flex flex-1 flex-col px-[24px] pb-[24px] min-h-0 overflow-hidden">
      {/* ======================================== */}
      {/* TABLE (header + rows inside the same border) */}
      {/* ======================================== */}
      <div role="grid" className="flex flex-col overflow-hidden rounded-2xl w-full flex-1 min-h-0" style={{ border: '1px solid var(--border)' }}>
      {/* TABLE HEADER SECTION */}
      <div className="shrink-0 overflow-hidden w-full" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="w-full flex" role="row" style={{ minWidth: '100%' }}>
          {/* Header Columns */}
          <div className="flex flex-1 min-w-0" role="rowgroup">
            {visibleColumns.map((column, index) => {
              const totalColumns = visibleColumns.length;
              let flexStyle: React.CSSProperties = {};

              // ========================================
              // COLUMN WIDTH CALCULATION LOGIC
              // ========================================
              // Name column (index 0): Always gets the largest flex share (priority)
              // Middle columns: Equal smaller shares
              // Last column: Compact fixed width — extra tight for right-aligned numeric columns
              const isLastColumn = index === visibleColumns.length - 1;
              const lastColIsNumeric = visibleColumns[visibleColumns.length - 1]?.align === 'right';

              if (isLastColumn) {
                // Numeric right-aligned (e.g. Members, Projects): tight fixed width
                // Text last column (e.g. Created On): standard fixed width
                const lastW = lastColIsNumeric ? 140 : 140;
                flexStyle = { flex: `0 0 ${lastW}px`, minWidth: `${lastW}px`, maxWidth: `${lastW}px` };
              } else if (index === 0) {
                // Name column always gets 3x share so it survives narrowing
                flexStyle = { flex: '3 1 0px', minWidth: '200px' };
              } else if (column.align === 'right') {
                // Right-aligned middle columns (e.g. Members when not last): compact fixed width
                flexStyle = { flex: '0 0 140px', minWidth: '140px', maxWidth: '140px' };
              } else {
                // Middle columns share equally
                flexStyle = { flex: '1 1 0px', minWidth: '140px' };
              }

              const ariaSortValue = sortConfig?.key === column.key
                ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending')
                : 'none';

              const headerCellStyle: React.CSSProperties = {
                ...flexStyle,
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semibold)',
                color: sortConfig?.key === column.key || hoveredHeader === column.key ? 'var(--primary)' : 'var(--muted-foreground)',
                fontSize: 'var(--font-size-12)',
                letterSpacing: 'var(--letter-spacing-lg)',
                textTransform: 'uppercase',
                textAlign: column.align || 'left',
                paddingLeft: '20px',
                paddingRight: '20px',
                position: 'relative',
                boxSizing: 'border-box',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                transition: 'color var(--duration-default) var(--ease-standard)',
              };

              if (column.sortable) {
                return (
                  <div
                    key={column.key}
                    role="columnheader"
                    aria-sort={ariaSortValue as 'ascending' | 'descending' | 'none'}
                    style={headerCellStyle}
                    onMouseEnter={() => setHoveredHeader(column.key)}
                    onMouseLeave={() => setHoveredHeader(null)}
                  >
                    <button
                      type="button"
                      onClick={() => handleSort(column.key)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        width: '100%',
                        padding: '16px 0',
                        textAlign: 'inherit',
                        fontFamily: 'inherit',
                        fontWeight: 'inherit',
                        fontSize: 'inherit',
                        letterSpacing: 'inherit',
                        textTransform: 'inherit',
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {column.align === 'right' ? (
                        <div className="flex items-center justify-end gap-[8px] w-full">
                          <div
                            className="flex flex-col w-[16px] h-[16px] overflow-hidden shrink-0"
                            style={{
                              opacity: (sortConfig?.key === column.key || hoveredHeader === column.key) ? 1 : 0,
                              transition: `opacity var(--duration-default) var(--ease-standard)`,
                            }}
                          >
                            {sortConfig?.key === column.key ? (
                              sortConfig.direction === 'asc' ? (
                                <ArrowUp className="size-[16px]" style={{ color: 'var(--primary)', transition: 'color var(--duration-default) var(--ease-standard)' }} />
                              ) : (
                                <ArrowDown className="size-[16px]" style={{ color: 'var(--primary)', transition: 'color var(--duration-default) var(--ease-standard)' }} />
                              )
                            ) : (
                              isDateColumn(column.key) ? (
                                <ArrowDown className="size-[16px]" style={{ color: 'var(--muted-foreground)', transition: 'color var(--duration-default) var(--ease-standard)', animation: hoveredHeader === column.key ? 'arrowLoopDown 700ms forwards' : 'none' }} />
                              ) : (
                                <ArrowUp className="size-[16px]" style={{ color: 'var(--muted-foreground)', transition: 'color var(--duration-default) var(--ease-standard)', animation: hoveredHeader === column.key ? 'arrowLoopUp 700ms forwards' : 'none' }} />
                              )
                            )}
                          </div>
                          <span>{column.label}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-[8px] w-full">
                          <span>{column.label}</span>
                          <div
                            className="flex flex-col w-[16px] h-[16px] overflow-hidden shrink-0"
                            style={{
                              opacity: (sortConfig?.key === column.key || hoveredHeader === column.key) ? 1 : 0,
                              transition: `opacity var(--duration-default) var(--ease-standard)`,
                            }}
                          >
                            {sortConfig?.key === column.key ? (
                              sortConfig.direction === 'asc' ? (
                                <ArrowUp className="size-[16px]" style={{ color: 'var(--primary)', transition: 'color var(--duration-default) var(--ease-standard)' }} />
                              ) : (
                                <ArrowDown className="size-[16px]" style={{ color: 'var(--primary)', transition: 'color var(--duration-default) var(--ease-standard)' }} />
                              )
                            ) : (
                              isDateColumn(column.key) ? (
                                <ArrowDown className="size-[16px]" style={{ color: 'var(--muted-foreground)', transition: 'color var(--duration-default) var(--ease-standard)', animation: hoveredHeader === column.key ? 'arrowLoopDown 700ms forwards' : 'none' }} />
                              ) : (
                                <ArrowUp className="size-[16px]" style={{ color: 'var(--muted-foreground)', transition: 'color var(--duration-default) var(--ease-standard)', animation: hoveredHeader === column.key ? 'arrowLoopUp 700ms forwards' : 'none' }} />
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                );
              }

              // Non-sortable header
              return (
                <div
                  key={column.key}
                  role="columnheader"
                  className="py-[16px]"
                  style={headerCellStyle}
                >
                  {column.align === 'right' ? (
                    <div className="flex items-center justify-end gap-[8px]">
                      <span>{column.label}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-[8px]">
                      <span>{column.label}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Icons column header */}
          <div role="columnheader" style={{ flex: '0 0 116px', minWidth: '116px', maxWidth: '116px', paddingLeft: '24px', paddingRight: '20px' }}></div>
        </div>
      </div>

      {/* ======================================== */}
      {/* TABLE ROWS SECTION (Scrollable) */}
      {/* ======================================== */}
      <div className="overflow-hidden flex-1 min-h-0" role="rowgroup">
        <div className="overflow-y-auto w-full h-full" style={{ paddingBottom: '4px' }} onClick={handleTableAreaClick}>
          <div className="w-full" role="grid" style={{ minWidth: '100%' }}>
            {displayData.map((row, rowIndex) => {
              const totalColumns = visibleColumns.length;

              return (
                <div
                  key={row.id}
                  role="row"
                  tabIndex={0}
                  className="cursor-pointer flex items-center w-full"
                  style={{
                    height: '64px',
                    borderBottom: rowIndex === displayData.length - 1 ? 'none' : '1px solid var(--border)',
                    backgroundColor: getRowBackgroundColor(row.id),
                    minWidth: '100%',
                    transition: 'background-color var(--duration-default) var(--ease-standard)',
                  }}
                  onClick={() => handleRowClick(row)}
                  onDoubleClick={() => handleRowDoubleClick(row)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleRowClick(row); } }}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onMouseOver={(e) => {
                    // HOVER STATE: Apply --muted background (var(--bg-row-hover) = #f5f5f5)
                    if (selectedRow !== row.id) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-rollover)';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = getRowBackgroundColor(row.id);
                  }}
                >
                  {/* Data columns container */}
                  <div className="flex flex-1 min-w-0">
                    {visibleColumns.map((column, index) => {
                      let flexStyle: React.CSSProperties = {};

                      // Mirror the header column width logic
                      const isLastColumn = index === visibleColumns.length - 1;
                      const lastColIsNumeric = visibleColumns[visibleColumns.length - 1]?.align === 'right';

                      if (isLastColumn) {
                        const lastW = lastColIsNumeric ? 140 : 140;
                        flexStyle = { flex: `0 0 ${lastW}px`, minWidth: `${lastW}px`, maxWidth: `${lastW}px` };
                      } else if (index === 0) {
                        flexStyle = { flex: '3 1 0px', minWidth: '200px' };
                      } else if (column.align === 'right') {
                        // Right-aligned middle columns (e.g. Members when not last): compact fixed width
                        flexStyle = { flex: '0 0 140px', minWidth: '140px', maxWidth: '140px' };
                      } else {
                        flexStyle = { flex: '1 1 0px', minWidth: '140px' };
                      }

                      return (
                        <div
                          key={column.key}
                          role="gridcell"
                          className="flex items-center"
                          style={{
                            ...flexStyle,
                            fontFamily: 'var(--font-family)',
                            fontSize: 'var(--font-size-15)',
                            fontWeight: 'var(--font-weight-regular)',
                            textAlign: column.align || 'left',
                            letterSpacing: 'var(--letter-spacing-sm)',
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            boxSizing: 'border-box'
                          }}
                        >
                          {index === 0 ? (
                            // ========================================
                            // FIRST COLUMN: Icon + Text
                            // ========================================
                            <div className="flex items-center gap-[16px] min-w-0">
                              {/* Render icon based on iconType */}
                              {row.iconType === 'user' || row.iconType === 'account' ? (
                                <Avatar
                                  name={row.name}
                                  role={accounts.find(acc => acc.name === row.name)?.role || row.role || 'Creator'}
                                  size="medium"
                                />
                              ) : row.iconType === 'team' ? (
                                <TeamIcon size="medium" />
                              ) : row.iconType === 'folder' || row.iconType === 'workspace' ? (
                                <WorkspaceIcon name={row.name} size="medium" />
                              ) : row.iconType === 'project' ? (
                                <ProjectIcon size="medium" />
                              ) : (
                                // ========================================
                                // FALLBACK FILE ICON CONTAINER
                                // Uses theme variables for consistency
                                // ========================================
                                <div
                                  className="shrink-0 size-[32px] flex items-center justify-center"
                                  style={{
                                    backgroundColor: 'var(--bg-icon-container)',
                                    borderRadius: 'var(--radius-8)'
                                  }}
                                  title={row.iconType || 'Icon'}
                                >
                                  <File className="size-[18px] text-white" />
                                </div>
                              )}
                              <span
                                className={`${(hoveredRow === row.id || selectedRow === row.id) ? 'text-primary' : 'text-foreground'} flex-1 min-w-0`}
                                style={{
                                  fontFamily: 'var(--font-family)',
                                  fontSize: 'var(--font-size-16)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  letterSpacing: 'var(--letter-spacing-sm)',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  transition: 'color var(--duration-default) var(--ease-standard)',
                                }}
                              >
                                {row[column.key]}
                              </span>
                            </div>
                          ) : (
                            // ========================================
                            // MIDDLE COLUMNS: Role badges or text
                            // ========================================
                            column.key === 'progress' ? (
                              <ProgressPill value={row[column.key]} />
                            ) :
                            (column.key === 'owner' || column.key === 'sharedBy') ? (
                              (() => {
                                const ownerAccount = accounts.find(a => a.name === row[column.key]);
                                return ownerAccount ? (
                                  <div
                                    className="flex items-center gap-[8px] min-w-0 cursor-pointer"
                                    style={{
                                      padding: '8px 12px 8px 8px',
                                      marginLeft: '-8px',
                                      borderRadius: 'var(--radius-24)',
                                      backgroundColor: 'transparent',
                                      transition: 'background-color var(--transition-duration) var(--transition-timing)',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                                    onClick={e => { e.stopPropagation(); setOwnerModalAccount(ownerAccount); }}
                                  >
                                    <Avatar name={ownerAccount.name} role={ownerAccount.role} size="small" />
                                    <span
                                      className="min-w-0"
                                      style={{
                                        fontFamily: 'var(--font-family)',
                                        fontSize: 'var(--font-size-16)',
                                        fontWeight: 'var(--font-weight-regular)',
                                        letterSpacing: 'var(--letter-spacing-sm)',
                                        color: (hoveredRow === row.id || selectedRow === row.id) ? 'var(--primary)' : 'var(--foreground)',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        transition: 'color var(--duration-default) var(--ease-standard)',
                                      }}
                                    >
                                      {row[column.key]}
                                    </span>
                                  </div>
                                ) : (
                                  <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-16)', fontWeight: 'var(--font-weight-regular)', letterSpacing: 'var(--letter-spacing-sm)', color: 'var(--foreground)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {row[column.key]}
                                  </span>
                                );
                              })()
                            ) :
                            column.key === 'role' ? (
                              <RoleBadge role={row[column.key] as any} />
                            ) :
                            column.key === 'accessLevel' ? (
                              <span style={{
                                fontFamily: 'var(--font-family)',
                                fontSize: 'var(--font-size-16)',
                                fontWeight: 'var(--font-weight-regular)',
                                letterSpacing: 'var(--letter-spacing-sm)',
                                color: (hoveredRow === row.id || selectedRow === row.id) ? 'var(--primary)' : 'var(--foreground)',
                                whiteSpace: 'nowrap',
                                transition: 'color var(--duration-default) var(--ease-standard)',
                              }}>
                                {row[column.key]}
                              </span>
                            ) :
                            column.align === 'right' ? (
                              // Right-aligned columns - use flex justify-end to match header
                              <div className="flex items-center justify-end w-full">
                                {onMemberCountClick && MEMBER_COUNT_KEYS.has(column.key) ? (
                                  <button
                                    onClick={e => { e.stopPropagation(); onMemberCountClick(row); }}
                                    style={{
                                      fontFamily: 'var(--font-family)',
                                      fontSize: 'var(--font-size-16)',
                                      fontWeight: 'var(--font-weight-regular)',
                                      letterSpacing: 'var(--letter-spacing-sm)',
                                      color: (hoveredRow === row.id || selectedRow === row.id) ? 'var(--primary)' : 'var(--foreground)',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      background: 'none',
                                      border: 'none',
                                      cursor: 'pointer',
                                      height: '36px',
                                      minWidth: '36px',
                                      padding: '0 12px',
                                      borderRadius: 'var(--radius-24)',
                                      backgroundColor: 'transparent',
                                      textDecoration: 'none',
                                      transition: 'background-color var(--duration-default) var(--ease-standard), color var(--duration-default) var(--ease-standard)',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                                  >
                                    {row[column.key]}
                                  </button>
                                ) : (
                                  <span
                                    className={`${(hoveredRow === row.id || selectedRow === row.id) ? 'text-primary' : 'text-foreground'}`}
                                    style={{
                                      fontFamily: 'var(--font-family)',
                                      fontSize: 'var(--font-size-16)',
                                      fontWeight: 'var(--font-weight-regular)',
                                      letterSpacing: 'var(--letter-spacing-sm)',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      transition: 'color var(--duration-default) var(--ease-standard)',
                                    }}
                                  >
                                    {row[column.key]}
                                  </span>
                                )}
                              </div>
                            ) : (
                              // Left-aligned columns
                              <span
                                className={`${(hoveredRow === row.id || selectedRow === row.id) ? 'text-primary' : 'text-foreground'} block min-w-0`}
                                style={{
                                  fontFamily: 'var(--font-family)',
                                  fontSize: 'var(--font-size-16)',
                                  fontWeight: 'var(--font-weight-regular)',
                                  letterSpacing: 'var(--letter-spacing-sm)',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  transition: 'color var(--duration-default) var(--ease-standard)',
                                }}
                              >
                                {row[column.key]}
                              </span>
                            )
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Separate icons column */}
                  <div role="gridcell" className="flex items-center" style={{ flex: '0 0 116px', minWidth: '116px', maxWidth: '116px', paddingLeft: '24px', paddingRight: '20px' }}>
                    <div className={`flex items-center justify-end gap-[0px] ${(hoveredRow === row.id || openMenuRowId === row.id) ? 'opacity-100' : 'opacity-0'}`} style={{ transition: `opacity var(--transition-duration) var(--transition-timing)` }}>
                      {/* ========================================
                          STAR BUTTON - Uses theme variables
                          ========================================*/}
                      <button
                        className="size-[36px] flex items-center justify-center rounded-full"
                        aria-label={starredItems?.has(row.id) ? `Remove ${row.name} from favorites` : `Add ${row.name} to favorites`}
                        style={{
                          backgroundColor: 'transparent',
                          color: 'var(--foreground)',
                          transition: `background-color var(--transition-duration) var(--transition-timing), color var(--transition-duration) var(--transition-timing)`,
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'; e.currentTarget.style.color = 'var(--primary)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--foreground)'; }}
                        onClick={(e) => handleStarClick(e, row)}
                      >
                        <Star
                          aria-hidden="true"
                          className="size-[16px]"
                          strokeWidth={1.5}
                          fill={starredItems?.has(row.id) ? 'currentColor' : 'none'}
                        />
                      </button>
                      {/* ========================================
                          MORE BUTTON - Uses theme variables
                          ========================================*/}
                      <button
                        className="size-[36px] flex items-center justify-center rounded-full"
                        aria-label={`More options for ${row.name}`}
                        aria-expanded={openMenuRowId === row.id}
                        aria-haspopup="menu"
                        style={{
                          backgroundColor: openMenuRowId === row.id ? 'var(--bg-icon-hover)' : 'transparent',
                          color: 'var(--foreground)',
                          transition: `background-color var(--transition-duration) var(--transition-timing), color var(--transition-duration) var(--transition-timing)`,
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'; e.currentTarget.style.color = 'var(--primary)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = openMenuRowId === row.id ? 'var(--bg-icon-hover)' : 'transparent'; e.currentTarget.style.color = 'var(--foreground)'; }}
                        onClick={(e) => handleMoreClick(e, row)}
                        ref={el => { if (el) moreButtonRefs.current.set(row.id, el); }}
                      >
                        <MoreHorizontal
                          aria-hidden="true"
                          className="size-[16px]"
                          />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Items count tray */}
      <div
        className="shrink-0 flex items-center px-[20px] pb-[2px]"
        style={{
          height: '36px',
          borderTop: '1px solid var(--border)',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-family)',
          fontSize: 'var(--font-size-12)',
          fontWeight: 'var(--font-weight-regular)',
          letterSpacing: 'var(--letter-spacing-sm)',
          color: 'var(--text-secondary)',
        }}>
          {displayData.length} {displayData.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      </div>

      {/* Dropdown Menus */}
      {displayData.map((row) => {
        const anchorRef = { current: moreButtonRefs.current.get(row.id) || null } as React.RefObject<HTMLElement>;
        const isAccount = row.iconType === 'account';
        const allItems = createDefaultMenuItems(
          row.name,
          () => {
            setRowToRename(row);
            setIsRenameModalOpen(true);
            setOpenMenuRowId(null);
          },
          () => { onShare?.(row); setOpenMenuRowId(null); },
          () => handleDuplicate(row),
          () => { setRowToMove(row); setIsMoveModalOpen(true); setOpenMenuRowId(null); },
          () => { setRowToDelete(row); setIsDeleteModalOpen(true); setOpenMenuRowId(null); }
        );
        const menuItems = isAccount ? allItems.filter(item => item.id !== 'share') : allItems;

        return (
          <DropdownMenu
            key={`menu-${row.id}`}
            items={menuItems}
            isOpen={openMenuRowId === row.id}
            onClose={() => setOpenMenuRowId(null)}
            anchorRef={anchorRef}
          />
        );
      })}

    </div>

      {/* ── Modals (top-level so they render on mobile and desktop) ─────── */}
      <OwnerModal
        account={ownerModalAccount}
        onClose={() => setOwnerModalAccount(null)}
      />

      {isMobile ? (
        <>
          <RenameActionDrawer
            isOpen={isRenameModalOpen}
            row={rowToRename}
            onClose={() => { setIsRenameModalOpen(false); setRowToRename(null); }}
            onConfirm={(newName) => {
              if (rowToRename) onRename?.(rowToRename, newName);
              toast.success(`Renamed to "${newName}"`);
            }}
          />
          <MoveActionDrawer
            isOpen={isMoveModalOpen}
            row={rowToMove}
            onClose={() => { setIsMoveModalOpen(false); setRowToMove(null); }}
            onConfirm={(_destId, destLabel) => {
              if (rowToMove) toast.success(`"${rowToMove.name}" moved to ${destLabel}`);
            }}
          />
          <DeleteActionDrawer
            isOpen={isDeleteModalOpen}
            row={rowToDelete}
            onClose={() => { setIsDeleteModalOpen(false); setRowToDelete(null); }}
            onConfirm={() => {
              const deleted = rowToDelete;
              if (deleted) { onDelete?.(deleted); setRowToDelete(null); toast.success(`"${deleted.name}" deleted`); }
            }}
          />
        </>
      ) : (
        <>
          {rowToRename && (
            <RenameModal
              isOpen={isRenameModalOpen}
              currentName={rowToRename.name}
              onClose={() => { setIsRenameModalOpen(false); setRowToRename(null); }}
              onRename={(newName) => {
                onRename?.(rowToRename, newName);
                toast.success(`Renamed to "${newName}"`);
              }}
              title={`Rename "${rowToRename.name}"`}
            />
          )}
          <MoveModal
            isOpen={isMoveModalOpen}
            row={rowToMove}
            onClose={() => { setIsMoveModalOpen(false); setRowToMove(null); }}
            onMove={(row, _destId, destLabel) => {
              toast.success(`"${row.name}" moved to ${destLabel}`);
            }}
          />
          {rowToDelete && (
            <DeleteConfirmModal
              isOpen={isDeleteModalOpen}
              itemName={rowToDelete.name}
              onClose={() => { setIsDeleteModalOpen(false); setRowToDelete(null); }}
              onConfirm={() => {
                const deleted = rowToDelete;
                onDelete?.(deleted);
                setRowToDelete(null);
                toast.success(`"${deleted.name}" deleted`);
              }}
            />
          )}
        </>
      )}
    </>
  );
}
