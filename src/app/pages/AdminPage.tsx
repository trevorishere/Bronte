import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { DataTableSkeleton, GridSkeleton, useLoadingDelay } from '../components/SkeletonLoader';
import { TopBar } from '../components/TopBar';
import { TabNav, Tab } from '../components/TabNav';
import { Toolbar } from '../components/Toolbar';
import { DataTable, Column, RowData } from '../components/DataTable';
import { GridView, GridItemData } from '../components/GridView';
import { projects, workspaces } from '../data/workspaces';
import { teams } from '../data/teams';
import { accounts } from '../data/accounts';
import { useFavorites } from '../contexts/FavoritesContext';

interface OutletContext {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const tabs: Tab[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'accounts', label: 'Accounts' },
  { id: 'teams', label: 'Teams' },
  { id: 'workspaces', label: 'Workspaces' },
];

const projectColumns: Column[] = [
  { key: 'name', label: 'Project Name', sortable: true, width: 'w-[400px]' },
  { key: 'owner', label: 'Owner', sortable: true, width: 'w-[200px]' },
  { key: 'lastModified', label: 'Last Modified', sortable: true, width: 'w-[200px]' },
];

const accountColumns: Column[] = [
  { key: 'name', label: 'Account Name', sortable: true, width: 'w-[400px]' },
  { key: 'role', label: 'Role', sortable: true, width: 'w-[200px]' },
  { key: 'created', label: 'Created On', sortable: true, width: 'w-[200px]' },
];

const teamColumns: Column[] = [
  { key: 'name', label: 'Team Name', sortable: true, width: 'w-[400px]' },
  { key: 'owner', label: 'Owner', sortable: true, width: 'w-[200px]' },
  { key: 'created', label: 'Created On', sortable: true, width: 'w-[200px]' },
  { key: 'membersCount', label: 'Members', sortable: true, width: 'w-[120px]', align: 'right' },
];

const workspaceColumns: Column[] = [
  { key: 'name', label: 'Workspace Name', sortable: true, width: 'w-[400px]' },
  { key: 'owner', label: 'Owner', sortable: true, width: 'w-[200px]' },
  { key: 'created', label: 'Created On', sortable: true, width: 'w-[200px]' },
  { key: 'projectsCount', label: 'Projects', sortable: true, width: 'w-[120px]', align: 'right' },
];

export function AdminPage() {
  const { isDarkMode, onThemeToggle } = useOutletContext<OutletContext>();
  const [activeTab, setActiveTab] = useState('projects');
  const isLoading = useLoadingDelay(600);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [dateFilters, setDateFilters] = useState<Record<string, { start: Date | null; end: Date | null }>>({});
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  // Get data based on active tab
  const getTableData = (): { columns: Column[], data: RowData[], filters: any[] } => {
    switch (activeTab) {
      case 'projects': {
        const uniqueOwners = Array.from(new Set(projects.map(p => p.owner).filter(Boolean))).sort();
        return {
          columns: projectColumns,
          data: projects.map(project => ({
            id: project.id,
            name: project.name,
            owner: project.owner,
            lastModified: project.lastModified,
            workspace: project.workspace,
            iconType: 'project' as const,
            accountCount: accounts.filter(a => a.projectIds.includes(project.id)).length,
          })),
          filters: [
            { label: 'Owner', options: uniqueOwners },
            { label: 'Last Modified', type: 'date' as const }
          ]
        };
      }
      case 'accounts': {
        const uniqueRoles = Array.from(new Set(accounts.map(a => a.role))).sort();
        return {
          columns: accountColumns,
          data: accounts.map(account => ({
            id: account.id,
            name: account.name,
            role: account.role,
            accessLevel: account.accessLevel,
            created: account.created,
            projectCount: account.projectIds.length,
            iconType: 'account' as const,
          })),
          filters: [
            { label: 'Role', options: uniqueRoles },
            { label: 'Created On', type: 'date' as const }
          ]
        };
      }
      case 'teams': {
        const uniqueOwners = Array.from(new Set(teams.map(t => t.owner).filter(Boolean))).sort();
        return {
          columns: teamColumns,
          data: teams.map(team => ({
            id: team.id,
            name: team.name,
            owner: team.owner,
            membersCount: team.membersCount.toString(),
            members: team.membersCount,
            teamProjectCount: projects.filter(p => accounts.filter(a => a.teamIds.includes(team.id)).some(a => a.projectIds.includes(p.id))).length,
            created: team.created,
            iconType: 'team' as const,
          })),
          filters: [
            { label: 'Owner', options: uniqueOwners },
            { label: 'Created On', type: 'date' as const }
          ]
        };
      }
      case 'workspaces': {
        const workspaceData = workspaces.map(workspace => {
          const projectCount = projects.filter(p => p.workspace === workspace.id).length;
          const memberCount = accounts.filter(a => a.workspaceIds.includes(workspace.id)).length;
          return {
            id: workspace.id,
            name: workspace.name,
            owner: workspace.owner,
            projectsCount: projectCount.toString(),
            workspaceProjectCount: projectCount,
            workspaceMemberCount: memberCount,
            created: workspace.created,
            dateCreated: workspace.created,
            iconType: 'workspace' as const,
          };
        });
        return {
          columns: workspaceColumns,
          data: workspaceData,
          filters: [
            { label: 'Owner', options: Array.from(new Set(workspaceData.map(w => w.owner).filter(Boolean))).sort() },
            { label: 'Created On', type: 'date' as const }
          ]
        };
      }
      default:
        return { columns: [], data: [], filters: [] };
    }
  };

  const { columns, data, filters } = getTableData();

  // Apply filters to table data
  const filteredData = data.filter(row => {
    // Apply regular filters
    for (const [filterLabel, values] of Object.entries(selectedFilters)) {
      if (values.length > 0) {
        const columnKey = columns.find(col => col.label === filterLabel)?.key;
        if (columnKey && !values.includes(row[columnKey])) {
          return false;
        }
      }
    }
    
    // Apply date filters
    for (const [filterLabel, dateRange] of Object.entries(dateFilters)) {
      const { start, end } = dateRange;
      if (start || end) {
        const columnKey = columns.find(col => col.label === filterLabel)?.key;
        if (columnKey) {
          const rowDate = new Date(row[columnKey]);
          if (start && rowDate < start) return false;
          if (end && rowDate > end) return false;
        }
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
    const pathMap: Record<string, string> = {
      'accounts': 'account',
      'teams': 'team',
      'workspaces': 'workspace',
    };
    const path = pathMap[activeTab];
    if (path) {
      navigate(`/admin/${path}/${row.id}`);
    }
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

  // Reset filters when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedFilters({});
    setDateFilters({});
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar
        title="Admin"
        userInitials="LD"
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <TabNav
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <Toolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        dateFilters={dateFilters}
        onDateFilterChange={handleDateFilterChange}
      />
      {isLoading ? (
        viewMode === 'grid' ? <GridSkeleton itemCount={8} /> : <DataTableSkeleton rowCount={8} />
      ) : viewMode === 'grid' ? (
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
          columns={columns}
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