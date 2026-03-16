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

export function AdminPage() {
  const { isDarkMode, onThemeToggle } = useOutletContext<OutletContext>();

  return (
    <>
      <TopBar
        title="Admin"
        userInitials="LD"
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
      />
      <EmptyState message="You currently have no projects in here yet." />
    </>
  );
}