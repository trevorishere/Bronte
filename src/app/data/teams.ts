export interface Team {
  id: string;
  name: string;
  membersCount: number;
  owner: string;
  created: string;
}

export const teams: Team[] = [
  { id: 'team-1', name: 'Chemistry Research Group', membersCount: 12, owner: 'Alice Johnson', created: 'Jan 5, 2023' },
  { id: 'team-2', name: 'Mathematics Department', membersCount: 8, owner: 'Bob Smith', created: 'Feb 14, 2023' },
  { id: 'team-3', name: 'Physics Lab Team', membersCount: 15, owner: 'Carol Davis', created: 'Mar 22, 2023' },
  { id: 'team-4', name: 'Biology Research Unit', membersCount: 10, owner: 'David Wilson', created: 'Apr 8, 2023' },
  { id: 'team-5', name: 'Organic Chemistry Lab', membersCount: 6, owner: 'Emma Brown', created: 'May 17, 2023' },
  { id: 'team-6', name: 'Applied Mathematics', membersCount: 9, owner: 'Frank Miller', created: 'Jun 25, 2023' },
  { id: 'team-7', name: 'Quantum Physics Group', membersCount: 7, owner: 'Grace Lee', created: 'Jul 30, 2023' },
  { id: 'team-8', name: 'Molecular Biology Team', membersCount: 11, owner: 'Henry Taylor', created: 'Aug 12, 2023' },
  { id: 'team-9', name: 'Biochemistry Research', membersCount: 13, owner: 'Ivy Chen', created: 'Sep 19, 2023' },
  { id: 'team-10', name: 'Theoretical Physics', membersCount: 5, owner: 'Jack Anderson', created: 'Oct 3, 2023' },
  { id: 'team-11', name: 'Cell Biology Lab', membersCount: 8, owner: 'Karen White', created: 'Nov 11, 2023' },
  { id: 'team-12', name: 'Statistics & Data Science', membersCount: 14, owner: 'Liam Martinez', created: 'Dec 6, 2023' },
  { id: 'team-13', name: 'Astrophysics Research', membersCount: 6, owner: 'Mia Robinson', created: 'Jan 18, 2024' },
  { id: 'team-14', name: 'Genetics Lab', membersCount: 10, owner: 'Noah Clark', created: 'Feb 22, 2024' },
  { id: 'team-15', name: 'Calculus Teaching Team', membersCount: 4, owner: 'Olivia Lewis', created: 'Mar 15, 2024' },
];
