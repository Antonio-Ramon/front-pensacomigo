import * as React from 'react';
/** Styled native select with Lucide chevron. */
export interface SelectOption { value: string; label: string; }
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: (SelectOption | string)[];
  wrapStyle?: React.CSSProperties;
}
export function Select(props: SelectProps): JSX.Element;
