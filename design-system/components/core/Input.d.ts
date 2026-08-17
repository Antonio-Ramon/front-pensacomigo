import * as React from 'react';
/** Text input, pill by default. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode; hint?: React.ReactNode; shape?: 'pill' | 'box';
  wrapStyle?: React.CSSProperties;
}
export function Input(props: InputProps): JSX.Element;
