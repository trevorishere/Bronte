import React from 'react';

/**
 * Typography presets — shared font bundles for inline styles.
 *
 * Usage:  style={{ ...ts.body, color: 'var(--foreground)' }}
 *
 * Naming:  <semantic>     — medium weight (default)
 *          <semantic>Lt   — regular / light weight
 *          <semantic>Sb   — semibold weight
 */

const base = {
  fontFamily: 'var(--font-family)',
} as React.CSSProperties;

export const ts = {
  // ── 15px — primary body text ─────────────────────────────────────────────
  body: {
    ...base,
    fontWeight: 'var(--font-weight-medium)',
    fontSize: 'var(--font-size-15)',
    letterSpacing: 'var(--letter-spacing-body)',
  } as React.CSSProperties,

  bodyLt: {
    ...base,
    fontWeight: 'var(--font-weight-regular)',
    fontSize: 'var(--font-size-15)',
    letterSpacing: 'var(--letter-spacing-body)',
  } as React.CSSProperties,

  bodySb: {
    ...base,
    fontWeight: 'var(--font-weight-semibold)',
    fontSize: 'var(--font-size-15)',
    letterSpacing: 'var(--letter-spacing-body)',
  } as React.CSSProperties,

  // ── 14px — dense / secondary body ────────────────────────────────────────
  label: {
    ...base,
    fontWeight: 'var(--font-weight-medium)',
    fontSize: 'var(--font-size-14)',
    letterSpacing: 'var(--letter-spacing-body)',
  } as React.CSSProperties,

  labelLt: {
    ...base,
    fontWeight: 'var(--font-weight-regular)',
    fontSize: 'var(--font-size-14)',
    letterSpacing: 'var(--letter-spacing-body)',
  } as React.CSSProperties,

  labelSb: {
    ...base,
    fontWeight: 'var(--font-weight-semibold)',
    fontSize: 'var(--font-size-14)',
    letterSpacing: 'var(--letter-spacing-body)',
  } as React.CSSProperties,

  // ── 13px — small / metadata ───────────────────────────────────────────────
  small: {
    ...base,
    fontWeight: 'var(--font-weight-medium)',
    fontSize: 'var(--font-size-13)',
    letterSpacing: 'var(--letter-spacing-body)',
  } as React.CSSProperties,

  smallLt: {
    ...base,
    fontWeight: 'var(--font-weight-regular)',
    fontSize: 'var(--font-size-13)',
    letterSpacing: 'var(--letter-spacing-body)',
  } as React.CSSProperties,

  // ── 12px — caption ────────────────────────────────────────────────────────
  caption: {
    ...base,
    fontWeight: 'var(--font-weight-medium)',
    fontSize: 'var(--font-size-12)',
    letterSpacing: 'var(--letter-spacing-body)',
  } as React.CSSProperties,

  captionLt: {
    ...base,
    fontWeight: 'var(--font-weight-regular)',
    fontSize: 'var(--font-size-12)',
    letterSpacing: 'var(--letter-spacing-body)',
  } as React.CSSProperties,

  captionSb: {
    ...base,
    fontWeight: 'var(--font-weight-semibold)',
    fontSize: 'var(--font-size-12)',
    letterSpacing: 'var(--letter-spacing-body)',
  } as React.CSSProperties,

  // ── 11px — micro / badge ──────────────────────────────────────────────────
  micro: {
    ...base,
    fontWeight: 'var(--font-weight-medium)',
    fontSize: 'var(--font-size-11)',
    letterSpacing: 'var(--letter-spacing-body)',
  } as React.CSSProperties,

  microSb: {
    ...base,
    fontWeight: 'var(--font-weight-semibold)',
    fontSize: 'var(--font-size-11)',
    letterSpacing: 'var(--letter-spacing-body)',
  } as React.CSSProperties,

  // ── Uppercase section headers ─────────────────────────────────────────────
  caps: {
    ...base,
    fontWeight: 'var(--font-weight-semibold)',
    fontSize: 'var(--font-size-11)',
    letterSpacing: 'var(--letter-spacing-caps)',
    textTransform: 'uppercase' as const,
  } as React.CSSProperties,

  // ── Button labels ─────────────────────────────────────────────────────────
  btn: {
    ...base,
    fontWeight: 'var(--font-weight-semibold)',
    fontSize: 'var(--font-size-15)',
    letterSpacing: 'var(--letter-spacing-button)',
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,
} as const;

/** Verbose alias for readability in larger components */
export const textStyles = ts;
