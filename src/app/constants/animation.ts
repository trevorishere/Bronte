/**
 * Shared Framer Motion spring configuration for mobile bottom-sheet drawers.
 * All drawers (MobileDrawer, DrawerChrome, ShareDrawer, InfoDrawer) use this.
 */
export const SPRING_DRAWER = { type: 'spring' as const, stiffness: 380, damping: 34 };

/**
 * Floating label variants — used by FilterDropdown and DateFilterDropdown.
 * Animates the icon+label unit between the inline (inactive) and top-floating (active) positions.
 */
export const labelVariants = {
  active: {
    top: -6,
    left: 0,
    scale: 0.85,
    paddingLeft: 4,
    paddingRight: 4,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const, delay: 0 },
  },
  inactive: {
    top: 20,  // half of 40px button height — y:'-50%' centers the text on this point
    left: 14, // button paddingLeft — icon is now part of the floating element
    scale: 1,
    paddingLeft: 0,
    paddingRight: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const, delay: 0.05 },
  },
};

/**
 * Background fill variants — fades in to create the border-cut effect when label floats to top.
 */
export const labelBgVariants = {
  active:   { opacity: 1, transition: { duration: 0.5, delay: 0    } },
  inactive: { opacity: 0, transition: { duration: 0.5, delay: 0.05 } },
};
