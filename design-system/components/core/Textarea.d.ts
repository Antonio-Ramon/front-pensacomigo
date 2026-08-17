import * as React from 'react';
/** Multi-line text field. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode; wrapStyle?: React.CSSProperties;
}
export function Textarea(props: TextareaProps): JSX.Element;
