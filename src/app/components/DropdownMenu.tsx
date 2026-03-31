import { useEffect, useRef, useState } from 'react';
import { Edit3, Share2, Copy, FolderInput, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

interface DropdownMenuProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement>;
}

export function DropdownMenu({ items, isOpen, onClose, anchorRef }: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        className="absolute z-50"
        style={{
          top: anchorRef.current ? anchorRef.current.getBoundingClientRect().bottom + 4 : 0,
          right: anchorRef.current ? window.innerWidth - anchorRef.current.getBoundingClientRect().right : 0,
          position: 'fixed',
          transformOrigin: 'top center'
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ 
          duration: 0.25,
          type: 'spring',
          stiffness: 400,
          damping: 25
        }}
      >
        <div
          className="bg-background shadow-lg overflow-hidden p-[8px]"
          style={{
            border: '1px solid var(--border-interactive-hover)',
            borderRadius: 'var(--radius-16)',
            minWidth: '200px',
          }}
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.onClick();
                onClose();
              }}
              onMouseEnter={() => setHoveredOption(item.id)}
              onMouseLeave={() => setHoveredOption(null)}
              className="w-full flex items-center gap-4 px-[12px] py-[10px] transition-colors rounded-xl"
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-medium)',
                fontSize: 'var(--font-size-14)',
                letterSpacing: 'var(--letter-spacing-md)',
                lineHeight: 'var(--line-height-20)',
                color: hoveredOption === item.id ? 'var(--primary)' : item.variant === 'danger' ? '#D32F2F' : 'var(--foreground)',
                backgroundColor: hoveredOption === item.id ? 'var(--muted)' : 'transparent',
                textAlign: 'left',
              }}
            >
              <div className="size-4" style={{ color: item.variant === 'danger' ? '#D32F2F' : 'var(--foreground)' }}>
                {item.icon}
              </div>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export const createDefaultMenuItems = (
  rowName: string,
  onRename: () => void,
  onShare: () => void,
  onDuplicate: () => void,
  onMove: () => void,
  onDelete: () => void
): MenuItem[] => [
  {
    id: 'rename',
    label: 'Rename',
    icon: <Edit3 className="size-4" />,
    onClick: onRename,
  },
  {
    id: 'share',
    label: 'Share',
    icon: <Share2 className="size-4" />,
    onClick: onShare,
  },
  {
    id: 'duplicate',
    label: 'Duplicate',
    icon: <Copy className="size-4" />,
    onClick: onDuplicate,
  },
  {
    id: 'move',
    label: 'Move',
    icon: <FolderInput className="size-4" />,
    onClick: onMove,
  },
  {
    id: 'delete',
    label: 'Delete',
    icon: <Trash2 className="size-4" />,
    onClick: onDelete,
    variant: 'danger',
  },
];