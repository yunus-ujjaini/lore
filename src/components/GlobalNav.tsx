import { Link, useLocation } from 'react-router-dom';

export default function GlobalNav() {
  const location = useLocation();
  const isBestiary = location.pathname.startsWith('/bestiary');
  const isStories = location.pathname.startsWith('/stories');

  return (
    <nav className="global-nav">
      <Link to="/bestiary" className={`global-nav__link ${isBestiary ? 'global-nav__link--active' : ''}`}>
        Bestiary
      </Link>
      <Link to="/stories" className={`global-nav__link ${isStories ? 'global-nav__link--active' : ''}`}>
        Stories
      </Link>
    </nav>
  );
}
