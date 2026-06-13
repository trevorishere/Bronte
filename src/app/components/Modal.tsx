import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useRestoreFocus } from '../hooks/useRestoreFocus';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Heading text rendered in the header */
  title: string;
  /** Optional secondary line below the title */
  subtitle?: string;
  /** Must match the `id` of the <h2> for aria-labelledby */
  labelledById: string;
  /** Panel width in px (default: 560) */
  width?: number;
  /** CSS max-height for the panel, e.g. '80vh' */
  maxHeight?: string;
  /** z-index for the backdrop layer (panel is zIndex + 1). Default: 50 */
  zIndex?: number;
  children: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  labelledById,
  width = 560,
  maxHeight,
  zIndex = 50,
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen);
  useRestoreFocus(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0"
            style={{ backgroundColor: 'var(--backdrop-color-modal)', zIndex }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />

          {/* Panel centering wrapper — pointer-events-none so backdrop clicks fall through */}
          <div
            className="fixed inset-0 flex items-center justify-center p-[24px] pointer-events-none"
            style={{ zIndex: zIndex + 1 }}
          >
            {/* Panel */}
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelledById}
              className="relative flex flex-col rounded-2xl shadow-lg overflow-hidden pointer-events-auto"
              style={{
                width,
                maxHeight,
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
              }}
              initial={{ opacity: 0, scale: 0.97, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 6 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              {/* Header */}
              <div className="shrink-0 flex items-start justify-between px-[32px] pt-[24px] pb-[28px]">
                <div className="flex flex-col gap-[8px] min-w-0 pr-[8px]">
                  <h2
                    id={labelledById}
                    style={{
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--font-size-24)',
                      lineHeight: 'var(--line-height-normal)',
                      color: 'var(--primary)',
                    }}
                  >
                    {title}
                  </h2>
                  {subtitle && (
                    <p
                      className="truncate"
                      style={{
                        fontFamily: 'var(--font-family)',
                        fontSize: 'var(--font-size-15)',
                        color: 'var(--muted-foreground)',
                        lineHeight: '1.3',
                      }}
                    >
                      {subtitle}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="flex items-center justify-center size-[32px] rounded-full transition-colors ml-[16px] shrink-0"
                  style={{ backgroundColor: 'transparent', color: 'var(--foreground)' }}
                  onMouseOver={e => { e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'; e.currentTarget.style.color = 'var(--primary)'; }}
                  onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--foreground)'; }}
                >
                  <X className="size-[20px]" />
                </button>
              </div>

              {/* Content */}
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
