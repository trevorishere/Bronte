import { useState, useEffect, useRef } from 'react';
import { Star, MoreHorizontal, ArrowUp, ArrowDown, File } from 'lucide-react';
import { toast } from 'sonner';
import { DropdownMenu, createDefaultMenuItems } from './DropdownMenu';
import { Avatar, RoleBadge } from './Avatar';
import { TeamIcon } from './TeamIcon';
import { WorkspaceIcon } from './WorkspaceIcon';
import { ProjectIcon } from './ProjectIcon';
import { RenameModal } from './RenameModal';
import { MobileCardView } from './MobileCardView';
import { MobileSortHeader } from './MobileSortHeader';
import { accounts } from '../data/accounts';

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
  onRename?: (row: RowData, newName: string) => void;
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
  
  // Rename Mode State
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [originalValue, setOriginalValue] = useState<string>('');
  
  // Rename Modal State
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [rowToRename, setRowToRename] = useState<RowData | null>(null);
  
  // Refs
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null); // For double-click detection
  const moreButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map()); // For dropdown menu positioning
  const inputRef = useRef<HTMLInputElement>(null); // For rename input focus

  // ========================================
  // SORT HANDLER
  // ========================================
  // Smart sorting: First click uses column-specific default direction,
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
      // First click: set initial direction based on column type
      // Date columns default to desc (newest first), other columns default to asc (A-Z)
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

  // ========================================
  // RENAME FUNCTIONALITY
  // ========================================
  // Helper functions for file name and extension
  const getFileNameWithoutExtension = (fullName: string): string => {
    const lastDotIndex = fullName.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === 0) {
      return fullName; // No extension or hidden file
    }
    return fullName.substring(0, lastDotIndex);
  };

  const getFileExtension = (fullName: string): string => {
    const lastDotIndex = fullName.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === 0) {
      return ''; // No extension or hidden file
    }
    return fullName.substring(lastDotIndex);
  };

  const enterRenameMode = (row: RowData, columnKey: string) => {
    const fullName = row[columnKey];
    const nameWithoutExt = getFileNameWithoutExtension(fullName);
    
    setEditingRowId(row.id);
    setEditValue(fullName);
    setOriginalValue(fullName);
    
    // Auto-focus and select the name part (without extension) after a brief delay
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const extension = getFileExtension(fullName);
        if (extension) {
          // Select only the name part, not the extension
          inputRef.current.setSelectionRange(0, nameWithoutExt.length);
        } else {
          // No extension, select all
          inputRef.current.select();
        }
      }
    }, 0);
  };

  const saveRename = (row: RowData) => {
    if (editValue.trim() && editValue !== originalValue) {
      onRename?.(row, editValue.trim());
      toast.success(`Renamed to "${editValue.trim()}"`);
    }
    exitRenameMode();
  };

  const cancelRename = () => {
    exitRenameMode();
  };

  const exitRenameMode = () => {
    setEditingRowId(null);
    setEditValue('');
    setOriginalValue('');
  };

  const handleNameClick = (e: React.MouseEvent, row: RowData, columnKey: string) => {
    e.stopPropagation();
    
    // Clear any existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      
      // This is a double-click - enter rename mode
      enterRenameMode(row, columnKey);
    } else {
      // This might be a single click - wait to see if a second click follows
      clickTimeoutRef.current = setTimeout(() => {
        // Single click - select the row
        handleRowClick(row);
        clickTimeoutRef.current = null;
      }, 300);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, row: RowData) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      saveRename(row);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      cancelRename();
    }
  };

  const handleInputBlur = (row: RowData) => {
    // Save changes when clicking outside
    saveRename(row);
  };

  const handleInputClick = (e: React.MouseEvent) => {
    // Prevent row selection when clicking on the input
    e.stopPropagation();
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
    return '';
  };

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
            onStarClick={onStarClick}
            onMoreClick={onMoreClick}
            starredItems={starredItems}
            viewMode={viewMode}
            onRename={onRename}
          />
        </div>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden md:flex flex-1 flex-col px-[24px] pb-[24px] min-h-0 overflow-hidden">
      {/* ======================================== */}
      {/* TABLE (header + rows inside the same border) */}
      {/* ======================================== */}
      <div className="flex flex-col overflow-hidden rounded-2xl w-full flex-1 min-h-0" style={{ border: '1px solid var(--border-interactive)' }}>
      {/* TABLE HEADER SECTION */}
      <div className="shrink-0 overflow-hidden w-full" style={{ borderBottom: '1px solid var(--border-interactive)' }}>
        <div className="w-full flex" style={{ minWidth: '100%' }}>
          {/* Header Columns */}
          <div className="flex flex-1 min-w-0">
            {columns.map((column, index) => {
              const totalColumns = columns.length;
              let flexStyle: React.CSSProperties = {};
              
              // ========================================
              // COLUMN WIDTH CALCULATION LOGIC
              // ========================================
              // Last column: Fixed 200px width
              // 3-column tables: First gets flex 2, second gets flex 1
              // 4+ column tables: All equal flex (except last)
              if (index === columns.length - 1) {
                // Last data column: fixed width
                flexStyle = { flex: '0 0 200px', minWidth: '200px', maxWidth: '200px' };
              } else if (totalColumns === 3) {
                // For 3-column tables: first gets flex 2, second gets flex 1
                if (index === 0) {
                  flexStyle = { flex: '2 1 0px', minWidth: '300px' };
                } else if (index === 1) {
                  flexStyle = { flex: '1 1 0px', minWidth: '150px' };
                }
              } else {
                // For 4+ column tables: equal flex for all non-last columns
                flexStyle = { flex: '1 1 0px', minWidth: '200px' };
              }

              return (
                <div
                  key={column.key}
                  className={`${column.sortable ? 'cursor-pointer' : ''} py-[16px]`}
                  style={{
                    ...flexStyle,
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: sortConfig?.key === column.key || hoveredHeader === column.key ? 'var(--primary)' : 'var(--foreground)',
                    fontSize: 'var(--font-size-14)',
                    letterSpacing: 'var(--letter-spacing-md)',
                    textAlign: column.align || 'left',
                    paddingLeft: index === 0 ? '20px' : column.align === 'right' ? '12px' : '24px',
                    paddingRight: column.align === 'right' ? '12px' : '24px',
                    position: 'relative',
                    boxSizing: 'border-box'
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
                                  <ArrowUp className="size-[1px] text-primary" />
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
                      <span className={sortConfig?.key === column.key || hoveredHeader === column.key ? 'text-primary' : 'text-foreground'}>{column.label}</span>
                    </div>
                  ) : (
                    // Left-aligned columns: text on left, arrow on right
                    <div className="flex items-center gap-[8px]">
                      <span className={sortConfig?.key === column.key || hoveredHeader === column.key ? 'text-primary' : 'text-foreground'}>{column.label}</span>
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
          <div style={{ flex: '0 0 150px', minWidth: '150px', maxWidth: '150px', paddingLeft: '24px', paddingRight: '20px' }}></div>
        </div>
      </div>

      {/* ======================================== */}
      {/* TABLE ROWS SECTION (Scrollable) */}
      {/* ======================================== */}
      <div className="overflow-hidden flex-1 min-h-0">
        <div className="overflow-y-auto w-full h-full" style={{ paddingBottom: '4px' }} onClick={handleTableAreaClick}>
          <div className="w-full" style={{ minWidth: '100%' }}>
            {sortedData.map((row, rowIndex) => {
              const totalColumns = columns.length;
              
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
                    {columns.map((column, index) => {
                      let flexStyle: React.CSSProperties = {};
                      
                      // Determine flex properties based on column position and table size
                      if (index === columns.length - 1) {
                        // Last data column: fixed width
                        flexStyle = { flex: '0 0 200px', minWidth: '200px', maxWidth: '200px' };
                      } else if (totalColumns === 3) {
                        // For 3-column tables: first gets flex 2, second gets flex 1
                        if (index === 0) {
                          flexStyle = { flex: '2 1 0px', minWidth: '300px' };
                        } else if (index === 1) {
                          flexStyle = { flex: '1 1 0px', minWidth: '150px' };
                        }
                      } else {
                        // For 4+ column tables: equal flex for all non-last columns
                        flexStyle = { flex: '1 1 0px', minWidth: '200px' };
                      }

                      return (
                        <div
                          key={column.key}
                          className="py-[16px] flex items-center"
                          style={{ 
                            ...flexStyle,
                            fontFamily: 'var(--font-family)', 
                            fontSize: 'var(--font-size-16)',
                            textAlign: column.align || 'left',
                            letterSpacing: 'var(--letter-spacing-md)',
                            paddingLeft: index === 0 ? '20px' : column.align === 'right' ? '12px' : '24px',
                            paddingRight: column.align === 'right' ? '12px' : '24px',
                            boxSizing: 'border-box'
                          }}
                        >
                          {index === 0 ? (
                            // ========================================
                            // FIRST COLUMN: Icon + Text (with rename support)
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
                              {editingRowId === row.id ? (
                                // Rename mode - show input field
                                <input
                                  ref={inputRef}
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  onKeyDown={(e) => handleInputKeyDown(e, row)}
                                  onBlur={() => handleInputBlur(row)}
                                  onClick={handleInputClick}
                                  className="flex-1 min-w-0 px-[6px] py-[2px] rounded transition-all"
                                  style={{
                                    width: '100%',
                                    fontFamily: 'var(--font-family)',
                                    fontWeight: 'var(--font-weight-regular)',
                                    fontSize: 'var(--font-size-16)',
                                    letterSpacing: 'var(--letter-spacing-md)',
                                    lineHeight: 'var(--line-height-20)',
                                    color: 'var(--foreground)',
                                    padding: '8px 12px',
                                    border: '1px solid var(--border-interactive-hover)',
                                    outline: 'none',
                                    backgroundColor: 'var(--background)'
                                  }}
                                />
                              ) : (
                                // Normal mode - show text (double-click to rename)
                                <span 
                                  className={`${(hoveredRow === row.id || selectedRow === row.id) ? 'text-primary' : 'text-foreground'} flex-1 min-w-0 cursor-text`} 
                                  style={{ 
                                    fontFamily: 'var(--font-family)', 
                                    fontSize: 'var(--font-size-16)', 
                                    fontWeight: 'var(--font-weight-medium)',
                                    letterSpacing: 'var(--letter-spacing-md)',
                                    whiteSpace: 'nowrap', 
                                    overflow: 'hidden', 
                                    textOverflow: 'ellipsis' 
                                  }}
                                  onClick={(e) => handleNameClick(e, row, column.key)}
                                >
                                  {row[column.key]}
                                </span>
                              )}
                            </div>
                          ) : (
                            // ========================================
                            // MIDDLE COLUMNS: Role badges or text
                            // ========================================
                            column.key === 'role' ? (
                              // Special handling for role column - render RoleBadge
                              <div className="flex items-center">
                                <RoleBadge role={row[column.key] as any} />
                              </div>
                            ) : column.align === 'right' ? (
                              // Right-aligned columns - use flex justify-end to match header
                              <div className="flex items-center justify-end w-full">
                                <span 
                                  className={`${(hoveredRow === row.id || selectedRow === row.id) ? 'text-primary' : 'text-foreground'}`} 
                                  style={{ 
                                    fontFamily: 'var(--font-family)', 
                                    fontSize: 'var(--font-size-16)', 
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
                                  fontSize: 'var(--font-size-16)', 
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
                  <div className="py-[16px]" style={{ flex: '0 0 150px', minWidth: '150px', maxWidth: '150px', paddingLeft: '24px', paddingRight: '20px' }}>
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
                          style={{ color: 'var(--icon)' }} 
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
                        <MoreHorizontal className="size-[16px] text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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