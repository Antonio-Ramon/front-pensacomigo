import * as React from 'react';
/** Small status badge — draft vs published vs warning/danger. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'draft' | 'published' | 'warning' | 'danger';
}
export function Badge(props: BadgeProps): JSX.Element;
