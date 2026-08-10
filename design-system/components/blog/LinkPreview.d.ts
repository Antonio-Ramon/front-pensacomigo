import * as React from 'react';
/** External link preview card: thumbnail, title, description, source domain. */
export interface LinkPreviewProps extends React.HTMLAttributes<HTMLAnchorElement> {
  url?: string;
  title: string;
  description?: string;
  image?: string;
  domain?: string;
}
export function LinkPreview(props: LinkPreviewProps): JSX.Element;
