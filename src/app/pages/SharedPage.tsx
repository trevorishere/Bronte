import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'sonner';
import { TopBar } from '../components/TopBar';
import { Toolbar } from '../components/Toolbar';
import { DataTable, Column, RowData } from '../components/DataTable';
import { GridView, GridItemData } from '../components/GridView';
import { EmptyState } from '../components/EmptyState';
import { useInfoTray } from '../contexts/InfoTrayContext';
import { ShareModal } from '../components/ShareModal';
import { useSharedMembers } from '../contexts/SharedMembersContext';
import { sharedProjects } from '../data/shared';
import { useFavorites } from '../contexts/FavoritesContext';

interface OutletContext {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const tableColumns: Column[] = [
  { key: 'name', label: 'Project Name', sortable: true, width: 'w-[400px]' },
  { key: 'sharedBy', label: 'Shared By', sortable: true, width: 'w-[200px]' },
  { key: 'lastModified', label: 'Last Modified', sortable: true, width: 'w-[200px]' },
  { key: 'accountCount', label: 'Members', sortable: true, width: 'w-[120px]', align: 'right' as const },
];

const tableData: RowData[] = sharedProjects.map(project => ({
  id: project.id,
  name: project.name,
  owner: project.owner,
  sharedBy: project.sharedBy,
  dateShared: project.dateShared,
  lastModified: project.lastModified,
  workspace: project.workspace,
  iconType: 'project' as const,
  accountCount: project.membersCount,
}));

export function SharedPage() {
  const { isDarkMode, onThemeToggle } = useOutletContext<OutletContext>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [dateFilters, setDateFilters] = useState<Record<string, { start: Date | null; end: Date | null }>>({});
  const { setIsTrayOpen, setTrayContent } = useInfoTray();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareRow, setShareRow] = useState<RowData | null>(null);
  const { getExtraCount } = useSharedMembers();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [extraRows, setExtraRows] = useState<RowData[]>([]);

  // Get unique shared by users for filter options
  const uniqueSharedBy = Array.from(new Set(tableData.map(p => p.sharedBy))).sort();

  // Apply filters to table data
  const filteredData = tableData.filter(row => {
    // Filter by Shared By
    if (selectedFilters['Shared By'] && selectedFilters['Shared By'].length > 0) {
      if (!selectedFilters['Shared By'].includes(row.sharedBy)) {
        return false;
      }
    }
    
    // Filter by Last Modified date range
    if (dateFilters['Last Modified']) {
      const { start, end } = dateFilters['Last Modified'];
      if (start || end) {
        const rowDate = new Date(row.lastModified);
        if (start && rowDate < start) return false;
        if (end && rowDate > end) return false;
      }
    }
    
    return true;
  });

  const displayData = [...filteredData, ...extraRows];

  const handleFilterChange = (filterLabel: string, values: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterLabel]: values
    }));
  };

  const handleDateFilterChange = (filterLabel: string, start: Date | null, end: Date | null) => {
    setDateFilters(prev => ({
      ...prev,
      [filterLabel]: { start, end }
    }));
  };

  const handleSelectionChange = (row: RowData | null) => {
    if (row) setTrayContent({ type: 'shared-project', data: row });
  };

  const handleRowClick = (_row: RowData) => {};

  const handleRowDoubleClick = (_row: RowData) => {};

  const handleStarClick = (row: RowData | GridItemData, isStarred: boolean) => {
    if (isStarred) {
      addFavorite(row.id);
      toast.success(`${row.name} has been added to Favorites`);
    } else {
      removeFavorite(row.id);
      toast.success(`${row.name} has been removed from Favorites`);
    }
  };

  const handleMoreClick = (_row: RowData) => {};

  const handleShareRow = (row: RowData) => { setShareRow(row); setIsShareOpen(true); };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <TopBar
        title="Shared with me"
        userInitials="LD"
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onInfoClick={() => setIsTrayOpen(v => !v)}
        hideShare
      />
      
      {/* Toolbar - Always visible */}
      <Toolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filters={[
          {
            label: 'Shared By',
            options: uniqueSharedBy,
          },
          {
            label: 'Last Modified',
            type: 'date' as const,
          },
        ]}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        dateFilters={dateFilters}
        onDateFilterChange={handleDateFilterChange}
      />

      {/* Content area */}
      {displayData.length === 0 && Object.keys(selectedFilters).length === 0 && Object.keys(dateFilters).length === 0 ? (
        <EmptyState 
          title="No shared projects"
          description="Projects that others share with you will appear here."
        />
      ) : (
        viewMode === 'grid' ? (
          <GridView
            data={displayData as GridItemData[]}
            onItemClick={handleRowClick}
            onItemDoubleClick={handleRowDoubleClick}
            onStarClick={handleStarClick}
            favorites={favorites}
            onViewModeChange={setViewMode}
          />
        ) : (
          <DataTable
            columns={tableColumns}
            data={displayData}
            onRowClick={handleRowClick}
            onRowDoubleClick={handleRowDoubleClick}
            onSelectionChange={handleSelectionChange}
            onStarClick={handleStarClick}
            onMoreClick={handleMoreClick}
            onShare={handleShareRow}
            onDuplicate={(copy) => setExtraRows(prev => [...prev, copy])}
            onDelete={(deleted) => setExtraRows(prev => prev.filter(r => r.id !== deleted.id))}
            starredItems={favorites}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        )
      )}

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => { setIsShareOpen(false); setShareRow(null); }}
        entityName={shareRow?.name ?? "Shared with me"}
        entityId={shareRow?.id ?? "shared"}
        onShare={(ids) => toast(`Shared with ${ids.length} person${ids.length !== 1 ? 's' : ''}`)}
      />
    </div>
  );
}