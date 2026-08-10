import * as React from 'react';
/** Editorial section heading: CAPS overline + serif display title. */
export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  overline?: string;
  title: string;
  align?: 'left' | 'center';
}
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
