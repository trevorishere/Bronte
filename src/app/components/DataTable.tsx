import { useState, useEffect, useRef } from 'react';
import { Star, MoreHorizontal, ArrowUp, ArrowDown, File, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { DropdownMenu, createDefaultMenuItems } from './DropdownMenu';
import { Avatar, RoleBadge, roleColors } from './Avatar';
import { TeamIcon } from './TeamIcon';
import { WorkspaceIcon } from './WorkspaceIcon';
import { ProjectIcon } from './ProjectIcon';
import { RenameModal } from './RenameModal';
import { MobileCardView } from './MobileCardView';
import { MobileSortHeader } from './MobileSortHeader';
import { accounts, AccessLevel } from '../data/accounts';

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

const ROLE_OPTIONS = ['Admin', 'Owner', 'Manager', 'Creator', 'Viewer', 'Member', 'Developer', 'Editor'] as const;
const ACCESS_LEVEL_OPTIONS: AccessLevel[] = ['Super Admin', 'Owner', 'Editor', 'Viewer', 'None'];

interface DataTableProps {
  columns: Column[];
  data: RowData[];
  onRowClick?: (row: RowData) => void;
  onRowDoubleClick?: (row: RowData) => void;
  onStarClick?: (row: RowData, isStarred: boolean) => void;
  onMoreClick?: (row: RowData) => void;
  onRename?: (row: RowData, newName: string) => void;
  onRoleChange?: (row: RowData, newRole: string) => void;
  onAccessLevelChange?: (row: RowData, newLevel: string) => void;
  starredItems?: Set<string>;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

export function DataTable({
  columns,
  data,
  onRowClick,
  onRowDoubleClick,
  onStarClick,
  onMoreClick,
  onRename,
  onRoleChange,
  onAccessLevelChange,
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
  const navigate = useNavigate();
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
  const [openRoleDropdownId, setOpenRoleDropdownId] = useState<string | null>(null);
  const [openAccessDropdownId, setOpenAccessDropdownId] = useState<string | null>(null);

  // Rename Modal State
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [rowToRename, setRowToRename] = useState<RowData | null>(null);

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
      onRowClick?.(row);
    } else {
      setSelectedRow(row.id);
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedRow]);

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenRoleDropdownId(null);
      setOpenAccessDropdownId(null);
    };
    if (openRoleDropdownId || openAccessDropdownId) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openRoleDropdownId, openAccessDropdownId]);

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
    }
  };

  const getRowBackgroundColor = (rowId: string) => {
    if (selectedRow === rowId) {
      return 'var(--bg-row-selected)';
    }
    return 'var(--background)';
  };

  // Determine which columns to show based on container width
  const visibleColumns = (() => {
    const iconColWidth = 116;
    const nameColMin = 200;
    const middleColMin = 140;
    const lastNumericW = 112;
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
        {/* Mobile Sort Header */}
        <MobileSortHeader
          sortColumn={sortConfig?.key || 'lastModified'}
          sortDirection={sortConfig?.direction || 'desc'}
          sortOptions={columns.filter(col => col.sortable).map(col => ({ key: col.key, label: col.label }))}
          onSortChange={handleSort}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
        />

        {/* Scrollable Card List */}
        <div className="flex-1 overflow-auto pb-[72px]">
          <MobileCardView
            data={sortedData}
            onRowClick={onRowClick}
            onRowDoubleClick={onRowDoubleClick}
            onStarClick={onStarClick}
            starredItems={starredItems}
            viewMode={viewMode}
          />
        </div>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div ref={tableContainerRef} className="hidden md:flex flex-1 flex-col px-[24px] pb-[24px] min-h-0 overflow-hidden">
      {/* ======================================== */}
      {/* TABLE (header + rows inside the same border) */}
      {/* ======================================== */}
      <div className="flex flex-col overflow-hidden rounded-2xl w-full flex-1 min-h-0" style={{ border: '1px solid var(--border-interactive)' }}>
      {/* TABLE HEADER SECTION */}
      <div className="shrink-0 overflow-hidden w-full" style={{ borderBottom: '1px solid var(--border-interactive)' }}>
        <div className="w-full flex" style={{ minWidth: '100%' }}>
          {/* Header Columns */}
          <div className="flex flex-1 min-w-0">
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
                const lastW = lastColIsNumeric ? 112 : 140;
                flexStyle = { flex: `0 0 ${lastW}px`, minWidth: `${lastW}px`, maxWidth: `${lastW}px` };
              } else if (index === 0) {
                // Name column always gets 3x share so it survives narrowing
                flexStyle = { flex: '3 1 0px', minWidth: '200px' };
              } else {
                // Middle columns share equally
                flexStyle = { flex: '1 1 0px', minWidth: '140px' };
              }

              return (
                <div
                  key={column.key}
                  className={`${column.sortable ? 'cursor-pointer' : ''} py-[16px]`}
                  style={{
                    ...flexStyle,
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: sortConfig?.key === column.key || hoveredHeader === column.key ? 'var(--primary)' : 'var(--muted-foreground)',
                    fontSize: '12px',
                    letterSpacing: 'var(--letter-spacing-lg)',
                    textTransform: 'uppercase',
                    textAlign: column.align || 'left',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    position: 'relative',
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}
                  onClick={() => handleSort(column.key)}
                  onMouseEnter={() => column.sortable && setHoveredHeader(column.key)}
                  onMouseLeave={() => setHoveredHeader(null)}
                >
                  {column.align === 'right' ? (
                    // Right-aligned columns: arrow on left, text right-aligned
                    <div className="flex items-center justify-end gap-[8px]">
                      {column.sortable && (
                        <div className="flex flex-col w-[16px]">
                          {(sortConfig?.key === column.key || hoveredHeader === column.key) && (
                            <>
                              {sortConfig?.key === column.key ? (
                                sortConfig.direction === 'asc' ? (
                                  <ArrowUp className="size-[16px] text-primary" />
                                ) : (
                                  <ArrowDown className="size-[16px] text-primary" />
                                )
                              ) : (
                                // Show preview arrow based on what the initial sort direction will be
                                isDateColumn(column.key) ? (
                                  <ArrowDown className="size-[16px] text-muted-foreground" />
                                ) : (
                                  <ArrowUp className="size-[16px] text-muted-foreground" />
                                )
                              )}
                            </>
                          )}
                        </div>
                      )}
                      <span>{column.label}</span>
                    </div>
                  ) : (
                    // Left-aligned columns: text on left, arrow on right
                    <div className="flex items-center gap-[8px]">
                      <span>{column.label}</span>
                      {column.sortable && (
                        <div className="flex flex-col w-[16px]">
                          {(sortConfig?.key === column.key || hoveredHeader === column.key) && (
                            <>
                              {sortConfig?.key === column.key ? (
                                sortConfig.direction === 'asc' ? (
                                  <ArrowUp className="size-[16px] text-primary" />
                                ) : (
                                  <ArrowDown className="size-[16px] text-primary" />
                                )
                              ) : (
                                // Show preview arrow based on what the initial sort direction will be
                                isDateColumn(column.key) ? (
                                  <ArrowDown className="size-[16px] text-muted-foreground" />
                                ) : (
                                  <ArrowUp className="size-[16px] text-muted-foreground" />
                                )
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Icons column header */}
          <div style={{ flex: '0 0 116px', minWidth: '116px', maxWidth: '116px', paddingLeft: '24px', paddingRight: '20px' }}></div>
        </div>
      </div>

      {/* ======================================== */}
      {/* TABLE ROWS SECTION (Scrollable) */}
      {/* ======================================== */}
      <div className="overflow-hidden flex-1 min-h-0">
        <div className="overflow-y-auto w-full h-full" style={{ paddingBottom: '4px' }} onClick={handleTableAreaClick}>
          <div className="w-full" style={{ minWidth: '100%' }}>
            {sortedData.map((row, rowIndex) => {
              const totalColumns = visibleColumns.length;

              return (
                <div
                  key={row.id}
                  className="cursor-pointer transition-colors flex w-full"
                  style={{
                    borderBottom: rowIndex === sortedData.length - 1 ? 'none' : '1px solid var(--border-interactive)',
                    backgroundColor: getRowBackgroundColor(row.id),
                    minWidth: '100%'
                  }}
                  onClick={() => handleRowClick(row)}
                  onDoubleClick={() => handleRowDoubleClick(row)}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onMouseOver={(e) => {
                    // HOVER STATE: Apply --muted background (var(--bg-row-hover) = #f5f5f5)
                    if (selectedRow !== row.id) {
                      e.currentTarget.style.backgroundColor = 'var(--muted)';
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
                        const lastW = lastColIsNumeric ? 112 : 140;
                        flexStyle = { flex: `0 0 ${lastW}px`, minWidth: `${lastW}px`, maxWidth: `${lastW}px` };
                      } else if (index === 0) {
                        flexStyle = { flex: '3 1 0px', minWidth: '200px' };
                      } else {
                        flexStyle = { flex: '1 1 0px', minWidth: '140px' };
                      }

                      return (
                        <div
                          key={column.key}
                          className="py-[16px] flex items-center"
                          style={{
                            ...flexStyle,
                            fontFamily: 'var(--font-family)',
                            fontSize: 'var(--font-size-15)',
                            fontWeight: 'var(--font-weight-light)',
                            textAlign: column.align || 'left',
                            letterSpacing: 'var(--letter-spacing-md)',
                            paddingLeft: '16px',
                            paddingRight: '16px',
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
                                  role={accounts.find(acc => acc.name === row.name)?.role || row.role || 'Viewer'}
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
                                  fontSize: 'var(--font-size-15)',
                                  fontWeight: 'var(--font-weight-medium)',
                                  letterSpacing: 'var(--letter-spacing-md)',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                              >
                                {row[column.key]}
                              </span>
                            </div>
                          ) : (
                            // ========================================
                            // MIDDLE COLUMNS: Role badges or text
                            // ========================================
                            column.key === 'owner' ? (
                              (() => {
                                const ownerAccount = accounts.find(a => a.name === row[column.key]);
                                return (
                                  <div className="flex items-center gap-[12px] min-w-0">
                                    {ownerAccount && (
                                      <Avatar name={ownerAccount.name} role={ownerAccount.role} size="small" />
                                    )}
                                    {ownerAccount ? (
                                      <span
                                        className="cursor-pointer hover:underline min-w-0"
                                        style={{
                                          fontFamily: 'var(--font-family)',
                                          fontSize: 'var(--font-size-15)',
                                          fontWeight: 'var(--font-weight-light)',
                                          letterSpacing: 'var(--letter-spacing-md)',
                                          color: 'var(--primary)',
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          navigate(`/admin/account/${ownerAccount.id}`);
                                        }}
                                      >
                                        {row[column.key]}
                                      </span>
                                    ) : (
                                      <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-15)', fontWeight: 'var(--font-weight-light)', letterSpacing: 'var(--letter-spacing-md)', color: 'var(--foreground)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {row[column.key]}
                                      </span>
                                    )}
                                  </div>
                                );
                              })()
                            ) :
                            column.key === 'role' ? (
                              (() => {
                                const rc = roleColors[row[column.key] as keyof typeof roleColors];
                                return (
                                  <div className="relative">
                                    <button
                                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenRoleDropdownId(openRoleDropdownId === row.id ? null : row.id);
                                        setOpenAccessDropdownId(null);
                                      }}
                                    >
                                      <div
                                        className="role-color flex items-center justify-between gap-[16px]"
                                        style={{
                                          backgroundColor: rc?.text,
                                          borderRadius: '16px',
                                          paddingTop: '5px',
                                          paddingBottom: '6px',
                                          paddingLeft: '16px',
                                          paddingRight: '12px',
                                        }}
                                      >
                                        <span style={{
                                          fontFamily: 'var(--font-family)',
                                          fontWeight: 'var(--font-weight-regular)',
                                          fontSize: '15px',
                                          letterSpacing: 'var(--letter-spacing-md)',
                                          color: 'white',
                                          whiteSpace: 'nowrap',
                                        }}>
                                          {row[column.key]}
                                        </span>
                                        <ChevronDown className="size-[16px]" style={{ color: 'white', flexShrink: 0 }} />
                                      </div>
                                    </button>
                                    <AnimatePresence>
                                      {openRoleDropdownId === row.id && (
                                        <motion.div
                                          className="absolute left-0 bg-background shadow-lg p-[8px] z-50"
                                          style={{
                                            border: '1px solid var(--border-interactive-hover)',
                                            borderRadius: 'var(--radius-16)',
                                            top: 'calc(100% + 8px)',
                                            minWidth: '180px',
                                          }}
                                          initial={{ opacity: 0, scaleY: 0.9, transformOrigin: 'top center' }}
                                          animate={{ opacity: 1, scaleY: 1 }}
                                          exit={{ opacity: 0, scaleY: 0.9 }}
                                          transition={{ duration: 0.15, type: 'spring', stiffness: 400, damping: 28 }}
                                        >
                                          {ROLE_OPTIONS.map(option => (
                                            <button
                                              key={option}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                onRoleChange?.(row, option);
                                                setOpenRoleDropdownId(null);
                                              }}
                                              className="w-full flex items-center px-[4px] py-[4px] rounded-lg transition-colors"
                                              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
                                              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                              <RoleBadge role={option as any} />
                                            </button>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })()
                            ) :
                            column.key === 'accessLevel' ? (
                              <div className="relative">
                                <button
                                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenAccessDropdownId(openAccessDropdownId === row.id ? null : row.id);
                                    setOpenRoleDropdownId(null);
                                  }}
                                >
                                  <div className="flex items-center justify-between" style={{ width: '160px' }}>
                                    <span style={{
                                      fontFamily: 'var(--font-family)',
                                      fontSize: 'var(--font-size-15)',
                                      fontWeight: 'var(--font-weight-light)',
                                      letterSpacing: 'var(--letter-spacing-md)',
                                      color: (hoveredRow === row.id || selectedRow === row.id) ? 'var(--primary)' : 'var(--foreground)',
                                      whiteSpace: 'nowrap',
                                    }}>
                                      {row[column.key]}
                                    </span>
                                    <ChevronDown className="size-[16px]" style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
                                  </div>
                                </button>
                                <AnimatePresence>
                                  {openAccessDropdownId === row.id && (
                                    <motion.div
                                      className="absolute left-0 bg-background shadow-lg p-[8px] z-50"
                                      style={{
                                        border: '1px solid var(--border-interactive-hover)',
                                        borderRadius: 'var(--radius-16)',
                                        top: 'calc(100% + 12px)',
                                        minWidth: '160px',
                                      }}
                                      initial={{ opacity: 0, scaleY: 0.9, transformOrigin: 'top center' }}
                                      animate={{ opacity: 1, scaleY: 1 }}
                                      exit={{ opacity: 0, scaleY: 0.9 }}
                                      transition={{ duration: 0.15, type: 'spring', stiffness: 400, damping: 28 }}
                                    >
                                      {ACCESS_LEVEL_OPTIONS.map(option => (
                                        <button
                                          key={option}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            onAccessLevelChange?.(row, option);
                                            setOpenAccessDropdownId(null);
                                          }}
                                          className="w-full flex items-center px-[12px] py-[8px] rounded-xl transition-colors"
                                          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
                                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                          <span style={{
                                            fontFamily: 'var(--font-family)',
                                            fontSize: 'var(--font-size-15)',
                                            letterSpacing: 'var(--letter-spacing-md)',
                                            color: row[column.key] === option ? 'var(--primary)' : 'var(--foreground)',
                                          }}>
                                            {option}
                                          </span>
                                        </button>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ) :
                            column.align === 'right' ? (
                              // Right-aligned columns - use flex justify-end to match header
                              <div className="flex items-center justify-end w-full">
                                <span
                                  className={`${(hoveredRow === row.id || selectedRow === row.id) ? 'text-primary' : 'text-foreground'}`}
                                  style={{
                                    fontFamily: 'var(--font-family)',
                                    fontSize: 'var(--font-size-15)',
                                    fontWeight: 'var(--font-weight-light)',
                                    letterSpacing: 'var(--letter-spacing-md)',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                  }}
                                >
                                  {row[column.key]}
                                </span>
                              </div>
                            ) : (
                              // Left-aligned columns
                              <span
                                className={`${(hoveredRow === row.id || selectedRow === row.id) ? 'text-primary' : 'text-foreground'} block min-w-0`}
                                style={{
                                  fontFamily: 'var(--font-family)',
                                  fontSize: 'var(--font-size-15)',
                                  fontWeight: 'var(--font-weight-light)',
                                  letterSpacing: 'var(--letter-spacing-md)',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
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
                  <div className="py-[16px]" style={{ flex: '0 0 116px', minWidth: '116px', maxWidth: '116px', paddingLeft: '24px', paddingRight: '20px' }}>
                    <div className={`flex items-center justify-end gap-[0px] ${(hoveredRow === row.id || openMenuRowId === row.id) ? 'opacity-100' : 'opacity-0'}`} style={{ transition: `opacity var(--transition-duration) var(--transition-timing)` }}>
                      {/* ========================================
                          STAR BUTTON - Uses theme variables
                          ========================================*/}
                      <button
                        className="size-[36px] flex items-center justify-center rounded-full"
                        style={{
                          backgroundColor: 'transparent',
                          transition: `background-color var(--transition-duration) var(--transition-timing)`
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={(e) => handleStarClick(e, row)}
                      >
                        <Star
                          className="size-[16px]"
                          style={{ color: 'var(--text-foreground)' }}
                          strokeWidth={1.5}
                          fill={starredItems?.has(row.id) ? 'currentColor' : 'none'}
                        />
                      </button>
                      {/* ========================================
                          MORE BUTTON - Uses theme variables
                          ========================================*/}
                      <button
                        className="size-[36px] flex items-center justify-center rounded-full"
                        style={{
                          backgroundColor: openMenuRowId === row.id ? 'var(--bg-icon-hover)' : 'transparent',
                          transition: `background-color var(--transition-duration) var(--transition-timing)`
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = openMenuRowId === row.id ? 'var(--bg-icon-hover)' : 'transparent';
                        }}
                        onClick={(e) => handleMoreClick(e, row)}
                        ref={el => el && moreButtonRefs.current.set(row.id, el)}
                      >
                        <MoreHorizontal
                          className="size-[16px]"
                          style={{ color: 'var(--text-foreground)' }}
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
          fontSize: '12px',
          fontWeight: 'var(--font-weight-regular)',
          letterSpacing: 'var(--letter-spacing-md)',
          color: 'var(--text-secondary)',
        }}>
          {sortedData.length} {sortedData.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      </div>

      {/* Dropdown Menus */}
      {sortedData.map((row) => {
        const anchorRef = { current: moreButtonRefs.current.get(row.id) || null };
        const menuItems = createDefaultMenuItems(
          row.name,
          () => {
            setRowToRename(row);
            setIsRenameModalOpen(true);
            setOpenMenuRowId(null); // Close the dropdown menu
          },
          () => toast.success(`Share: ${row.name}`),
          () => toast.success(`Duplicate: ${row.name}`),
          () => toast.success(`Move: ${row.name}`),
          () => toast.success(`Delete: ${row.name}`)
        );

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

      {/* Rename Modal */}
      {rowToRename && (
        <RenameModal
          isOpen={isRenameModalOpen}
          currentName={rowToRename.name}
          onClose={() => {
            setIsRenameModalOpen(false);
            setRowToRename(null);
          }}
          onRename={(newName) => {
            onRename?.(rowToRename, newName);
            toast.success(`Renamed to "${newName}"`);
          }}
          title={`Rename "${rowToRename.name}"`}
        />
      )}
    </div>
    </>
  );
}
