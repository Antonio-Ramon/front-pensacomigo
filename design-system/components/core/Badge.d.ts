import * as React from 'react';
/** Muted status badge. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'published' | 'draft' | 'danger';
}
export function Badge(props: BadgeProps): JSX.Element;
