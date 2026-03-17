import { useState, useEffect } from 'react';
import { Star, MoreHorizontal, ArrowUp, ArrowDown, File } from 'lucide-react';
import { toast } from 'sonner';

export interface Column {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
}

export interface RowData {
  id: string;
  iconType?: string; // * Type of icon (e.g., 'project', 'document', 'folder', etc.)
  [key: string]: any;
}

interface DataTableProps {
  columns: Column[];
  data: RowData[];
  onRowClick?: (row: RowData) => void;
  onRowDoubleClick?: (row: RowData) => void;
  onStarClick?: (row: RowData, isStarred: boolean) => void;
  onMoreClick?: (row: RowData) => void;
  starredItems?: Set<string>;
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
  starredItems
}: DataTableProps) {
  // Initialize with default sort - prioritize lastModified or created, then name
  const getDefaultSort = (): SortConfig => {
    const dateColumn = columns.find(col => 
      col.key === 'lastModified' || col.key === 'created' || col.key === 'dateModified' || col.key === 'dateCreated'
    );
    if (dateColumn) {
      return { key: dateColumn.key, direction: 'desc' };
    }
    const nameColumn = columns.find(col => col.key === 'name');
    if (nameColumn) {
      return { key: nameColumn.key, direction: 'asc' };
    }
    return null;
  };

  const [sortConfig, setSortConfig] = useState<SortConfig>(getDefaultSort());
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [hoveredHeader, setHoveredHeader] = useState<string | null>(null);
  const [clickedColumns, setClickedColumns] = useState<Set<string>>(new Set());

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
    onMoreClick?.(row);
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
    <div className="flex-1 flex flex-col px-[24px] pb-[24px] min-h-0 overflow-hidden">
      {/* Table Header Container - Bordered */}
      <div className="shrink-0 overflow-hidden">
        <table className="w-full" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            {columns.map((column, index) => (
              <col key={column.key} className={column.width || ''} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={`${
                    column.sortable ? 'cursor-pointer' : ''
                  } text-left ${index === 0 ? 'pl-[24px]' : 'px-[24px]'} py-[16px]`}
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: sortConfig?.key === column.key || hoveredHeader === column.key ? 'var(--primary)' : 'var(--foreground)',
                    fontSize: 'var(--font-size-14)'
                  }}
                  onClick={() => handleSort(column.key)}
                  onMouseEnter={() => column.sortable && setHoveredHeader(column.key)}
                  onMouseLeave={() => setHoveredHeader(null)}
                >
                  <div className="flex items-center gap-[8px]">
                    <span className={sortConfig?.key === column.key || hoveredHeader === column.key ? 'text-primary' : 'text-foreground'}>{column.label}</span>
                    {column.sortable && (sortConfig?.key === column.key || hoveredHeader === column.key) && (
                      <div className="flex flex-col">
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
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      {/* Table Rows Container - Bordered and Scrollable */}
      <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid var(--border-interactive)' }}>
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }} onClick={handleTableAreaClick}>
          <table className="w-full" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              {columns.map((column, index) => (
                <col key={column.key} className={column.width || ''} />
              ))}
            </colgroup>
            <tbody>
              {sortedData.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className="cursor-pointer transition-colors"
                  style={{ 
                    borderBottom: rowIndex === sortedData.length - 1 ? 'none' : '1px solid var(--border-interactive)', 
                    backgroundColor: getRowBackgroundColor(row.id) 
                  }}
                  onClick={() => handleRowClick(row)}
                  onDoubleClick={() => handleRowDoubleClick(row)}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onMouseOver={(e) => {
                    if (selectedRow !== row.id) {
                      e.currentTarget.style.backgroundColor = 'var(--muted)';
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = getRowBackgroundColor(row.id);
                  }}
                >
                  {columns.map((column, index) => (
                    <td
                      key={column.key}
                      className={`${index === 0 ? 'pl-[24px]' : 'px-[24px]'} py-[16px]`}
                      style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-14)' }}
                    >
                      {index === 0 ? (
                        // First column with icon container and name
                        <div className="flex items-center gap-[12px] min-w-0">
                          <div 
                            className="shrink-0 size-[32px] flex items-center justify-center rounded-lg" 
                            style={{ 
                              backgroundColor: 'var(--bg-icon-container)'
                            }}
                            title={row.iconType || 'Icon'}
                          >
                            <File className="size-[18px] text-white" />
                          </div>
                          <span className={`${(hoveredRow === row.id || selectedRow === row.id) ? 'text-primary' : 'text-foreground'} flex-1 min-w-0`} style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-14)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {row[column.key]}
                          </span>
                        </div>
                      ) : index === columns.length - 1 ? (
                        // Last column with star and more icons
                        <div className="flex items-center justify-between min-w-0">
                          <span className={`${(hoveredRow === row.id || selectedRow === row.id) ? 'text-primary' : 'text-foreground'} flex-1 min-w-0`} style={{ fontFamily: 'var(--font-regular)', fontSize: 'var(--font-size-14)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row[column.key]}</span>
                          <div className={`flex items-center gap-[0px] shrink-0 ${hoveredRow === row.id ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                            <button
                              className="size-[36px] flex items-center justify-center rounded-full transition-colors duration-150"
                              style={{ backgroundColor: 'transparent' }}
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
                            <button
                              className="size-[36px] flex items-center justify-center rounded-full transition-colors duration-150"
                              style={{ backgroundColor: 'transparent' }}
                              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
                              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              onClick={(e) => handleMoreClick(e, row)}
                            >
                              <MoreHorizontal className="size-[16px] text-primary" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Middle columns
                        <span className={`${(hoveredRow === row.id || selectedRow === row.id) ? 'text-primary' : 'text-foreground'} block min-w-0`} style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-14)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row[column.key]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
