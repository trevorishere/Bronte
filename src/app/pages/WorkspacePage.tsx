import { useState, useEffect } from 'react';
import { useParams, useOutletContext, useNavigate, useLocation } from 'react-router';
import { toast } from 'sonner';
import { TopBar } from '../components/TopBar';
import { Toolbar } from '../components/Toolbar';
import { DataTable, Column, RowData } from '../components/DataTable';
import { GridView, GridItemData } from '../components/GridView';
import { DetailPageHeader } from '../components/DetailPageHeader';
import { WorkspaceIcon } from '../components/WorkspaceIcon';
import { projects, workspaces } from '../data/workspaces';
import { accounts } from '../data/accounts';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNavigationContext, BreadcrumbEntry } from '../contexts/NavigationContext';

interface OutletContext {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const tableColumns: Column[] = [
  { key: 'name', label: 'Project Name', sortable: true, width: 'w-[400px]' },
  { key: 'owner', label: 'Owner', sortable: true, width: 'w-[200px]' },
  { key: 'lastModified', label: 'Last Modified', sortable: true, width: 'w-[200px]' },
  { key: 'accountCount', label: 'Members', sortable: true, width: 'w-[120px]', align: 'right' as const },
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

  const { ancestors, setAncestors } = useNavigationContext();

  // Check if we're in Admin context (from /admin/workspace/:id route)
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Restore or build ancestor trail on mount / workspaceId change (admin route only)
  useEffect(() => {
    if (!isAdminRoute || !workspaceId) return;
    const stateTrail = (location.state as any)?.breadcrumbs as BreadcrumbEntry[] | undefined;
    if (stateTrail !== undefined) {
      setAncestors(stateTrail);
    } else if (ancestors.length === 0) {
      setAncestors([{ label: 'Admin', path: '/admin' }]);
    }
  }, [workspaceId, isAdminRoute]);

  // Find the workspace
  const workspace = workspaces.find(w => w.id === workspaceId);

  // Filter projects for this workspace
  const workspaceProjects = projects.filter(p => p.workspace === workspaceId);

  // Count members for this workspace
  const memberCount = accounts.filter(a => a.workspaceIds.includes(workspaceId || '')).length;

  // Get unique owners for filter options
  const uniqueOwners = Array.from(new Set(workspaceProjects.map(p => p.owner))).sort();
  
  const tableData: RowData[] = workspaceProjects.map(project => ({
    id: project.id,
    name: project.name,
    owner: project.owner,
    lastModified: project.lastModified,
    workspace: project.workspace,
    iconType: 'project' as const,
    accountCount: accounts.filter(a => a.projectIds.includes(project.id)).length,
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
    <div className="flex flex-col h-full overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      {/* Top bar */}
      <TopBar
        userInitials="LD"
        onThemeToggle={onThemeToggle}
        isDarkMode={isDarkMode}
        breadcrumbs={isAdminRoute && workspace
          ? [...ancestors, { label: workspace.name, path: location.pathname }]
          : undefined
        }
        title={!isAdminRoute && workspace ? workspace.name : undefined}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Workspace header */}
      {workspace && (
        <DetailPageHeader
          title={workspace.name}
          icon={(size) => <WorkspaceIcon name={workspace.name} size={size} />}
          metadata={[
            { icon: 'folder', label: `${workspaceProjects.length} project${workspaceProjects.length !== 1 ? 's' : ''}` },
            { icon: 'users', label: `${memberCount} member${memberCount !== 1 ? 's' : ''}` },
            { icon: 'calendar', label: `Created ${workspace.created}` },
          ]}
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
      )}
    </div>
  );
}