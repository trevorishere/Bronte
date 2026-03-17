import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface FavoritesContextType {
  favorites: Set<string>;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'figma-make-favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const array = JSON.parse(stored);
        return new Set(array);
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
    }
    return new Set();
  });

  // Save to localStorage whenever favorites change
  useEffect(() => {
    try {
      const array = Array.from(favorites);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(array));
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [favorites]);

  const addFavorite = (id: string) => {
    setFavorites(prev => new Set(prev).add(id));
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const isFavorite = (id: string) => {
    return favorites.has(id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}