import * as React from 'react';
/**
 * Primary action button in Pensa Comigo's terracotta accent.
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost button" viewport="700x120"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'warm' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}
export function Button(props: ButtonProps): JSX.Element;
