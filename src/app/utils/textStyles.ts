import React from 'react';

export const textStyles = {
  body: {
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--font-size-14)',
    fontWeight: 'var(--font-weight-regular)',
    letterSpacing: 'var(--letter-spacing-md)',
    lineHeight: 'var(--line-height-20)',
  } as React.CSSProperties,

  bodyMedium: {
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--font-size-14)',
    fontWeight: 'var(--font-weight-medium)',
    letterSpacing: 'var(--letter-spacing-md)',
    lineHeight: 'var(--line-height-20)',
  } as React.CSSProperties,

  bodySemibold: {
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--font-size-14)',
    fontWeight: 'var(--font-weight-semibold)',
    letterSpacing: 'var(--letter-spacing-md)',
    lineHeight: 'var(--line-height-20)',
  } as React.CSSProperties,

  small: {
    fontFamily: 'var(--font-family)',
    fontSize: '13px',
    fontWeight: 'var(--font-weight-medium)',
    letterSpacing: 'var(--letter-spacing-md)',
  } as React.CSSProperties,

  caption: {
    fontFamily: 'var(--font-family)',
    fontSize: '11px',
    fontWeight: 'var(--font-weight-regular)',
    letterSpacing: 'var(--letter-spacing-md)',
  } as React.CSSProperties,

  caps: {
    fontFamily: 'var(--font-family)',
    fontSize: '11px',
    fontWeight: 'var(--font-weight-semibold)',
    letterSpacing: '0.07em',
    textTransform: 'uppercase' as const,
    whiteSpace: 'nowrap' as const,
  } as React.CSSProperties,

  label: {
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--font-size-11)',
    fontWeight: 'var(--font-weight-semibold)',
    letterSpacing: 'var(--letter-spacing-lg)',
    textTransform: 'uppercase' as const,
  } as React.CSSProperties,
} as const;
