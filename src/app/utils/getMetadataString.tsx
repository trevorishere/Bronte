import React from 'react';

export function getMetadataString(
  item: {
    iconType?: string;
    owner?: string;
    sharedBy?: string;
    role?: string;
    accessLevel?: string;
    members?: number;
    membersCount?: number;
    accountCount?: number;
    teamProjectCount?: number;
    workspaceProjectCount?: number;
    workspaceMemberCount?: number;
  },
  style?: React.CSSProperties
): React.ReactNode {
  const iconType = item.iconType || 'project';

  if (iconType === 'account') {
    const role = item.role || '';
    const accessLevel = item.accessLevel || '';
    const text = role && accessLevel ? `${role} • ${accessLevel}` : role || accessLevel || null;
    if (!text) return null;
    return style ? <span style={style}>{text}</span> : text;
  }

  if (iconType === 'team') {
    const members = item.members ?? item.membersCount;
    const memberStr = members !== undefined ? `${members} Account${members !== 1 ? 's' : ''}` : null;
    const projCount = item.teamProjectCount;
    const projStr = projCount !== undefined ? `${projCount} Project${projCount !== 1 ? 's' : ''}` : null;
    const text = [memberStr, projStr].filter(Boolean).join(' • ') || null;
    if (!text) return null;
    return style ? <span style={style}>{text}</span> : text;
  }

  if (iconType === 'workspace') {
    const projCount = item.workspaceProjectCount;
    const memberCount = item.workspaceMemberCount;
    const projStr = projCount !== undefined ? `${projCount} Project${projCount !== 1 ? 's' : ''}` : null;
    const memberStr = memberCount !== undefined ? `${memberCount} Account${memberCount !== 1 ? 's' : ''}` : null;
    const text = [projStr, memberStr].filter(Boolean).join(' • ') || null;
    if (!text) return null;
    return style ? <span style={style}>{text}</span> : text;
  }

  // project (default)
  const accCount = item.accountCount;
  const accStr = accCount !== undefined ? `${accCount} Account${accCount !== 1 ? 's' : ''}` : null;
  const owner = item.owner || item.sharedBy || null;
  const text = [accStr, owner].filter(Boolean).join(' • ') || null;
  if (!text) return null;
  return style ? <span style={style}>{text}</span> : text;
}
