import * as React from 'react';
/**
 * Pull-out scripture panel.
 */
export interface VerseBlockProps extends React.HTMLAttributes<HTMLElement> { reference: React.ReactNode; }
export function VerseBlock(props: VerseBlockProps): JSX.Element;
