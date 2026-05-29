/**
 * Standard 36×4px drag-handle pill used at the top of all mobile bottom-sheet drawers.
 */
export function DragHandle() {
  return (
    <div
      className="absolute top-[12px] left-1/2 -translate-x-1/2 rounded-full shrink-0"
      style={{ width: 36, height: 4, backgroundColor: 'var(--border-interactive)' }}
    />
  );
}
