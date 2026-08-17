import * as React from 'react';
/**
 * Reading-trail stage cell.
 */
export interface StageCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  number?: string; title: React.ReactNode; description?: React.ReactNode; refs?: string[]; cta?: string;
}
export function StageCard(props: StageCardProps): JSX.Element;
