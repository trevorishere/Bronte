import { BaseIcon, IconText, IconSize } from './BaseIcon';

interface WorkspaceIconProps {
  name: string;
  size?: IconSize;
}

export const getWorkspaceInitials = (name: string): string => {
  const firstWord = name.trim().split(' ')[0];
  return firstWord.substring(0, 2).toUpperCase();
};

export function WorkspaceIcon({ name, size = 'medium' }: WorkspaceIconProps) {
  const initials = getWorkspaceInitials(name);
  return (
    <BaseIcon size={size} backgroundColor="var(--icon-workspace-bg)" borderRadius="rounded">
      <IconText text={initials} size={size} color="white" />
    </BaseIcon>
  );
}
