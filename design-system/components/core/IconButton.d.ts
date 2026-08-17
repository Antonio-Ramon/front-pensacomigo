import * as React from 'react';
/** Square icon-only button (Lucide icon name). */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string; label: string; variant?: 'ghost' | 'outline'; size?: number;
}
export function IconButton(props: IconButtonProps): JSX.Element;
