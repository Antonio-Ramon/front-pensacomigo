import * as React from 'react';
/** Multiline text field matching Input styling. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  wrapStyle?: React.CSSProperties;
}
export function Textarea(props: TextareaProps): JSX.Element;
