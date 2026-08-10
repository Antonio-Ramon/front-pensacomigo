import * as React from 'react';
/**
 * Blog post card. layout="card" (16:9 thumb stacked) or layout="row" (editorial list row:
 * small 4:3 thumb left, large serif title, 2-line lede). Use "row" for reading-first indexes.
 * @startingPoint section="Blog" subtitle="Post card with thumb, title, tags" viewport="380x420"
 */
export interface PostCardProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  excerpt?: string;
  image?: string;
  author?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  /** @default "card" */
  layout?: 'card' | 'row';
}
export function PostCard(props: PostCardProps): JSX.Element;
