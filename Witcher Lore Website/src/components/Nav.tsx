import { NavLink } from "react-router";

export default function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "linear-gradient(180deg, rgba(8,7,10,0.98) 0%, rgba(8,7,10,0.92) 100%)",
        borderBottom: "1px solid #2e2530",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <NavLink
          to="/"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="13" stroke="#b8852a" strokeWidth="1.5" />
            <path d="M14 4 L10 14 L14 12 L18 14 Z" fill="#b8852a" opacity="0.9" />
            <path d="M14 24 L10 14 L14 16 L18 14 Z" fill="#b8852a" opacity="0.6" />
            <circle cx="14" cy="14" r="2.5" fill="#b8852a" />
          </svg>
          <span
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "0.9rem",
              letterSpacing: "0.2em",
              color: "#ddd0b8",
              fontWeight: 700,
            }}
          >
            THE WITCHER
          </span>
        </NavLink>

        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            Bestiary
          </NavLink>
          <span style={{ color: "#2e2530", fontSize: "0.7rem" }}>✦</span>
          <NavLink
            to="/stories"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            Stories
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
