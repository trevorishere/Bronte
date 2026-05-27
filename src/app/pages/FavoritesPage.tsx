import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'sonner';
import { TopBar } from '../components/TopBar';
import { Toolbar } from '../components/Toolbar';
import { DataTable, Column, RowData } from '../components/DataTable';
import { GridView, GridItemData } from '../components/GridView';
import { EmptyState } from '../components/EmptyState';
import { useInfoTray } from '../contexts/InfoTrayContext';
import { ShareModal, CurrentMember } from '../components/ShareModal';
import { MembersModal } from '../components/MembersModal';
import { useSharedMembers } from '../contexts/SharedMembersContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { projects } from '../data/workspaces';
import { accounts } from '../data/accounts';

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

export function FavoritesPage() {
  const { isDarkMode, onThemeToggle } = useOutletContext<OutletContext>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [dateFilters, setDateFilters] = useState<Record<string, { start: Date | null; end: Date | null }>>({});
  const { setIsTrayOpen, setTrayContent } = useInfoTray();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareRow, setShareRow] = useState<RowData | null>(null);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [membersModalRow, setMembersModalRow] = useState<RowData | null>(null);
  const { getExtraCount } = useSharedMembers();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [extraRows, setExtraRows] = useState<RowData[]>([]);

  // Filter projects to only show favorited ones
  const tableData: RowData[] = projects
    .filter(project => favorites.has(project.id))
    .map(project => ({
      id: project.id,
      name: project.name,
      owner: project.owner,
      lastModified: project.lastModified,
      workspace: project.workspace,
      iconType: 'project' as const,
      accountCount: accounts.filter(a => a.projectIds.includes(project.id)).length,
    }));

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

  const hasData = tableData.length > 0;

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <TopBar
        title="Favorites"
        userInitials="LD"
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onInfoClick={() => setIsTrayOpen(v => !v)}
        hideShare
      />
      
      {/* Toolbar - Always visible */}
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

      {/* Content area */}
      {hasData ? (
        viewMode === 'grid' ? (
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
            onShare={handleShareRow}
            onDuplicate={(copy) => setExtraRows(prev => [...prev, copy])}
            onDelete={(deleted) => setExtraRows(prev => prev.filter(r => r.id !== deleted.id))}
            onMemberCountClick={handleMemberCountClick}
            starredItems={favorites}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        )
      ) : (
        <EmptyState message="You currently have no favorite projects yet." />
      )}

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => { setIsShareOpen(false); setShareRow(null); }}
        entityName={shareRow?.name ?? "Favorites"}
        entityId={shareRow?.id ?? "favorites"}
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