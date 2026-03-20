import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TopBar } from '../components/TopBar';
import { Toolbar } from '../components/Toolbar';
import { DataTable, Column, RowData } from '../components/DataTable';
import { GridView, GridItemData } from '../components/GridView';
import { workspaces } from '../data/workspaces';
import { toast } from 'sonner';

export function WorkspacesPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [starredItems, setStarredItems] = useState<Set<string>>(new Set());
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [dateFilters, setDateFilters] = useState<Record<string, { start: Date | null; end: Date | null }>>({});

  // Define table columns
  const columns: Column[] = [
    { key: 'name', label: 'Workspace Name', sortable: true },
    { key: 'owner', label: 'Owner', sortable: true },
    { key: 'created', label: 'Created', sortable: true, align: 'right' },
  ];

  // Transform workspace data to match RowData interface
  const tableData: RowData[] = workspaces.map(workspace => ({
    id: workspace.id,
    name: workspace.name,
    owner: workspace.owner,
    created: workspace.created,
    dateCreated: workspace.created,
    iconType: 'workspace' as const,
  }));

  // Get unique values for filters
  const uniqueOwners = Array.from(new Set(workspaces.map(w => w.owner))).sort();

  // Filter configuration
  const filters = [
    { label: 'Owner', options: uniqueOwners },
    { label: 'Created', type: 'date' as const }
  ];

  // Apply filters to data
  const getFilteredData = () => {
    let filtered = [...tableData];

    // Apply owner filter
    if (selectedFilters['Owner'] && selectedFilters['Owner'].length > 0) {
      filtered = filtered.filter(item => 
        selectedFilters['Owner'].includes(item.owner)
      );
    }

    // Apply date filter
    if (dateFilters['Created']) {
      const { start, end } = dateFilters['Created'];
      if (start || end) {
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.created);
          if (start && itemDate < start) return false;
          if (end && itemDate > end) return false;
          return true;
        });
      }
    }

    return filtered;
  };

  const filteredData = getFilteredData();

  const handleRowClick = (row: RowData) => {
    navigate(`/workspace/${row.id}`);
  };

  const handleStarClick = (row: RowData | GridItemData, isStarred: boolean) => {
    setStarredItems(prev => {
      const newSet = new Set(prev);
      if (isStarred) {
        newSet.add(row.id);
      } else {
        newSet.delete(row.id);
      }
      return newSet;
    });
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

  const handleRename = (row: RowData, newName: string) => {
    console.log(`Rename workspace ${row.id} to ${newName}`);
  };

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: 'var(--background-content)' }}>
      <TopBar
        title="Workspaces"
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
      {viewMode === 'grid' ? (
        <GridView
          data={filteredData as GridItemData[]}
          onItemClick={handleRowClick}
          onItemDoubleClick={handleRowClick}
          onStarClick={handleStarClick}
          favorites={starredItems}
        />
      ) : (
        <DataTable 
          columns={columns}
          data={filteredData}
          onRowClick={handleRowClick}
          onStarClick={handleStarClick}
          onRename={handleRename}
          starredItems={starredItems}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      )}
    </div>
  );
}