// Workspaces array
export const workspaces = [
  { id: 'chemistry', name: 'Chemistry & Life Sciences', icon: 'CH', type: 'Team', owner: 'Alice Johnson', created: 'Jan 15, 2024' },
  { id: 'math', name: 'Math & Engineering', icon: 'MA', type: 'Team', owner: 'Bob Smith', created: 'Feb 20, 2024' },
  { id: 'business', name: 'Business Fundamentals', icon: 'BU', type: 'Team', owner: 'Carol Davis', created: 'Mar 10, 2024' },
  { id: 'economics', name: 'Economics & Policy', icon: 'EC', type: 'Team', owner: 'David Wilson', created: 'Apr 5, 2024' },
];

// Projects array with 64 projects
export interface Project {
  id: string;
  name: string;
  owner: string;
  dateCreated: string;
  lastModified: string;
  workspace: string;
}

export const projects: Project[] = [
  // Chemistry & Life Sciences (20 projects)
  { id: '1', name: 'Anatomy & Physiology: The Unity of Form and Function', owner: 'Alice Johnson', dateCreated: 'May 12, 2024', lastModified: 'Jun 3, 2024', workspace: 'chemistry' },
  { id: '2', name: 'Biochemistry, 9th Edition', owner: 'Bob Smith', dateCreated: 'Jun 1, 2024', lastModified: 'Aug 15, 2024', workspace: 'chemistry' },
  { id: '3', name: 'Microbiology: An Introduction, 13th Edition', owner: 'Carol Davis', dateCreated: 'Jun 5, 2024', lastModified: 'Sep 10, 2024', workspace: 'chemistry' },
  { id: '4', name: 'Organic Chemistry, 10th Edition', owner: 'David Wilson', dateCreated: 'Jun 8, 2024', lastModified: 'Oct 15, 2024', workspace: 'chemistry' },
  { id: '5', name: 'General Chemistry, 11th Edition', owner: 'Emma Brown', dateCreated: 'Jul 10, 2024', lastModified: 'Nov 22, 2024', workspace: 'chemistry' },
  { id: '6', name: 'Essential Cell Biology, 5th Edition', owner: 'Frank Miller', dateCreated: 'Jul 12, 2024', lastModified: 'Dec 5, 2024', workspace: 'chemistry' },
  { id: '7', name: 'Principles of Genetics, 8th Edition', owner: 'Grace Lee', dateCreated: 'Aug 15, 2024', lastModified: 'Jan 8, 2025', workspace: 'chemistry' },
  { id: '8', name: 'Human Anatomy & Physiology, 11th Edition', owner: 'Henry Taylor', dateCreated: 'Aug 18, 2024', lastModified: 'Jan 15, 2025', workspace: 'chemistry' },
  { id: '9', name: 'Molecular Biology of the Cell, 7th Edition', owner: 'Ivy Chen', dateCreated: 'Sep 20, 2024', lastModified: 'Feb 10, 2025', workspace: 'chemistry' },
  { id: '10', name: 'Lehninger Principles of Biochemistry, 8th Edition', owner: 'Jack Anderson', dateCreated: 'Sep 22, 2024', lastModified: 'Feb 16, 2025', workspace: 'chemistry' },
  { id: '11', name: 'Campbell Biology, 12th Edition', owner: 'Karen White', dateCreated: 'Oct 28, 2024', lastModified: 'Mar 5, 2025', workspace: 'chemistry' },
  { id: '12', name: 'Brock Biology of Microorganisms, 15th Edition', owner: 'Liam Martinez', dateCreated: 'Nov 2, 2024', lastModified: 'Mar 10, 2025', workspace: 'chemistry' },
  { id: '13', name: 'Introduction to Genetic Analysis, 12th Edition', owner: 'Mia Robinson', dateCreated: 'Nov 4, 2024', lastModified: 'Jan 19, 2026', workspace: 'chemistry' },
  { id: '14', name: 'Physical Chemistry for the Life Sciences, 3rd Edition', owner: 'Noah Clark', dateCreated: 'Dec 6, 2024', lastModified: 'Feb 20, 2026', workspace: 'chemistry' },
  { id: '15', name: 'Neuroscience: Exploring the Brain, 4th Edition', owner: 'Olivia Lewis', dateCreated: 'Dec 8, 2024', lastModified: 'Mar 1, 2026', workspace: 'chemistry' },
  { id: '16', name: 'Immunobiology: The Immune System, 9th Edition', owner: 'Paul Walker', dateCreated: 'Jan 10, 2025', lastModified: 'Mar 5, 2026', workspace: 'chemistry' },
  { id: '17', name: 'Pharmacology for Nurses, 5th Edition', owner: 'Quinn Harris', dateCreated: 'Jan 12, 2025', lastModified: 'Mar 8, 2026', workspace: 'chemistry' },
  { id: '18', name: 'Medical Microbiology, 9th Edition', owner: 'Rachel Green', dateCreated: 'Feb 14, 2025', lastModified: 'Mar 10, 2026', workspace: 'chemistry' },
  { id: '19', name: 'Pathophysiology: The Biologic Basis for Disease', owner: 'Sam Turner', dateCreated: 'Feb 16, 2025', lastModified: 'Mar 12, 2026', workspace: 'chemistry' },
  { id: '20', name: 'Essentials of Glycobiology, 4th Edition', owner: 'Tina Brooks', dateCreated: 'Feb 18, 2025', lastModified: 'Mar 14, 2026', workspace: 'chemistry' },

  // Math & Engineering (18 projects)
  { id: '21', name: 'Fundamentals of Differential Equations, 10th Edition', owner: 'Alice Johnson', dateCreated: 'Apr 5, 2024', lastModified: 'Jul 15, 2024', workspace: 'math' },
  { id: '22', name: 'Precalculus, 11th Edition', owner: 'Bob Smith', dateCreated: 'Apr 10, 2024', lastModified: 'Aug 20, 2024', workspace: 'math' },
  { id: '23', name: 'Calculus, 14th Edition', owner: 'Carol Davis', dateCreated: 'May 15, 2024', lastModified: 'Sep 25, 2024', workspace: 'math' },
  { id: '24', name: 'Physics for Scientists and Engineers, 4th Edition', owner: 'David Wilson', dateCreated: 'May 20, 2024', lastModified: 'Oct 10, 2024', workspace: 'math' },
  { id: '25', name: 'Introduction to Chemical Engineering, 8th Edition', owner: 'Emma Brown', dateCreated: 'Jun 22, 2024', lastModified: 'Nov 5, 2024', workspace: 'math' },
  { id: '26', name: 'Linear Algebra and Its Applications, 6th Edition', owner: 'Frank Miller', dateCreated: 'Jul 25, 2024', lastModified: 'Dec 16, 2024', workspace: 'math' },
  { id: '27', name: 'Discrete Mathematics and Its Applications, 8th Edition', owner: 'Grace Lee', dateCreated: 'Aug 28, 2024', lastModified: 'Jan 17, 2025', workspace: 'math' },
  { id: '28', name: 'Engineering Mechanics: Dynamics, 9th Edition', owner: 'Henry Taylor', dateCreated: 'Sep 1, 2024', lastModified: 'Jan 18, 2025', workspace: 'math' },
  { id: '29', name: 'Thermodynamics: An Engineering Approach, 9th Edition', owner: 'Ivy Chen', dateCreated: 'Sep 3, 2024', lastModified: 'Feb 19, 2025', workspace: 'math' },
  { id: '30', name: 'Signals and Systems, 2nd Edition', owner: 'Jack Anderson', dateCreated: 'Oct 5, 2024', lastModified: 'Feb 20, 2025', workspace: 'math' },
  { id: '31', name: 'Introduction to Algorithms, 4th Edition', owner: 'Karen White', dateCreated: 'Oct 8, 2024', lastModified: 'Mar 1, 2025', workspace: 'math' },
  { id: '32', name: 'Probability and Statistics for Engineers, 6th Edition', owner: 'Liam Martinez', dateCreated: 'Nov 10, 2024', lastModified: 'Mar 2, 2025', workspace: 'math' },
  { id: '33', name: 'Digital Design and Computer Architecture, 2nd Edition', owner: 'Mia Robinson', dateCreated: 'Nov 12, 2024', lastModified: 'Jan 23, 2026', workspace: 'math' },
  { id: '34', name: 'Fluid Mechanics Fundamentals and Applications, 4th Edition', owner: 'Noah Clark', dateCreated: 'Dec 15, 2024', lastModified: 'Feb 24, 2026', workspace: 'math' },
  { id: '35', name: 'Structural Analysis, 10th Edition', owner: 'Olivia Lewis', dateCreated: 'Jan 18, 2025', lastModified: 'Mar 3, 2026', workspace: 'math' },
  { id: '36', name: 'Control Systems Engineering, 8th Edition', owner: 'Paul Walker', dateCreated: 'Jan 20, 2025', lastModified: 'Mar 6, 2026', workspace: 'math' },
  { id: '37', name: 'Engineering Electromagnetics, 9th Edition', owner: 'Quinn Harris', dateCreated: 'Feb 22, 2025', lastModified: 'Mar 9, 2026', workspace: 'math' },
  { id: '38', name: 'Materials Science and Engineering: An Introduction, 10th Edition', owner: 'Rachel Green', dateCreated: 'Feb 25, 2025', lastModified: 'Mar 11, 2026', workspace: 'math' },

  // Business Fundamentals (13 projects)
  { id: '39', name: 'Principles of Marketing, 18th Edition', owner: 'Sam Turner', dateCreated: 'Mar 5, 2024', lastModified: 'Jun 10, 2024', workspace: 'business' },
  { id: '40', name: 'Financial Accounting, 11th Edition', owner: 'Tina Brooks', dateCreated: 'Apr 10, 2024', lastModified: 'Jul 15, 2024', workspace: 'business' },
  { id: '41', name: 'Organizational Behavior, 19th Edition', owner: 'Alice Johnson', dateCreated: 'May 15, 2024', lastModified: 'Sep 20, 2024', workspace: 'business' },
  { id: '42', name: 'Strategic Management: Concepts and Cases, 3rd Edition', owner: 'Bob Smith', dateCreated: 'Jun 20, 2024', lastModified: 'Oct 5, 2024', workspace: 'business' },
  { id: '43', name: 'Essentials of Corporate Finance, 10th Edition', owner: 'Carol Davis', dateCreated: 'Jul 25, 2024', lastModified: 'Nov 8, 2024', workspace: 'business' },
  { id: '44', name: 'Operations Management: Sustainability and Supply Chain, 13th Edition', owner: 'David Wilson', dateCreated: 'Aug 28, 2024', lastModified: 'Dec 10, 2024', workspace: 'business' },
  { id: '45', name: 'Human Resource Management, 16th Edition', owner: 'Emma Brown', dateCreated: 'Sep 1, 2024', lastModified: 'Jan 12, 2025', workspace: 'business' },
  { id: '46', name: 'Managerial Accounting, 17th Edition', owner: 'Frank Miller', dateCreated: 'Oct 5, 2024', lastModified: 'Feb 14, 2025', workspace: 'business' },
  { id: '47', name: 'Business Law: Text and Cases, 15th Edition', owner: 'Grace Lee', dateCreated: 'Nov 10, 2024', lastModified: 'Jan 16, 2026', workspace: 'business' },
  { id: '48', name: 'Entrepreneurship: Successfully Launching New Ventures, 6th Edition', owner: 'Henry Taylor', dateCreated: 'Dec 15, 2024', lastModified: 'Feb 18, 2026', workspace: 'business' },
  { id: '49', name: 'Business Ethics: A Stakeholder Approach, 9th Edition', owner: 'Ivy Chen', dateCreated: 'Jan 20, 2025', lastModified: 'Mar 7, 2026', workspace: 'business' },
  { id: '50', name: 'International Business: Competing in the Global Marketplace, 13th Edition', owner: 'Jack Anderson', dateCreated: 'Feb 25, 2025', lastModified: 'Mar 13, 2026', workspace: 'business' },
  { id: '51', name: 'Project Management: The Managerial Process, 8th Edition', owner: 'Karen White', dateCreated: 'Feb 28, 2025', lastModified: 'Mar 15, 2026', workspace: 'business' },

  // Economics & Policy (13 projects)
  { id: '52', name: 'Principles of Economics, 9th Edition', owner: 'Liam Martinez', dateCreated: 'Mar 15, 2024', lastModified: 'Jun 5, 2024', workspace: 'economics' },
  { id: '53', name: 'Macroeconomics, 12th Edition', owner: 'Mia Robinson', dateCreated: 'Apr 20, 2024', lastModified: 'Jul 8, 2024', workspace: 'economics' },
  { id: '54', name: 'Microeconomics, 11th Edition', owner: 'Noah Clark', dateCreated: 'May 25, 2024', lastModified: 'Aug 10, 2024', workspace: 'economics' },
  { id: '55', name: 'International Economics: Theory and Policy, 12th Edition', owner: 'Olivia Lewis', dateCreated: 'Jun 30, 2024', lastModified: 'Sep 12, 2024', workspace: 'economics' },
  { id: '56', name: 'Public Finance and Public Policy, 7th Edition', owner: 'Paul Walker', dateCreated: 'Jul 5, 2024', lastModified: 'Oct 15, 2024', workspace: 'economics' },
  { id: '57', name: 'Econometrics, 4th Edition', owner: 'Quinn Harris', dateCreated: 'Aug 10, 2024', lastModified: 'Nov 18, 2024', workspace: 'economics' },
  { id: '58', name: 'Development Economics, 5th Edition', owner: 'Rachel Green', dateCreated: 'Sep 15, 2024', lastModified: 'Dec 20, 2024', workspace: 'economics' },
  { id: '59', name: 'Labor Economics, 8th Edition', owner: 'Sam Turner', dateCreated: 'Oct 20, 2024', lastModified: 'Jan 22, 2025', workspace: 'economics' },
  { id: '60', name: 'Environmental Economics and Policy, 7th Edition', owner: 'Tina Brooks', dateCreated: 'Nov 25, 2024', lastModified: 'Feb 2, 2025', workspace: 'economics' },
  { id: '61', name: 'Health Economics, 6th Edition', owner: 'Alice Johnson', dateCreated: 'Dec 30, 2024', lastModified: 'Feb 5, 2025', workspace: 'economics' },
  { id: '62', name: 'Game Theory: An Introduction, 3rd Edition', owner: 'Bob Smith', dateCreated: 'Jan 5, 2025', lastModified: 'Feb 8, 2026', workspace: 'economics' },
  { id: '63', name: 'Monetary Economics, 2nd Edition', owner: 'Carol Davis', dateCreated: 'Feb 10, 2025', lastModified: 'Mar 4, 2026', workspace: 'economics' },
  { id: '64', name: 'Political Economy of Institutions and Development', owner: 'David Wilson', dateCreated: 'Feb 15, 2025', lastModified: 'Mar 16, 2026', workspace: 'economics' },
];

export const myWorkspaces = [
  { id: 'personal', name: 'Personal Projects', icon: 'PP' },
  { id: 'research', name: 'Research Work', icon: 'RW' },
];

// Calculate team workspaces with counts
export const teamWorkspaces = workspaces.map(workspace => ({
  ...workspace,
  count: projects.filter(p => p.workspace === workspace.id).length
}));