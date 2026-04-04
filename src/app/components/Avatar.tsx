import { ShieldCheck, Code2, PenLine } from 'lucide-react';
import { BaseIcon, IconText, IconSize } from './BaseIcon';

export type Role = 'Admin' | 'Developer' | 'Creator';

interface AvatarProps {
  name: string;
  role?: Role;
  size?: IconSize;
}

// Role color mapping — 3 canonical roles
export const roleColors: Record<Role, { bg: string; border: string; rgba: string }> = {
  Admin:     { bg: '#934790', border: '#934790', rgba: 'rgba(147,71,144,0.3)' },
  Developer: { bg: '#ce5b29', border: '#ce5b29', rgba: 'rgba(206,91,41,0.3)' },
  Creator:   { bg: '#068aaf', border: '#068aaf', rgba: 'rgba(6,138,175,0.3)' },
};

const roleIcons: Record<Role, React.ReactNode> = {
  Admin:     <ShieldCheck className="size-[14px] shrink-0" strokeWidth={2} />,
  Developer: <Code2      className="size-[14px] shrink-0" strokeWidth={2} />,
  Creator:   <PenLine    className="size-[14px] shrink-0" strokeWidth={2} />,
};

export function Avatar({ name, role = 'Creator', size = 'medium' }: AvatarProps) {
  const getInitials = (fullName: string): string => {
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(name);
  const colors = roleColors[role];

  return (
    <BaseIcon
      size={size}
      backgroundColor={colors.bg}
      borderRadius="round"
      className="role-color"
    >
      <IconText text={initials} size={size} color="white" />
    </BaseIcon>
  );
}

interface RoleBadgeProps {
  role: Role;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const colors = roleColors[role];
  const icon = roleIcons[role];

  return (
    <div
      className="inline-flex items-center gap-[6px] h-[28px] pl-[8px] pr-[12px] rounded-[8px] shrink-0"
      style={{
        backgroundColor: colors.rgba,
        border: `1px solid ${colors.border}`,
      }}
    >
      <span style={{ color: 'white', opacity: 0.7, display: 'flex', alignItems: 'center' }}>
        {icon}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-medium)',
          fontSize: '14px',
          letterSpacing: '0.3px',
          color: 'white',
          opacity: 0.7,
          whiteSpace: 'nowrap',
          lineHeight: 'normal',
        }}
      >
        {role}
      </span>
    </div>
  );
}
