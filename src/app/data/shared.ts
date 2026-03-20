// Shared projects - projects shared by other users
export interface SharedProject {
  id: string;
  name: string;
  owner: string;
  sharedBy: string;
  dateShared: string;
  lastModified: string;
  workspace: string;
}

export const sharedProjects: SharedProject[] = [
  { 
    id: 's1', 
    name: 'Calculus, 14th Edition', 
    owner: 'Carol Davis', 
    sharedBy: 'Carol Davis',
    dateShared: 'Mar 10, 2026',
    lastModified: 'Mar 15, 2026', 
    workspace: 'math' 
  },
  { 
    id: 's2', 
    name: 'Biochemistry, 9th Edition', 
    owner: 'Bob Smith', 
    sharedBy: 'Bob Smith',
    dateShared: 'Mar 8, 2026',
    lastModified: 'Mar 14, 2026', 
    workspace: 'chemistry' 
  },
  { 
    id: 's3', 
    name: 'Microeconomics, 13th Edition', 
    owner: 'Emma Brown', 
    sharedBy: 'Emma Brown',
    dateShared: 'Mar 5, 2026',
    lastModified: 'Mar 12, 2026', 
    workspace: 'economics' 
  },
  { 
    id: 's4', 
    name: 'Financial Accounting, 11th Edition', 
    owner: 'David Wilson', 
    sharedBy: 'David Wilson',
    dateShared: 'Mar 1, 2026',
    lastModified: 'Mar 11, 2026', 
    workspace: 'business' 
  },
  { 
    id: 's5', 
    name: 'Physics for Scientists and Engineers, 4th Edition', 
    owner: 'David Wilson', 
    sharedBy: 'David Wilson',
    dateShared: 'Feb 28, 2026',
    lastModified: 'Mar 10, 2026', 
    workspace: 'math' 
  },
  { 
    id: 's6', 
    name: 'Organic Chemistry, 10th Edition', 
    owner: 'David Wilson', 
    sharedBy: 'David Wilson',
    dateShared: 'Feb 25, 2026',
    lastModified: 'Mar 8, 2026', 
    workspace: 'chemistry' 
  },
  { 
    id: 's7', 
    name: 'Marketing Management, 16th Edition', 
    owner: 'Grace Lee', 
    sharedBy: 'Grace Lee',
    dateShared: 'Feb 20, 2026',
    lastModified: 'Mar 5, 2026', 
    workspace: 'business' 
  },
  { 
    id: 's8', 
    name: 'Macroeconomics, 12th Edition', 
    owner: 'Frank Miller', 
    sharedBy: 'Frank Miller',
    dateShared: 'Feb 15, 2026',
    lastModified: 'Mar 1, 2026', 
    workspace: 'economics' 
  },
];
