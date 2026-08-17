import * as React from 'react';
/**
 * Sticky table-of-contents rail with reading tools.
 */
export interface TocRailProps extends React.HTMLAttributes<HTMLElement> {
  label?: string; sections?: Array<{ id: string; label: string }>;
  activeId?: string; onSelect?: (id: string) => void; tools?: React.ReactNode;
}
export function TocRail(props: TocRailProps): JSX.Element;
