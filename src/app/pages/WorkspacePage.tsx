import { useState } from 'react';
import { useParams, useOutletContext } from 'react-router';
import { toast } from 'sonner';
import { TopBar } from '../components/TopBar';
import { Toolbar } from '../components/Toolbar';
import { DataTable, Column, RowData } from '../components/DataTable';
import { projects, workspaces } from '../data/workspaces';
import { useFavorites } from '../contexts/FavoritesContext';

interface OutletContext {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const tableColumns: Column[] = [
  { key: 'name', label: 'Project Name', sortable: true, width: 'w-[400px]' },
  { key: 'owner', label: 'Owner', sortable: true, width: 'w-[250px]' },
  { key: 'lastModified', label: 'Last Modified', sortable: true, width: 'w-[200px]' },
];

export function WorkspacePage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { isDarkMode, onThemeToggle } = useOutletContext<OutletContext>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  // Find the workspace
  const workspace = workspaces.find(w => w.id === workspaceId);
  
  // Filter projects for this workspace
  const workspaceProjects = projects.filter(p => p.workspace === workspaceId);
  
  const tableData: RowData[] = workspaceProjects.map(project => ({
    id: project.id,
    name: project.name,
    owner: project.owner,
    lastModified: project.lastModified,
    iconType: 'book' as const,
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

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar
        title={workspace?.name || 'Workspace'}
        userInitials="LD"
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
      />
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
    </div>
  );
}