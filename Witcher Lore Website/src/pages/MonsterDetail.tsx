import { useParams, useNavigate, Link } from "react-router";
import { getMonster } from "../data/monsters";
import { STORIES } from "../data/stories";
import ThreatStars from "../components/ThreatStars";

const CATEGORY_COLORS: Record<string, string> = {
  Beasts: "#5a4a3a",
  Vampires: "#5a1a3a",
  Necrophages: "#3a5a1a",
  Wraiths: "#1a2a5a",
  "Cursed Ones": "#5a2a1a",
  Hybrids: "#4a3a5a",
  Elementa: "#5a4a1a",
  Insectoids: "#2a4a1a",
  Ogroids: "#4a3a1a",
  Relicts: "#2a1a4a",
};

export default function MonsterDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const monster = id ? getMonster(id) : undefined;

  if (!monster) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "1.5rem",
            color: "#3a2e1e",
            marginBottom: "0.5rem",
          }}
        >
          Entry Not Found
        </p>
        <p
          style={{
            fontFamily: "'IM Fell English', serif",
            fontStyle: "italic",
            color: "#5a4f42",
            marginBottom: "2rem",
          }}
        >
          This creature has no recorded entry in the bestiary.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            color: "#b8852a",
            background: "none",
            border: "1px solid #b8852a",
            padding: "0.6rem 1.5rem",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          Return to Bestiary
        </button>
      </div>
    );
  }

  const relatedStories = STORIES.filter((s) => monster.relatedStories.includes(s.id));
  const accentColor = CATEGORY_COLORS[monster.category] || "#3a2e1e";

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Back */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 2rem 0" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: "#5a4f42",
            background: "none",
            border: "none",
            cursor: "pointer",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: 0,
          }}
        >
          ← Bestiary
        </button>
      </div>

      {/* Header */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "3rem 2rem 0",
        }}
      >
        <div
          style={{
            borderLeft: `4px solid ${accentColor}`,
            paddingLeft: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <span
            className="category-badge"
            style={{ color: "#8a7d6a", borderColor: "#2e2530", marginBottom: "0.75rem", display: "inline-block" }}
          >
            {monster.category}
          </span>
          <h1
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#ddd0b8",
              letterSpacing: "0.05em",
              marginBottom: "0.75rem",
              lineHeight: 1.15,
            }}
          >
            {monster.name}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <ThreatStars level={monster.threatLevel} size={16} />
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "#5a4f42",
                textTransform: "uppercase",
              }}
            >
              Threat Level {monster.threatLevel}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, #b8852a, transparent)",
            marginBottom: "2.5rem",
          }}
        />

        {/* Main layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr minmax(0, 260px)",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Left: content */}
          <div>
            <section style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.25em",
                  color: "#b8852a",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Field Description
              </h2>
              <p
                style={{
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontSize: "1.1rem",
                  color: "#c0b09a",
                  lineHeight: 1.8,
                }}
              >
                {monster.description}
              </p>
            </section>

            <section style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.25em",
                  color: "#b8852a",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Scholar's Notes
              </h2>
              <p
                style={{
                  fontFamily: "'IM Fell English', serif",
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                  color: "#8a7d6a",
                  lineHeight: 1.9,
                  borderLeft: "2px solid #2e2530",
                  paddingLeft: "1.25rem",
                }}
              >
                {monster.lore}
              </p>
            </section>

            {/* Weaknesses */}
            <section>
              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.25em",
                  color: "#b8852a",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                Known Weaknesses
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {monster.weaknesses.map((w) => (
                  <span
                    key={w}
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      color: "#8a7d6a",
                      border: "1px solid #2e2530",
                      padding: "0.25rem 0.7rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right: metadata */}
          <div>
            <div
              style={{
                background: "#100e14",
                border: "1px solid #2e2530",
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  color: "#5a4f42",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid #1c1820",
                }}
              >
                Entry Details
              </h3>
              <dl style={{ display: "grid", gap: "0.75rem" }}>
                <div>
                  <dt style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#3a2e1e", textTransform: "uppercase", marginBottom: "0.2rem" }}>Classification</dt>
                  <dd style={{ fontFamily: "'Crimson Text', serif", fontSize: "1rem", color: "#ddd0b8" }}>{monster.category}</dd>
                </div>
                <div>
                  <dt style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#3a2e1e", textTransform: "uppercase", marginBottom: "0.2rem" }}>Threat Rating</dt>
                  <dd><ThreatStars level={monster.threatLevel} size={14} /></dd>
                </div>
                <div>
                  <dt style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#3a2e1e", textTransform: "uppercase", marginBottom: "0.2rem" }}>Recorded Tales</dt>
                  <dd style={{ fontFamily: "'Crimson Text', serif", fontSize: "1rem", color: "#ddd0b8" }}>{relatedStories.length}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <div style={{ marginTop: "4rem" }}>
            <div className="medallion-divider" style={{ marginBottom: "2rem" }}>
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  color: "#b8852a",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                ✦ Featured in Tales ✦
              </span>
            </div>

            <div style={{ display: "grid", gap: "1px", background: "#2e2530" }}>
              {relatedStories.map((story) => (
                <Link
                  key={story.id}
                  to={`/stories/${story.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="story-card"
                    style={{ padding: "1.25rem 1.5rem" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                      <div>
                        <h4
                          style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: "1rem",
                            color: "#ddd0b8",
                            letterSpacing: "0.03em",
                            marginBottom: "0.35rem",
                          }}
                        >
                          {story.title}
                        </h4>
                        <p
                          style={{
                            fontFamily: "'Crimson Text', serif",
                            fontSize: "0.9rem",
                            color: "#5a4f42",
                            lineHeight: 1.5,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {story.summary}
                        </p>
                      </div>
                      <span
                        style={{
                          fontFamily: "'Cinzel', serif",
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          color: "#8b1a1a",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div style={{ height: "5rem" }} />
      </div>
    </div>
  );
}
