import * as React from 'react';
/**
 * Terminal-framed verse of the day.
 */
export interface VerseTerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  slug?: string; command?: string; cite?: React.ReactNode;
}
export function VerseTerminal(props: VerseTerminalProps): JSX.Element;
