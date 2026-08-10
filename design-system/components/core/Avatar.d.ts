import * as React from 'react';
/** Round avatar with initial fallback. */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  name?: string;
  size?: number;
}
export function Avatar(props: AvatarProps): JSX.Element;
