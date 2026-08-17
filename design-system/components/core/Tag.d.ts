import * as React from 'react';
/** Mono hairline tag for refs and topics. */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> { tone?: 'neutral' | 'accent' | 'primary'; }
export function Tag(props: TagProps): JSX.Element;
