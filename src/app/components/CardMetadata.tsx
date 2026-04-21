import { RoleBadge, Role } from './Avatar';
import { textStyles } from '../utils/textStyles';

export interface CardMetadataItem {
  iconType?: string;
  owner?: string;
  role?: string;
  accessLevel?: string;
  membersCount?: number;
  workspaceProjectCount?: number;
  workspaceMemberCount?: number;
  accountCount?: number;
}

interface CardMetadataProps {
  item: CardMetadataItem;
  /** Tailwind text-size class applied to metadata lines. Defaults to 'text-[12px]'. */
  metaClassName?: string;
}

export function CardMetadata({ item, metaClassName = 'text-[12px]' }: CardMetadataProps) {
  if (item.iconType === 'account' && item.role) {
    return (
      <div className="flex flex-col gap-[3px]">
        <RoleBadge role={item.role as Role} compact />
        {item.accessLevel && (
          <span className={metaClassName} style={textStyles.cardMeta}>{item.accessLevel}</span>
        )}
      </div>
    );
  }

  if (item.iconType === 'team') {
    return (
      <div className="flex flex-col">
        {item.owner && <p className={metaClassName} style={textStyles.cardMetaSemibold}>{item.owner}</p>}
        {item.membersCount != null && (
          <p className={metaClassName} style={textStyles.cardMeta}>
            {item.membersCount} {item.membersCount === 1 ? 'Member' : 'Members'}
          </p>
        )}
      </div>
    );
  }

  if (item.iconType === 'workspace') {
    return (
      <div className="flex flex-col">
        {item.workspaceProjectCount != null && (
          <p className={metaClassName} style={textStyles.cardMetaSemibold}>
            {item.workspaceProjectCount} {item.workspaceProjectCount === 1 ? 'Project' : 'Projects'}
          </p>
        )}
        {item.workspaceMemberCount != null && (
          <p className={metaClassName} style={textStyles.cardMeta}>
            {item.workspaceMemberCount} {item.workspaceMemberCount === 1 ? 'Member' : 'Members'}
          </p>
        )}
      </div>
    );
  }

  // project (default)
  return (
    <div className="flex flex-col">
      {item.owner && <p className={metaClassName} style={textStyles.cardMetaSemibold}>{item.owner}</p>}
      {item.accountCount != null && (
        <p className={metaClassName} style={textStyles.cardMeta}>
          {item.accountCount} {item.accountCount === 1 ? 'Member' : 'Members'}
        </p>
      )}
    </div>
  );
}
