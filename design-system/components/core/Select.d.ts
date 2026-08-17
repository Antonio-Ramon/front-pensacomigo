import * as React from 'react';
/** Native select with system chrome. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode; options?: Array<string | { value: string; label: string }>;
  wrapStyle?: React.CSSProperties;
}
export function Select(props: SelectProps): JSX.Element;
