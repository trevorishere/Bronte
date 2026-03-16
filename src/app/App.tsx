import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Toolbar } from './components/Toolbar';
import { DataTable, Column, RowData } from './components/DataTable';

// Sample data for workspaces
const myWorkspaces = [
  { id: 'personal', name: 'Personal Projects', icon: 'PP' },
  { id: 'research', name: 'Research Work', icon: 'RW' },
];

const teamWorkspaces = [
  { id: 'chemistry', name: 'Chemistry & Life Sciences', icon: 'CH', count: 9 },
  { id: 'math', name: 'Math & Engineering', icon: 'MA', count: 3 },
  { id: 'business', name: 'Business Fundamentals', icon: 'BU', count: 1 },
  { id: 'economics', name: 'Economics & Policy', icon: 'EC', count: 2 },
];

// Sample data for the table
const tableColumns: Column[] = [
  { key: 'name', label: 'Project Name', sortable: true, width: 'w-[400px]' },
  { key: 'owner', label: 'Owner', sortable: true, width: 'w-[250px]' },
  { key: 'lastModified', label: 'Last Modified', sortable: true, width: 'w-[200px]' },
];

const tableData: RowData[] = [
  {
    id: '1',
    name: 'Anatomy & Physiology: The Unity of Form and Function',
    owner: 'Vivian Holloway',
    lastModified: 'Nov 3, 2022',
    iconType: 'book',
  },
  {
    id: '2',
    name: 'Biochemistry, 9th Edition',
    owner: 'Elias Thorne',
    lastModified: 'Jan 15, 2023',
    iconType: 'book',
  },
  {
    id: '3',
    name: 'Microbiology: An Introduction, 13th Editi',
    owner: 'Clementine Fairweather',
    lastModified: 'Jan 15, 2023',
    iconType: 'book',
  },
  {
    id: '4',
    name: 'Fundamentals of Differential Equations, 1',
    owner: 'Montgomery Bellweather',
    lastModified: 'Jan 15, 2023',
    iconType: 'book',
  },
  {
    id: '5',
    name: 'Precalculus, 11th Edition',
    owner: 'Evangeline Ashworth',
    lastModified: 'Jan 15, 2023',
    iconType: 'book',
  },
  {
    id: '6',
    name: 'Calculus, 14th Edition',
    owner: 'Jasper Blackwood',
    lastModified: 'Jan 15, 2023',
    iconType: 'book',
  },
  {
    id: '7',
    name: 'Organic Chemistry, 10th Edition',
    owner: 'Seraphina Sterling',
    lastModified: 'Jan 15, 2023',
    iconType: 'book',
  },
  {
    id: '8',
    name: 'Physics for Scientists and Engineers, 4tt',
    owner: 'Genevieve Lovelace',
    lastModified: 'Jan 15, 2023',
    iconType: 'book',
  },
  {
    id: '9',
    name: 'General Chemistry, 11th Edition',
    owner: 'Thaddeus Finch',
    lastModified: 'Jan 15, 2023',
    iconType: 'book',
  },
  {
    id: '10',
    name: 'Essential Cell Biology, 5th Edition',
    owner: 'Isolde Hawthorne',
    lastModified: 'Jan 15, 2023',
    iconType: 'book',
  },
  {
    id: '11',
    name: 'Principles of Genetics, 8th Edition',
    owner: 'Barnaby Ainsworth',
    lastModified: 'Jan 15, 2023',
    iconType: 'book',
  },
  {
    id: '12',
    name: 'Human Anatomy & Physiology, 11th Editk',
    owner: 'Persephone Nightshade',
    lastModified: 'Jan 15, 2023',
    iconType: 'book',
  },
  {
    id: '13',
    name: 'Introduction to Chemical Engineering, 8t',
    owner: 'Alistair Blackthorn',
    lastModified: 'Jan 15, 2023',
    iconType: 'book',
  },
];

export default function App() {
  const [activeItem, setActiveItem] = useState('recent');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would apply theme changes here
    console.log('Theme toggled to:', !isDarkMode ? 'dark' : 'light');
  };

  const handleRowClick = (row: RowData) => {
    console.log('Row clicked (selected):', row);
  };

  const handleRowDoubleClick = (row: RowData) => {
    console.log('Row double-clicked (navigate to):', row);
    // In a real app, you would navigate to the item detail page here
  };

  const handleStarClick = (row: RowData) => {
    console.log('Star clicked:', row);
  };

  const handleMoreClick = (row: RowData) => {
    console.log('More clicked:', row);
  };

  return (
    <div className="size-full flex bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        myWorkspaces={myWorkspaces}
        teamWorkspaces={teamWorkspaces}
        activeItem={activeItem}
        onItemClick={setActiveItem}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <TopBar
          title="Recent"
          userInitials="LD"
          isDarkMode={isDarkMode}
          onThemeToggle={handleThemeToggle}
        />

        {/* Toolbar */}
        <Toolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Data Table - Scrollable */}
        <DataTable
          columns={tableColumns}
          data={tableData}
          onRowClick={handleRowClick}
          onRowDoubleClick={handleRowDoubleClick}
          onStarClick={handleStarClick}
          onMoreClick={handleMoreClick}
        />
      </div>
    </div>
  );
}