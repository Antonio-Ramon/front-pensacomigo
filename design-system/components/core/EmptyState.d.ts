import * as React from 'react';
/** Quiet empty-state with Lucide glyph, serif message, optional action. */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: string;
  title: string;
  message?: string;
  action?: React.ReactNode;
}
export function EmptyState(props: EmptyStateProps): JSX.Element;
