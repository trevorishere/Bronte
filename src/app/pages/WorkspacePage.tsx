import { useState, useEffect } from 'react';
import { useParams, useOutletContext, useNavigate, useLocation } from 'react-router';
import { toast } from 'sonner';
import { TopBar } from '../components/TopBar';
import { Toolbar } from '../components/Toolbar';
import { DataTable, Column, RowData } from '../components/DataTable';
import { GridView, GridItemData } from '../components/GridView';
import { DetailPageHeader } from '../components/DetailPageHeader';
import { WorkspaceIcon } from '../components/WorkspaceIcon';
import { InfoTrayContent } from '../components/InfoTray';
import { projects, workspaces } from '../data/workspaces';
import { accounts } from '../data/accounts';
import { useFavorites } from '../contexts/FavoritesContext';
import { useNavigationContext, BreadcrumbEntry } from '../contexts/NavigationContext';
import { useInfoTray } from '../contexts/InfoTrayContext';
import { useSharedMembers } from '../contexts/SharedMembersContext';
import { ShareModal } from '../components/ShareModal';
import { ShareDrawer } from '../components/ShareDrawer';
import { MembersModal } from '../components/MembersModal';
import { useIsMobile } from '../hooks/useIsMobile';
import { getMembersForRow, getMembersForEntity, countMembers } from '../utils/members';

interface OutletContext {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const tableColumns: Column[] = [
  { key: 'name', label: 'Project Name', sortable: true, width: 'w-[400px]' },
  { key: 'lastModified', label: 'Last Modified', sortable: true, width: 'w-[200px]' },
  { key: 'accountCount', label: 'Members', sortable: true, width: 'w-[120px]', align: 'right' as const },
  { key: 'progress', label: 'Progress', sortable: true, width: 'w-[200px]' },
];

export function WorkspacePage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { isDarkMode, onThemeToggle } = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [dateFilters, setDateFilters] = useState<Record<string, { start: Date | null; end: Date | null }>>({});
  const { setIsTrayOpen, setTrayContent } = useInfoTray();
  const { addSharedMembers, getExtraCount } = useSharedMembers();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isProjectShareOpen, setIsProjectShareOpen] = useState(false);
  const [projectShareRow, setProjectShareRow] = useState<RowData | null>(null);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [membersModalRow, setMembersModalRow] = useState<RowData | null>(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [extraRows, setExtraRows] = useState<RowData[]>([]);

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

  // Set tray content to this workspace on navigation or when shared members change
  useEffect(() => {
    if (!workspace) return;
    const projectCount = projects.filter(p => p.workspace === workspaceId).length;
    const baseMemberCount = countMembers('workspace', workspaceId || '', workspace.owner);
    const totalMemberCount = baseMemberCount + getExtraCount(workspaceId || '');
    setTrayContent({ type: 'workspace', data: { id: workspace.id, name: workspace.name, owner: workspace.owner, type: workspace.type, created: workspace.created, projectsCount: projectCount, membersCount: totalMemberCount } });
  }, [workspaceId, getExtraCount(workspaceId || '')]);

  // Find the workspace
  const workspace = workspaces.find(w => w.id === workspaceId);

  // Filter projects for this workspace
  const workspaceProjects = projects.filter(p => p.workspace === workspaceId);

  // Count members for this workspace (base + shared)
  const memberCount = countMembers('workspace', workspaceId || '', workspace?.owner) + getExtraCount(workspaceId || '');

  const tableData: RowData[] = workspaceProjects.map(project => ({
    id: project.id,
    name: project.name,
    progress: project.progress,
    lastModified: project.lastModified,
    workspace: project.workspace,
    iconType: 'project' as const,
    accountCount: countMembers('project', project.id, project.owner),
  }));

  // Apply filters to table data
  const filteredData = tableData.filter(row => {

    // Filter by Progress
    if (selectedFilters['Progress'] && selectedFilters['Progress'].length > 0) {
      const normalizedProgress = (row.progress as string || '').replace(/\s*\(\d+%\)$/, '');
      if (!selectedFilters['Progress'].includes(normalizedProgress)) return false;
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
    if (!row) return;
    setTrayContent({ type: 'project', data: row });
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


  const handleMemberCountClick = (row: RowData) => { setMembersModalRow(row); setIsMembersModalOpen(true); };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
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
        titleIcon={workspace ? (size) => <WorkspaceIcon name={workspace.name} size={size} /> : undefined}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onInfoClick={() => setIsTrayOpen(v => !v)}
        onShareClick={() => setIsShareOpen(true)}
        shareCount={memberCount}
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
          onShareClick={() => setIsShareOpen(true)}
          onInfoClick={() => setIsTrayOpen(v => !v)}
        />
      )}

      <Toolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filters={[
          { label: 'Progress', options: ['Not Started', 'In Progress', 'In Review', 'Done'] },
          { label: 'Last Modified', type: 'date' as const }
        ]}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        dateFilters={dateFilters}
        onDateFilterChange={handleDateFilterChange}
      />
      {viewMode === 'grid' ? (
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
          onDuplicate={(copy) => setExtraRows(prev => [...prev, copy])}
          onDelete={(deleted) => setExtraRows(prev => prev.filter(r => r.id !== deleted.id))}
          onMemberCountClick={handleMemberCountClick}
          onShare={(row) => { setProjectShareRow(row); setIsProjectShareOpen(true); }}
          starredItems={favorites}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      )}

      {/* Workspace-level Share (modal on desktop, drawer on mobile) */}
      {isMobile ? (
        <ShareDrawer
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          entityName={workspace?.name ?? 'Workspace'}
          entityId={workspaceId ?? ''}
          currentMembers={getMembersForEntity('workspace', workspaceId ?? '', workspace?.owner)}
          onShare={(ids) => {
            addSharedMembers(workspaceId ?? '', ids);
            toast(`Shared with ${ids.length} person${ids.length !== 1 ? 's' : ''}`);
          }}
        />
      ) : (
        <ShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          entityName={workspace?.name ?? 'Workspace'}
          entityId={workspaceId ?? ''}
          currentMembers={getMembersForEntity('workspace', workspaceId ?? '', workspace?.owner)}
          onShare={(ids) => {
            addSharedMembers(workspaceId ?? '', ids);
            toast(`Shared with ${ids.length} person${ids.length !== 1 ? 's' : ''}`);
          }}
        />
      )}

      {/* Project-level share — drawer on mobile, modal on desktop */}
      {isMobile ? (
        <ShareDrawer
          isOpen={isProjectShareOpen}
          onClose={() => { setIsProjectShareOpen(false); setProjectShareRow(null); }}
          entityName={projectShareRow?.name ?? ''}
          entityId={projectShareRow?.id ?? ''}
          currentMembers={projectShareRow ? getMembersForRow(projectShareRow) : []}
          onShare={(ids) => toast(`Shared with ${ids.length} person${ids.length !== 1 ? 's' : ''}`)}
        />
      ) : (
        <ShareModal
          isOpen={isProjectShareOpen}
          onClose={() => { setIsProjectShareOpen(false); setProjectShareRow(null); }}
          entityName={projectShareRow?.name ?? ''}
          entityId={projectShareRow?.id ?? ''}
          currentMembers={projectShareRow ? getMembersForRow(projectShareRow) : []}
          onShare={(ids) => toast(`Shared with ${ids.length} person${ids.length !== 1 ? 's' : ''}`)}
        />
      )}

      <MembersModal
        isOpen={isMembersModalOpen}
        onClose={() => { setIsMembersModalOpen(false); setMembersModalRow(null); }}
        entityName={membersModalRow?.name ?? ''}
        members={membersModalRow ? getMembersForRow(membersModalRow) : []}
        onAddMembers={() => { if (membersModalRow) { setProjectShareRow(membersModalRow); setIsProjectShareOpen(true); } }}
      />
    </div>
  );
}