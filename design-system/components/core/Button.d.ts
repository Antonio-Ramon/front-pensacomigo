import * as React from 'react';
/**
 * Pill button — the only button shape in the system.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'ghost' | 'quiet' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}
export function Button(props: ButtonProps): JSX.Element;
