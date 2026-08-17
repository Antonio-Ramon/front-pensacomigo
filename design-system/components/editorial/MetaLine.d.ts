import * as React from 'react';
/** Mono meta line (date · read time · tags). */
export interface MetaLineProps extends React.HTMLAttributes<HTMLSpanElement> {
  date?: React.ReactNode; readTime?: React.ReactNode; items?: React.ReactNode[];
}
export function MetaLine(props: MetaLineProps): JSX.Element;
