import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'sonner';
import { TopBar } from '../components/TopBar';
import { Toolbar } from '../components/Toolbar';
import { DataTable, Column, RowData } from '../components/DataTable';
import { GridView, GridItemData } from '../components/GridView';
import { DataTableSkeleton, GridSkeleton, useLoadingDelay } from '../components/SkeletonLoader';
import { projects } from '../data/workspaces';
import { accounts } from '../data/accounts';
import { useFavorites } from '../contexts/FavoritesContext';
import { useInfoTray } from '../contexts/InfoTrayContext';
import { ShareModal, CurrentMember } from '../components/ShareModal';
import { MembersModal } from '../components/MembersModal';
import { useSharedMembers } from '../contexts/SharedMembersContext';

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

// Sort all projects by lastModified date (newest first) and take the top 24
const allProjects: RowData[] = [...projects]
  .sort((a, b) => {
    const dateA = new Date(a.lastModified).getTime();
    const dateB = new Date(b.lastModified).getTime();
    return dateB - dateA; // Descending order (newest first)
  })
  .slice(0, 24)
  .map(project => ({
    id: project.id,
    name: project.name,
    owner: project.owner,
    lastModified: project.lastModified,
    workspace: project.workspace,
    iconType: 'project' as const,
    accountCount: accounts.filter(a => a.projectIds.includes(project.id)).length,
  }));

const tableData: RowData[] = allProjects;

export function RecentPage() {
  const { isDarkMode, onThemeToggle } = useOutletContext<OutletContext>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const isLoading = useLoadingDelay(600);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [dateFilters, setDateFilters] = useState<Record<string, { start: Date | null; end: Date | null }>>({});
  const { setIsTrayOpen, setTrayContent } = useInfoTray();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareRow, setShareRow] = useState<RowData | null>(null);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [membersModalRow, setMembersModalRow] = useState<RowData | null>(null);
  const { getExtraCount } = useSharedMembers();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  // Get unique owners for filter options
  const uniqueOwners = Array.from(new Set(tableData.map(p => p.owner))).sort();

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

  const handleSelectionChange = (row: RowData | null) => {
    if (row) setTrayContent({ type: 'project', data: row });
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

  const handleShareRow = (row: RowData) => { setShareRow(row); setIsShareOpen(true); };

  const getMembersForRow = (row: RowData): CurrentMember[] =>
    accounts.filter(a => a.projectIds.includes(String(row.id))).map(a => ({ id: a.id, name: a.name, role: a.role }));

  const handleMemberCountClick = (row: RowData) => { setMembersModalRow(row); setIsMembersModalOpen(true); };

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <TopBar
        title="Recent"
        userInitials="LD"
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onInfoClick={() => setIsTrayOpen(v => !v)}
        hideShare
      />
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
          columns={tableColumns}
          data={filteredData}
          onRowClick={handleRowClick}
          onRowDoubleClick={handleRowDoubleClick}
          onSelectionChange={handleSelectionChange}
          onStarClick={handleStarClick}
          onMoreClick={handleMoreClick}
          onShare={handleShareRow}
          onMemberCountClick={handleMemberCountClick}
          starredItems={favorites}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      )}

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => { setIsShareOpen(false); setShareRow(null); }}
        entityName={shareRow?.name ?? "Recent projects"}
        entityId={shareRow?.id ?? "recent"}
        currentMembers={shareRow ? getMembersForRow(shareRow) : []}
        onShare={(ids) => toast(`Shared with ${ids.length} person${ids.length !== 1 ? 's' : ''}`)}
      />

      <MembersModal
        isOpen={isMembersModalOpen}
        onClose={() => { setIsMembersModalOpen(false); setMembersModalRow(null); }}
        entityName={membersModalRow?.name ?? ''}
        members={membersModalRow ? getMembersForRow(membersModalRow) : []}
        onAddMembers={() => { if (membersModalRow) handleShareRow(membersModalRow); }}
      />
    </div>
  );
}