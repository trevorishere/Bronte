import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'sonner';
import { TopBar } from '../components/TopBar';
import { Toolbar } from '../components/Toolbar';
import { DataTable, Column, RowData } from '../components/DataTable';
import { EmptyState } from '../components/EmptyState';
import { useFavorites } from '../contexts/FavoritesContext';
import { projects } from '../data/workspaces';

interface OutletContext {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const tableColumns: Column[] = [
  { key: 'name', label: 'Project Name', sortable: true, width: 'w-[400px]' },
  { key: 'owner', label: 'Owner', sortable: true, width: 'w-[250px]' },
  { key: 'lastModified', label: 'Last Modified', sortable: true, width: 'w-[200px]' },
];

export function FavoritesPage() {
  const { isDarkMode, onThemeToggle } = useOutletContext<OutletContext>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  // Filter projects to only show favorited ones
  const tableData: RowData[] = projects
    .filter(project => favorites.has(project.id))
    .map(project => ({
      id: project.id,
      name: project.name,
      owner: project.owner,
      lastModified: project.lastModified,
      iconType: 'project'
    }));

  const handleRowClick = (row: RowData) => {
    console.log('Row clicked (selected):', row);
  };

  const handleRowDoubleClick = (row: RowData) => {
    console.log('Row double-clicked (navigate to):', row);
  };

  const handleStarClick = (row: RowData, isStarred: boolean) => {
    if (isStarred) {
      addFavorite(row.id);
      toast.success(`${row.name} has been added to Favorites`);
    } else {
      removeFavorite(row.id);
      toast.success(`${row.name} has been removed from Favorites`);
    }
  };

  const handleMoreClick = (row: RowData) => {
    console.log('More clicked:', row);
  };

  const hasData = tableData.length > 0;

  return (
    <>
      <TopBar
        title="Favorites"
        userInitials="LD"
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
      />
      {hasData ? (
        <>
          <Toolbar
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          <DataTable
            columns={tableColumns}
            data={tableData}
            onRowClick={handleRowClick}
            onRowDoubleClick={handleRowDoubleClick}
            onStarClick={handleStarClick}
            onMoreClick={handleMoreClick}
            starredItems={favorites}
          />
        </>
      ) : (
        <EmptyState message="You currently have no favorite projects yet." />
      )}
    </>
  );
}