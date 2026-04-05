import { createContext, useContext, useState, ReactNode } from 'react';

interface SharedMembersContextType {
  sharedWith: Record<string, string[]>;
  addSharedMembers: (entityId: string, accountIds: string[]) => void;
  getExtraCount: (entityId: string) => number;
}

const SharedMembersContext = createContext<SharedMembersContextType | undefined>(undefined);

export function SharedMembersProvider({ children }: { children: ReactNode }) {
  const [sharedWith, setSharedWith] = useState<Record<string, string[]>>({});

  const addSharedMembers = (entityId: string, accountIds: string[]) => {
    setSharedWith(prev => {
      const existing = prev[entityId] ?? [];
      const merged = Array.from(new Set([...existing, ...accountIds]));
      return { ...prev, [entityId]: merged };
    });
  };

  const getExtraCount = (entityId: string) => sharedWith[entityId]?.length ?? 0;

  return (
    <SharedMembersContext.Provider value={{ sharedWith, addSharedMembers, getExtraCount }}>
      {children}
    </SharedMembersContext.Provider>
  );
}

export function useSharedMembers() {
  const context = useContext(SharedMembersContext);
  if (context === undefined) {
    throw new Error('useSharedMembers must be used within a SharedMembersProvider');
  }
  return context;
}
