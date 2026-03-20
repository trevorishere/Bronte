import { useState } from 'react';
import { useParams, useOutletContext, useNavigate, useLocation } from 'react-router';
import { toast } from 'sonner';
import { ChevronLeft } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { Toolbar } from '../components/Toolbar';
import { DataTable, Column, RowData } from '../components/DataTable';
import { GridView, GridItemData } from '../components/GridView';
import { WorkspaceIcon } from '../components/WorkspaceIcon';
import { ActionButtons } from '../components/ActionButtons';
import { projects, workspaces } from '../data/workspaces';
import { useFavorites } from '../contexts/FavoritesContext';
import { useMobileNav } from '../hooks/useMobileNav';
import svgPaths from '../../imports/svg-2hg6thd8pt';

interface OutletContext {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const tableColumns: Column[] = [
  { key: 'name', label: 'Project Name', sortable: true, width: 'w-[400px]' },
  { key: 'owner', label: 'Owner', sortable: true, width: 'w-[200px]' },
  { key: 'lastModified', label: 'Last Modified', sortable: true, width: 'w-[200px]' },
];

export function WorkspacePage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { isDarkMode, onThemeToggle } = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [dateFilters, setDateFilters] = useState<Record<string, { start: Date | null; end: Date | null }>>({});
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { toggleSidebar } = useMobileNav();

  // Check if we're in Admin context (from /admin/workspace/:id route)
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Find the workspace
  const workspace = workspaces.find(w => w.id === workspaceId);
  
  // Filter projects for this workspace
  const workspaceProjects = projects.filter(p => p.workspace === workspaceId);
  
  // Get unique owners for filter options
  const uniqueOwners = Array.from(new Set(workspaceProjects.map(p => p.owner))).sort();
  
  const tableData: RowData[] = workspaceProjects.map(project => ({
    id: project.id,
    name: project.name,
    owner: project.owner,
    lastModified: project.lastModified,
    workspace: project.workspace,
    iconType: 'project' as const,
  }));

  // Apply filters to table data
  const filteredData = tableData.filter(row => {
    // Filter by Owner
    if (selectedFilters['Owner'] && selectedFilters['Owner'].length > 0) {
      if (!selectedFilters['Owner'].includes(row.owner)) {
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

  const handleRowClick = (row: RowData) => {
    console.log('Row clicked (selected):', row);
  };

  const handleRowDoubleClick = (row: RowData) => {
    console.log('Row double-clicked (navigate to):', row);
  };

  const handleStarClick = (row: RowData | GridItemData, isStarred: boolean) => {
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
    <div className="flex flex-col h-full overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      {/* Top bar - Show workspace name title in non-admin context, Admin with back button in admin context */}
      {isAdminRoute ? (
        <TopBar
          title="Admin"
          userInitials="LD"
          onThemeToggle={onThemeToggle}
          isDarkMode={isDarkMode}
          showBackButton={true}
          onBackClick={() => navigate('/admin')}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      ) : (
        <TopBar
          title={workspace?.name || 'Workspace'}
          userInitials="LD"
          onThemeToggle={onThemeToggle}
          isDarkMode={isDarkMode}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      )}

      <Toolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filters={[
          { label: 'Owner', options: uniqueOwners },
          { label: 'Last Modified', type: 'date' as const }
        ]}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        dateFilters={dateFilters}
        onDateFilterChange={handleDateFilterChange}
      />
      {viewMode === 'grid' ? (
        <GridView
          data={filteredData as GridItemData[]}
          onItemClick={handleRowClick}
          onItemDoubleClick={handleRowDoubleClick}
          onStarClick={handleStarClick}
          favorites={favorites}
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
        />
      )}
    </div>
  );
}