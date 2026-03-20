export type AccessLevel = 'Super Admin' | 'Owner' | 'Editor' | 'Viewer' | 'None';

export interface Account {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Owner' | 'Manager' | 'Creator' | 'Viewer' | 'Member' | 'Developer' | 'Editor';
  accessLevel: AccessLevel;
  lastLogin: string;
  created: string;
  projectIds: string[];
  teamIds: string[];
  workspaceIds: string[];
}

export const accounts: Account[] = [
  { id: 'acc-1', name: 'Alice Johnson', email: 'alice.johnson@university.edu', role: 'Admin', accessLevel: 'Super Admin', lastLogin: 'Mar 16, 2026', created: 'Jan 5, 2024', projectIds: ['1', '2', '5', '8', '12', '15', '20', '25', '30', '35', '40', '45'], teamIds: ['team-1', 'team-4', 'team-7'], workspaceIds: ['chemistry', 'math'] },
  { id: 'acc-2', name: 'Bob Smith', email: 'bob.smith@university.edu', role: 'Owner', accessLevel: 'Owner', lastLogin: 'Mar 17, 2026', created: 'Jan 8, 2024', projectIds: ['2', '3', '6', '10', '14', '18', '22', '28', '32', '38'], teamIds: ['team-2', 'team-5', 'team-8'], workspaceIds: ['math', 'business'] },
  { id: 'acc-3', name: 'Carol Davis', email: 'carol.davis@university.edu', role: 'Manager', accessLevel: 'Editor', lastLogin: 'Mar 15, 2026', created: 'Jan 12, 2024', projectIds: ['3', '7', '11', '16', '21', '26', '33'], teamIds: ['team-3', 'team-6'], workspaceIds: ['business', 'economics'] },
  { id: 'acc-4', name: 'David Wilson', email: 'david.wilson@university.edu', role: 'Creator', accessLevel: 'Editor', lastLogin: 'Mar 17, 2026', created: 'Jan 15, 2024', projectIds: ['4', '9', '13', '19', '24', '29', '36', '42'], teamIds: ['team-4', 'team-9'], workspaceIds: ['chemistry', 'economics'] },
  { id: 'acc-5', name: 'Emma Brown', email: 'emma.brown@university.edu', role: 'Viewer', accessLevel: 'Viewer', lastLogin: 'Mar 14, 2026', created: 'Jan 20, 2024', projectIds: ['5', '10', '15', '20', '27', '34'], teamIds: ['team-5', 'team-10'], workspaceIds: ['chemistry', 'math'] },
  { id: 'acc-6', name: 'Frank Miller', email: 'frank.miller@university.edu', role: 'Member', accessLevel: 'Viewer', lastLogin: 'Mar 16, 2026', created: 'Jan 25, 2024', projectIds: ['6', '12', '17', '23', '31', '37'], teamIds: ['team-6', 'team-11'], workspaceIds: ['math', 'business'] },
  { id: 'acc-7', name: 'Grace Lee', email: 'grace.lee@university.edu', role: 'Developer', accessLevel: 'Editor', lastLogin: 'Mar 13, 2026', created: 'Feb 1, 2024', projectIds: ['7', '14', '22', '28'], teamIds: ['team-7'], workspaceIds: ['chemistry'] },
  { id: 'acc-8', name: 'Henry Taylor', email: 'henry.taylor@university.edu', role: 'Editor', accessLevel: 'Editor', lastLogin: 'Mar 17, 2026', created: 'Feb 5, 2024', projectIds: ['8', '16', '25', '35', '43'], teamIds: ['team-8'], workspaceIds: ['math', 'economics'] },
  { id: 'acc-9', name: 'Ivy Chen', email: 'ivy.chen@university.edu', role: 'Admin', accessLevel: 'Super Admin', lastLogin: 'Mar 12, 2026', created: 'Feb 10, 2024', projectIds: ['9', '18', '26', '32', '39'], teamIds: ['team-9', 'team-12'], workspaceIds: ['business', 'economics'] },
  { id: 'acc-10', name: 'Jack Anderson', email: 'jack.anderson@university.edu', role: 'Owner', accessLevel: 'Owner', lastLogin: 'Mar 16, 2026', created: 'Feb 15, 2024', projectIds: ['10', '19', '30'], teamIds: ['team-10'], workspaceIds: ['chemistry'] },
  { id: 'acc-11', name: 'Karen White', email: 'karen.white@university.edu', role: 'Manager', accessLevel: 'Editor', lastLogin: 'Mar 15, 2026', created: 'Feb 20, 2024', projectIds: ['11', '20', '27', '36', '44'], teamIds: ['team-11', 'team-13'], workspaceIds: ['math', 'business'] },
  { id: 'acc-12', name: 'Liam Martinez', email: 'liam.martinez@university.edu', role: 'Creator', accessLevel: 'Editor', lastLogin: 'Mar 14, 2026', created: 'Feb 25, 2024', projectIds: ['12', '23', '33'], teamIds: ['team-12'], workspaceIds: ['business'] },
  { id: 'acc-13', name: 'Mia Robinson', email: 'mia.robinson@university.edu', role: 'Viewer', accessLevel: 'Viewer', lastLogin: 'Mar 17, 2026', created: 'Mar 1, 2024', projectIds: ['13', '24', '34'], teamIds: ['team-13'], workspaceIds: ['economics'] },
  { id: 'acc-14', name: 'Noah Clark', email: 'noah.clark@university.edu', role: 'Member', accessLevel: 'Viewer', lastLogin: 'Mar 11, 2026', created: 'Mar 5, 2024', projectIds: ['14', '21', '29', '38', '46'], teamIds: ['team-14'], workspaceIds: ['chemistry', 'math'] },
  { id: 'acc-15', name: 'Olivia Lewis', email: 'olivia.lewis@university.edu', role: 'Developer', accessLevel: 'Editor', lastLogin: 'Mar 16, 2026', created: 'Mar 10, 2024', projectIds: ['15', '28', '37'], teamIds: ['team-15'], workspaceIds: ['business'] },
  { id: 'acc-16', name: 'Paul Walker', email: 'paul.walker@university.edu', role: 'Editor', accessLevel: 'Editor', lastLogin: 'Mar 13, 2026', created: 'Mar 15, 2024', projectIds: ['16', '31'], teamIds: [], workspaceIds: ['chemistry'] },
  { id: 'acc-17', name: 'Quinn Harris', email: 'quinn.harris@university.edu', role: 'Admin', accessLevel: 'Super Admin', lastLogin: 'Mar 15, 2026', created: 'Mar 20, 2024', projectIds: ['17', '26', '35', '41'], teamIds: ['team-2', 'team-8'], workspaceIds: ['math', 'economics'] },
  { id: 'acc-18', name: 'Rachel Green', email: 'rachel.green@university.edu', role: 'Owner', accessLevel: 'Owner', lastLogin: 'Mar 17, 2026', created: 'Mar 25, 2024', projectIds: ['18', '32'], teamIds: [], workspaceIds: ['business'] },
  { id: 'acc-19', name: 'Sam Turner', email: 'sam.turner@university.edu', role: 'Manager', accessLevel: 'Editor', lastLogin: 'Mar 12, 2026', created: 'Apr 1, 2024', projectIds: ['19', '39'], teamIds: [], workspaceIds: ['economics'] },
  { id: 'acc-20', name: 'Tina Brooks', email: 'tina.brooks@university.edu', role: 'Creator', accessLevel: 'Editor', lastLogin: 'Mar 16, 2026', created: 'Apr 5, 2024', projectIds: ['20', '27', '40', '45', '50'], teamIds: ['team-5', 'team-11'], workspaceIds: ['chemistry', 'math', 'business'] },
];