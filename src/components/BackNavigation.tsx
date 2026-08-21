import { Link } from 'react-router-dom';

interface BackNavigationProps {
  to?: string;
  label?: string;
}

export default function BackNavigation({ to = '/bestiary', label = 'Back to Bestiary' }: BackNavigationProps) {
  return (
    <nav aria-label="Back navigation">
      <Link to={to} className="back-nav">
        <span aria-hidden="true">← </span>
        {label}
      </Link>
    </nav>
  );
}
