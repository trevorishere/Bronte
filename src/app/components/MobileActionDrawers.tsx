import { useState, useRef, useEffect, useMemo } from 'react';
import { X, Search, ChevronRight, FolderOpen, File } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { DragHandle } from './DragHandle';
import { useDrawerInteraction } from '../hooks/useDrawerInteraction';
import { SPRING_DRAWER } from '../constants/animation';
import { workspaces, projects } from '../data/workspaces';
import type { RowData } from './DataTable';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useRestoreFocus } from '../hooks/useRestoreFocus';

// ── Shared tree types (mirrors MoveModal) ────────────────────────────────────

interface TreeNode {
  id: string;
  label: string;
  type: 'workspace' | 'project';
  children?: TreeNode[];
  parentId?: string;
}

const FULL_TREE: TreeNode[] = workspaces.map(ws => ({
  id: ws.id,
  label: ws.name,
  type: 'workspace' as const,
  children: projects
    .filter(p => p.workspace === ws.id)
    .map(p => ({ id: p.id, label: p.name, type: 'project' as const, parentId: ws.id })),
}));

const ALL_NODES = FULL_TREE.flatMap(function flat(n: TreeNode): TreeNode[] {
  return [n, ...(n.children ?? []).flatMap(flat)];
});

// ── Shared drawer chrome ─────────────────────────────────────────────────────

interface DrawerChromeProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  titleId: string;
  maxHeight?: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

function DrawerChrome({ isOpen, onClose, title, subtitle, titleId, maxHeight, children, footer }: DrawerChromeProps) {
  const { handleTouchStart, handleTouchEnd } = useDrawerInteraction(isOpen, onClose);
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen, { focusOnOpen: false });
  useRestoreFocus(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[62]"
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
            aria-labelledby={titleId}
            className="fixed bottom-0 left-0 right-0 z-[63] rounded-t-[24px] flex flex-col"
            style={{ backgroundColor: 'var(--background)', maxHeight: maxHeight ?? '88dvh', minHeight: '50vh' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={SPRING_DRAWER}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <DragHandle />

            {/* Header */}
            <div className="shrink-0 px-[24px] pt-[36px] pb-[24px] flex flex-col gap-[8px]">
              <h2
                id={titleId}
                style={{
                  fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-22)', lineHeight: 'normal', color: 'var(--primary)',
                }}
              >
                {title}
              </h2>
              <p className="truncate" style={{
                fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-15)',
                color: 'var(--muted-foreground)', lineHeight: '1.3',
              }}>
                {subtitle}
              </p>
            </div>

            {/* Divider */}
            <div className="shrink-0" style={{ height: 1, backgroundColor: 'var(--border)' }} />

            {/* Scrollable content */}
            {children}

            {/* Footer */}
            <div
              className="shrink-0 flex items-center justify-end gap-[12px] px-[24px] pt-[24px] pb-[32px]"
            >
              {footer}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Rename drawer ─────────────────────────────────────────────────────────────

interface RenameActionDrawerProps {
  isOpen: boolean;
  row: RowData | null;
  onClose: () => void;
  onConfirm: (newName: string) => void;
}

export function RenameActionDrawer({ isOpen, row, onClose, onConfirm }: RenameActionDrawerProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && row) {
      setValue(row.name ?? '');
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 120);
    }
  }, [isOpen, row]);

  const handleConfirm = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onConfirm(trimmed);
  };

  return (
    <DrawerChrome
      isOpen={isOpen}
      onClose={onClose}
      title="Rename"
      subtitle={row?.name ?? ''}
      titleId="rename-drawer-title"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" onClick={handleConfirm} type="button" disabled={!value.trim() || value.trim() === row?.name}>
            Rename
          </Button>
        </>
      }
    >
      <div className="px-[24px] py-[24px]">
        <div className="flex flex-col gap-[8px]">
          <label style={{
            fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-11)', color: 'var(--muted-foreground)',
          }}>
            New Name
          </label>
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleConfirm(); }}
              className="w-full pl-[12px] pr-[36px] rounded-lg bg-transparent"
              style={{
                height: '44px',
                fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-16)',
                color: 'var(--primary)',
                border: '1px solid var(--border-interactive)',
                backgroundColor: 'var(--background)',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--border-interactive-hover)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-interactive)')}
            />
            {value && (
              <button
                type="button"
                onClick={() => { setValue(''); inputRef.current?.focus(); }}
                className="absolute right-[10px] flex items-center justify-center size-[20px] rounded-full"
                style={{ backgroundColor: 'transparent' }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = 'var(--bg-rollover)')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <X className="size-[12px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </DrawerChrome>
  );
}

// ── Delete drawer ─────────────────────────────────────────────────────────────

interface DeleteActionDrawerProps {
  isOpen: boolean;
  row: RowData | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteActionDrawer({ isOpen, row, onClose, onConfirm }: DeleteActionDrawerProps) {
  const handleConfirm = () => { onConfirm(); onClose(); };

  return (
    <DrawerChrome
      isOpen={isOpen}
      onClose={onClose}
      title="Delete"
      subtitle={row?.name ?? ''}
      titleId="delete-drawer-title"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button variant="danger" onClick={handleConfirm} type="button">Delete</Button>
        </>
      }
    >
      <div className="px-[24px] py-[24px]">
        <p style={{
          fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-regular)',
          fontSize: 'var(--font-size-15)', lineHeight: '1.5',
          color: 'var(--foreground)',
        }}>
          Are you sure? This action cannot be undone.
        </p>
      </div>
    </DrawerChrome>
  );
}

// ── Move drawer ───────────────────────────────────────────────────────────────

interface MoveActionDrawerProps {
  isOpen: boolean;
  row: RowData | null;
  onClose: () => void;
  onConfirm: (destinationId: string, destinationLabel: string) => void;
}

function SmallWorkspaceIcon() {
  return (
    <div className="flex items-center justify-center rounded-[4px] shrink-0"
      style={{ width: 18, height: 18, backgroundColor: 'var(--muted)', border: '1px solid var(--border)' }}>
      <FolderOpen style={{ width: 11, height: 11, color: 'var(--secondary-foreground)' }} />
    </div>
  );
}

function SmallProjectIcon() {
  return (
    <div className="flex items-center justify-center rounded-[4px] shrink-0"
      style={{ width: 16, height: 16, backgroundColor: 'rgba(201,105,79,0.15)' }}>
      <File style={{ width: 10, height: 10, color: 'rgb(201,105,79)' }} />
    </div>
  );
}

export function MoveActionDrawer({ isOpen, row, onClose, onConfirm }: MoveActionDrawerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(workspaces.map(w => w.id)));
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setExpandedIds(new Set(workspaces.map(w => w.id)));
      setSelectedId(null);
    }
  }, [isOpen]);

  const { visibleTree, autoExpanded } = useMemo(() => {
    if (!searchQuery.trim()) return { visibleTree: FULL_TREE, autoExpanded: null };
    const q = searchQuery.toLowerCase();
    const matchingIds = new Set<string>();
    const parentIds = new Set<string>();
    ALL_NODES.forEach(node => {
      if (node.label.toLowerCase().includes(q)) {
        matchingIds.add(node.id);
        if (node.parentId) parentIds.add(node.parentId);
      }
    });
    const filtered = FULL_TREE
      .filter(ws => matchingIds.has(ws.id) || parentIds.has(ws.id))
      .map(ws => ({ ...ws, children: (ws.children ?? []).filter(p => matchingIds.has(p.id)) }));
    return { visibleTree: filtered, autoExpanded: new Set([...matchingIds, ...parentIds]) };
  }, [searchQuery]);

  const effectiveExpanded = autoExpanded ?? expandedIds;
  const currentWorkspaceId = row ? (row.workspace as string | undefined) : undefined;
  const selectedNode = selectedId ? ALL_NODES.find(n => n.id === selectedId) : null;

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleConfirm = () => {
    if (!selectedId || !selectedNode) return;
    onConfirm(selectedId, selectedNode.label);
    onClose();
  };

  const renderNodes = (nodes: TreeNode[], depth = 0): React.ReactNode[] =>
    nodes.flatMap(node => {
      const isExpanded = effectiveExpanded.has(node.id);
      const isSelected = selectedId === node.id;
      const isCurrentLocation = node.id === currentWorkspaceId;
      const hasChildren = (node.children?.length ?? 0) > 0;

      const items: React.ReactNode[] = [
        <div
          key={node.id}
          className="flex items-center gap-[8px] cursor-pointer rounded-[8px] transition-colors"
          style={{
            height: '40px',
            paddingLeft: `${12 + depth * 20}px`,
            paddingRight: '12px',
            backgroundColor: isSelected ? 'var(--bg-selected)' : 'transparent',
          }}
          onClick={() => setSelectedId(node.id)}
          onMouseOver={e => { if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--bg-rollover)'; }}
          onMouseOut={e => { if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <div
            className="shrink-0 flex items-center justify-center"
            style={{ width: 16, height: 16, opacity: hasChildren ? 1 : 0 }}
            onClick={e => { e.stopPropagation(); if (hasChildren) toggleExpand(node.id); }}
          >
            <ChevronRight
              className="transition-transform duration-150"
              style={{ width: 14, height: 14, color: 'var(--muted-foreground)', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
            />
          </div>
          {node.type === 'workspace' ? <SmallWorkspaceIcon /> : <SmallProjectIcon />}
          <span className="truncate flex-1 min-w-0" style={{
            fontFamily: 'var(--font-family)',
            fontWeight: isSelected ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
            fontSize: 'var(--font-size-15)',
            color: isCurrentLocation ? 'var(--muted-foreground)' : 'var(--foreground)',
            letterSpacing: 'var(--letter-spacing-md)',
          }}>
            {node.label}
          </span>
          {isCurrentLocation && (
            <span style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-12)', color: 'var(--muted-foreground)', fontStyle: 'italic', flexShrink: 0 }}>
              current
            </span>
          )}
        </div>,
      ];

      if (isExpanded && node.children?.length) {
        items.push(...renderNodes(node.children, depth + 1));
      }
      return items;
    });

  return (
    <DrawerChrome
      isOpen={isOpen}
      onClose={onClose}
      title="Move"
      subtitle={row?.name ?? ''}
      titleId="move-drawer-title"
      maxHeight="85dvh"
      footer={
        <>
          <span style={{
            fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-13)',
            color: 'var(--muted-foreground)', flex: 1, marginRight: 8,
          }}>
            {selectedNode ? `Moving to: ${selectedNode.label}` : 'Select a destination'}
          </span>
          <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" onClick={handleConfirm} type="button"
            disabled={!selectedId || selectedId === currentWorkspaceId}>
            Move here
          </Button>
        </>
      }
    >
      {/* Search */}
      <div className="shrink-0 px-[24px] py-[24px]">
        <div className="flex items-center gap-[8px] rounded-[10px] px-[10px]"
          style={{ height: '40px', border: '1px solid var(--border-interactive)', backgroundColor: 'var(--background)' }}>
          <Search className="size-[16px] shrink-0" style={{ color: 'var(--muted-foreground)' }} />
          <input
            type="text"
            placeholder="Search locations…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 min-w-0 bg-transparent"
            style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-16)', color: 'var(--foreground)' }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ color: 'var(--muted-foreground)' }}>
              <X className="size-[14px]" />
            </button>
          )}
        </div>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto px-[16px] pb-[8px] min-h-0">
        {visibleTree.length === 0 ? (
          <div className="flex items-center justify-center py-[32px]"
            style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-15)', color: 'var(--muted-foreground)' }}>
            No locations match "{searchQuery}"
          </div>
        ) : (
          <div className="flex flex-col gap-[1px]">{renderNodes(visibleTree)}</div>
        )}
      </div>
    </DrawerChrome>
  );
}
