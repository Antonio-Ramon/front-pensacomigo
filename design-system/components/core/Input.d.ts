import * as React from 'react';
/** Text input with optional field label and accent focus ring. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapStyle?: React.CSSProperties;
}
export function Input(props: InputProps): JSX.Element;
