import { useParams, useNavigate, useOutletContext, useLocation } from 'react-router';
import { useEffect } from 'react';
import { accounts } from '../data/accounts';
import { projects } from '../data/workspaces';
import { teams } from '../data/teams';
import { workspaces } from '../data/workspaces';
import { Avatar, RoleBadge } from '../components/Avatar';
import { DataTable, Column, RowData } from '../components/DataTable';
import { GridView, GridItemData } from '../components/GridView';
import { Toolbar } from '../components/Toolbar';
import { EmptyState } from '../components/EmptyState';
import { DetailPageHeader } from '../components/DetailPageHeader';
import { InfoTrayContent } from '../components/InfoTray';
import { TabNav, Tab } from '../components/TabNav';
import { TopBar } from '../components/TopBar';
import { useState } from 'react';
import { useNavigationContext, BreadcrumbEntry } from '../contexts/NavigationContext';
import { useInfoTray } from '../contexts/InfoTrayContext';

interface OutletContext {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export function AccountDetailPage() {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, onThemeToggle } = useOutletContext<OutletContext>();
  const [activeTab, setActiveTab] = useState('Projects');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [dateFilters, setDateFilters] = useState<Record<string, { start: Date | null; end: Date | null }>>({});
  const { setIsTrayOpen, setTrayContent } = useInfoTray();
  const { ancestors, setAncestors } = useNavigationContext();

  const account = accounts.find(acc => acc.id === accountId);

  // Restore or build ancestor trail on mount / accountId change
  useEffect(() => {
    if (!account) return;
    const stateTrail = (location.state as any)?.breadcrumbs as BreadcrumbEntry[] | undefined;
    if (stateTrail !== undefined) {
      setAncestors(stateTrail);
    } else if (ancestors.length === 0) {
      setAncestors([{ label: 'Admin', path: '/admin' }]);
    }
    // Set tray content to this account on navigation
    setTrayContent({ type: 'account', data: { ...account } });
  }, [accountId]);

  if (!account) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-14)', color: 'var(--foreground)' }}>
          Account not found
        </p>
      </div>
    );
  }

  // Get projects owned by this account
  const accountProjects = projects.filter(p => account.projectIds?.includes(p.id));

  // Get teams where this account is a member
  const accountTeams = teams.filter(t => account.teamIds?.includes(t.id));

  // Get workspaces where this account has access
  const accountWorkspaces = workspaces.filter(w => account.workspaceIds?.includes(w.id));

  const tabs: Tab[] = [
    { id: 'Projects', label: 'Projects' },
    { id: 'Teams', label: 'Teams' },
    { id: 'Workspaces', label: 'Workspaces' },
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
          data: accountProjects.map(project => ({
            id: project.id,
            name: project.name,
            owner: project.owner,
            lastModified: project.lastModified,
            workspace: project.workspace,
            iconType: 'project' as const,
            accountCount: accounts.filter(a => a.projectIds.includes(project.id)).length,
          }))
        };
      case 'Teams':
        return {
          columns: [
            { key: 'name', label: 'Team Name', sortable: true, width: 'w-[400px]' },
            { key: 'owner', label: 'Owner', sortable: true, width: 'w-[200px]' },
            { key: 'lastModified', label: 'Last Modified', sortable: true, width: 'w-[200px]' },
            { key: 'membersCount', label: 'Members', sortable: true, width: 'w-[120px]', align: 'right' as const },
          ] as Column[],
          data: accountTeams.map(team => ({
            id: team.id,
            name: team.name,
            owner: team.owner,
            membersCount: team.membersCount,
            members: team.membersCount,
            created: team.created,
            lastModified: team.created,
            iconType: 'team' as const,
            teamProjectCount: projects.filter(p =>
              accounts.filter(a => a.teamIds.includes(team.id)).some(a => a.projectIds.includes(p.id))
            ).length,
          }))
        };
      case 'Workspaces':
        return {
          columns: [
            { key: 'name', label: 'Workspace Name', sortable: true, width: 'w-[400px]' },
            { key: 'created', label: 'Created On', sortable: true, width: 'w-[200px]' },
            { key: 'projectsCount', label: 'Projects', sortable: true, width: 'w-[120px]', align: 'right' as const },
            { key: 'membersCount', label: 'Members', sortable: true, width: 'w-[120px]', align: 'right' as const },
          ] as Column[],
          data: accountWorkspaces.map(workspace => ({
            id: workspace.id,
            name: workspace.name,
            owner: workspace.owner,
            type: workspace.type,
            created: workspace.created,
            dateCreated: workspace.created,
            iconType: 'workspace' as const,
            projectsCount: projects.filter(p => p.workspace === workspace.id).length,
            workspaceProjectCount: projects.filter(p => p.workspace === workspace.id).length,
            membersCount: accounts.filter(a => a.workspaceIds.includes(workspace.id)).length,
            workspaceMemberCount: accounts.filter(a => a.workspaceIds.includes(workspace.id)).length,
          }))
        };
      default:
        return { columns: [], data: [] };
    }
  };

  const { columns, data } = getTabData();

  // Get unique values for filters based on current tab
  const getFilters = () => {
    if (activeTab === 'Permissions') return []; // unreachable but safe

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
      case 'Teams':
        return [
          {
            label: 'Last Modified',
            type: 'date' as const
          }
        ];
      case 'Workspaces':
        return [
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

    // Apply Last Modified date filter for Projects
    if (activeTab === 'Projects' && dateFilters['Last Modified']) {
      const { start, end } = dateFilters['Last Modified'];
      if (start || end) {
        const rowDate = new Date(row.lastModified);
        if (start && rowDate < start) return false;
        if (end && rowDate > end) return false;
      }
    }

    // Apply Last Modified date filter for Teams
    if (activeTab === 'Teams' && dateFilters['Last Modified']) {
      const { start, end } = dateFilters['Last Modified'];
      if (start || end) {
        const rowDate = new Date(row.lastModified);
        if (start && rowDate < start) return false;
        if (end && rowDate > end) return false;
      }
    }

    // Apply Created On date filter for Workspaces
    if (activeTab === 'Workspaces' && dateFilters['Created On']) {
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

  const handleSelectionChange = (row: RowData | null) => {
    if (!row) return;
    if (activeTab === 'Projects') {
      setTrayContent({ type: 'project', data: row });
    } else if (activeTab === 'Teams') {
      setTrayContent({ type: 'team', data: row });
    } else if (activeTab === 'Workspaces') {
      setTrayContent({ type: 'workspace', data: row });
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <TopBar
          userInitials="LD"
          onThemeToggle={onThemeToggle}
          isDarkMode={isDarkMode}
          breadcrumbs={[...ancestors, { label: account.name, path: `/admin/account/${accountId}` }]}
          titleSuffix={<RoleBadge role={account.role} />}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onInfoClick={() => setIsTrayOpen(prev => !prev)}
          hideShare
        />

      {/* Account header */}
      <DetailPageHeader
        title={account.name}
        badge={<RoleBadge role={account.role} />}
        icon={(size) => <Avatar size={size} name={account.name} role={account.role} />}
        metadata={[
          { icon: 'email', label: account.email },
          { icon: 'calendar', label: `Joined ${account.created}` }
        ]}
        onSettingsClick={() => setIsTrayOpen(prev => !prev)}
      />

        {/* Tabs */}
        <TabNav
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          variant="detail"
        />

        {/* Toolbar */}
        <Toolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          filters={getFilters()}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          dateFilters={dateFilters}
          onDateFilterChange={handleDateFilterChange}
        />

        {/* Content area */}
        {data.length === 0 ? (
          <EmptyState
            title={`No ${activeTab.toLowerCase()} found`}
            description={`This account is not associated with any ${activeTab.toLowerCase()}.`}
          />
        ) : (
          viewMode === 'grid' ? (
            <GridView
              data={filteredData as GridItemData[]}
              onItemClick={(item) => {
                const currentEntry = { label: account.name, path: `/admin/account/${accountId}` };
                const nextAncestors = [...ancestors, currentEntry];
                if (activeTab === 'Teams') {
                  setAncestors(nextAncestors);
                  navigate(`/admin/team/${item.id}`, { state: { breadcrumbs: nextAncestors } });
                } else if (activeTab === 'Workspaces') {
                  setAncestors(nextAncestors);
                  navigate(`/admin/workspace/${item.id}`, { state: { breadcrumbs: nextAncestors } });
                }
              }}
              onItemDoubleClick={(item) => {
                const currentEntry = { label: account.name, path: `/admin/account/${accountId}` };
                const nextAncestors = [...ancestors, currentEntry];
                if (activeTab === 'Teams') {
                  setAncestors(nextAncestors);
                  navigate(`/admin/team/${item.id}`, { state: { breadcrumbs: nextAncestors } });
                } else if (activeTab === 'Workspaces') {
                  setAncestors(nextAncestors);
                  navigate(`/admin/workspace/${item.id}`, { state: { breadcrumbs: nextAncestors } });
                }
              }}
              favorites={new Set()}
              onViewModeChange={setViewMode}
            />
          ) : (
            <DataTable
              columns={columns}
              data={filteredData}
              onRowClick={(row) => {
                const currentEntry = { label: account.name, path: `/admin/account/${accountId}` };
                const nextAncestors = [...ancestors, currentEntry];
                if (activeTab === 'Teams') {
                  setAncestors(nextAncestors);
                  navigate(`/admin/team/${row.id}`, { state: { breadcrumbs: nextAncestors } });
                } else if (activeTab === 'Workspaces') {
                  setAncestors(nextAncestors);
                  navigate(`/admin/workspace/${row.id}`, { state: { breadcrumbs: nextAncestors } });
                }
              }}
              onSelectionChange={handleSelectionChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          )
        )}
    </div>
  );
}
