import * as React from 'react';
/**
 * Archive list row — date, generative thumb, title, dek, tags, travelling arrow.
 */
export interface PostRowProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  date?: string; title: React.ReactNode; dek?: React.ReactNode; tags?: string[];
  image?: string; imageAlt?: string;
}
export function PostRow(props: PostRowProps): JSX.Element;
