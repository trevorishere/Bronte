import { useEffect, useRef } from 'react';

export function useRestoreFocus(isOpen: boolean) {
  const savedRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (isOpen) {
      savedRef.current = document.activeElement as HTMLElement;
    } else {
      savedRef.current?.focus();
      savedRef.current = null;
    }
  }, [isOpen]);
}
