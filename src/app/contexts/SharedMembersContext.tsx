import { createContext, useContext, useState, ReactNode } from 'react';

interface SharedMembersContextType {
  pendingInvitations: Record<string, string[]>;
  addSharedMembers: (entityId: string, accountIds: string[]) => void;
  revokeInvitation: (entityId: string, accountId: string) => void;
  getExtraCount: (entityId: string) => number;
}

const SharedMembersContext = createContext<SharedMembersContextType | undefined>(undefined);

export function SharedMembersProvider({ children }: { children: ReactNode }) {
  const [pendingInvitations, setPendingInvitations] = useState<Record<string, string[]>>({});

  const addSharedMembers = (entityId: string, accountIds: string[]) => {
    setPendingInvitations(prev => {
      const existing = prev[entityId] ?? [];
      const merged = Array.from(new Set([...existing, ...accountIds]));
      return { ...prev, [entityId]: merged };
    });
  };

  const revokeInvitation = (entityId: string, accountId: string) => {
    setPendingInvitations(prev => {
      const existing = prev[entityId] ?? [];
      return { ...prev, [entityId]: existing.filter(id => id !== accountId) };
    });
  };

  const getExtraCount = (entityId: string) => pendingInvitations[entityId]?.length ?? 0;

  return (
    <SharedMembersContext.Provider value={{ pendingInvitations, addSharedMembers, revokeInvitation, getExtraCount }}>
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
