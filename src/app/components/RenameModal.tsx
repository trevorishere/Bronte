import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface RenameModalProps {
  isOpen: boolean;
  currentName: string;
  onClose: () => void;
  onRename: (newName: string) => void;
  title?: string;
}

export function RenameModal({ 
  isOpen, 
  currentName, 
  onClose, 
  onRename,
  title = 'Rename'
}: RenameModalProps) {
  const [newName, setNewName] = useState(currentName);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper functions for file name and extension
  const getFileNameWithoutExtension = (fullName: string): string => {
    const lastDotIndex = fullName.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === 0) {
      return fullName; // No extension or hidden file
    }
    return fullName.substring(0, lastDotIndex);
  };

  const getFileExtension = (fullName: string): string => {
    const lastDotIndex = fullName.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === 0) {
      return ''; // No extension or hidden file
    }
    return fullName.substring(lastDotIndex);
  };

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setNewName(currentName);
      
      // Auto-focus and select the name part (without extension) after a brief delay
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const extension = getFileExtension(currentName);
          const nameWithoutExt = getFileNameWithoutExtension(currentName);
          
          if (extension) {
            // Select only the name part, not the extension
            inputRef.current.setSelectionRange(0, nameWithoutExt.length);
          } else {
            // No extension, select all
            inputRef.current.select();
          }
        }
      }, 50);
    }
  }, [isOpen, currentName]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (newName.trim() && newName.trim() !== currentName) {
      onRename(newName.trim());
      onClose();
    } else if (newName.trim() === currentName) {
      // No change, just close
      onClose();
    }
  };

  const handleCancel = () => {
    setNewName(currentName);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleBackdropClick}
    >
      {/* Modal */}
      <div 
        className="relative flex flex-col rounded-2xl shadow-lg"
        style={{
          width: '480px',
          backgroundColor: 'var(--background)',
          border: '1px solid var(--border)'
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between px-[24px] py-[20px]"
          style={{ borderBottom: '1px solid var(--border-interactive)' }}
        >
          <h2 
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--font-size-18)',
              lineHeight: 'var(--line-height-normal)',
              color: 'var(--primary)'
            }}
          >
            {title}
          </h2>
          <button
            onClick={handleCancel}
            className="flex items-center justify-center size-[32px] rounded-full transition-colors"
            style={{ backgroundColor: 'transparent' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X className="size-[20px]" style={{ color: 'var(--icon)' }} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="px-[24px] py-[24px]">
            <div className="flex flex-col gap-[8px]">
              <label
                htmlFor="rename-input"
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--font-size-14)',
                  lineHeight: 'var(--line-height-normal)',
                  color: 'var(--foreground)'
                }}
              >
                New name
              </label>
              <input
                ref={inputRef}
                id="rename-input"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-[12px] py-[8px] rounded-lg transition-all"
                style={{
                  fontFamily: 'var(--font-family)',
                  fontSize: 'var(--font-size-14)',
                  lineHeight: 'var(--line-height-normal)',
                  color: 'var(--primary)',
                  border: '1px solid var(--border-interactive)',
                  outline: 'none',
                  backgroundColor: 'var(--background)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-interactive-hover)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-interactive)';
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div 
            className="flex items-center justify-end gap-[12px] px-[24px] py-[20px]"
            style={{ borderTop: '1px solid var(--border-interactive)' }}
          >
            <Button
              variant="secondary"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={!newName.trim()}
            >
              Rename
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}