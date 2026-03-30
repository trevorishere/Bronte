import { BaseIcon, IconText, IconSize } from './BaseIcon';

interface AvatarProps {
  name: string;
  role?: 'Admin' | 'Owner' | 'Manager' | 'Creator' | 'Viewer' | 'Member' | 'Developer' | 'Editor';
  size?: IconSize;
}

// Role color mapping based on Figma imports
export const roleColors = {
  Admin: { bg: '#934790', text: '#934790', badge: 'rgba(147,71,144,0.1)' },
  Owner: { bg: '#7669aa', text: '#7669aa', badge: 'rgba(118,105,170,0.1)' },
  Manager: { bg: '#ac4e4f', text: '#ac4e4f', badge: 'rgba(172,78,79,0.1)' },
  Creator: { bg: '#5165b5', text: '#5165b5', badge: 'rgba(81,101,181,0.1)' },
  Viewer: { bg: '#4b8f6c', text: '#4b8f6c', badge: 'rgba(75,143,108,0.1)' },
  Member: { bg: '#ac9445', text: '#ac9445', badge: 'rgba(172,148,69,0.1)' },
  Developer: { bg: '#b97930', text: '#b97930', badge: 'rgba(185,121,48,0.1)' },
  Editor: { bg: '#39869c', text: '#39869c', badge: 'rgba(57,134,156,0.1)' },
};

export function Avatar({ name, role = 'Viewer', size = 'medium' }: AvatarProps) {
  // Get initials from name (first letter of first and last name)
  const getInitials = (fullName: string): string => {
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(name);
  const colors = roleColors[role];

  return (
    <BaseIcon
      size={size}
      backgroundColor={colors.bg}
      borderRadius="round"
    >
      <IconText text={initials} size={size} color="white" />
    </BaseIcon>
  );
}

interface RoleBadgeProps {
  role: 'Admin' | 'Owner' | 'Manager' | 'Creator' | 'Viewer' | 'Member' | 'Developer' | 'Editor';
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const colors = roleColors[role];

  return (
    <div 
      className="flex gap-[4px] items-center py-[8px] px-[14px] rounded-[16px]"
      style={{ backgroundColor: colors.badge }}
    >
      <div 
        className="flex flex-col font-medium justify-center leading-none not-italic relative shrink-0 text-[14px] whitespace-nowrap"
        style={{ 
          fontFamily: 'var(--font-family)',
          color: colors.text,
          letterSpacing: '0.14px'
        }}
      >
        <p className="leading-none">{role}</p>
      </div>
    </div>
  );
}