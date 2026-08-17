import * as React from 'react';
/**
 * Eyebrow + serif title + hint.
 */
export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: React.ReactNode; title: React.ReactNode; hint?: React.ReactNode; as?: 'h1' | 'h2' | 'h3';
}
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
