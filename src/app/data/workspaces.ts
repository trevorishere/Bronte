// Workspaces array
export const workspaces = [
  { id: 'chemistry', name: 'Chemistry & Life Sciences', icon: 'CH' },
  { id: 'math', name: 'Math & Engineering', icon: 'MA' },
  { id: 'business', name: 'Business Fundamentals', icon: 'BU' },
  { id: 'economics', name: 'Economics & Policy', icon: 'EC' },
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
  { id: '1', name: 'Anatomy & Physiology: The Unity of Form and Function', owner: 'Vivian Holloway', dateCreated: 'May 12, 2024', lastModified: 'Jun 3, 2024', workspace: 'chemistry' },
  { id: '2', name: 'Biochemistry, 9th Edition', owner: 'Elias Thorne', dateCreated: 'Jun 1, 2024', lastModified: 'Aug 15, 2024', workspace: 'chemistry' },
  { id: '3', name: 'Microbiology: An Introduction, 13th Edition', owner: 'Clementine Fairweather', dateCreated: 'Jun 5, 2024', lastModified: 'Sep 10, 2024', workspace: 'chemistry' },
  { id: '4', name: 'Organic Chemistry, 10th Edition', owner: 'Seraphina Sterling', dateCreated: 'Jun 8, 2024', lastModified: 'Oct 15, 2024', workspace: 'chemistry' },
  { id: '5', name: 'General Chemistry, 11th Edition', owner: 'Thaddeus Finch', dateCreated: 'Jul 10, 2024', lastModified: 'Nov 22, 2024', workspace: 'chemistry' },
  { id: '6', name: 'Essential Cell Biology, 5th Edition', owner: 'Isolde Hawthorne', dateCreated: 'Jul 12, 2024', lastModified: 'Dec 5, 2024', workspace: 'chemistry' },
  { id: '7', name: 'Principles of Genetics, 8th Edition', owner: 'Barnaby Ainsworth', dateCreated: 'Aug 15, 2024', lastModified: 'Jan 8, 2025', workspace: 'chemistry' },
  { id: '8', name: 'Human Anatomy & Physiology, 11th Edition', owner: 'Persephone Nightshade', dateCreated: 'Aug 18, 2024', lastModified: 'Jan 15, 2025', workspace: 'chemistry' },
  { id: '9', name: 'Molecular Biology of the Cell, 7th Edition', owner: 'Sebastian Frost', dateCreated: 'Sep 20, 2024', lastModified: 'Feb 10, 2025', workspace: 'chemistry' },
  { id: '10', name: 'Lehninger Principles of Biochemistry, 8th Edition', owner: 'Ophelia Brightwell', dateCreated: 'Sep 22, 2024', lastModified: 'Feb 16, 2025', workspace: 'chemistry' },
  { id: '11', name: 'Campbell Biology, 12th Edition', owner: 'Cornelius Weatherby', dateCreated: 'Oct 28, 2024', lastModified: 'Mar 5, 2025', workspace: 'chemistry' },
  { id: '12', name: 'Brock Biology of Microorganisms, 15th Edition', owner: 'Magnolia Ashford', dateCreated: 'Nov 2, 2024', lastModified: 'Mar 10, 2025', workspace: 'chemistry' },
  { id: '13', name: 'Introduction to Genetic Analysis, 12th Edition', owner: 'Reginald Pennington', dateCreated: 'Nov 4, 2024', lastModified: 'Jan 19, 2026', workspace: 'chemistry' },
  { id: '14', name: 'Physical Chemistry for the Life Sciences, 3rd Edition', owner: 'Lavinia Goodwin', dateCreated: 'Dec 6, 2024', lastModified: 'Feb 20, 2026', workspace: 'chemistry' },
  { id: '15', name: 'Neuroscience: Exploring the Brain, 4th Edition', owner: 'Ambrose Whitfield', dateCreated: 'Dec 8, 2024', lastModified: 'Mar 1, 2026', workspace: 'chemistry' },
  { id: '16', name: 'Immunobiology: The Immune System, 9th Edition', owner: 'Cordelia Blackwell', dateCreated: 'Jan 10, 2025', lastModified: 'Mar 5, 2026', workspace: 'chemistry' },
  { id: '17', name: 'Pharmacology for Nurses, 5th Edition', owner: 'Leopold Winthrop', dateCreated: 'Jan 12, 2025', lastModified: 'Mar 8, 2026', workspace: 'chemistry' },
  { id: '18', name: 'Medical Microbiology, 9th Edition', owner: 'Arabella Sinclair', dateCreated: 'Feb 14, 2025', lastModified: 'Mar 10, 2026', workspace: 'chemistry' },
  { id: '19', name: 'Pathophysiology: The Biologic Basis for Disease', owner: 'Maximilian Grey', dateCreated: 'Feb 16, 2025', lastModified: 'Mar 12, 2026', workspace: 'chemistry' },
  { id: '20', name: 'Essentials of Glycobiology, 4th Edition', owner: 'Felicity Ravenscroft', dateCreated: 'Feb 18, 2025', lastModified: 'Mar 14, 2026', workspace: 'chemistry' },

  // Math & Engineering (18 projects)
  { id: '21', name: 'Fundamentals of Differential Equations, 10th Edition', owner: 'Montgomery Bellweather', dateCreated: 'Apr 5, 2024', lastModified: 'Jul 15, 2024', workspace: 'math' },
  { id: '22', name: 'Precalculus, 11th Edition', owner: 'Evangeline Ashworth', dateCreated: 'Apr 10, 2024', lastModified: 'Aug 20, 2024', workspace: 'math' },
  { id: '23', name: 'Calculus, 14th Edition', owner: 'Jasper Blackwood', dateCreated: 'May 15, 2024', lastModified: 'Sep 25, 2024', workspace: 'math' },
  { id: '24', name: 'Physics for Scientists and Engineers, 4th Edition', owner: 'Genevieve Lovelace', dateCreated: 'May 20, 2024', lastModified: 'Oct 10, 2024', workspace: 'math' },
  { id: '25', name: 'Introduction to Chemical Engineering, 8th Edition', owner: 'Alistair Blackthorn', dateCreated: 'Jun 22, 2024', lastModified: 'Nov 5, 2024', workspace: 'math' },
  { id: '26', name: 'Linear Algebra and Its Applications, 6th Edition', owner: 'Beatrice Pemberton', dateCreated: 'Jul 25, 2024', lastModified: 'Dec 16, 2024', workspace: 'math' },
  { id: '27', name: 'Discrete Mathematics and Its Applications, 8th Edition', owner: 'Theodore Harrington', dateCreated: 'Aug 28, 2024', lastModified: 'Jan 17, 2025', workspace: 'math' },
  { id: '28', name: 'Engineering Mechanics: Dynamics, 9th Edition', owner: 'Octavia Fairchild', dateCreated: 'Sep 1, 2024', lastModified: 'Jan 18, 2025', workspace: 'math' },
  { id: '29', name: 'Thermodynamics: An Engineering Approach, 9th Edition', owner: 'Bartholomew Sterling', dateCreated: 'Sep 3, 2024', lastModified: 'Feb 19, 2025', workspace: 'math' },
  { id: '30', name: 'Signals and Systems, 2nd Edition', owner: 'Rosalind Kensington', dateCreated: 'Oct 5, 2024', lastModified: 'Feb 20, 2025', workspace: 'math' },
  { id: '31', name: 'Introduction to Algorithms, 4th Edition', owner: 'Percival Ashworth', dateCreated: 'Oct 8, 2024', lastModified: 'Mar 1, 2025', workspace: 'math' },
  { id: '32', name: 'Probability and Statistics for Engineers, 6th Edition', owner: 'Millicent Thornfield', dateCreated: 'Nov 10, 2024', lastModified: 'Mar 2, 2025', workspace: 'math' },
  { id: '33', name: 'Digital Design and Computer Architecture, 2nd Edition', owner: 'Augustus Fairmont', dateCreated: 'Nov 12, 2024', lastModified: 'Jan 23, 2026', workspace: 'math' },
  { id: '34', name: 'Fluid Mechanics Fundamentals and Applications, 4th Edition', owner: 'Henrietta Blackmore', dateCreated: 'Dec 15, 2024', lastModified: 'Feb 24, 2026', workspace: 'math' },
  { id: '35', name: 'Structural Analysis, 10th Edition', owner: 'Fitzgerald Beaumont', dateCreated: 'Jan 18, 2025', lastModified: 'Mar 3, 2026', workspace: 'math' },
  { id: '36', name: 'Control Systems Engineering, 8th Edition', owner: 'Imogen Ravenswood', dateCreated: 'Jan 20, 2025', lastModified: 'Mar 6, 2026', workspace: 'math' },
  { id: '37', name: 'Engineering Electromagnetics, 9th Edition', owner: 'Nathaniel Whitmore', dateCreated: 'Feb 22, 2025', lastModified: 'Mar 9, 2026', workspace: 'math' },
  { id: '38', name: 'Materials Science and Engineering: An Introduction, 10th Edition', owner: 'Constance Willoughby', dateCreated: 'Feb 25, 2025', lastModified: 'Mar 11, 2026', workspace: 'math' },

  // Business Fundamentals (13 projects)
  { id: '39', name: 'Principles of Marketing, 18th Edition', owner: 'Gideon Fairweather', dateCreated: 'Mar 5, 2024', lastModified: 'Jun 10, 2024', workspace: 'business' },
  { id: '40', name: 'Financial Accounting, 11th Edition', owner: 'Clementine Hargrove', dateCreated: 'Apr 10, 2024', lastModified: 'Jul 15, 2024', workspace: 'business' },
  { id: '41', name: 'Organizational Behavior, 19th Edition', owner: 'Horatio Kingsley', dateCreated: 'May 15, 2024', lastModified: 'Sep 20, 2024', workspace: 'business' },
  { id: '42', name: 'Strategic Management: Concepts and Cases, 3rd Edition', owner: 'Beatrix Montgomery', dateCreated: 'Jun 20, 2024', lastModified: 'Oct 5, 2024', workspace: 'business' },
  { id: '43', name: 'Essentials of Corporate Finance, 10th Edition', owner: 'Wellington Ashford', dateCreated: 'Jul 25, 2024', lastModified: 'Nov 8, 2024', workspace: 'business' },
  { id: '44', name: 'Operations Management: Sustainability and Supply Chain, 13th Edition', owner: 'Prudence Whitfield', dateCreated: 'Aug 28, 2024', lastModified: 'Dec 10, 2024', workspace: 'business' },
  { id: '45', name: 'Human Resource Management, 16th Edition', owner: 'Archibald Pembroke', dateCreated: 'Sep 1, 2024', lastModified: 'Jan 12, 2025', workspace: 'business' },
  { id: '46', name: 'Managerial Accounting, 17th Edition', owner: 'Vivienne Thornhill', dateCreated: 'Oct 5, 2024', lastModified: 'Feb 14, 2025', workspace: 'business' },
  { id: '47', name: 'Business Law: Text and Cases, 15th Edition', owner: 'Thaddeus Worthington', dateCreated: 'Nov 10, 2024', lastModified: 'Jan 16, 2026', workspace: 'business' },
  { id: '48', name: 'Entrepreneurship: Successfully Launching New Ventures, 6th Edition', owner: 'Seraphina Lockhart', dateCreated: 'Dec 15, 2024', lastModified: 'Feb 18, 2026', workspace: 'business' },
  { id: '49', name: 'Business Ethics: A Stakeholder Approach, 9th Edition', owner: 'Edmund Fairchild', dateCreated: 'Jan 20, 2025', lastModified: 'Mar 7, 2026', workspace: 'business' },
  { id: '50', name: 'International Business: Competing in the Global Marketplace, 13th Edition', owner: 'Guinevere Blackstone', dateCreated: 'Feb 25, 2025', lastModified: 'Mar 13, 2026', workspace: 'business' },
  { id: '51', name: 'Project Management: The Managerial Process, 8th Edition', owner: 'Remington Ashworth', dateCreated: 'Feb 28, 2025', lastModified: 'Mar 15, 2026', workspace: 'business' },

  // Economics & Policy (13 projects)
  { id: '52', name: 'Principles of Economics, 9th Edition', owner: 'Cornelius Weatherby', dateCreated: 'Mar 15, 2024', lastModified: 'Jun 5, 2024', workspace: 'economics' },
  { id: '53', name: 'Macroeconomics, 12th Edition', owner: 'Felicity Ravenscroft', dateCreated: 'Apr 20, 2024', lastModified: 'Jul 8, 2024', workspace: 'economics' },
  { id: '54', name: 'Microeconomics, 11th Edition', owner: 'Leopold Winthrop', dateCreated: 'May 25, 2024', lastModified: 'Aug 10, 2024', workspace: 'economics' },
  { id: '55', name: 'International Economics: Theory and Policy, 12th Edition', owner: 'Cordelia Blackwell', dateCreated: 'Jun 30, 2024', lastModified: 'Sep 12, 2024', workspace: 'economics' },
  { id: '56', name: 'Public Finance and Public Policy, 7th Edition', owner: 'Ambrose Whitfield', dateCreated: 'Jul 5, 2024', lastModified: 'Oct 15, 2024', workspace: 'economics' },
  { id: '57', name: 'Econometrics, 4th Edition', owner: 'Lavinia Goodwin', dateCreated: 'Aug 10, 2024', lastModified: 'Nov 18, 2024', workspace: 'economics' },
  { id: '58', name: 'Development Economics, 5th Edition', owner: 'Reginald Pennington', dateCreated: 'Sep 15, 2024', lastModified: 'Dec 20, 2024', workspace: 'economics' },
  { id: '59', name: 'Labor Economics, 8th Edition', owner: 'Magnolia Ashford', dateCreated: 'Oct 20, 2024', lastModified: 'Jan 22, 2025', workspace: 'economics' },
  { id: '60', name: 'Environmental Economics and Policy, 7th Edition', owner: 'Ophelia Brightwell', dateCreated: 'Nov 25, 2024', lastModified: 'Feb 2, 2025', workspace: 'economics' },
  { id: '61', name: 'Health Economics, 6th Edition', owner: 'Sebastian Frost', dateCreated: 'Dec 30, 2024', lastModified: 'Feb 5, 2025', workspace: 'economics' },
  { id: '62', name: 'Game Theory: An Introduction, 3rd Edition', owner: 'Persephone Nightshade', dateCreated: 'Jan 5, 2025', lastModified: 'Feb 8, 2026', workspace: 'economics' },
  { id: '63', name: 'Monetary Economics, 2nd Edition', owner: 'Barnaby Ainsworth', dateCreated: 'Feb 10, 2025', lastModified: 'Mar 4, 2026', workspace: 'economics' },
  { id: '64', name: 'Political Economy of Institutions and Development', owner: 'Isolde Hawthorne', dateCreated: 'Feb 15, 2025', lastModified: 'Mar 16, 2026', workspace: 'economics' },
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