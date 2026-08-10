import * as React from 'react';
/** Author avatar + name + date (+ optional read time) meta line. */
export interface MetaLineProps extends React.HTMLAttributes<HTMLDivElement> {
  author?: string;
  avatar?: string;
  date?: string;
  readTime?: string;
  size?: 'sm' | 'md';
}
export function MetaLine(props: MetaLineProps): JSX.Element;
