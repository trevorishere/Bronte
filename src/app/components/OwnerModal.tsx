import React, { useRef } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import type { Account, AccessLevel } from '../data/accounts';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useRestoreFocus } from '../hooks/useRestoreFocus';

// ─── Permission presets (mirrored from InfoTray) ──────────────────────────────

type PermLevel = 'View' | 'Edit' | 'Admin';

interface PermissionsState {
  accounts:   PermLevel;
  teams:      PermLevel;
  plugins:    PermLevel;
  workspaces: PermLevel;
  projects:   PermLevel;
  authoring:  PermLevel;
}

const PRESETS: Record<AccessLevel, PermissionsState> = {
  'Super Admin': { accounts: 'Admin', teams: 'Admin', plugins: 'Admin', workspaces: 'Admin', projects: 'Admin', authoring: 'Admin' },
  'Owner':       { accounts: 'Admin', teams: 'Admin', plugins: 'View',  workspaces: 'Edit',  projects: 'Edit',  authoring: 'Edit'  },
  'Editor':      { accounts: 'View',  teams: 'Edit',  plugins: 'View',  workspaces: 'Edit',  projects: 'Edit',  authoring: 'Edit'  },
  'Viewer':      { accounts: 'View',  teams: 'View',  plugins: 'View',  workspaces: 'View',  projects: 'View',  authoring: 'View'  },
  'None':        { accounts: 'View',  teams: 'View',  plugins: 'View',  workspaces: 'View',  projects: 'View',  authoring: 'View'  },
};

const PERM_ROWS: { id: keyof PermissionsState; label: string }[] = [
  { id: 'accounts',   label: 'Accounts'   },
  { id: 'teams',      label: 'Teams'      },
  { id: 'plugins',    label: 'Plugins'    },
  { id: 'workspaces', label: 'Workspaces' },
  { id: 'projects',   label: 'Projects'   },
  { id: 'authoring',  label: 'Authoring'  },
];

// ─── Shared styles ────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily:    'var(--font-family)',
  fontSize:      'var(--font-size-15)',
  fontWeight:    'var(--font-weight-semibold)',
  color:         'var(--foreground)',
  letterSpacing: 'var(--letter-spacing-md)',
  whiteSpace:    'nowrap',
};

const valueStyle: React.CSSProperties = {
  fontFamily:    'var(--font-family)',
  fontSize:      'var(--font-size-15)',
  fontWeight:    'var(--font-weight-regular)',
  color:         'var(--foreground)',
  letterSpacing: 'var(--letter-spacing-md)',
  textAlign:     'right',
  overflow:      'hidden',
  textOverflow:  'ellipsis',
  whiteSpace:    'nowrap',
};

// ─── InfoRow ──────────────────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between h-[40px] gap-[24px]">
      <span style={labelStyle}>{label}</span>
      <span style={valueStyle}>{value}</span>
    </div>
  );
}

// ─── OwnerModal ───────────────────────────────────────────────────────────────

interface OwnerModalProps {
  account: Account | null;
  onClose: () => void;
}

export function OwnerModal({ account, onClose }: OwnerModalProps) {
  const navigate    = useNavigate();
  const isOpen      = account !== null;
  const permissions = account ? PRESETS[account.accessLevel] : PRESETS['Viewer'];
  const panelRef    = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen);
  useRestoreFocus(isOpen);

  return (
    <AnimatePresence>
      {isOpen && account && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[70]"
            style={{ backgroundColor: 'var(--backdrop-color-modal)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />

          {/* Card */}
          <div className="fixed inset-0 z-[71] flex items-center justify-center p-[24px] pointer-events-none">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="owner-title"
              className="relative flex flex-col pointer-events-auto overflow-hidden"
              style={{
                backgroundColor: 'var(--background)',
                border:          '1px solid var(--border-interactive)',
                borderRadius:    '16px',
                width:           '376px',
                maxHeight:       '80vh',
              }}
              initial={{ opacity: 0, scale: 0.97, y: 6 }}
              animate={{ opacity: 1, scale: 1,    y: 0 }}
              exit={{ opacity: 0,    scale: 0.97, y: 6 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              {/* Header */}
              <div
                className="shrink-0 flex items-start justify-between px-[32px] pt-[24px] pb-[28px]"
              >
                <h2
                  id="owner-title"
                  style={{
                    fontFamily:  'var(--font-family)',
                    fontWeight:  'var(--font-weight-semibold)',
                    fontSize:    'var(--font-size-24)',
                    lineHeight:  'var(--line-height-normal)',
                    color:       'var(--primary)',
                  }}
                >
                  {account.name}
                </h2>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="flex items-center justify-center size-[32px] rounded-full transition-colors ml-[16px] shrink-0"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = 'var(--bg-icon-hover)')}
                  onMouseOut={e  => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <X className="size-[20px]" style={{ color: 'var(--icon)' }} />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto">

                {/* Email · Timezone */}
                <div
                  className="flex flex-col py-[16px] mx-[32px]"
                  style={{ borderBottom: '1px solid var(--border-interactive)' }}
                >
                  <InfoRow label="Email"    value={account.email} />
                  <InfoRow label="Timezone" value="Los Angeles (PST)" />
                </div>

                {/* Role · Access Level · Permissions */}
                <div className="flex flex-col py-[16px] mx-[32px]">
                  <InfoRow label="Role"         value={account.role} />
                  <InfoRow label="Access Level" value={account.accessLevel} />

                  {/* Permissions title */}
                  <div className="flex items-center h-[40px] mt-[8px]">
                    <span style={{
                      fontFamily:    'var(--font-family)',
                      fontSize:      'var(--font-size-11)',
                      fontWeight:    'var(--font-weight-semibold)',
                      color:         'var(--muted-foreground)',
                      letterSpacing: 'var(--letter-spacing-lg)',
                      textTransform: 'uppercase',
                    }}>
                      Permissions
                    </span>
                  </div>

                  {/* Indented permission rows */}
                  <div className="flex flex-col pl-[16px]">
                    {PERM_ROWS.map(row => (
                      <InfoRow
                        key={row.id}
                        label={row.label}
                        value={permissions[row.id]}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div
                className="shrink-0 flex items-center justify-end px-[32px] pt-[24px] pb-[32px]"
              >
                <button
                  className="flex items-center justify-center h-[40px] transition-colors"
                  style={{
                    border:          'none',
                    borderRadius:    '8px',
                    paddingLeft:     '17px',
                    paddingRight:    '17px',
                    backgroundColor: 'var(--btn-primary-bg)',
                    cursor:          'pointer',
                    fontFamily:      'var(--font-family)',
                    fontSize:        'var(--font-size-15)',
                    fontWeight:      'var(--font-weight-medium)',
                    color:           'var(--btn-primary-text)',
                    letterSpacing:   'var(--letter-spacing-md)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--btn-primary-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--btn-primary-bg)')}
                  onClick={() => { onClose(); navigate(`/admin/account/${account.id}`); }}
                >
                  Edit Account
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
