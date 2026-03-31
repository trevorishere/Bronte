import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router';

export interface BreadcrumbEntry {
  label: string;
  path: string;
}

interface NavigationContextType {
  ancestors: BreadcrumbEntry[];
  setAncestors: (entries: BreadcrumbEntry[]) => void;
  resetToRoot: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [ancestors, setAncestors] = useState<BreadcrumbEntry[]>([]);
  const location = useLocation();

  // Auto-reset when navigating to /admin root
  useEffect(() => {
    if (location.pathname === '/admin') {
      setAncestors([]);
    }
  }, [location.pathname]);

  const resetToRoot = () => setAncestors([]);

  return (
    <NavigationContext.Provider value={{ ancestors, setAncestors, resetToRoot }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigationContext must be used within NavigationProvider');
  return ctx;
}
