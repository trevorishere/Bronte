import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'sonner';
import { TopBar } from '../components/TopBar';
import { Toolbar } from '../components/Toolbar';
import { DataTable, Column, RowData } from '../components/DataTable';
import { GridView, GridItemData } from '../components/GridView';
import { EmptyState } from '../components/EmptyState';
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
];

const tableData: RowData[] = sharedProjects.map(project => ({
  id: project.id,
  name: project.name,
  owner: project.sharedBy,
  sharedBy: project.sharedBy,
  lastModified: project.lastModified,
  workspace: project.workspace,
  iconType: 'project' as const,
}));

export function SharedPage() {
  const { isDarkMode, onThemeToggle } = useOutletContext<OutletContext>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [dateFilters, setDateFilters] = useState<Record<string, { start: Date | null; end: Date | null }>>({});
  const { favorites, addFavorite, removeFavorite } = useFavorites();

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

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar
        title="Shared with me"
        userInitials="LD"
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
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
      {filteredData.length === 0 && Object.keys(selectedFilters).length === 0 && Object.keys(dateFilters).length === 0 ? (
        <EmptyState 
          title="No shared projects"
          description="Projects that others share with you will appear here."
        />
      ) : (
        viewMode === 'grid' ? (
          <GridView
            data={filteredData as GridItemData[]}
            onItemClick={handleRowClick}
            onItemDoubleClick={handleRowDoubleClick}
            onStarClick={handleStarClick}
            favorites={favorites}
          onViewModeChange={setViewMode}
          />
        ) : (
          <DataTable
            columns={tableColumns}
            data={filteredData}
            onRowClick={handleRowClick}
            onRowDoubleClick={handleRowDoubleClick}
            onStarClick={handleStarClick}
            onMoreClick={handleMoreClick}
            starredItems={favorites}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        )
      )}
    </div>
  );
}