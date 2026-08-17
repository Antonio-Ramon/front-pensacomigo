import * as React from 'react';
/**
 * Inline newsletter subscribe block.
 */
export interface NewsletterCTAProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string; description?: React.ReactNode; cta?: string; placeholder?: string;
  tone?: 'dashed' | 'solid'; onSubscribe?: (email: string) => void;
}
export function NewsletterCTA(props: NewsletterCTAProps): JSX.Element;
