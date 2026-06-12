/**
 * Progress pill background colors — shared between DataTable (ProgressPill) and MobileCardView.
 * Keyed by canonical status string; 'Not Started' uses var(--bg-icon-hover) handled at call site.
 */
export const progressPillColors: Record<string, string> = {
  'In Progress': 'rgba(59, 130, 246, 0.25)',
  'In Review':   'rgba(139, 92, 246, 0.25)',
  'Done':        'rgba(34, 197, 94, 0.25)',
};
