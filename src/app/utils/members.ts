import { accounts } from '../data/accounts';
import type { RowData } from '../components/DataTable';
import type { CurrentMember } from '../components/ShareModal';

/** Prepend the owner account to a member list if they are not already present. */
function withOwner(list: CurrentMember[], ownerName: string | undefined): CurrentMember[] {
  if (!ownerName) return list;
  if (list.some(m => m.name === ownerName)) return list;
  const ownerAccount = accounts.find(a => a.name === ownerName);
  if (!ownerAccount) return list;
  return [{ id: ownerAccount.id, name: ownerAccount.name, role: ownerAccount.role }, ...list];
}

/**
 * Returns the list of members associated with any row type (project, team, workspace, account).
 * The owner is always included as the first entry.
 */
export function getMembersForRow(row: RowData): CurrentMember[] {
  const id = String(row.id);
  const ownerName = row.owner ? String(row.owner) : undefined;

  if (row.iconType === 'project')
    return withOwner(
      accounts.filter(a => a.projectIds.includes(id)).map(a => ({ id: a.id, name: a.name, role: a.role })),
      ownerName
    );
  if (row.iconType === 'team')
    return withOwner(
      accounts.filter(a => a.teamIds.includes(id)).map(a => ({ id: a.id, name: a.name, role: a.role })),
      ownerName
    );
  if (row.iconType === 'workspace')
    return withOwner(
      accounts.filter(a => a.workspaceIds.includes(id)).map(a => ({ id: a.id, name: a.name, role: a.role })),
      ownerName
    );
  if (row.iconType === 'account')
    return accounts.filter(a => a.teamIds.includes(id)).map(a => ({ id: a.id, name: a.name, role: a.role }));
  return [];
}

/**
 * Returns the member list for a project, team, or workspace by explicit params.
 * Use this when a full RowData object isn't available (e.g. page-level entity shares).
 * The owner is always included.
 */
export function getMembersForEntity(
  iconType: 'project' | 'team' | 'workspace',
  id: string,
  ownerName?: string
): CurrentMember[] {
  const list =
    iconType === 'project'   ? accounts.filter(a => a.projectIds.includes(id)) :
    iconType === 'team'      ? accounts.filter(a => a.teamIds.includes(id)) :
                               accounts.filter(a => a.workspaceIds.includes(id));
  return withOwner(
    list.map(a => ({ id: a.id, name: a.name, role: a.role })),
    ownerName
  );
}

/**
 * Returns the member count for a project, team, or workspace, always counting the owner.
 * Use this for table `accountCount` / `membersCount` fields.
 */
export function countMembers(
  iconType: 'project' | 'team' | 'workspace',
  id: string,
  ownerName?: string
): number {
  const list =
    iconType === 'project'   ? accounts.filter(a => a.projectIds.includes(id)) :
    iconType === 'team'      ? accounts.filter(a => a.teamIds.includes(id)) :
                               accounts.filter(a => a.workspaceIds.includes(id));
  const alreadyIncluded = ownerName ? list.some(a => a.name === ownerName) : true;
  return list.length + (alreadyIncluded ? 0 : 1);
}
