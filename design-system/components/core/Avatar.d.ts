import * as React from 'react';
/** Initials avatar (accent fill). */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: string; initials?: string; size?: number;
}
export function Avatar(props: AvatarProps): JSX.Element;
