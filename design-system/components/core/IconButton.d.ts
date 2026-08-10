import * as React from 'react';
/** Icon-only button rendering a Lucide glyph. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline';
}
export function IconButton(props: IconButtonProps): JSX.Element;
