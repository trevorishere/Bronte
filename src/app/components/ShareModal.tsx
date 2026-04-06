import { useState, useRef, useEffect } from 'react';
import { X, Search, ChevronDown, Check } from 'lucide-react';
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

export interface CurrentMember {
  id: string;
  name: string;
  role: Role;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  entityId: string;
  onShare: (accountIds: string[]) => void;
  /** Accounts that already have access to this entity */
  currentMembers?: CurrentMember[];
}

interface SelectedAccount {
  id: string;
  name: string;
  role: Role;
}

// ─── Mini avatar ──────────────────────────────────────────────────────────────

function MiniAvatar({ name, role, size = 22 }: { name: string; role: Role; size?: number }) {
  const initials = name.trim().split(' ').filter(Boolean)
    .map(p => p[0]).slice(0, 2).join('').toUpperCase();
  const bg = roleColors[role]?.bg ?? '#665e56';
  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-full"
      style={{ width: size, height: size, backgroundColor: bg, fontSize: size * 0.45, fontWeight: 600, color: '#fff', letterSpacing: '0.3px' }}
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

// ─── Account row in the list ──────────────────────────────────────────────────

function AccountListRow({
  name, email, role, isMember, isSelected, onSelect,
}: {
  name: string;
  email: string;
  role: Role;
  isMember: boolean;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const disabled = isMember || isSelected;

  return (
    <button
      onClick={disabled ? undefined : onSelect}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full flex items-center gap-[12px] px-[12px] py-[8px] rounded-xl transition-colors text-left"
      style={{
        backgroundColor: hovered ? 'var(--muted)' : 'transparent',
        border: 'none',
        cursor: disabled ? 'default' : 'pointer',
        opacity: isMember ? 0.45 : 1,
      }}
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
      {/* Right indicator */}
      {isMember && (
        <Check className="size-[14px] shrink-0" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2.5} />
      )}
      {isSelected && !isMember && (
        <Check className="size-[14px] shrink-0" style={{ color: 'var(--foreground)' }} strokeWidth={2.5} />
      )}
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

export function ShareModal({
  isOpen, onClose, entityName, entityId, onShare, currentMembers = [],
}: ShareModalProps) {
  const { sharedWith } = useSharedMembers();

  // All accounts that already have access: original members + previously shared
  const previouslySharedIds = new Set(sharedWith[entityId] ?? []);
  const currentMemberIds = new Set(currentMembers.map(m => m.id));
  const allExistingIds = new Set([...currentMemberIds, ...previouslySharedIds]);

  // Build combined current member list (original + previously shared via modal)
  const previouslySharedAccounts = [...previouslySharedIds]
    .map(id => accounts.find(a => a.id === id))
    .filter((a): a is NonNullable<typeof a> => a != null && !currentMemberIds.has(a.id));
  const allCurrentMembers: CurrentMember[] = [
    ...currentMembers,
    ...previouslySharedAccounts.map(a => ({ id: a.id, name: a.name, role: a.role })),
  ];
  const totalCurrentCount = allCurrentMembers.length;

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<SelectedAccount[]>([]);
  const [membersExpanded, setMembersExpanded] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset on open/close
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelected([]);
      setMembersExpanded(false);
    } else {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const selectedIds = new Set(selected.map(a => a.id));

  // Full alphabetized list, filtered live by query
  const filteredList = accounts
    .filter(a => {
      if (!query) return true;
      const q = query.toLowerCase();
      return a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q);
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const selectAccount = (acc: typeof accounts[0]) => {
    if (allExistingIds.has(acc.id) || selectedIds.has(acc.id)) return;
    setSelected(prev => [...prev, { id: acc.id, name: acc.name, role: acc.role }]);
    inputRef.current?.focus();
  };

  const removeChip = (id: string) => setSelected(prev => prev.filter(a => a.id !== id));

  const handleShare = () => {
    onShare(selected.map(a => a.id));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => { if (!open) onClose(); }}>
      <DialogContent
        className="p-0 flex flex-col overflow-hidden"
        style={{
          backgroundColor: 'var(--background)',
          border: '1px solid var(--border-interactive)',
          borderRadius: '16px',
          width: '480px',
          maxWidth: '480px',
          maxHeight: '80vh',
          boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
        }}
      >
        {/* ── Header ──────────────────────────────────────────────────── */}
        <DialogHeader className="shrink-0 px-[24px] pt-[20px] pb-[4px]">
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
        <div className="shrink-0 px-[24px] pt-[12px] pb-[8px]">
          <div
            className="flex flex-wrap items-center gap-[6px] min-h-[44px] px-[10px] py-[8px] rounded-[12px] cursor-text"
            style={{
              border: `1px solid ${inputFocused ? 'var(--border-interactive-hover)' : 'var(--border-interactive)'}`,
              backgroundColor: 'var(--background)',
              transition: 'border-color 150ms ease',
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

        {/* ── Scrollable body ───────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-[12px]">

          {/* ── Current members row ──────────────────────────────────────── */}
          {totalCurrentCount > 0 && (
            <div className="mb-[4px]">
              <button
                onClick={() => setMembersExpanded(v => !v)}
                className="w-full flex items-center justify-between px-[12px] py-[10px] rounded-xl transition-colors"
                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
                onMouseOut={e  => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span style={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: '14px',
                  color: 'var(--foreground)',
                  letterSpacing: '0.3px',
                }}>
                  {totalCurrentCount} {totalCurrentCount === 1 ? 'person has' : 'people have'} access
                </span>
                <ChevronDown
                  className="size-[16px] shrink-0 transition-transform"
                  style={{ color: 'var(--muted-foreground)', transform: membersExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  strokeWidth={2}
                />
              </button>

              {membersExpanded && (
                <div className="pb-[4px]">
                  {allCurrentMembers.map(m => (
                    <div key={m.id} className="flex items-center gap-[12px] px-[12px] py-[6px]">
                      <MiniAvatar name={m.name} role={m.role} size={20} />
                      <span style={{
                        fontFamily: 'var(--font-family)',
                        fontWeight: 'var(--font-weight-regular)',
                        fontSize: '13px',
                        color: 'var(--foreground)',
                        letterSpacing: '0.3px',
                      }}>
                        {m.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div style={{ height: 1, backgroundColor: 'var(--border)', margin: '4px 12px 8px' }} />
            </div>
          )}

          {/* ── Alphabetized account list ─────────────────────────────────── */}
          <SectionLabel text={query ? `${filteredList.length} result${filteredList.length !== 1 ? 's' : ''}` : 'All accounts'} />

          {filteredList.length > 0 ? (
            filteredList.map(acc => (
              <AccountListRow
                key={acc.id}
                name={acc.name}
                email={acc.email}
                role={acc.role}
                isMember={allExistingIds.has(acc.id)}
                isSelected={selectedIds.has(acc.id)}
                onSelect={() => selectAccount(acc)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center py-[24px]">
              <p style={{
                fontFamily: 'var(--font-family)',
                fontSize: '14px',
                color: 'var(--muted-foreground)',
                letterSpacing: '0.3px',
              }}>
                No accounts match "{query}"
              </p>
            </div>
          )}

          {/* Bottom breathing room */}
          <div style={{ height: 8 }} />
        </div>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <div
          className="shrink-0 flex items-center justify-end gap-[8px] px-[24px] py-[16px]"
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
            className="flex items-center justify-center h-[40px] px-[16px] rounded-[10px]"
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
