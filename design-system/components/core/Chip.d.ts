import * as React from 'react';
/**
 * Selectable mono pill (mood / topic filter).
 */
export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { pressed?: boolean; }
export function Chip(props: ChipProps): JSX.Element;
