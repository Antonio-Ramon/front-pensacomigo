import * as React from 'react';
/**
 * Closing application checklist.
 */
export interface ApplyListProps extends React.HTMLAttributes<HTMLElement> {
  label?: string; title?: string; items?: string[];
}
export function ApplyList(props: ApplyListProps): JSX.Element;
