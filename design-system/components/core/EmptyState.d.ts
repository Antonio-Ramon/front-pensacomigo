import * as React from 'react';
/** Text-only empty state. */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string; title: React.ReactNode; action?: React.ReactNode;
}
export function EmptyState(props: EmptyStateProps): JSX.Element;
