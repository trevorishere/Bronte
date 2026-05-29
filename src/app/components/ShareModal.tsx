import { useState, useRef, useEffect } from 'react';
import { X, Search, Check, CircleCheck } from 'lucide-react';
import { Button } from './Button';
import { accounts } from '../data/accounts';
import { roleColors } from './Avatar';
import type { Role } from './Avatar';
import { useSharedMembers } from '../contexts/SharedMembersContext';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useRestoreFocus } from '../hooks/useRestoreFocus';

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

type MiniAvatarSize = 'small' | 'medium' | 'large';
const miniAvatarSizes: Record<MiniAvatarSize, { px: number; fontSize: string }> = {
  small:  { px: 16, fontSize: '7px' },
  medium: { px: 20, fontSize: '12px' },
  large:  { px: 24, fontSize: '10px' },
};

function MiniAvatar({ name, role, size = 'medium' }: { name: string; role: Role; size?: MiniAvatarSize }) {
  const { px, fontSize } = miniAvatarSizes[size];
  const initials = name.trim().split(' ').filter(Boolean)
    .map(p => p[0]).slice(0, 2).join('').toUpperCase();
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
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${account.name}`}
        className="shrink-0 flex items-center justify-center size-[12px] rounded-full transition-opacity hover:opacity-70 cursor-pointer"
        style={{ background: 'none', border: 'none', padding: 0 }}
      >
        <X className="size-[10px]" style={{ color: 'var(--foreground)' }} strokeWidth={2.5} />
      </button>
    </div>
  );
}

// ─── Account row in the list ──────────────────────────────────────────────────

function AccountListRow({
  name, email, role, isMember, isSelected, onSelect, onDeselect,
}: {
  name: string;
  email: string;
  role: Role;
  isMember: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [hoveredX, setHoveredX] = useState(false);
  const disabled = isMember;

  const handleClick = disabled ? undefined : isSelected ? onDeselect : onSelect;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group w-full flex items-center gap-[12px] px-[12px] h-[48px] rounded-xl transition-colors text-left"
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
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-medium)',
          fontSize: 'var(--font-size-15)',
          lineHeight: '16px',
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
          lineHeight: '12px',
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
        <CircleCheck className="size-[14px] shrink-0" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2.5} />
      )}
      {isSelected && !isMember && (
        <div className="relative size-[22px] shrink-0">
          {/* Check: visible by default, hidden on desktop hover */}
          <div className="absolute inset-0 flex items-center justify-center transition-opacity pointer-events-none md:group-hover:opacity-0">
            <Check className="size-[14px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={2.5} />
          </div>
          {/* X: hidden on mobile + desktop default, visible on desktop hover */}
          <div
            role="button"
            onClick={(e) => { e.stopPropagation(); onDeselect(); }}
            onMouseEnter={() => setHoveredX(true)}
            onMouseLeave={() => setHoveredX(false)}
            className="absolute inset-0 flex items-center justify-center size-[22px] rounded-full cursor-pointer transition-opacity opacity-0 pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto"
            style={{ backgroundColor: 'var(--bg-icon-hover)' }}
          >
            <X className="size-[10px]" style={{ color: hoveredX ? 'var(--primary)' : 'var(--foreground)' }} strokeWidth={2.5} />
          </div>
        </div>
      )}
    </button>
  );
}

// ─── Access row (accounts with access list) ───────────────────────────────────

function AccessRow({ member, onRemove, isPending = false, entityName }: { member: CurrentMember; onRemove: () => void; isPending?: boolean; entityName?: string }) {
  const [hovered, setHovered] = useState(false);
  const [hoveredX, setHoveredX] = useState(false);
  return (
    <button
      type="button"
      className="group w-full flex items-center gap-[12px] px-[12px] h-[40px] rounded-xl transition-colors cursor-pointer"
      style={{
        backgroundColor: hovered ? 'var(--muted)' : 'transparent',
        border: 'none',
        padding: '0 12px',
        textAlign: 'left',
      }}
      aria-label={entityName ? `Remove ${member.name} from ${entityName}` : `Remove ${member.name}`}
      onClick={onRemove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <MiniAvatar name={member.name} role={member.role} size="large" />
      <span className="flex-1 truncate" style={{
        fontFamily: 'var(--font-family)',
        fontWeight: 'var(--font-weight-regular)',
        fontSize: 'var(--font-size-15)',
        lineHeight: 'var(--line-height-20)',
        color: hovered ? 'var(--primary)' : 'var(--foreground)',
        letterSpacing: '0.3px',
        fontStyle: isPending ? 'italic' : 'normal',
      }}>
        {member.name}
      </span>
      {isPending ? (
        <span
          className="shrink-0 transition-colors"
          style={{
            fontFamily: 'var(--font-family)',
            fontWeight: 'var(--font-weight-regular)',
            fontSize: '12px',
            letterSpacing: '0.3px',
            color: hovered ? 'var(--primary)' : 'var(--muted-foreground)',
            whiteSpace: 'nowrap',
          }}
        >
          Revoke Invitation
        </span>
      ) : (
        <div
          role="button"
          onClick={onRemove}
          onMouseEnter={() => setHoveredX(true)}
          onMouseLeave={() => setHoveredX(false)}
          className="flex items-center justify-center size-[20px] rounded-full cursor-pointer shrink-0 transition-opacity md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto"
          style={{ backgroundColor: 'var(--bg-icon-hover)' }}
        >
          <X className="size-[11px]" style={{ color: hoveredX ? 'var(--primary)' : 'var(--foreground)' }} strokeWidth={2} />
        </div>
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
      padding: '4px 12px 8px',
    }}>
      {text}
    </p>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ShareModal({
  isOpen, onClose, entityName, entityId, onShare, currentMembers = [],
}: ShareModalProps) {
  const { pendingInvitations, revokeInvitation } = useSharedMembers();
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen);
  useRestoreFocus(isOpen);

  const currentMemberIds = new Set(currentMembers.map(m => m.id));
  const pendingIds = new Set(pendingInvitations[entityId] ?? []);
  // Exclude confirmed members and pending invitations from the all-accounts list
  const allExistingIds = new Set([...currentMemberIds, ...pendingIds]);

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<SelectedAccount[]>([]);
  const [removedMemberIds, setRemovedMemberIds] = useState<Set<string>>(new Set());
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset on open/close
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelected([]);
      setRemovedMemberIds(new Set());
    } else {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const selectedIds = new Set(selected.map(a => a.id));

  // Full alphabetized list — existing members excluded, current session selections stay
  const filteredList = accounts
    .filter(a => !allExistingIds.has(a.id))
    .filter(a => {
      if (!query) return true;
      const q = query.toLowerCase();
      return a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q);
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Confirmed members minus any removed this session
  const accessList = currentMembers.filter(m => !removedMemberIds.has(m.id));

  // Pending invitations: accounts shared in a previous session awaiting acceptance
  const pendingList: CurrentMember[] = [...pendingIds]
    .map(id => accounts.find(a => a.id === id))
    .filter((a): a is NonNullable<typeof a> => a != null)
    .map(a => ({ id: a.id, name: a.name, role: a.role }));

  const selectAccount = (acc: typeof accounts[0]) => {
    if (allExistingIds.has(acc.id) || selectedIds.has(acc.id)) return;
    setSelected(prev => [...prev, { id: acc.id, name: acc.name, role: acc.role }]);
    inputRef.current?.focus();
  };

  const removeChip = (id: string) => setSelected(prev => prev.filter(a => a.id !== id));

  const removeAccess = (id: string) => setRemovedMemberIds(prev => new Set([...prev, id]));

  const handleShare = () => {
    onShare(selected.map(a => a.id));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'var(--backdrop-color-modal)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-title"
        className="relative flex flex-col rounded-2xl shadow-lg overflow-hidden"
        style={{
          width: '560px',
          maxHeight: '80vh',
          backgroundColor: 'var(--background)',
          border: '1px solid var(--border)',
        }}
      >
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div
          className="shrink-0 flex items-start justify-between px-[32px] py-[28px]"
        >
          <div className="flex flex-col gap-[4px] min-w-0 pr-[8px]">
            <h2
              id="share-title"
              style={{
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-24)',
                lineHeight: 'var(--line-height-normal)',
                color: 'var(--primary)',
              }}
            >
              Share
            </h2>
            <p className="truncate" style={{
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-15)',
              color: 'var(--muted-foreground)',
              lineHeight: '1.3',
            }}>
              {entityName}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center size-[32px] rounded-full transition-colors ml-[16px] shrink-0"
            style={{ backgroundColor: 'transparent' }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <X className="size-[20px]" style={{ color: 'var(--icon)' }} />
          </button>
        </div>

        {/* ── Search input + chips ─────────────────────────────────────── */}
        <div className="shrink-0 px-[32px] pt-[8px] pb-[32px]">
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
                  className="w-full bg-transparent"
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontWeight: 'var(--font-weight-regular)',
                    fontSize: 'var(--font-size-15)',
                    lineHeight: 'var(--line-height-20)',
                    color: 'var(--foreground)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Scrollable body ───────────────────────────────────────────── */}
        <div className="flex flex-col px-[24px] pb-[24px]" style={{ minHeight: 0, overflowY: 'auto' }}>

          {/* ── All accounts ─────────────────────────────────────────────── */}
          <SectionLabel text={`All Accounts (${filteredList.length})`} />

          <div style={{ maxHeight: '302px', overflowY: 'auto' }}>
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
                  fontFamily: 'var(--font-family)',
                  fontSize: 'var(--font-size-14)',
                  color: 'var(--muted-foreground)',
                  letterSpacing: '0.3px',
                }}>
                  No accounts match "{query}"
                </p>
              </div>
            )}
          </div>

          {/* ── Accounts with access ─────────────────────────────────────── */}
          {(accessList.length > 0 || pendingList.length > 0) && (
            <>
              <div style={{ height: 32 }} />
              {(() => {
                const total = accessList.length + pendingList.length;
                return <SectionLabel text={`Accounts with Access (${total})`} />;
              })()}
              <div style={{ maxHeight: '198px', overflowY: 'auto' }}>
                <div className="flex flex-col gap-[1px]">
                  {accessList.map(m => (
                    <AccessRow key={m.id} member={m} onRemove={() => removeAccess(m.id)} entityName={entityName} />
                  ))}
                  {pendingList.map(m => (
                    <AccessRow key={m.id} member={m} onRemove={() => revokeInvitation(entityId, m.id)} isPending entityName={entityName} />
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <div
          className="shrink-0 flex items-center justify-end gap-[12px] px-[32px] py-[28px]"
        >
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
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
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  backgroundColor: 'rgba(0,0,0,0.12)',
                  fontFamily: 'var(--font-family)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--font-size-13)',
                }}>
                  {selected.length}
                </span>
              )}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
