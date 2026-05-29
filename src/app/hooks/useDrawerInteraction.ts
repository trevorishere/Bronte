import { useRef, useEffect } from 'react';

/**
 * Shared interaction logic for all mobile bottom-sheet drawers.
 * Handles:
 *  - Escape key → onClose
 *  - Swipe down > 60px → onClose
 */
export function useDrawerInteraction(isOpen: boolean, onClose: () => void) {
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    if (e.changedTouches[0].clientY - touchStartY.current > 60) onClose();
    touchStartY.current = null;
  };

  return { handleTouchStart, handleTouchEnd };
}
