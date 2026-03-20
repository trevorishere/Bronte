import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Toaster } from 'sonner';
import { Sidebar } from '../components/Sidebar';
import { BottomNav } from '../components/BottomNav';
import StatusBar from '../../imports/StatusBar';
import { myWorkspaces, teamWorkspaces } from '../data/workspaces';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import { useMobileNav } from '../hooks/useMobileNav';

export function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved !== null) return saved === 'dark';
    return true; // default to dark mode
  });
  const { isSidebarOpen, closeSidebar } = useMobileNav();

  // Determine active item from current route
  const getActiveItem = () => {
    const path = location.pathname;
    if (path === '/' || path === '/recent') return 'recent';
    if (path === '/favorites') return 'favorites';
    if (path === '/shared') return 'shared';
    if (path === '/admin' || path.startsWith('/admin/')) return 'admin';
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
    setIsDarkMode(prev => !prev);
  };

  // Apply dark mode class to document root and persist preference
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <FavoritesProvider>
      <div className="size-full flex bg-background overflow-hidden">
        {/* Status Bar - Mobile Only */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-[44px] z-50">
          <StatusBar />
        </div>

        {/* Sidebar */}
        <Sidebar
          myWorkspaces={myWorkspaces}
          teamWorkspaces={teamWorkspaces}
          activeItem={getActiveItem()}
          onItemClick={handleItemClick}
          isMobileOpen={isSidebarOpen}
          onMobileClose={closeSidebar}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden pt-[44px] md:pt-0">
          <Outlet context={{ isDarkMode, onThemeToggle: handleThemeToggle }} />
        </div>
        
        {/* Toast Container */}
        <Toaster position="bottom-right" />
        
        {/* Bottom Navigation */}
        <BottomNav
          activeItem={getActiveItem()}
          onItemClick={handleItemClick}
          workspaces={teamWorkspaces}
        />
      </div>
    </FavoritesProvider>
  );
}