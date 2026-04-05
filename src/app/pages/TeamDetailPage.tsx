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
import { InfoTray, InfoTrayContent } from '../components/InfoTray';
import { TabNav, Tab } from '../components/TabNav';
import { TopBar } from '../components/TopBar';
import { useState, useEffect } from 'react';
import { useNavigationContext, BreadcrumbEntry } from '../contexts/NavigationContext';

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
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [trayContent, setTrayContent] = useState<InfoTrayContent | null>(null);

  const location = useLocation();
  const { ancestors, setAncestors } = useNavigationContext();

  const team = teams.find(t => t.id === teamId);

  // Restore or build ancestor trail on mount / teamId change
  useEffect(() => {
    if (!teamId) return;
    const stateTrail = (location.state as any)?.breadcrumbs as BreadcrumbEntry[] | undefined;
    if (stateTrail !== undefined) {
      setAncestors(stateTrail);
    } else if (ancestors.length === 0) {
      setAncestors([{ label: 'Admin', path: '/admin' }]);
    }
  }, [teamId]);

  // Reset tray on navigation then set page default
  useEffect(() => {
    if (!team) return;
    setIsTrayOpen(false);
    setTrayContent({ type: 'team', data: { id: team.id, name: team.name, owner: team.owner, created: team.created, membersCount: team.membersCount } });
  }, [teamId]);

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
            { key: 'accountCount', label: 'Members', sortable: true, width: 'w-[120px]', align: 'right' as const },
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
            { key: 'role', label: 'Role', sortable: true, width: 'w-[160px]' },
            { key: 'accessLevel', label: 'Access Level', sortable: true, width: 'w-[160px]' },
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
            label: 'Access Level',
            options: Array.from(new Set(data.map(d => d.accessLevel as string))).sort()
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

    // Apply access level filter for members
    if (activeTab === 'Members' && selectedFilters['Access Level'] && selectedFilters['Access Level'].length > 0) {
      if (!selectedFilters['Access Level'].includes(row.accessLevel as string)) {
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
    if (team) setTrayContent({ type: 'team', data: { id: team.id, name: team.name, owner: team.owner, created: team.created, membersCount: team.membersCount } });
  };

  const handleSelectionChange = (row: RowData | null) => {
    if (!row || !team) {
      setTrayContent({ type: 'team', data: { id: team!.id, name: team!.name, owner: team!.owner, created: team!.created, membersCount: team!.membersCount } });
      return;
    }
    if (activeTab === 'Members') {
      setTrayContent({ type: 'account', data: row });
    } else if (activeTab === 'Projects') {
      setTrayContent({ type: 'project', data: row });
    }
  };

  return (
    <div className="flex-1 flex min-h-0 overflow-hidden">
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Top bar */}
      <TopBar
        userInitials="LD"
        onThemeToggle={onThemeToggle}
        isDarkMode={isDarkMode}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        breadcrumbs={[...ancestors, { label: team.name, path: `/admin/team/${teamId}` }]}
        onInfoClick={() => setIsTrayOpen(v => !v)}
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
            onItemClick={() => {}}
            onItemDoubleClick={(item) => {
              if (activeTab === 'Members') {
                const currentEntry = { label: team.name, path: `/admin/team/${teamId}` };
                const nextAncestors = [...ancestors, currentEntry];
                setAncestors(nextAncestors);
                navigate(`/admin/account/${item.id}`, { state: { breadcrumbs: nextAncestors } });
              }
            }}
            favorites={new Set()}
            onViewModeChange={setViewMode}
          />
        ) : (
          <DataTable
            columns={columns}
            data={filteredData}
            onRowClick={() => {}}
            onRowDoubleClick={(row) => {
              if (activeTab === 'Members') {
                const currentEntry = { label: team.name, path: `/admin/team/${teamId}` };
                const nextAncestors = [...ancestors, currentEntry];
                setAncestors(nextAncestors);
                navigate(`/admin/account/${row.id}`, { state: { breadcrumbs: nextAncestors } });
              }
            }}
            onSelectionChange={handleSelectionChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        )
      )}
      </div>

      <InfoTray
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        content={trayContent}
      />
    </div>
  );
}