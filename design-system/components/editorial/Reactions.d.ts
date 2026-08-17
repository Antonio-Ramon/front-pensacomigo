import * as React from 'react';
/**
 * Sentence reactions with counts.
 */
export interface ReactionsProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: Array<{ label: string; count?: number }>;
}
export function Reactions(props: ReactionsProps): JSX.Element;
