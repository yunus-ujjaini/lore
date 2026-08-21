import type { ReactNode } from 'react';

interface DropCapProps {
  children: ReactNode;
}

export default function DropCap({ children }: DropCapProps) {
  return <div className="drop-cap">{children}</div>;
}
