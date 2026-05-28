import { useState, useRef, useEffect } from 'react';
import { Search, Check, CircleCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { accounts } from '../data/accounts';
import { roleColors } from './Avatar';
import type { Role } from './Avatar';
import { useSharedMembers } from '../contexts/SharedMembersContext';
import { Button } from './Button';
import type { CurrentMember } from './ShareModal';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ShareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  entityId: string;
  onShare: (accountIds: string[]) => void;
  currentMembers?: CurrentMember[];
}

interface SelectedAccount {
  id: string;
  name: string;
  role: Role;
}

// ─── Mini avatar ──────────────────────────────────────────────────────────────

function MiniAvatar({ name, role, size = 'medium' }: { name: string; role: Role; size?: 'small' | 'medium' | 'large' }) {
  const sizes = { small: { px: 16, fontSize: '7px' }, medium: { px: 20, fontSize: '12px' }, large: { px: 24, fontSize: '10px' } };
  const { px, fontSize } = sizes[size];
  const initials = name.trim().split(' ').filter(Boolean).map(p => p[0]).slice(0, 2).join('').toUpperCase();
  const bg = roleColors[role]?.bg ?? '#665e56';
  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-full"
      style={{ width: px, height: px, backgroundColor: bg, fontSize, lineHeight: fontSize, fontWeight: 600, color: '#fff' }}
    >
      {initials}
    </div>
  );
}

// ─── Selected chip ────────────────────────────────────────────────────────────

function Chip({ account, onRemove }: { account: SelectedAccount; onRemove: () => void }) {
  return (
    <div
      className="flex items-center gap-[8px] pl-[6px] pr-[8px] shrink-0"
      style={{
        backgroundColor: 'var(--muted)',
        border: '1px solid var(--border-interactive)',
        borderRadius: '8px',
        height: '28px',
        maxWidth: '220px',
      }}
    >
      <MiniAvatar name={account.name} role={account.role} size="small" />
      <span className="truncate" style={{
        fontFamily: 'var(--font-family)',
        fontWeight: 'var(--font-weight-medium)',
        fontSize: 'var(--font-size-15)',
        color: 'var(--foreground)',
        whiteSpace: 'nowrap',
      }}>
        {account.name}
      </span>
      <div
        onClick={onRemove}
        className="shrink-0 flex items-center justify-center size-[12px] rounded-full transition-opacity hover:opacity-70 cursor-pointer"
      >
        <X className="size-[10px]" style={{ color: 'var(--foreground)' }} strokeWidth={2.5} />
      </div>
    </div>
  );
}

// ─── Account row ──────────────────────────────────────────────────────────────

function AccountListRow({
  name, email, role, isMember, isSelected, onSelect, onDeselect,
}: {
  name: string; email: string; role: Role;
  isMember: boolean; isSelected: boolean;
  onSelect: () => void; onDeselect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const disabled = isMember;
  const handleClick = disabled ? undefined : isSelected ? onDeselect : onSelect;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full flex items-center gap-[12px] px-[12px] h-[48px] rounded-xl transition-colors text-left"
      style={{
        backgroundColor: isSelected ? 'var(--accent)' : hovered ? 'var(--muted)' : 'transparent',
        border: 'none',
        cursor: disabled ? 'default' : 'pointer',
        opacity: isMember ? 0.45 : 1,
      }}
    >
      <MiniAvatar name={name} role={role} size="large" />
      <div className="flex flex-col gap-[2px] flex-1 min-w-0">
        <p style={{
          fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-medium)',
          fontSize: 'var(--font-size-15)', lineHeight: '16px',
          color: hovered ? 'var(--primary)' : 'var(--foreground)',
          letterSpacing: '0.3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{name}</p>
        <p style={{
          fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-regular)',
          fontSize: '12px', lineHeight: '12px',
          color: 'var(--muted-foreground)', letterSpacing: '0.3px',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{email}</p>
      </div>
      {isMember && <CircleCheck className="size-[14px] shrink-0" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2.5} />}
      {isSelected && !isMember && <Check className="size-[14px] shrink-0" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2.5} />}
    </button>
  );
}

// ─── Access row ───────────────────────────────────────────────────────────────

function AccessRow({ member, onRemove, isPending = false }: { member: CurrentMember; onRemove: () => void; isPending?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="w-full flex items-center gap-[12px] px-[12px] h-[40px] rounded-xl transition-colors cursor-pointer"
      style={{ backgroundColor: hovered ? 'var(--muted)' : 'transparent' }}
      onClick={onRemove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <MiniAvatar name={member.name} role={member.role} size="large" />
      <span className="flex-1 truncate" style={{
        fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-regular)',
        fontSize: 'var(--font-size-15)', lineHeight: 'var(--line-height-20)',
        color: hovered ? 'var(--primary)' : 'var(--foreground)',
        letterSpacing: '0.3px', fontStyle: isPending ? 'italic' : 'normal',
      }}>
        {member.name}
      </span>
      {isPending ? (
        <span style={{
          fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-regular)',
          fontSize: '12px', letterSpacing: '0.3px',
          color: hovered ? 'var(--primary)' : 'var(--muted-foreground)', whiteSpace: 'nowrap',
        }}>Revoke</span>
      ) : (
        <X className="size-[11px] shrink-0" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />
      )}
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{
      fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-semibold)',
      fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px',
      color: 'var(--muted-foreground)', padding: '4px 12px 8px',
      position: 'sticky', top: 0,
      backgroundColor: 'var(--background)', zIndex: 1,
    }}>{text}</p>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ShareDrawer({ isOpen, onClose, entityName, entityId, onShare, currentMembers = [] }: ShareDrawerProps) {
  const { pendingInvitations, revokeInvitation } = useSharedMembers();

  const currentMemberIds = new Set(currentMembers.map(m => m.id));
  const pendingIds = new Set(pendingInvitations[entityId] ?? []);
  const allExistingIds = new Set([...currentMemberIds, ...pendingIds]);

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<SelectedAccount[]>([]);
  const [removedMemberIds, setRemovedMemberIds] = useState<Set<string>>(new Set());
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelected([]);
      setRemovedMemberIds(new Set());
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const selectedIds = new Set(selected.map(a => a.id));

  const filteredList = accounts
    .filter(a => !allExistingIds.has(a.id))
    .filter(a => {
      if (!query) return true;
      const q = query.toLowerCase();
      return a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q);
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const accessList = currentMembers.filter(m => !removedMemberIds.has(m.id));

  const pendingList: CurrentMember[] = [...pendingIds]
    .map(id => accounts.find(a => a.id === id))
    .filter((a): a is NonNullable<typeof a> => a != null)
    .map(a => ({ id: a.id, name: a.name, role: a.role }));

  const selectAccount = (acc: typeof accounts[0]) => {
    if (allExistingIds.has(acc.id) || selectedIds.has(acc.id)) return;
    setSelected(prev => [...prev, { id: acc.id, name: acc.name, role: acc.role }]);
  };

  const removeChip = (id: string) => setSelected(prev => prev.filter(a => a.id !== id));
  const removeAccess = (id: string) => setRemovedMemberIds(prev => new Set([...prev, id]));

  const handleShare = () => {
    onShare(selected.map(a => a.id));
    onClose();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const delta = e.changedTouches[0].clientY - touchStartY.current;
    if (delta > 60) onClose();
    touchStartY.current = null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60]"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[61] rounded-t-[24px] flex flex-col"
            style={{ backgroundColor: 'var(--background)', height: '88vh' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Drag handle */}
            <div
              className="absolute top-[12px] left-1/2 -translate-x-1/2 rounded-full shrink-0"
              style={{ width: 36, height: 4, backgroundColor: 'var(--border-interactive)' }}
            />

            {/* Header */}
            <div className="shrink-0 px-[24px] pt-[36px] pb-[16px] flex flex-col gap-[8px]">
              <h2 style={{
                fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-semibold)',
                fontSize: '22px', lineHeight: 'normal', color: 'var(--primary)',
              }}>Share</h2>
              <p className="truncate" style={{
                fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-15)',
                color: 'var(--muted-foreground)', lineHeight: '1.3',
              }}>{entityName}</p>
            </div>

            {/* Divider */}
            <div className="shrink-0" style={{ height: 1, backgroundColor: 'var(--border)' }} />

            {/* Search input + chips */}
            <div className="shrink-0 px-[24px] py-[14px]">
              <div
                className={`flex gap-[8px] min-h-[40px] px-[10px] py-[6px] rounded-[12px] cursor-text ${selected.length > 0 ? 'items-start' : 'items-center'}`}
                style={{
                  border: `1px solid ${inputFocused ? 'var(--border-interactive-hover)' : 'var(--border-interactive)'}`,
                  backgroundColor: 'var(--background)',
                  transition: 'border-color 150ms ease',
                }}
                onClick={() => inputRef.current?.focus()}
              >
                <Search className={`size-[16px] shrink-0 pointer-events-none ${selected.length > 0 ? 'mt-[6px]' : ''}`} style={{ color: 'var(--muted-foreground)' }} strokeWidth={2} />
                <div className="flex flex-wrap items-center gap-[6px] flex-1 min-w-0">
                  {selected.map(acc => (
                    <Chip key={acc.id} account={acc} onRemove={() => removeChip(acc.id)} />
                  ))}
                  <div className={selected.length > 0 ? 'basis-full min-w-0' : 'flex-1 min-w-0'}>
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      placeholder={selected.length === 0 ? 'Search by name or email…' : ''}
                      className="w-full outline-none bg-transparent"
                      style={{
                        fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-regular)',
                        fontSize: 'var(--font-size-15)', lineHeight: 'var(--line-height-20)',
                        color: 'var(--foreground)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-[12px]">

              {/* All accounts — sticky label contained to this section */}
              <div>
                <SectionLabel text={`All Accounts (${filteredList.length})`} />
                {filteredList.length > 0 ? (
                  <div className="flex flex-col gap-[1px]">
                    {filteredList.map(acc => (
                      <AccountListRow
                        key={acc.id}
                        name={acc.name}
                        email={acc.email}
                        role={acc.role}
                        isMember={false}
                        isSelected={selectedIds.has(acc.id)}
                        onSelect={() => selectAccount(acc)}
                        onDeselect={() => removeChip(acc.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-[24px]">
                    <p style={{
                      fontFamily: 'var(--font-family)', fontSize: 'var(--font-size-14)',
                      color: 'var(--muted-foreground)', letterSpacing: '0.3px',
                    }}>
                      {query ? `No accounts match "${query}"` : 'All accounts already have access'}
                    </p>
                  </div>
                )}
              </div>

              {/* Accounts with access — sticky label contained to this section */}
              {(accessList.length > 0 || pendingList.length > 0) && (
                <div style={{ paddingTop: 32 }}>
                  <SectionLabel text={`Accounts with Access (${accessList.length + pendingList.length})`} />
                  <div className="flex flex-col gap-[1px]">
                    {accessList.map(m => (
                      <AccessRow key={m.id} member={m} onRemove={() => removeAccess(m.id)} />
                    ))}
                    {pendingList.map(m => (
                      <AccessRow key={m.id} member={m} onRemove={() => revokeInvitation(entityId, m.id)} isPending />
                    ))}
                  </div>
                </div>
              )}

              <div style={{ height: 16 }} />
            </div>

            {/* Footer */}
            <div
              className="shrink-0 flex items-center justify-end gap-[12px] px-[24px] pt-[12px] pb-[32px]"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <Button variant="secondary" onClick={onClose} type="button">Cancel</Button>
              <Button
                variant="primary"
                onClick={handleShare}
                disabled={selected.length === 0}
                type="button"
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Share
                  {selected.length > 0 && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 22, height: 22, borderRadius: 6,
                      backgroundColor: 'rgba(0,0,0,0.12)',
                      fontFamily: 'var(--font-family)', fontWeight: 'var(--font-weight-semibold)',
                      fontSize: 'var(--font-size-13)',
                    }}>{selected.length}</span>
                  )}
                </span>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
