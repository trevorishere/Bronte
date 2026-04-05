import { useState, useRef, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { accounts } from '../data/accounts';
import { roleColors } from './Avatar';
import type { Role } from './Avatar';
import { useSharedMembers } from '../contexts/SharedMembersContext';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  entityId: string;
  onShare: (accountIds: string[]) => void;
}

interface SelectedAccount {
  id: string;
  name: string;
  role: Role;
}

// ─── Avatar chip initial ──────────────────────────────────────────────────────

function MiniAvatar({ name, role }: { name: string; role: Role }) {
  const initials = name.trim().split(' ').filter(Boolean)
    .map(p => p[0]).slice(0, 2).join('').toUpperCase();
  const bg = roleColors[role]?.bg ?? '#665e56';
  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-full"
      style={{ width: 22, height: 22, backgroundColor: bg, fontSize: 10, fontWeight: 600, color: '#fff', letterSpacing: '0.3px' }}
    >
      {initials}
    </div>
  );
}

// ─── Selected chip ────────────────────────────────────────────────────────────

function Chip({ account, onRemove }: { account: SelectedAccount; onRemove: () => void }) {
  return (
    <div
      className="flex items-center gap-[6px] pl-[4px] pr-[6px] shrink-0"
      style={{
        backgroundColor: 'var(--muted)',
        border: '1px solid var(--border-interactive)',
        borderRadius: '8px',
        height: '28px',
      }}
    >
      <MiniAvatar name={account.name} role={account.role} />
      <span style={{
        fontFamily: 'var(--font-family)',
        fontWeight: 'var(--font-weight-medium)',
        fontSize: '13px',
        color: 'var(--foreground)',
        whiteSpace: 'nowrap',
        maxWidth: '120px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {account.name}
      </span>
      <button
        onClick={onRemove}
        className="shrink-0 flex items-center justify-center size-[14px] rounded-full transition-opacity hover:opacity-70"
        style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <X className="size-[10px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2.5} />
      </button>
    </div>
  );
}

// ─── Account result row ───────────────────────────────────────────────────────

function AccountRow({
  name, email, role, onSelect,
}: { name: string; email: string; role: Role; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full flex items-center gap-[12px] px-[12px] py-[8px] rounded-xl transition-colors text-left"
      style={{ backgroundColor: hovered ? 'var(--muted)' : 'transparent', border: 'none', cursor: 'pointer' }}
    >
      <MiniAvatar name={name} role={role} />
      <div className="flex-1 min-w-0">
        <p style={{
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-medium)',
          fontSize: '14px',
          color: hovered ? 'var(--primary)' : 'var(--foreground)',
          letterSpacing: '0.3px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {name}
        </p>
        <p style={{
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-regular)',
          fontSize: '12px',
          color: 'var(--muted-foreground)',
          letterSpacing: '0.3px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {email}
        </p>
      </div>
    </button>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{
      fontFamily: 'var(--font-family)',
      fontWeight: 'var(--font-weight-semibold)',
      fontSize: '11px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.8px',
      color: 'var(--muted-foreground)',
      padding: '4px 12px 6px',
    }}>
      {text}
    </p>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ShareModal({ isOpen, onClose, entityName, entityId, onShare }: ShareModalProps) {
  const { sharedWith } = useSharedMembers();
  const alreadyShared = new Set(sharedWith[entityId] ?? []);

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<SelectedAccount[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset on open/close
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelected([]);
    } else {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const selectedIds = new Set(selected.map(a => a.id));

  // Search results: filter by query ≥ 3 chars, exclude already-shared and already-selected
  const searchResults = query.length >= 3
    ? accounts.filter(a =>
        !alreadyShared.has(a.id) &&
        !selectedIds.has(a.id) &&
        (a.name.toLowerCase().includes(query.toLowerCase()) ||
         a.email.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  // Recent accounts to show when idle (not yet selected or already shared)
  const recentAccounts = recentIds
    .map(id => accounts.find(a => a.id === id))
    .filter((a): a is NonNullable<typeof a> =>
      a != null && !alreadyShared.has(a.id) && !selectedIds.has(a.id)
    )
    .slice(0, 5);

  const selectAccount = (acc: typeof accounts[0]) => {
    setSelected(prev => [...prev, { id: acc.id, name: acc.name, role: acc.role }]);
    setQuery('');
    inputRef.current?.focus();
  };

  const removeChip = (id: string) => {
    setSelected(prev => prev.filter(a => a.id !== id));
  };

  const handleShare = () => {
    const ids = selected.map(a => a.id);
    // Prepend to recent list (deduplicated, capped at 10)
    setRecentIds(prev => Array.from(new Set([...ids, ...prev])).slice(0, 10));
    onShare(ids);
    onClose();
  };

  const borderColor = 'var(--border-interactive)';
  const borderHoverColor = 'var(--border-interactive-hover)';
  const [inputFocused, setInputFocused] = useState(false);

  const showIdle = query.length < 3;
  const hasResults = !showIdle && searchResults.length > 0;
  const noResults = !showIdle && searchResults.length === 0;

  return (
    <Dialog open={isOpen} onOpenChange={open => { if (!open) onClose(); }}>
      <DialogContent
        className="p-0 overflow-hidden"
        style={{
          backgroundColor: 'var(--background)',
          border: '1px solid var(--border-interactive)',
          borderRadius: '16px',
          width: '480px',
          maxWidth: '480px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
        }}
      >
        {/* ── Header ──────────────────────────────────────────────────── */}
        <DialogHeader className="px-[24px] pt-[20px] pb-[4px]">
          <DialogTitle style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: '18px',
            color: 'var(--foreground)',
            letterSpacing: '0.3px',
          }}>
            Share "{entityName}"
          </DialogTitle>
        </DialogHeader>

        {/* ── Search input + chips ─────────────────────────────────────── */}
        <div className="px-[24px] pt-[12px] pb-[4px]">
          <div
            className="flex flex-wrap items-center gap-[6px] min-h-[44px] px-[10px] py-[8px] rounded-[12px] transition-colors cursor-text"
            style={{
              border: `1px solid ${inputFocused ? borderHoverColor : borderColor}`,
              backgroundColor: 'var(--background)',
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {selected.map(acc => (
              <Chip key={acc.id} account={acc} onRemove={() => removeChip(acc.id)} />
            ))}
            <div className="flex items-center gap-[8px] flex-1 min-w-[120px]">
              <Search className="size-[15px] shrink-0" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder={selected.length === 0 ? 'Search by name or email…' : ''}
                className="flex-1 outline-none bg-transparent"
                style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-regular)',
                  fontSize: '14px',
                  color: 'var(--foreground)',
                  letterSpacing: '0.3px',
                  minWidth: 0,
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Results / recent list ─────────────────────────────────────── */}
        <div
          className="mx-[24px] my-[8px] overflow-y-auto"
          style={{ minHeight: '160px', maxHeight: '260px' }}
        >
          <AnimatePresence mode="wait">
            {showIdle ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                {recentAccounts.length > 0 ? (
                  <>
                    <SectionLabel text="Recently shared" />
                    {recentAccounts.map(acc => (
                      <AccountRow
                        key={acc.id}
                        name={acc.name}
                        email={acc.email}
                        role={acc.role}
                        onSelect={() => selectAccount(acc)}
                      />
                    ))}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full py-[32px]">
                    <p style={{
                      fontFamily: 'var(--font-family)',
                      fontSize: '14px',
                      color: 'var(--muted-foreground)',
                      letterSpacing: '0.3px',
                      textAlign: 'center',
                    }}>
                      Type at least 3 characters to search
                    </p>
                  </div>
                )}
              </motion.div>
            ) : hasResults ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                <SectionLabel text={`${searchResults.length} result${searchResults.length !== 1 ? 's' : ''}`} />
                {searchResults.map(acc => (
                  <AccountRow
                    key={acc.id}
                    name={acc.name}
                    email={acc.email}
                    role={acc.role}
                    onSelect={() => selectAccount(acc)}
                  />
                ))}
              </motion.div>
            ) : noResults ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="flex items-center justify-center py-[32px]"
              >
                <p style={{
                  fontFamily: 'var(--font-family)',
                  fontSize: '14px',
                  color: 'var(--muted-foreground)',
                  letterSpacing: '0.3px',
                }}>
                  No accounts match "{query}"
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-end gap-[8px] px-[24px] py-[16px]"
          style={{ borderTop: '1px solid var(--border-interactive)' }}
        >
          <button
            onClick={onClose}
            className="flex items-center justify-center h-[40px] px-[16px] rounded-[10px] transition-colors"
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-medium)',
              fontSize: '14px',
              color: 'var(--foreground)',
              letterSpacing: '0.3px',
              border: '1px solid var(--border-interactive)',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
            onMouseOut={e  => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            disabled={selected.length === 0}
            className="flex items-center justify-center h-[40px] px-[16px] rounded-[10px] transition-colors"
            style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: '14px',
              letterSpacing: '0.3px',
              border: 'none',
              cursor: selected.length === 0 ? 'not-allowed' : 'pointer',
              backgroundColor: selected.length === 0 ? 'var(--muted)' : 'var(--foreground)',
              color: selected.length === 0 ? 'var(--muted-foreground)' : 'var(--background)',
              opacity: selected.length === 0 ? 0.5 : 1,
              transition: 'background-color 150ms ease, opacity 150ms ease',
            }}
            onMouseOver={e => { if (selected.length > 0) e.currentTarget.style.backgroundColor = 'var(--primary)'; }}
            onMouseOut={e  => { if (selected.length > 0) e.currentTarget.style.backgroundColor = 'var(--foreground)'; }}
          >
            {selected.length > 0 ? `Share (${selected.length})` : 'Share'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
