import * as React from 'react';
/** Shimmer loading placeholder. */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: 'line' | 'title' | 'thumb' | 'circle';
  width?: number | string;
  height?: number | string;
}
export function Skeleton(props: SkeletonProps): JSX.Element;
