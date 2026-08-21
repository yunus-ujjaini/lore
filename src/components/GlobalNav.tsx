import { Link, useLocation } from 'react-router-dom';

export default function GlobalNav() {
  const location = useLocation();
  const isBestiary = location.pathname.startsWith('/bestiary');
  const isStories = location.pathname.startsWith('/stories');

  return (
    <nav className="global-nav">
      <div className="global-nav__inner">
        <Link to="/bestiary" className="global-nav__brand">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="13" stroke="#b8852a" strokeWidth="1.5" />
            <path d="M14 4 L10 14 L14 12 L18 14 Z" fill="#b8852a" opacity="0.9" />
            <path d="M14 24 L10 14 L14 16 L18 14 Z" fill="#b8852a" opacity="0.6" />
            <circle cx="14" cy="14" r="2.5" fill="#b8852a" />
          </svg>
          <span className="global-nav__wordmark">THE WITCHER</span>
        </Link>

        <div className="global-nav__links">
          <Link
            to="/bestiary"
            className={`nav-link ${isBestiary ? 'active' : ''}`}
          >
            Bestiary
          </Link>
          <span className="global-nav__separator">&#10022;</span>
          <Link
            to="/stories"
            className={`nav-link ${isStories ? 'active' : ''}`}
          >
            Stories
          </Link>
        </div>
      </div>
    </nav>
  );
}
