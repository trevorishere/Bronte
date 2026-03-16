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
  { id: '1', name: 'Anatomy & Physiology: The Unity of Form and Function', owner: 'Vivian Holloway', dateCreated: 'Oct 12, 2022', lastModified: 'Nov 3, 2022', workspace: 'chemistry' },
  { id: '2', name: 'Biochemistry, 9th Edition', owner: 'Elias Thorne', dateCreated: 'Dec 1, 2022', lastModified: 'Jan 15, 2023', workspace: 'chemistry' },
  { id: '3', name: 'Microbiology: An Introduction, 13th Edition', owner: 'Clementine Fairweather', dateCreated: 'Dec 5, 2022', lastModified: 'Jan 15, 2023', workspace: 'chemistry' },
  { id: '4', name: 'Organic Chemistry, 10th Edition', owner: 'Seraphina Sterling', dateCreated: 'Dec 8, 2022', lastModified: 'Jan 15, 2023', workspace: 'chemistry' },
  { id: '5', name: 'General Chemistry, 11th Edition', owner: 'Thaddeus Finch', dateCreated: 'Dec 10, 2022', lastModified: 'Jan 15, 2023', workspace: 'chemistry' },
  { id: '6', name: 'Essential Cell Biology, 5th Edition', owner: 'Isolde Hawthorne', dateCreated: 'Dec 12, 2022', lastModified: 'Jan 15, 2023', workspace: 'chemistry' },
  { id: '7', name: 'Principles of Genetics, 8th Edition', owner: 'Barnaby Ainsworth', dateCreated: 'Dec 15, 2022', lastModified: 'Jan 15, 2023', workspace: 'chemistry' },
  { id: '8', name: 'Human Anatomy & Physiology, 11th Edition', owner: 'Persephone Nightshade', dateCreated: 'Dec 18, 2022', lastModified: 'Jan 15, 2023', workspace: 'chemistry' },
  { id: '9', name: 'Molecular Biology of the Cell, 7th Edition', owner: 'Sebastian Frost', dateCreated: 'Dec 20, 2022', lastModified: 'Jan 16, 2023', workspace: 'chemistry' },
  { id: '10', name: 'Lehninger Principles of Biochemistry, 8th Edition', owner: 'Ophelia Brightwell', dateCreated: 'Dec 22, 2022', lastModified: 'Jan 16, 2023', workspace: 'chemistry' },
  { id: '11', name: 'Campbell Biology, 12th Edition', owner: 'Cornelius Weatherby', dateCreated: 'Dec 28, 2022', lastModified: 'Jan 17, 2023', workspace: 'chemistry' },
  { id: '12', name: 'Brock Biology of Microorganisms, 15th Edition', owner: 'Magnolia Ashford', dateCreated: 'Jan 2, 2023', lastModified: 'Jan 18, 2023', workspace: 'chemistry' },
  { id: '13', name: 'Introduction to Genetic Analysis, 12th Edition', owner: 'Reginald Pennington', dateCreated: 'Jan 4, 2023', lastModified: 'Jan 19, 2023', workspace: 'chemistry' },
  { id: '14', name: 'Physical Chemistry for the Life Sciences, 3rd Edition', owner: 'Lavinia Goodwin', dateCreated: 'Jan 6, 2023', lastModified: 'Jan 20, 2023', workspace: 'chemistry' },
  { id: '15', name: 'Neuroscience: Exploring the Brain, 4th Edition', owner: 'Ambrose Whitfield', dateCreated: 'Jan 8, 2023', lastModified: 'Jan 21, 2023', workspace: 'chemistry' },
  { id: '16', name: 'Immunobiology: The Immune System, 9th Edition', owner: 'Cordelia Blackwell', dateCreated: 'Jan 10, 2023', lastModified: 'Jan 22, 2023', workspace: 'chemistry' },
  { id: '17', name: 'Pharmacology for Nurses, 5th Edition', owner: 'Leopold Winthrop', dateCreated: 'Jan 12, 2023', lastModified: 'Jan 23, 2023', workspace: 'chemistry' },
  { id: '18', name: 'Medical Microbiology, 9th Edition', owner: 'Arabella Sinclair', dateCreated: 'Jan 14, 2023', lastModified: 'Jan 24, 2023', workspace: 'chemistry' },
  { id: '19', name: 'Pathophysiology: The Biologic Basis for Disease', owner: 'Maximilian Grey', dateCreated: 'Jan 16, 2023', lastModified: 'Jan 25, 2023', workspace: 'chemistry' },
  { id: '20', name: 'Essentials of Glycobiology, 4th Edition', owner: 'Felicity Ravenscroft', dateCreated: 'Jan 18, 2023', lastModified: 'Jan 26, 2023', workspace: 'chemistry' },

  // Math & Engineering (18 projects)
  { id: '21', name: 'Fundamentals of Differential Equations, 10th Edition', owner: 'Montgomery Bellweather', dateCreated: 'Nov 5, 2022', lastModified: 'Jan 15, 2023', workspace: 'math' },
  { id: '22', name: 'Precalculus, 11th Edition', owner: 'Evangeline Ashworth', dateCreated: 'Nov 10, 2022', lastModified: 'Jan 15, 2023', workspace: 'math' },
  { id: '23', name: 'Calculus, 14th Edition', owner: 'Jasper Blackwood', dateCreated: 'Nov 15, 2022', lastModified: 'Jan 15, 2023', workspace: 'math' },
  { id: '24', name: 'Physics for Scientists and Engineers, 4th Edition', owner: 'Genevieve Lovelace', dateCreated: 'Nov 20, 2022', lastModified: 'Jan 15, 2023', workspace: 'math' },
  { id: '25', name: 'Introduction to Chemical Engineering, 8th Edition', owner: 'Alistair Blackthorn', dateCreated: 'Nov 22, 2022', lastModified: 'Jan 15, 2023', workspace: 'math' },
  { id: '26', name: 'Linear Algebra and Its Applications, 6th Edition', owner: 'Beatrice Pemberton', dateCreated: 'Nov 25, 2022', lastModified: 'Jan 16, 2023', workspace: 'math' },
  { id: '27', name: 'Discrete Mathematics and Its Applications, 8th Edition', owner: 'Theodore Harrington', dateCreated: 'Nov 28, 2022', lastModified: 'Jan 17, 2023', workspace: 'math' },
  { id: '28', name: 'Engineering Mechanics: Dynamics, 9th Edition', owner: 'Octavia Fairchild', dateCreated: 'Dec 1, 2022', lastModified: 'Jan 18, 2023', workspace: 'math' },
  { id: '29', name: 'Thermodynamics: An Engineering Approach, 9th Edition', owner: 'Bartholomew Sterling', dateCreated: 'Dec 3, 2022', lastModified: 'Jan 19, 2023', workspace: 'math' },
  { id: '30', name: 'Signals and Systems, 2nd Edition', owner: 'Rosalind Kensington', dateCreated: 'Dec 5, 2022', lastModified: 'Jan 20, 2023', workspace: 'math' },
  { id: '31', name: 'Introduction to Algorithms, 4th Edition', owner: 'Percival Ashworth', dateCreated: 'Dec 8, 2022', lastModified: 'Jan 21, 2023', workspace: 'math' },
  { id: '32', name: 'Probability and Statistics for Engineers, 6th Edition', owner: 'Millicent Thornfield', dateCreated: 'Dec 10, 2022', lastModified: 'Jan 22, 2023', workspace: 'math' },
  { id: '33', name: 'Digital Design and Computer Architecture, 2nd Edition', owner: 'Augustus Fairmont', dateCreated: 'Dec 12, 2022', lastModified: 'Jan 23, 2023', workspace: 'math' },
  { id: '34', name: 'Fluid Mechanics Fundamentals and Applications, 4th Edition', owner: 'Henrietta Blackmore', dateCreated: 'Dec 15, 2022', lastModified: 'Jan 24, 2023', workspace: 'math' },
  { id: '35', name: 'Structural Analysis, 10th Edition', owner: 'Fitzgerald Beaumont', dateCreated: 'Dec 18, 2022', lastModified: 'Jan 25, 2023', workspace: 'math' },
  { id: '36', name: 'Control Systems Engineering, 8th Edition', owner: 'Imogen Ravenswood', dateCreated: 'Dec 20, 2022', lastModified: 'Jan 26, 2023', workspace: 'math' },
  { id: '37', name: 'Engineering Electromagnetics, 9th Edition', owner: 'Nathaniel Whitmore', dateCreated: 'Dec 22, 2022', lastModified: 'Jan 27, 2023', workspace: 'math' },
  { id: '38', name: 'Materials Science and Engineering: An Introduction, 10th Edition', owner: 'Constance Willoughby', dateCreated: 'Dec 25, 2022', lastModified: 'Jan 28, 2023', workspace: 'math' },

  // Business Fundamentals (13 projects)
  { id: '39', name: 'Principles of Marketing, 18th Edition', owner: 'Gideon Fairweather', dateCreated: 'Oct 5, 2022', lastModified: 'Dec 10, 2022', workspace: 'business' },
  { id: '40', name: 'Financial Accounting, 11th Edition', owner: 'Clementine Hargrove', dateCreated: 'Oct 10, 2022', lastModified: 'Dec 15, 2022', workspace: 'business' },
  { id: '41', name: 'Organizational Behavior, 19th Edition', owner: 'Horatio Kingsley', dateCreated: 'Oct 15, 2022', lastModified: 'Dec 20, 2022', workspace: 'business' },
  { id: '42', name: 'Strategic Management: Concepts and Cases, 3rd Edition', owner: 'Beatrix Montgomery', dateCreated: 'Oct 20, 2022', lastModified: 'Jan 5, 2023', workspace: 'business' },
  { id: '43', name: 'Essentials of Corporate Finance, 10th Edition', owner: 'Wellington Ashford', dateCreated: 'Oct 25, 2022', lastModified: 'Jan 8, 2023', workspace: 'business' },
  { id: '44', name: 'Operations Management: Sustainability and Supply Chain, 13th Edition', owner: 'Prudence Whitfield', dateCreated: 'Oct 28, 2022', lastModified: 'Jan 10, 2023', workspace: 'business' },
  { id: '45', name: 'Human Resource Management, 16th Edition', owner: 'Archibald Pembroke', dateCreated: 'Nov 1, 2022', lastModified: 'Jan 12, 2023', workspace: 'business' },
  { id: '46', name: 'Managerial Accounting, 17th Edition', owner: 'Vivienne Thornhill', dateCreated: 'Nov 5, 2022', lastModified: 'Jan 14, 2023', workspace: 'business' },
  { id: '47', name: 'Business Law: Text and Cases, 15th Edition', owner: 'Thaddeus Worthington', dateCreated: 'Nov 10, 2022', lastModified: 'Jan 16, 2023', workspace: 'business' },
  { id: '48', name: 'Entrepreneurship: Successfully Launching New Ventures, 6th Edition', owner: 'Seraphina Lockhart', dateCreated: 'Nov 15, 2022', lastModified: 'Jan 18, 2023', workspace: 'business' },
  { id: '49', name: 'Business Ethics: A Stakeholder Approach, 9th Edition', owner: 'Edmund Fairchild', dateCreated: 'Nov 20, 2022', lastModified: 'Jan 20, 2023', workspace: 'business' },
  { id: '50', name: 'International Business: Competing in the Global Marketplace, 13th Edition', owner: 'Guinevere Blackstone', dateCreated: 'Nov 25, 2022', lastModified: 'Jan 22, 2023', workspace: 'business' },
  { id: '51', name: 'Project Management: The Managerial Process, 8th Edition', owner: 'Remington Ashworth', dateCreated: 'Nov 30, 2022', lastModified: 'Jan 24, 2023', workspace: 'business' },

  // Economics & Policy (13 projects)
  { id: '52', name: 'Principles of Economics, 9th Edition', owner: 'Cornelius Weatherby', dateCreated: 'Sep 15, 2022', lastModified: 'Dec 5, 2022', workspace: 'economics' },
  { id: '53', name: 'Macroeconomics, 12th Edition', owner: 'Felicity Ravenscroft', dateCreated: 'Sep 20, 2022', lastModified: 'Dec 8, 2022', workspace: 'economics' },
  { id: '54', name: 'Microeconomics, 11th Edition', owner: 'Leopold Winthrop', dateCreated: 'Sep 25, 2022', lastModified: 'Dec 10, 2022', workspace: 'economics' },
  { id: '55', name: 'International Economics: Theory and Policy, 12th Edition', owner: 'Cordelia Blackwell', dateCreated: 'Sep 30, 2022', lastModified: 'Dec 12, 2022', workspace: 'economics' },
  { id: '56', name: 'Public Finance and Public Policy, 7th Edition', owner: 'Ambrose Whitfield', dateCreated: 'Oct 5, 2022', lastModified: 'Dec 15, 2022', workspace: 'economics' },
  { id: '57', name: 'Econometrics, 4th Edition', owner: 'Lavinia Goodwin', dateCreated: 'Oct 10, 2022', lastModified: 'Dec 18, 2022', workspace: 'economics' },
  { id: '58', name: 'Development Economics, 5th Edition', owner: 'Reginald Pennington', dateCreated: 'Oct 15, 2022', lastModified: 'Dec 20, 2022', workspace: 'economics' },
  { id: '59', name: 'Labor Economics, 8th Edition', owner: 'Magnolia Ashford', dateCreated: 'Oct 20, 2022', lastModified: 'Dec 22, 2022', workspace: 'economics' },
  { id: '60', name: 'Environmental Economics and Policy, 7th Edition', owner: 'Ophelia Brightwell', dateCreated: 'Oct 25, 2022', lastModified: 'Jan 2, 2023', workspace: 'economics' },
  { id: '61', name: 'Health Economics, 6th Edition', owner: 'Sebastian Frost', dateCreated: 'Oct 30, 2022', lastModified: 'Jan 5, 2023', workspace: 'economics' },
  { id: '62', name: 'Game Theory: An Introduction, 3rd Edition', owner: 'Persephone Nightshade', dateCreated: 'Nov 5, 2022', lastModified: 'Jan 8, 2023', workspace: 'economics' },
  { id: '63', name: 'Monetary Economics, 2nd Edition', owner: 'Barnaby Ainsworth', dateCreated: 'Nov 10, 2022', lastModified: 'Jan 10, 2023', workspace: 'economics' },
  { id: '64', name: 'Political Economy of Institutions and Development', owner: 'Isolde Hawthorne', dateCreated: 'Nov 15, 2022', lastModified: 'Jan 12, 2023', workspace: 'economics' },
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
