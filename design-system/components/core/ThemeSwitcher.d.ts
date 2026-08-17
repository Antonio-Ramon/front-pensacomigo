import * as React from 'react';
/**
 * Theme switch for papel / tinta / terra.
 */
export interface ThemeSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  themes?: string[]; storageKey?: string;
}
export function ThemeSwitcher(props: ThemeSwitcherProps): JSX.Element;
