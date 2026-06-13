import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Modal } from './Modal';
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
  const [isXClearHovered, setIsXClearHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getFileNameWithoutExtension = (fullName: string): string => {
    const lastDotIndex = fullName.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === 0) return fullName;
    return fullName.substring(0, lastDotIndex);
  };

  const getFileExtension = (fullName: string): string => {
    const lastDotIndex = fullName.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === 0) return '';
    return fullName.substring(lastDotIndex);
  };

  // Reset state and auto-focus when modal opens
  useEffect(() => {
    if (isOpen) {
      setNewName(currentName);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const extension = getFileExtension(currentName);
          const nameWithoutExt = getFileNameWithoutExtension(currentName);
          if (extension) {
            inputRef.current.setSelectionRange(0, nameWithoutExt.length);
          } else {
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
      onClose();
    }
  };

  // Pass handleCancel as onClose so the base modal's X button + Escape also reset state
  const handleCancel = () => {
    setNewName(currentName);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title={title} subtitle={currentName} labelledById="rename-title">
      <form onSubmit={handleSubmit}>
        {/* Body */}
        <div className="px-[32px] py-[24px]">
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="rename-input"
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-11)',
                lineHeight: 'var(--line-height-normal)',
                color: 'var(--muted-foreground)',
              }}
            >
              New Name
            </label>
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                id="rename-input"
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                className="w-full pl-[12px] pr-[36px] rounded-lg transition-all"
                style={{
                  height: '40px',
                  fontFamily: 'var(--font-family)',
                  fontSize: 'var(--font-size-16)',
                  lineHeight: 'var(--line-height-normal)',
                  color: 'var(--primary)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'var(--border-interactive-hover)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
              />
              {newName && (
                <button
                  type="button"
                  onClick={() => { setNewName(''); inputRef.current?.focus(); }}
                  className="absolute right-[8px] flex items-center justify-center p-[4px] rounded-[4px] cursor-pointer"
                  style={{
                    opacity: isXClearHovered ? 1 : 0.7,
                    backgroundColor: isXClearHovered ? 'var(--bg-icon-hover)' : 'transparent',
                    transition: 'opacity var(--duration-default) var(--ease-standard), background-color var(--duration-default) var(--ease-standard)',
                  }}
                  onMouseEnter={() => setIsXClearHovered(true)}
                  onMouseLeave={() => setIsXClearHovered(false)}
                  tabIndex={-1}
                >
                  <X className="size-[12px]" style={{ color: isXClearHovered ? 'var(--primary)' : 'var(--foreground)' }} strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-[12px] px-[32px] pt-[24px] pb-[32px]">
          <Button variant="secondary" onClick={handleCancel} type="button">Cancel</Button>
          <Button variant="primary" type="submit" disabled={!newName.trim()}>Rename</Button>
        </div>
      </form>
    </Modal>
  );
}
