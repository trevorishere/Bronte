import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from './DropdownMenu';

interface MobileDrawerProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  entityIcon?: React.ReactNode;
}

export function MobileDrawer({ items, isOpen, onClose, entityName, entityIcon }: MobileDrawerProps) {
  const touchStartY = useRef<number | null>(null);

  // Escape key
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
    const delta = e.changedTouches[0].clientY - touchStartY.current;
    if (delta > 60) onClose();
    touchStartY.current = null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60]"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[61] rounded-t-[24px]"
            style={{
              backgroundColor: 'var(--background)',
              paddingTop: '40px',
              paddingBottom: '72px',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Drag handle */}
            <div
              className="absolute top-[12px] left-1/2 -translate-x-1/2 rounded-full"
              style={{ width: 36, height: 4, backgroundColor: 'var(--border-interactive)' }}
            />

            {/* Entity header */}
            <div className="flex items-center gap-[12px] px-[32px] pb-[24px]">
              {entityIcon && <div className="shrink-0">{entityIcon}</div>}
              <span
                className="flex-1 truncate"
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: '16px',
                  lineHeight: '22px',
                  color: 'var(--primary)',
                  letterSpacing: 'var(--letter-spacing-md)',
                }}
              >
                {entityName}
              </span>
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: 'var(--border)' }} />

            {/* Menu items */}
            <div className="flex flex-col px-[16px]" style={{ gap: '1px' }}>
              {items.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => { item.onClick(); onClose(); }}
                  className="flex items-center gap-[16px] px-[16px] w-full transition-colors rounded-[16px]"
                  style={{
                    height: '48px',
                    marginTop: index === 0 ? '16px' : 0,
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontSize: 'var(--font-size-16)',
                    letterSpacing: 'var(--letter-spacing-md)',
                    color: item.variant === 'danger' ? '#D32F2F' : 'var(--foreground)',
                    backgroundColor: 'transparent',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div
                    className="size-[18px] flex items-center justify-center shrink-0"
                    style={{ color: item.variant === 'danger' ? '#D32F2F' : 'var(--icon)' }}
                  >
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
