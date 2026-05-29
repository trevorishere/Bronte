import { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from './DropdownMenu';
import { DragHandle } from './DragHandle';
import { useDrawerInteraction } from '../hooks/useDrawerInteraction';
import { SPRING_DRAWER } from '../constants/animation';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useRestoreFocus } from '../hooks/useRestoreFocus';

interface MobileDrawerProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  entityIcon?: React.ReactNode;
}

export function MobileDrawer({ items, isOpen, onClose, entityName, entityIcon }: MobileDrawerProps) {
  const { handleTouchStart, handleTouchEnd } = useDrawerInteraction(isOpen, onClose);
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen);
  useRestoreFocus(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60]"
            style={{ backgroundColor: 'var(--backdrop-color)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={entityName}
            className="fixed bottom-0 left-0 right-0 z-[61] rounded-t-[24px]"
            style={{
              backgroundColor: 'var(--background)',
              paddingTop: '40px',
              paddingBottom: '72px',
              minHeight: '50vh',
              maxHeight: '88dvh',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={SPRING_DRAWER}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <DragHandle />

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
                    color: item.variant === 'danger' ? 'var(--destructive)' : 'var(--foreground)',
                    backgroundColor: 'transparent',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div
                    className="size-[18px] flex items-center justify-center shrink-0"
                    style={{ color: item.variant === 'danger' ? 'var(--destructive)' : 'var(--icon)' }}
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
