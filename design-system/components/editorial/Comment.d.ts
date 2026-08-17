import * as React from 'react';
/**
 * Reader comment with one level of replies.
 */
export interface CommentProps extends React.HTMLAttributes<HTMLDivElement> {
  author: string; date?: string; depth?: number;
  replies?: Array<{ author: string; date?: string; body: React.ReactNode }>;
}
export function Comment(props: CommentProps): JSX.Element;
