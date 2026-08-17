import * as React from 'react';
/** Author bio panel. */
export interface AuthorBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string; initials?: string; bio?: React.ReactNode;
}
export function AuthorBox(props: AuthorBoxProps): JSX.Element;
