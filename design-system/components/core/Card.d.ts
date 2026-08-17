import * as React from 'react';
/**
 * Hairline surface panel.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'solid' | 'dashed'; padding?: number | string;
}
export function Card(props: CardProps): JSX.Element;
