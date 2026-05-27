import { useState, useMemo, useEffect } from 'react';
import { X, ChevronRight, Search, FolderOpen, File } from 'lucide-react';
import { Button } from './Button';
import { workspaces, projects } from '../data/workspaces';
import type { RowData } from './DataTable';

interface TreeNode {
  id: string;
  label: string;
  type: 'workspace' | 'project';
  children?: TreeNode[];
  parentId?: string;
}

// Build the full tree once
const buildTree = (): TreeNode[] =>
  workspaces.map(ws => ({
    id: ws.id,
    label: ws.name,
    type: 'workspace' as const,
    children: projects
      .filter(p => p.workspace === ws.id)
      .map(p => ({
        id: p.id,
        label: p.name,
        type: 'project' as const,
        parentId: ws.id,
      })),
  }));

const FULL_TREE = buildTree();

// Flatten for search matching
const flattenTree = (nodes: TreeNode[]): TreeNode[] =>
  nodes.flatMap(n => [n, ...(n.children ? flattenTree(n.children) : [])]);

const ALL_NODES = flattenTree(FULL_TREE);

interface MoveModalProps {
  isOpen: boolean;
  row: RowData | null;
  onClose: () => void;
  onMove: (row: RowData, destinationId: string, destinationLabel: string) => void;
}

function WorkspaceIcon({ size = 16 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-[4px] shrink-0"
      style={{ width: size, height: size, backgroundColor: 'var(--muted)', border: '1px solid var(--border-interactive)' }}
    >
      <FolderOpen style={{ width: size * 0.6, height: size * 0.6, color: 'var(--secondary-foreground)' }} />
    </div>
  );
}

function ProjectIcon({ size = 16 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-[4px] shrink-0"
      style={{ width: size, height: size, backgroundColor: 'rgba(201,105,79,0.15)' }}
    >
      <File style={{ width: size * 0.6, height: size * 0.6, color: 'rgb(201,105,79)' }} />
    </div>
  );
}

interface TreeNodeRowProps {
  node: TreeNode;
  depth: number;
  isExpanded: boolean;
  isSelected: boolean;
  isCurrentLocation: boolean;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
}

function TreeNodeRow({ node, depth, isExpanded, isSelected, isCurrentLocation, onToggle, onSelect }: TreeNodeRowProps) {
  const hasChildren = (node.children?.length ?? 0) > 0;

  return (
    <div
      className="flex items-center gap-[8px] cursor-pointer rounded-[8px] transition-colors"
      style={{
        height: '40px',
        paddingLeft: `${16 + depth * 20}px`,
        paddingRight: '12px',
        backgroundColor: isSelected ? 'var(--accent)' : 'transparent',
      }}
      onClick={() => onSelect(node.id)}
      onMouseOver={e => { if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--muted)'; }}
      onMouseOut={e => { if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent'; }}
    >
      {/* Expand / collapse chevron */}
      <div
        className="shrink-0 flex items-center justify-center"
        style={{ width: 16, height: 16, opacity: hasChildren ? 1 : 0 }}
        onClick={e => { e.stopPropagation(); if (hasChildren) onToggle(node.id); }}
      >
        <ChevronRight
          className="transition-transform duration-150"
          style={{
            width: 14, height: 14,
            color: 'var(--muted-foreground)',
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        />
      </div>

      {/* Icon */}
      {node.type === 'workspace' ? <WorkspaceIcon size={18} /> : <ProjectIcon size={16} />}

      {/* Label */}
      <span
        className="truncate flex-1 min-w-0"
        style={{
          fontFamily: 'var(--font-family)',
          fontWeight: isSelected ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
          fontSize: 'var(--font-size-15)',
          color: isCurrentLocation ? 'var(--muted-foreground)' : 'var(--foreground)',
          letterSpacing: 'var(--letter-spacing-md)',
        }}
      >
        {node.label}
      </span>

      {isCurrentLocation && (
        <span
          className="shrink-0"
          style={{
            fontFamily: 'var(--font-family)',
            fontSize: '12px',
            color: 'var(--muted-foreground)',
            fontStyle: 'italic',
          }}
        >
          current
        </span>
      )}
    </div>
  );
}

export function MoveModal({ isOpen, row, onClose, onMove }: MoveModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(workspaces.map(w => w.id)));
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setExpandedIds(new Set(workspaces.map(w => w.id)));
      setSelectedId(null);
    }
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Filtered tree based on search
  const { visibleTree, autoExpanded } = useMemo(() => {
    if (!searchQuery.trim()) return { visibleTree: FULL_TREE, autoExpanded: null };

    const q = searchQuery.toLowerCase();
    // Find matching node IDs and their ancestor IDs
    const matchingIds = new Set<string>();
    const parentIds = new Set<string>();

    ALL_NODES.forEach(node => {
      if (node.label.toLowerCase().includes(q)) {
        matchingIds.add(node.id);
        if (node.parentId) parentIds.add(node.parentId);
      }
    });

    // Filter tree to only include matches and their parents
    const filtered = FULL_TREE
      .filter(ws => matchingIds.has(ws.id) || parentIds.has(ws.id))
      .map(ws => ({
        ...ws,
        children: (ws.children ?? []).filter(p => matchingIds.has(p.id)),
      }));

    return { visibleTree: filtered, autoExpanded: new Set([...matchingIds, ...parentIds]) };
  }, [searchQuery]);

  const effectiveExpanded = autoExpanded ?? expandedIds;

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Current location of the item (its workspace id)
  const currentWorkspaceId = row ? (row.workspace as string | undefined) : undefined;

  const selectedNode = selectedId ? ALL_NODES.find(n => n.id === selectedId) : null;

  const handleMove = () => {
    if (!row || !selectedId || !selectedNode) return;
    onMove(row, selectedId, selectedNode.label);
    onClose();
  };

  if (!isOpen || !row) return null;

  // Render tree nodes
  const renderNodes = (nodes: TreeNode[], depth = 0): React.ReactNode[] =>
    nodes.flatMap(node => {
      const isExpanded = effectiveExpanded.has(node.id);
      const isSelected = selectedId === node.id;
      const isCurrentLocation = node.id === currentWorkspaceId;

      const items: React.ReactNode[] = [
        <TreeNodeRow
          key={node.id}
          node={node}
          depth={depth}
          isExpanded={isExpanded}
          isSelected={isSelected}
          isCurrentLocation={isCurrentLocation}
          onToggle={toggleExpand}
          onSelect={setSelectedId}
        />,
      ];

      if (isExpanded && node.children?.length) {
        items.push(...renderNodes(node.children, depth + 1));
      }

      return items;
    });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative flex flex-col rounded-2xl shadow-lg"
        style={{
          width: '560px',
          maxHeight: '80vh',
          backgroundColor: 'var(--background)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-[32px] py-[28px] shrink-0"
        >
          <div className="flex flex-col gap-[4px] min-w-0 pr-[8px]">
            <h2
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-24)',
                lineHeight: 'var(--line-height-normal)',
                color: 'var(--primary)',
              }}
            >
              Move
            </h2>
            <p
              className="truncate"
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--font-size-15)',
                color: 'var(--muted-foreground)',
                lineHeight: '1.3',
              }}
            >
              {row.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-[32px] rounded-full transition-colors ml-[16px] shrink-0"
            style={{ backgroundColor: 'transparent' }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <X className="size-[20px]" style={{ color: 'var(--icon)' }} />
          </button>
        </div>

        {/* Search */}
        <div className="px-[32px] pt-[16px] pb-[24px] shrink-0">
          <div
            className="flex items-center gap-[8px] rounded-[10px] px-[10px]"
            style={{
              height: '40px',
              border: '1px solid var(--border-interactive)',
              backgroundColor: 'var(--background)',
            }}
          >
            <Search className="size-[16px] shrink-0" style={{ color: 'var(--muted-foreground)' }} />
            <input
              type="text"
              placeholder="Search locations…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 min-w-0 outline-none bg-transparent"
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--font-size-15)',
                color: 'var(--foreground)',
                lineHeight: 'var(--line-height-20)',
              }}
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="shrink-0"
                style={{ color: 'var(--muted-foreground)' }}
              >
                <X className="size-[14px]" />
              </button>
            )}
          </div>
        </div>

        {/* Tree */}
        <div className="flex-1 overflow-y-auto px-[24px] pb-[24px] min-h-0" style={{ maxHeight: '280px' }}>
          {visibleTree.length === 0 ? (
            <div
              className="flex items-center justify-center py-[32px]"
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--font-size-15)',
                color: 'var(--muted-foreground)',
              }}
            >
              No locations match "{searchQuery}"
            </div>
          ) : (
            <div className="flex flex-col gap-[1px]">
              {renderNodes(visibleTree)}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-[32px] py-[28px] shrink-0"
        >
          <span
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-13)',
              color: 'var(--muted-foreground)',
              minHeight: '20px',
            }}
          >
            {selectedNode ? `Moving to: ${selectedNode.label}` : 'Select a destination'}
          </span>
          <div className="flex items-center gap-[12px]">
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleMove} type="button" disabled={!selectedId || selectedId === currentWorkspaceId}>
              Move here
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
