import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { toast } from 'sonner';
import { TopBar } from '../components/TopBar';
import { EmptyState } from '../components/EmptyState';
import { useFavorites } from '../contexts/FavoritesContext';

interface OutletContext {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export function SharedPage() {
  const { isDarkMode, onThemeToggle } = useOutletContext<OutletContext>();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar
        title="Shared with me"
        userInitials="LD"
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
      />
      <EmptyState message="You currently have no projects in here yet." />
    </div>
  );
}