import { useParams, useNavigate, useOutletContext, useLocation } from 'react-router';
import { teams } from '../data/teams';
import { projects } from '../data/workspaces';
import { accounts } from '../data/accounts';
import { TeamIcon } from '../components/TeamIcon';
import { DataTable, Column, RowData } from '../components/DataTable';
import { GridView, GridItemData } from '../components/GridView';
import { Toolbar } from '../components/Toolbar';
import { EmptyState } from '../components/EmptyState';
import { DetailPageHeader } from '../components/DetailPageHeader';
import { TabNav, Tab } from '../components/TabNav';
import { TopBar } from '../components/TopBar';
import { useState } from 'react';

interface OutletContext {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export function TeamDetailPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { isDarkMode, onThemeToggle } = useOutletContext<OutletContext>();
  const [activeTab, setActiveTab] = useState('Members');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [dateFilters, setDateFilters] = useState<Record<string, { start: Date | null; end: Date | null }>>({});

  const location = useLocation();
  const fromState = location.state as { fromAccount?: string; fromAccountId?: string } | null;

  const team = teams.find(t => t.id === teamId);

  if (!team) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-14)', color: 'var(--foreground)' }}>
          Team not found
        </p>
      </div>
    );
  }

  // Get projects associated with team members
  const teamProjects = projects.filter(p => p.owner === team.owner);

  // Get accounts that are part of this team
  const teamMembers = accounts.filter(a => a.teamIds?.includes(team.id));

  const tabs: Tab[] = [
    { id: 'Projects', label: 'Projects' },
    { id: 'Members', label: 'Members' },
    { id: 'Settings', label: 'Settings' }
  ];

  const getTabData = () => {
    switch (activeTab) {
      case 'Projects':
        return {
          columns: [
            { key: 'name', label: 'Project Name', sortable: true, width: 'w-[400px]' },
            { key: 'owner', label: 'Owner', sortable: true, width: 'w-[200px]' },
            { key: 'lastModified', label: 'Last Modified', sortable: true, width: 'w-[200px]' },
          ] as Column[],
          data: teamProjects.map(project => ({
            id: project.id,
            name: project.name,
            owner: project.owner,
            lastModified: project.lastModified,
            workspace: project.workspace,
            iconType: 'project' as const,
            accountCount: accounts.filter(a => a.projectIds.includes(project.id)).length,
          }))
        };
      case 'Members':
        return {
          columns: [
            { key: 'name', label: 'Name', sortable: true, width: 'w-[400px]' },
            { key: 'role', label: 'Role', sortable: true, width: 'w-[200px]' },
            { key: 'email', label: 'Email', sortable: true, width: 'w-[200px]' },
            { key: 'created', label: 'Created On', sortable: true, width: 'w-[200px]' },
          ] as Column[],
          data: teamMembers.map(account => ({
            id: account.id,
            name: account.name,
            owner: account.name,
            role: account.role,
            accessLevel: account.accessLevel,
            email: account.email,
            created: account.created,
            projectCount: account.projectIds.length,
            iconType: 'account' as const,
          }))
        };
      case 'Settings':
        return {
          columns: [] as Column[],
          data: [] as RowData[]
        };
      default:
        return { columns: [], data: [] };
    }
  };

  const { columns, data } = getTabData();

  // Get unique values for filters based on current tab
  const getFilters = () => {
    if (activeTab === 'Settings') return [];
    
    switch (activeTab) {
      case 'Projects':
        return [
          {
            label: 'Owner',
            options: Array.from(new Set(data.map(d => d.owner as string))).sort()
          },
          {
            label: 'Last Modified',
            type: 'date' as const
          }
        ];
      case 'Members':
        return [
          {
            label: 'Role',
            options: Array.from(new Set(data.map(d => d.role as string))).sort()
          },
          {
            label: 'Created On',
            type: 'date' as const
          }
        ];
      default:
        return [];
    }
  };

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

  // Apply filters to data
  const filteredData = data.filter(row => {
    // Apply owner filter for projects
    if (activeTab === 'Projects' && selectedFilters['Owner'] && selectedFilters['Owner'].length > 0) {
      if (!selectedFilters['Owner'].includes(row.owner as string)) {
        return false;
      }
    }

    // Apply role filter for members
    if (activeTab === 'Members' && selectedFilters['Role'] && selectedFilters['Role'].length > 0) {
      if (!selectedFilters['Role'].includes(row.role as string)) {
        return false;
      }
    }

    // Apply Last Modified date filter for Projects
    if (activeTab === 'Projects' && dateFilters['Last Modified']) {
      const { start, end } = dateFilters['Last Modified'];
      if (start || end) {
        const rowDate = new Date(row.lastModified);
        if (start && rowDate < start) return false;
        if (end && rowDate > end) return false;
      }
    }

    // Apply Created On date filter for Members
    if (activeTab === 'Members' && dateFilters['Created On']) {
      const { start, end } = dateFilters['Created On'];
      if (start || end) {
        const rowDate = new Date(row.created);
        if (start && rowDate < start) return false;
        if (end && rowDate > end) return false;
      }
    }

    return true;
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedFilters({});
    setDateFilters({});
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Top bar */}
      <TopBar
        userInitials="LD"
        onThemeToggle={onThemeToggle}
        isDarkMode={isDarkMode}
        showBackButton={true}
        onBackClick={() =>
          fromState?.fromAccountId
            ? navigate(`/admin/account/${fromState.fromAccountId}`)
            : navigate('/admin')
        }
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Team header */}
      <DetailPageHeader
        title={team.name}
        icon={(size) => <TeamIcon size={size} />}
        metadata={[
          { icon: 'users', label: `${team.membersCount} member${team.membersCount !== 1 ? 's' : ''}` },
          { icon: 'calendar', label: `Created ${team.created}` }
        ]}
      />

      {/* Tabs */}
      <TabNav
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        variant="detail"
      />

      {/* Toolbar - Always visible for tabs that display tables */}
      {activeTab !== 'Settings' && (
        <Toolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          filters={getFilters()}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          dateFilters={dateFilters}
          onDateFilterChange={handleDateFilterChange}
        />
      )}

      {/* Content area */}
      {activeTab === 'Settings' ? (
        <EmptyState 
          title="No settings available" 
          description="Team settings configuration is not available yet."
        />
      ) : data.length === 0 ? (
        <EmptyState 
          title={`No ${activeTab.toLowerCase()} found`}
          description={`This team doesn't have any ${activeTab.toLowerCase()} yet.`}
        />
      ) : (
        viewMode === 'grid' ? (
          <GridView
            data={filteredData as GridItemData[]}
            onItemClick={(item) => {
              if (activeTab === 'Members') navigate(`/admin/account/${item.id}`);
            }}
            onItemDoubleClick={(item) => {
              if (activeTab === 'Members') navigate(`/admin/account/${item.id}`);
            }}
            favorites={new Set()}
            onViewModeChange={setViewMode}
          />
        ) : (
          <DataTable
            columns={columns}
            data={filteredData}
            onRowClick={(row) => {
              if (activeTab === 'Members') navigate(`/admin/account/${row.id}`);
            }}
            onRowDoubleClick={(row) => {
              if (activeTab === 'Members') navigate(`/admin/account/${row.id}`);
            }}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        )
      )}
    </div>
  );
}