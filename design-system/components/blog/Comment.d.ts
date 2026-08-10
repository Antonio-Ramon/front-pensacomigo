import * as React from 'react';
/** A single comment with avatar, name, relative time, body, and one level of replies. */
export interface CommentData {
  name: string;
  avatar?: string;
  time: string;
  children: React.ReactNode;
}
export interface CommentProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  avatar?: string;
  time: string;
  reply?: boolean;
  onReply?: () => void;
  replies?: CommentData[];
}
export function Comment(props: CommentProps): JSX.Element;
