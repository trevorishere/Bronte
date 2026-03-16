import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Toaster } from 'sonner';
import { Sidebar } from '../components/Sidebar';
import { myWorkspaces, teamWorkspaces } from '../data/workspaces';
import { FavoritesProvider } from '../contexts/FavoritesContext';

export function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Determine active item from current route
  const getActiveItem = () => {
    const path = location.pathname;
    if (path === '/' || path === '/recent') return 'recent';
    if (path === '/favorites') return 'favorites';
    if (path === '/shared') return 'shared';
    if (path === '/admin') return 'admin';
    if (path.startsWith('/workspace/')) {
      return path.split('/')[2];
    }
    return 'recent';
  };

  const handleItemClick = (id: string) => {
    if (id === 'recent') {
      navigate('/recent');
    } else if (id === 'favorites') {
      navigate('/favorites');
    } else if (id === 'shared') {
      navigate('/shared');
    } else if (id === 'admin') {
      navigate('/admin');
    } else {
      // It's a workspace
      navigate(`/workspace/${id}`);
    }
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    console.log('Theme toggled to:', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <FavoritesProvider>
      <div className="size-full flex bg-background overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          myWorkspaces={myWorkspaces}
          teamWorkspaces={teamWorkspaces}
          activeItem={getActiveItem()}
          onItemClick={handleItemClick}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Outlet context={{ isDarkMode, onThemeToggle: handleThemeToggle }} />
        </div>
        
        {/* Toast Container */}
        <Toaster position="bottom-right" />
      </div>
    </FavoritesProvider>
  );
}