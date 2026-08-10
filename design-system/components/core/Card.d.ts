import * as React from 'react';
/**
 * White surface card with warm hairline + subtle shadow.
 * @startingPoint section="Core" subtitle="White surface container" viewport="700x220"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  pad?: boolean;
  hover?: boolean;
}
export function Card(props: CardProps): JSX.Element;
