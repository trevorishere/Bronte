import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  itemName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ isOpen, itemName, onClose, onConfirm }: DeleteConfirmModalProps) {
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
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="relative flex flex-col rounded-2xl shadow-lg"
        style={{ width: '480px', backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-[24px] py-[20px]"
        >
          <h2
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--font-size-18)',
              lineHeight: 'var(--line-height-normal)',
              color: 'var(--primary)',
            }}
          >
            Delete item?
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-[32px] rounded-full transition-colors"
            style={{ backgroundColor: 'transparent' }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <X className="size-[20px]" style={{ color: 'var(--icon)' }} />
          </button>
        </div>

        {/* Body */}
        <div className="px-[24px] py-[24px]">
          <p
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-regular)',
              fontSize: 'var(--font-size-15)',
              lineHeight: 'var(--line-height-22)',
              color: 'var(--foreground)',
            }}
          >
            Are you sure you want to delete <strong style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--primary)' }}>{itemName}</strong>? This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-[12px] px-[24px] py-[20px]"
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
