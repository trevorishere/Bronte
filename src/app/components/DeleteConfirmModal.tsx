import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useRestoreFocus } from '../hooks/useRestoreFocus';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  itemName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ isOpen, itemName, onClose, onConfirm }: DeleteConfirmModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen);
  useRestoreFocus(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'var(--backdrop-color-modal)' }}
      onClick={handleBackdropClick}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-confirm-title"
        className="relative flex flex-col rounded-2xl shadow-lg"
        style={{ width: '560px', backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between px-[32px] pt-[24px] pb-[28px]"
        >
          <div className="flex flex-col gap-[8px] min-w-0 pr-[8px]">
            <h2
              id="delete-confirm-title"
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-24)',
                lineHeight: 'var(--line-height-normal)',
                color: 'var(--primary)',
              }}
            >
              Delete
            </h2>
            <p className="truncate" style={{
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-15)',
              color: 'var(--muted-foreground)',
              lineHeight: '1.3',
            }}>
              {itemName}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center size-[32px] rounded-full transition-colors ml-[16px] shrink-0"
            style={{ backgroundColor: 'transparent' }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <X className="size-[20px]" style={{ color: 'var(--icon)' }} />
          </button>
        </div>

        {/* Body */}
        <div className="px-[32px] py-[24px]">
          <p
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-regular)',
              fontSize: 'var(--font-size-15)',
              lineHeight: 'var(--line-height-22)',
              color: 'var(--foreground)',
            }}
          >
            Are you sure? This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-[12px] px-[32px] pt-[24px] pb-[32px]"
        >
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm} type="button">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
