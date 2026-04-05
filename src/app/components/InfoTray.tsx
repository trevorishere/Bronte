import { X, Check, ChevronDown } from 'lucide-react';
import { RoleBadge, roleColors } from './Avatar';
import type { Role } from './Avatar';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

// ─── Public types ─────────────────────────────────────────────────────────────

export type InfoTrayEntityType = 'account' | 'project' | 'team' | 'workspace' | 'shared-project' | 'page';

export interface InfoTrayContent {
  type: InfoTrayEntityType;
  data: Record<string, unknown>;
}

// ─── Account panel types ──────────────────────────────────────────────────────

type PermLevel = 'View' | 'Edit' | 'Admin';
type AccessLevel = 'Super Admin' | 'Owner' | 'Editor' | 'Viewer' | 'None';

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

const ACCESS_LEVELS: AccessLevel[] = ['Super Admin', 'Owner', 'Editor', 'Viewer', 'None'];
const ROLE_OPTIONS: Role[] = ['Admin', 'Developer', 'Creator'];

const PERM_ROWS: { id: keyof PermissionsState; label: string }[] = [
  { id: 'accounts',   label: 'Accounts'   },
  { id: 'teams',      label: 'Teams'      },
  { id: 'plugins',    label: 'Plugins'    },
  { id: 'workspaces', label: 'Workspaces' },
  { id: 'projects',   label: 'Projects'   },
  { id: 'authoring',  label: 'Authoring'  },
];

const PERM_COLS: PermLevel[] = ['View', 'Edit', 'Admin'];

// ─── Main component ───────────────────────────────────────────────────────────

interface InfoTrayProps {
  isOpen:   boolean;
  onClose:  () => void;
  content:  InfoTrayContent | null;
}

export function InfoTray({ isOpen, onClose, content }: InfoTrayProps) {
  const title = content ? String(content.data.name ?? content.data.title ?? 'Details') : 'Details';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 380, opacity: 1 }}
          exit={{
            width: 0, opacity: 0,
            transition: {
              width:   { type: 'tween', duration: 0.22, ease: 'easeInOut' },
              opacity: { duration: 0.15, ease: 'easeInOut' },
            },
          }}
          transition={{
            width:   { type: 'spring', stiffness: 320, damping: 32 },
            opacity: { duration: 0.18, ease: 'easeInOut' },
          }}
          className="shrink-0 overflow-hidden hidden md:flex flex-col"
          style={{ borderLeft: '1px solid var(--border)', backgroundColor: 'var(--tray-bg)' }}
        >
          <div className="flex flex-col h-full" style={{ minWidth: 380 }}>

            {/* ── Header ─────────────────────────────────────────── */}
            <div className="shrink-0 flex items-center justify-between pt-[20px] pb-[12px] px-[24px]">
              <span style={{
                fontFamily:   'var(--font-family)',
                fontSize:     '20px',
                fontWeight:   'var(--font-weight-semibold)',
                color:        'var(--foreground)',
                letterSpacing:'0.3px',
                whiteSpace:   'nowrap',
                overflow:     'hidden',
                textOverflow: 'ellipsis',
                maxWidth:     '280px',
              }}>
                {title}
              </span>
              <button
                onClick={onClose}
                className="shrink-0 flex items-center justify-center size-[32px] rounded-[6px] transition-colors"
                style={{ backgroundColor: 'transparent', color: 'var(--muted-foreground)', border: 'none', cursor: 'pointer' }}
                onMouseOver={e  => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
                onMouseOut={e   => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <X className="size-[18px]" strokeWidth={2} />
              </button>
            </div>

            {/* ── Body ───────────────────────────────────────────── */}
            {content?.type === 'account' ? (
              <AccountPanel
                key={String(content.data.id ?? content.data.name)}
                data={content.data}
              />
            ) : content?.type === 'page' ? (
              <PageInfoPanel data={content.data} />
            ) : content ? (
              <ReadOnlyPanel content={content} />
            ) : (
              <EmptyPanel />
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Account panel (full R&P) ─────────────────────────────────────────────────

function AccountPanel({ data }: { data: Record<string, unknown> }) {
  const resolveRole = (): Role => {
    if (data.role === 'Developer') return 'Developer';
    if (data.role === 'Creator')   return 'Creator';
    return 'Admin';
  };
  const resolveAccess = (): AccessLevel => {
    if (ACCESS_LEVELS.includes(data.accessLevel as AccessLevel))
      return data.accessLevel as AccessLevel;
    return 'Super Admin';
  };

  const [role,        setRole]        = useState<Role>(resolveRole);
  const [accessLevel, setAccessLevel] = useState<AccessLevel>(resolveAccess);
  const [permissions, setPermissions] = useState<PermissionsState>(PRESETS[resolveAccess()]);
  const [isRoleOpen,   setIsRoleOpen]   = useState(false);
  const [isAccessOpen, setIsAccessOpen] = useState(false);

  const roleRef   = useRef<HTMLDivElement>(null);
  const accessRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (roleRef.current   && !roleRef.current.contains(e.target as Node))   setIsRoleOpen(false);
      if (accessRef.current && !accessRef.current.contains(e.target as Node)) setIsAccessOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const applyAccessLevel = (level: AccessLevel) => {
    setAccessLevel(level);
    setPermissions(PRESETS[level]);
    setIsAccessOpen(false);
  };

  const setPermLevel = (row: keyof PermissionsState, level: PermLevel) => {
    setPermissions(prev => ({ ...prev, [row]: level }));
  };

  const borderColor = 'var(--border-interactive)';

  return (
    <>
      <div className="flex-1 overflow-y-auto">

        {/* Info rows */}
        <div className="flex flex-col pt-[8px] pb-[24px] mx-[24px]" style={{ borderBottom: `1px solid ${borderColor}` }}>
          <InfoRow label="Email"    value={String(data.email    ?? '—')} />
          <InfoRow label="Timezone" value="Los Angeles (PST)" />
        </div>

        {/* Role + Access Level + Permissions */}
        <div className="flex flex-col gap-[20px] pt-[32px] pb-[16px] px-[24px]">

          {/* Role */}
          <div className="flex items-center gap-[24px] h-[40px]">
            <span className="shrink-0 w-[92px]" style={labelStyle}>Role</span>
            <div className="relative flex-1" ref={roleRef}>
              <DropdownTrigger onClick={() => { setIsRoleOpen(v => !v); setIsAccessOpen(false); }}>
                <RoleBadge role={role} />
              </DropdownTrigger>
              <AnimatePresence>
                {isRoleOpen && (
                  <TrayDropdownMenu>
                    {ROLE_OPTIONS.map(opt => (
                      <TrayDropdownItem key={opt} selected={role === opt} onClick={() => { setRole(opt); setIsRoleOpen(false); }}>
                        <RoleBadge role={opt} />
                      </TrayDropdownItem>
                    ))}
                  </TrayDropdownMenu>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Access Level + Permissions */}
          <div className="flex flex-col gap-[20px] py-[12px]">

            {/* Access Level */}
            <div className="flex items-center gap-[24px] h-[40px]">
              <span className="shrink-0" style={labelStyle}>Access Level</span>
              <div className="relative flex-1" ref={accessRef}>
                <DropdownTrigger onClick={() => { setIsAccessOpen(v => !v); setIsRoleOpen(false); }}>
                  <span style={{
                    fontFamily:    'var(--font-family)',
                    fontSize:      '14px',
                    fontWeight:    'var(--font-weight-medium)',
                    color:         'var(--foreground)',
                    letterSpacing: '0.3px',
                    whiteSpace:    'nowrap',
                    paddingLeft:   '6px',
                  }}>
                    {accessLevel}
                  </span>
                </DropdownTrigger>
                <AnimatePresence>
                  {isAccessOpen && (
                    <TrayDropdownMenu>
                      {ACCESS_LEVELS.map(opt => (
                        <TrayDropdownItem key={opt} selected={accessLevel === opt} onClick={() => applyAccessLevel(opt)}>
                          <span style={{ fontFamily: 'var(--font-family)', fontSize: '14px', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', letterSpacing: '0.3px' }}>
                            {opt}
                          </span>
                        </TrayDropdownItem>
                      ))}
                    </TrayDropdownMenu>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Permissions matrix */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center h-[32px]">
                <span className="flex-1" style={{ fontFamily: 'var(--font-family)', fontSize: '12px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', letterSpacing: '0.3px' }}>
                  Permissions
                </span>
                <div className="flex items-center gap-[8px]">
                  {PERM_COLS.map(col => (
                    <div key={col} className="flex items-center justify-center w-[64px]">
                      <span style={{ fontFamily: 'var(--font-family)', fontSize: '12px', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)', letterSpacing: '0.16px' }}>
                        {col}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {PERM_ROWS.map(row => (
                <div key={row.id} className="flex items-center h-[40px]">
                  <span className="flex-1" style={{ fontFamily: 'var(--font-family)', fontSize: '11px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--muted-foreground)', letterSpacing: '0.77px', textTransform: 'uppercase' }}>
                    {row.label}
                  </span>
                  <div className="flex items-center gap-[8px]">
                    {PERM_COLS.map(level => (
                      <div key={level} className="flex items-center justify-center w-[64px] h-[24px]">
                        <RadioCircle
                          checked={permissions[row.id] === level}
                          onClick={() => setPermLevel(row.id, level)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="shrink-0 flex items-center justify-end px-[24px] py-[24px]"
        style={{ borderTop: `1px solid ${borderColor}` }}
      >
        <button
          className="flex items-center justify-center h-[40px] transition-colors"
          style={{
            border:          `1px solid ${borderColor}`,
            borderRadius:    '8px',
            paddingLeft:     '17px',
            paddingRight:    '17px',
            backgroundColor: 'transparent',
            cursor:          'pointer',
            fontFamily:      'var(--font-family)',
            fontSize:        '14px',
            fontWeight:      'var(--font-weight-medium)',
            color:           'var(--foreground)',
            letterSpacing:   '0.3px',
          }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
          onMouseOut={e  => (e.currentTarget.style.backgroundColor = 'transparent')}
          onClick={() => toast('Changes Applied')}
        >
          Apply
        </button>
      </div>
    </>
  );
}

// ─── Page info panel ──────────────────────────────────────────────────────────

function PageInfoPanel({ data }: { data: Record<string, unknown> }) {
  const rows: Array<{ label: string; value: string }> = [];

  if (data.section != null)
    rows.push({ label: String(data.section), value: String(data.count ?? '—') });
  if (data.description != null)
    rows.push({ label: String(data.description), value: String(data.count ?? '—') });

  // Fallback: just show a count row if nothing else defined
  if (rows.length === 0 && data.count != null)
    rows.push({ label: 'Items', value: String(data.count) });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col pt-[8px] pb-[24px] mx-[24px]">
        {rows.map(({ label, value }) => (
          <InfoRow key={label} label={label} value={value} />
        ))}
      </div>
    </div>
  );
}

// ─── Read-only panel ──────────────────────────────────────────────────────────

function ReadOnlyPanel({ content }: { content: InfoTrayContent }) {
  const { type, data } = content;

  const rows: Array<{ label: string; value: unknown }> = [];

  if (type === 'project') {
    rows.push(
      { label: 'Owner',         value: data.owner },
      { label: 'Workspace',     value: data.workspace },
      { label: 'Last Modified', value: data.lastModified },
      { label: 'Members',       value: data.accountCount ?? data.members },
    );
  } else if (type === 'team') {
    rows.push(
      { label: 'Owner',   value: data.owner },
      { label: 'Created', value: data.created },
      { label: 'Members', value: data.membersCount ?? data.members },
    );
  } else if (type === 'workspace') {
    rows.push(
      { label: 'Owner',    value: data.owner },
      ...(data.type ? [{ label: 'Type', value: data.type }] : []),
      { label: 'Created',  value: data.created },
      { label: 'Projects', value: data.projectsCount },
      { label: 'Members',  value: data.membersCount },
    );
  } else if (type === 'shared-project') {
    rows.push(
      { label: 'Owner',         value: data.owner },
      { label: 'Shared By',     value: data.sharedBy },
      { label: 'Date Shared',   value: data.dateShared },
      { label: 'Last Modified', value: data.lastModified },
      { label: 'Workspace',     value: data.workspace },
    );
  }

  const visibleRows = rows.filter(r => r.value != null && r.value !== '');

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col pt-[8px] pb-[24px] mx-[24px]">
        {visibleRows.map(({ label, value }) => (
          <InfoRow key={label} label={label} value={String(value)} />
        ))}
      </div>
    </div>
  );
}

// ─── Empty panel ──────────────────────────────────────────────────────────────

function EmptyPanel() {
  return (
    <div className="flex-1 flex items-center justify-center px-[24px]">
      <span style={{
        fontFamily:  'var(--font-family)',
        fontSize:    '14px',
        fontWeight:  'var(--font-weight-regular)',
        color:       'var(--muted-foreground)',
        textAlign:   'center',
        letterSpacing: '0.3px',
      }}>
        Select a row to view details
      </span>
    </div>
  );
}

// ─── Shared label style ───────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily:    'var(--font-family)',
  fontSize:      '15px',
  fontWeight:    'var(--font-weight-semibold)',
  color:         'var(--foreground)',
  letterSpacing: '0.3px',
  whiteSpace:    'nowrap',
};

// ─── InfoRow ──────────────────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between h-[40px]">
      <span style={labelStyle}>{label}</span>
      <span style={{
        fontFamily:    'var(--font-family)',
        fontSize:      '15px',
        fontWeight:    'var(--font-weight-regular)',
        color:         'var(--foreground)',
        letterSpacing: '0.3px',
        maxWidth:      '200px',
        overflow:      'hidden',
        textOverflow:  'ellipsis',
        whiteSpace:    'nowrap',
      }}>
        {value}
      </span>
    </div>
  );
}

// ─── DropdownTrigger ──────────────────────────────────────────────────────────

function DropdownTrigger({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-between w-full h-[40px] pl-[6px] pr-[12px] rounded-[12px] transition-colors"
      style={{
        border:          `1px solid ${hovered ? 'var(--border-interactive-hover)' : 'var(--border-interactive)'}`,
        backgroundColor: 'transparent',
        cursor:          'pointer',
      }}
    >
      {children}
      <ChevronDown className="size-[16px] shrink-0 ml-[8px]" style={{ color: 'var(--muted-foreground)' }} strokeWidth={1.5} />
    </button>
  );
}

// ─── TrayDropdownMenu ─────────────────────────────────────────────────────────

function TrayDropdownMenu({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="absolute left-0 right-0 bg-background p-[8px] z-50"
      style={{
        border:          '1px solid var(--border-interactive-hover)',
        borderRadius:    'var(--radius-16)',
        top:             'calc(100% + 6px)',
        boxShadow:       '0 8px 24px rgba(0,0,0,0.3)',
        transformOrigin: 'top center',
      }}
      initial={{ opacity: 0, scaleY: 0.9 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0.9 }}
      transition={{ duration: 0.15, type: 'spring', stiffness: 400, damping: 28 }}
    >
      {children}
    </motion.div>
  );
}

// ─── TrayDropdownItem ─────────────────────────────────────────────────────────

function TrayDropdownItem({ children, selected, onClick }: { children: React.ReactNode; selected: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full flex items-center justify-between px-[4px] py-[4px] rounded-lg transition-colors"
      style={{ backgroundColor: hovered ? 'var(--muted)' : 'transparent', border: 'none', cursor: 'pointer' }}
    >
      {children}
      {selected && <Check className="size-[14px] shrink-0 ml-[8px]" style={{ color: 'var(--primary)' }} strokeWidth={2.5} />}
    </button>
  );
}

// ─── RadioCircle ──────────────────────────────────────────────────────────────

function RadioCircle({ checked, onClick }: { checked: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="size-[22px] rounded-full flex items-center justify-center transition-colors shrink-0"
      style={{
        border:          `1.5px solid ${checked ? 'var(--radio-checked-border)' : hovered ? 'var(--radio-checked-border)' : 'var(--radio-unchecked-border)'}`,
        backgroundColor: checked ? 'var(--radio-checked-bg)' : 'transparent',
        cursor:          'pointer',
      }}
    >
      {checked && <Check className="size-[11px]" style={{ color: 'var(--radio-check-color)' }} strokeWidth={3} />}
    </button>
  );
}
