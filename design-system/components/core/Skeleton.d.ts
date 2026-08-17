import * as React from 'react';
/** Quiet loading placeholder. */
export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  width?: number | string; height?: number | string; radius?: string;
}
export function Skeleton(props: SkeletonProps): JSX.Element;
