import * as React from 'react';
/**
 * Single-select mood filter row.
 */
export interface MoodChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: Array<string | { value: string; label: string }>;
  value?: string | null; onChange?: (value: string | null) => void;
}
export function MoodChips(props: MoodChipsProps): JSX.Element;
