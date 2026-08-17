import * as React from 'react';
/** Prev / next article pager. */
export interface PagerProps extends React.HTMLAttributes<HTMLElement> {
  prev?: { href?: string; title: string } | null;
  next?: { href?: string; title: string } | null;
}
export function Pager(props: PagerProps): JSX.Element;
