import * as React from 'react';
/**
 * Article reading column with drop cap and article-body styling.
 */
export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  html?: string; fontSize?: number | string;
}
export function Prose(props: ProseProps): JSX.Element;
