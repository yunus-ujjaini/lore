import { Link } from 'react-router-dom';

interface BackNavigationProps {
  to?: string;
  label?: string;
}

export default function BackNavigation({ to = '/bestiary', label = 'Back to Bestiary' }: BackNavigationProps) {
  return (
    <nav className="back-navigation" aria-label="Back navigation">
      <Link to={to} className="back-navigation__link">
        <span aria-hidden="true">←</span>
        {label}
      </Link>
    </nav>
  );
}
