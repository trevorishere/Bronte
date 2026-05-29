/**
 * Shared Framer Motion spring configuration for mobile bottom-sheet drawers.
 * All drawers (MobileDrawer, DrawerChrome, ShareDrawer, InfoDrawer) use this.
 */
export const SPRING_DRAWER = { type: 'spring' as const, stiffness: 380, damping: 34 };
