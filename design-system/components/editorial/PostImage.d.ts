import * as React from 'react';
/** Author-chosen photograph (cover or in-post figure) with striped placeholder fallback. */
export interface PostImageProps extends React.HTMLAttributes<HTMLElement> {
  src?: string; alt?: string; caption?: React.ReactNode; label?: string; height?: number | string;
}
export function PostImage(props: PostImageProps): JSX.Element;
