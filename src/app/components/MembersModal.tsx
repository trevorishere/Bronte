import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { Avatar, RoleBadge } from './Avatar';
import type { CurrentMember } from './ShareModal';

interface MembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  members: CurrentMember[];
  onAddMembers: () => void;
}

export function MembersModal({ isOpen, onClose, entityName, members, onAddMembers }: MembersModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddMembers = () => {
    onClose();
    onAddMembers();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative flex flex-col rounded-2xl shadow-lg overflow-hidden"
        style={{
          width: '560px',
          maxHeight: '80vh',
          backgroundColor: 'var(--background)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-[32px] py-[28px]">
          <div className="flex flex-col gap-[4px] min-w-0 pr-[8px]">
            <h2 style={{
              fontFamily: 'var(--font-family)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--font-size-24)',
              lineHeight: 'var(--line-height-normal)',
              color: 'var(--primary)',
            }}>
              Members
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
            className="flex items-center justify-center size-[32px] rounded-full transition-colors ml-[16px] shrink-0"
            style={{ backgroundColor: 'transparent' }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <X className="size-[20px]" style={{ color: 'var(--icon)' }} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-[24px] pb-[24px] min-h-0">
          {members.length === 0 ? (
            <div
              className="flex items-center justify-center py-[32px]"
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--font-size-15)',
                color: 'var(--muted-foreground)',
              }}
            >
              No members
            </div>
          ) : (
            <div className="flex flex-col">
              {members.map(member => (
                <div
                  key={member.id}
                  className="flex items-center gap-[12px] px-[12px] h-[48px]"
                >
                  <Avatar name={member.name} role={member.role} size="small" />
                  <span
                    className="flex-1 truncate min-w-0"
                    style={{
                      fontFamily: 'var(--font-family)',
                      fontSize: 'var(--font-size-15)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--foreground)',
                      letterSpacing: 'var(--letter-spacing-md)',
                    }}
                  >
                    {member.name}
                  </span>
                  <RoleBadge role={member.role} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 flex items-center justify-end gap-[12px] px-[32px] py-[28px]">
          <Button variant="secondary" onClick={onClose} type="button">
            Done
          </Button>
          <Button variant="primary" onClick={handleAddMembers} type="button">
            Add Members
          </Button>
        </div>
      </div>
    </div>
  );
}
