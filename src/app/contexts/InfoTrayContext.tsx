import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import type { InfoTrayContent } from '../components/InfoTray';

interface InfoTrayContextType {
  isTrayOpen: boolean;
  setIsTrayOpen: Dispatch<SetStateAction<boolean>>;
  trayContent: InfoTrayContent | null;
  setTrayContent: Dispatch<SetStateAction<InfoTrayContent | null>>;
}

const InfoTrayContext = createContext<InfoTrayContextType | null>(null);

export function InfoTrayProvider({ children }: { children: ReactNode }) {
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [trayContent, setTrayContent] = useState<InfoTrayContent | null>(null);

  return (
    <InfoTrayContext.Provider value={{ isTrayOpen, setIsTrayOpen, trayContent, setTrayContent }}>
      {children}
    </InfoTrayContext.Provider>
  );
}

export function useInfoTray() {
  const ctx = useContext(InfoTrayContext);
  if (!ctx) throw new Error('useInfoTray must be used within InfoTrayProvider');
  return ctx;
}
