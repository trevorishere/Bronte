import { X, Feather, Code2, ShieldUser, Check } from 'lucide-react';
import { textStyles } from '../utils/textStyles';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';

// Role → avatar bg color (mirrors Avatar.tsx roleColors)
const ROLE_AVATAR_BG: Record<string, string> = {
  Admin: '#934790',
  Owner: '#7669aa',
  Manager: '#ac4e4f',
  Creator: '#5165b5',
  Viewer: '#4b8f6c',
  Member: '#ac9445',
  Developer: '#b97930',
  Editor: '#39869c',
};

// ─── Types ───────────────────────────────────────────────────────────────────

type RoleOption = 'Creator' | 'Developer' | 'Admin';
type PermLevel = 'View' | 'Edit' | 'Admin';
type PresetName = 'Super Admin' | 'Owner' | 'Editor' | 'Viewer' | 'None' | 'Custom';

interface PermissionsState {
  accounts: PermLevel;
  teams: PermLevel;
  workspaces: PermLevel;
  projects: PermLevel;
  plugins: PermLevel;
}

interface AuthoringState {
  view: boolean;
  comment: boolean;
  import: boolean;
  export: boolean;
  sync: boolean;
  contentMgmt: boolean;
}

// ─── Preset data ─────────────────────────────────────────────────────────────

const PRESETS: Record<Exclude<PresetName, 'Custom'>, { perms: PermissionsState; authoring: AuthoringState }> = {
  'Super Admin': {
    perms: { accounts: 'Admin', teams: 'Admin', workspaces: 'Admin', projects: 'Admin', plugins: 'Admin' },
    authoring: { view: true, comment: true, import: true, export: true, sync: true, contentMgmt: true },
  },
  'Owner': {
    perms: { accounts: 'Admin', teams: 'Admin', workspaces: 'Edit', projects: 'Edit', plugins: 'View' },
    authoring: { view: true, comment: true, import: true, export: true, sync: false, contentMgmt: false },
  },
  'Editor': {
    perms: { accounts: 'View', teams: 'Edit', workspaces: 'Edit', projects: 'Edit', plugins: 'View' },
    authoring: { view: true, comment: true, import: false, export: true, sync: false, contentMgmt: false },
  },
  'Viewer': {
    perms: { accounts: 'View', teams: 'View', workspaces: 'View', projects: 'View', plugins: 'View' },
    authoring: { view: true, comment: false, import: false, export: false, sync: false, contentMgmt: false },
  },
  'None': {
    perms: { accounts: 'View', teams: 'View', workspaces: 'View', projects: 'View', plugins: 'View' },
    authoring: { view: false, comment: false, import: false, export: false, sync: false, contentMgmt: false },
  },
};

const PRESET_OPTIONS: PresetName[] = ['Super Admin', 'Owner', 'Editor', 'Viewer', 'None', 'Custom'];

const PERM_ROWS: { id: keyof PermissionsState; label: string }[] = [
  { id: 'accounts', label: 'Accounts' },
  { id: 'teams', label: 'Teams' },
  { id: 'workspaces', label: 'Workspaces' },
  { id: 'projects', label: 'Projects' },
  { id: 'plugins', label: 'Plugins' },
];

const AUTHORING_ROWS: { id: keyof AuthoringState; label: string }[] = [
  { id: 'view', label: 'View' },
  { id: 'comment', label: 'Comment' },
  { id: 'import', label: 'Import' },
  { id: 'export', label: 'Export' },
  { id: 'sync', label: 'Sync' },
  { id: 'contentMgmt', label: 'Content Mgmt' },
];

const capsStyle: React.CSSProperties = { ...textStyles.caps, color: 'var(--muted-foreground)' };

// ─── Props ───────────────────────────────────────────────────────────────────

interface RolesPermissionsTrayProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: string;
  initialAccessLevel?: string;
  accountName?: string;
}

// ─── Main component ──────────────────────────────────────────────────────────

export function RolesPermissionsTray({
  isOpen,
  onClose,
  initialRole,
  initialAccessLevel,
  accountName,
}: RolesPermissionsTrayProps) {
  const resolveRole = (): RoleOption => {
    if (initialRole === 'Creator') return 'Creator';
    if (initialRole === 'Developer') return 'Developer';
    return 'Admin';
  };

  const resolvePreset = (): PresetName => {
    const valid: PresetName[] = ['Super Admin', 'Owner', 'Editor', 'Viewer', 'None'];
    return valid.includes(initialAccessLevel as PresetName)
      ? (initialAccessLevel as PresetName)
      : 'Super Admin';
  };

  const [role, setRole] = useState<RoleOption>(resolveRole);
  const [hoveredCard, setHoveredCard] = useState<RoleOption | null>(null);
  const [preset, setPreset] = useState<PresetName>(resolvePreset);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const [hoveredPreset, setHoveredPreset] = useState<PresetName | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initialPresetData = PRESETS[resolvePreset() as Exclude<PresetName, 'Custom'>];
  const [permissions, setPermissions] = useState<PermissionsState>(initialPresetData.perms);
  const [authoring, setAuthoring] = useState<AuthoringState>(initialPresetData.authoring);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const applyPreset = (name: PresetName) => {
    setPreset(name);
    setIsDropdownOpen(false);
    if (name !== 'Custom') {
      setPermissions(PRESETS[name].perms);
      setAuthoring(PRESETS[name].authoring);
    }
  };

  const setPermLevel = (row: keyof PermissionsState, level: PermLevel) => {
    setPermissions(prev => ({ ...prev, [row]: level }));
    setPreset('Custom');
  };

  const toggleAuthoring = (key: keyof AuthoringState) => {
    setAuthoring(prev => ({ ...prev, [key]: !prev[key] }));
    setPreset('Custom');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 380, opacity: 1 }}
          exit={{ width: 0, opacity: 0, transition: { width: { type: 'tween', duration: 0.22, ease: 'easeInOut' }, opacity: { duration: 0.15, ease: 'easeInOut' } } }}
          transition={{
            width: { type: 'spring', stiffness: 320, damping: 32 },
            opacity: { duration: 0.18, ease: 'easeInOut' },
          }}
          className="shrink-0 overflow-hidden hidden md:flex flex-col"
          style={{
            borderLeft: '1px solid var(--border)',
            backgroundColor: 'color-mix(in srgb, var(--background) 96%, white)',
          }}
        >
          <div className="w-full h-full flex flex-col" style={{ minWidth: '380px' }}>

            {/* ── Header ── */}
            <div
              className="shrink-0 flex items-center justify-between px-6 py-6"
              style={{}}
            >
              <div className="flex items-center gap-[10px] min-w-0">
                {accountName && (
                  <div
                    className="shrink-0 size-[32px] rounded-full flex items-center justify-center"
                    style={{ backgroundColor: ROLE_AVATAR_BG[initialRole ?? ''] ?? 'var(--primary)', color: '#fff' }}
                  >
                    <span style={{ fontFamily: 'var(--font-family)', fontSize: '12px', fontWeight: 'var(--font-weight-semibold)' }}>
                      {accountName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
                <span
                  className="truncate"
                  style={{ fontFamily: 'var(--font-family)', fontSize: '14px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', letterSpacing: 'var(--letter-spacing-md)' }}
                >
                  {accountName ?? 'Roles & Permissions'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 flex items-center justify-center size-[26px] rounded-md transition-colors"
                style={{ color: 'var(--muted-foreground)', backgroundColor: 'transparent' }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <X className="size-[13px]" strokeWidth={2.5} />
              </button>
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto">

              {/* Role section */}
              <div className="px-6 pt-5 pb-4">
                <p style={{ fontFamily: 'var(--font-family)', fontSize: '14px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', letterSpacing: 'var(--letter-spacing-md)', marginBottom: '12px' }}>
                  Role
                </p>
                <div className="flex gap-[8px]">
                  {([
                    { id: 'Creator' as RoleOption, icon: <Feather className="size-[26px]" strokeWidth={1.5} />, sub: 'Workspace\nProjects' },
                    { id: 'Developer' as RoleOption, icon: <Code2 className="size-[26px]" strokeWidth={1.5} />, sub: 'Workspace\nProjects\nPlugins' },
                    { id: 'Admin' as RoleOption, icon: <ShieldUser className="size-[26px]" strokeWidth={1.5} />, sub: 'All Access' },
                  ] as { id: RoleOption; icon: React.ReactNode; sub: string }[]).map(card => {
                    const selected = role === card.id;
                    const hovered = hoveredCard === card.id;
                    const active = selected || hovered;
                    return (
                      <button
                        key={card.id}
                        onClick={() => setRole(card.id)}
                        onMouseEnter={() => setHoveredCard(card.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="flex-1 flex flex-col items-center gap-[6px] rounded-xl py-[14px] px-[6px] transition-colors"
                        style={{
                          border: selected ? '1.5px solid var(--foreground)' : '1.5px solid var(--border)',
                          backgroundColor: selected ? 'color-mix(in srgb, var(--foreground) 8%, transparent)' : 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        <span
                          style={{
                            color: active ? 'var(--foreground)' : 'var(--muted-foreground)',
                            display: 'inline-flex',
                            transform: hovered ? 'scale(1.1)' : 'scale(1)',
                            transition: 'transform 0.25s ease-out, color 0.15s ease',
                          }}
                        >
                          {card.icon}
                        </span>
                        <span style={{ fontFamily: 'var(--font-family)', fontSize: '14px', fontWeight: 'var(--font-weight-semibold)', color: active ? 'var(--foreground)' : 'var(--muted-foreground)', letterSpacing: 'var(--letter-spacing-sm)', transition: 'color 0.15s ease' }}>
                          {card.id}
                        </span>
                        <span style={{ fontFamily: 'var(--font-family)', fontSize: '10px', fontWeight: 'var(--font-weight-regular)', color: 'var(--muted-foreground)', letterSpacing: 'var(--letter-spacing-sm)', whiteSpace: 'pre-line', textAlign: 'center', lineHeight: '1.4' }}>
                          {card.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>


              {/* Permissions section */}
              <div className="px-6 pt-5 pb-6">
                <p style={{ fontFamily: 'var(--font-family)', fontSize: '14px', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)', letterSpacing: 'var(--letter-spacing-md)', marginBottom: '12px' }}>
                  Permissions
                </p>

                {/* Preset dropdown — styled like FilterDropdown */}
                <div className="mb-5">
                  <p style={{ ...capsStyle, marginBottom: '8px' }}>Preset</p>
                  <div className="relative" ref={dropdownRef}>
                    {/* Trigger */}
                    <button
                      className="flex h-[40px] items-center w-full transition-colors"
                      style={{
                        border: `1px solid ${isDropdownHovered || isDropdownOpen ? 'var(--border-interactive-hover)' : 'var(--border-interactive)'}`,
                        borderRadius: 'var(--radius-12)',
                        paddingLeft: '16px',
                        paddingRight: '8px',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={() => setIsDropdownHovered(true)}
                      onMouseLeave={() => setIsDropdownHovered(false)}
                      onClick={() => setIsDropdownOpen(v => !v)}
                    >
                      <span
                        className="flex-1 text-left"
                        style={{
                          fontFamily: 'var(--font-family)',
                          fontWeight: 'var(--font-weight-regular)',
                          fontSize: 'var(--font-size-14)',
                          letterSpacing: 'var(--letter-spacing-md)',
                          color: isDropdownHovered || isDropdownOpen ? 'var(--foreground)' : 'var(--secondary-foreground)',
                        }}
                      >
                        {preset}
                      </span>
                      <div className="flex items-center justify-center size-[20px] shrink-0">
                        <svg
                          className="block size-[16px] transition-transform"
                          fill="none"
                          viewBox="0 0 16 16"
                          style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        >
                          <path
                            d="M4 6L8 10L12 6"
                            stroke={isDropdownHovered || isDropdownOpen ? 'var(--foreground)' : 'var(--muted-foreground)'}
                            strokeLinecap="square"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          className="absolute left-0 right-0 bg-background shadow-lg p-[8px]"
                          style={{
                            border: '1px solid var(--border-interactive-hover)',
                            borderRadius: 'var(--radius-16)',
                            top: '48px',
                            zIndex: 100,
                            transformOrigin: 'top center',
                          }}
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          exit={{ opacity: 0, scaleY: 0 }}
                          transition={{ duration: 0.25, type: 'spring', stiffness: 400, damping: 25 }}
                        >
                          {PRESET_OPTIONS.map(option => (
                            <button
                              key={option}
                              onClick={() => applyPreset(option)}
                              onMouseEnter={() => setHoveredPreset(option)}
                              onMouseLeave={() => setHoveredPreset(null)}
                              className="w-full flex items-center justify-between px-[12px] py-[10px] rounded-xl transition-colors"
                              style={{ backgroundColor: hoveredPreset === option ? 'var(--muted)' : 'transparent', cursor: 'pointer' }}
                            >
                              <span
                                style={{
                                  fontFamily: 'var(--font-family)',
                                  fontWeight: 'var(--font-weight-regular)',
                                  fontSize: 'var(--font-size-14)',
                                  lineHeight: 'var(--line-height-20)',
                                  color: hoveredPreset === option ? 'var(--primary)' : 'var(--foreground)',
                                }}
                              >
                                {option}
                              </span>
                              {preset === option && (
                                <Check className="size-[16px] shrink-0 ml-[8px]" style={{ color: 'var(--primary)' }} strokeWidth={2} />
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Permission matrix */}
                <div className="mb-5">
                  <div className="flex items-center mb-[6px]" style={{ paddingLeft: '108px' }}>
                    {(['View', 'Edit', 'Admin'] as PermLevel[]).map(col => (
                      <div key={col} className="flex-1 text-center" style={{ fontFamily: 'var(--font-family)', fontSize: '11px', fontWeight: 'var(--font-weight-medium)', color: 'var(--muted-foreground)', letterSpacing: 'var(--letter-spacing-sm)' }}>
                        {col}
                      </div>
                    ))}
                  </div>
                  {PERM_ROWS.map((row, i) => (
                    <div
                      key={row.id}
                      className="flex items-center py-[14px]"
                      style={{ borderBottom: i < PERM_ROWS.length - 1 ? '1px solid var(--border)' : 'none' }}
                    >
                      <span className="shrink-0" style={{ ...capsStyle, width: '108px' }}>
                        {row.label}
                      </span>
                      {(['View', 'Edit', 'Admin'] as PermLevel[]).map(level => (
                        <div key={level} className="flex-1 flex items-center justify-center">
                          <RadioCircle
                            checked={permissions[row.id] === level}
                            onClick={() => setPermLevel(row.id, level)}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Authoring toggles — label mirrors 108px, toggle sits in the Admin column position */}
                <div className="flex flex-col">
                  {AUTHORING_ROWS.map((row, i) => (
                    <div
                      key={row.id}
                      className="flex items-center py-[14px]"
                      style={{ borderBottom: i < AUTHORING_ROWS.length - 1 ? '1px solid var(--border)' : 'none' }}
                    >
                      <span className="shrink-0" style={{ ...capsStyle, width: '108px' }}>{row.label}</span>
                      <div style={{ flex: 2 }} />
                      <div style={{ flex: 1 }} className="flex items-center justify-center">
                        <Toggle on={authoring[row.id]} onChange={() => toggleAuthoring(row.id)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Footer ── */}
            <div
              className="shrink-0 flex items-center justify-between px-6 py-6"
              style={{}}
            >
              <Button variant="text">Save as Preset</Button>
              <Button variant="text" onClick={onClose}>Finish</Button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── RadioCircle ─────────────────────────────────────────────────────────────

function RadioCircle({ checked, onClick }: { checked: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="size-[22px] rounded-full flex items-center justify-center transition-colors shrink-0"
      style={{
        border: `1.5px solid ${checked ? 'var(--border-interactive-hover)' : hovered ? 'var(--border-interactive-hover)' : 'var(--border-interactive)'}`,
        backgroundColor: checked ? 'var(--muted-foreground)' : 'transparent',
        cursor: 'pointer',
      }}
    >
      {checked && <Check className="size-[11px]" style={{ color: 'var(--background)' }} strokeWidth={3} />}
    </button>
  );
}

// ─── Toggle ──────────────────────────────────────────────────────────────────

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onChange}
      className="relative shrink-0 transition-colors"
      style={{
        width: '36px',
        height: '20px',
        borderRadius: '10px',
        backgroundColor: on ? 'var(--muted-foreground)' : 'var(--border-interactive)',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <span
        className="absolute top-[3px] transition-transform"
        style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: on ? 'var(--background)' : 'var(--muted-foreground)',
          left: '3px',
          transform: on ? 'translateX(16px)' : 'translateX(0)',
        }}
      />
    </button>
  );
}
