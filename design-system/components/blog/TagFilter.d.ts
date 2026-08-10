import * as React from 'react';
/** Horizontal pill tag filter with a reset ("Todas") chip. */
export interface TagFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  tags?: string[];
  active?: string | null;
  onChange?: (tag: string | null) => void;
  allLabel?: string;
}
export function TagFilter(props: TagFilterProps): JSX.Element;
