import * as React from 'react';
/** Fully-rounded pill tag; active state fills with accent; optional removable chip. */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  tone?: 'warm' | 'teal';
  size?: 'sm' | 'md';
  onRemove?: () => void;
}
export function Tag(props: TagProps): JSX.Element;
