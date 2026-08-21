import { useNavigate } from "react-router";
import { STORIES } from "../data/stories";
import { getMonster } from "../data/monsters";

export default function Stories() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          position: "relative",
          padding: "5rem 2rem 4rem",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(26,36,21,0.5) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.7rem",
            letterSpacing: "0.35em",
            color: "#b8852a",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Recorded Accounts
        </p>
        <h1
          style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            color: "#ddd0b8",
            letterSpacing: "0.08em",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}
        >
          THE TALES
        </h1>
        <div className="medallion-divider" style={{ maxWidth: "400px", margin: "0 auto 1.5rem" }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: "#b8852a" }}>
            ✦
          </span>
        </div>
        <p
          style={{
            fontFamily: "'IM Fell English', serif",
            fontStyle: "italic",
            fontSize: "1.1rem",
            color: "#8a7d6a",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Every contract leaves a story. Most are better forgotten. These are the ones worth remembering.
        </p>
      </div>

      {/* Stories Grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            color: "#5a4f42",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          {STORIES.length} tales recorded
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1px",
            background: "#2e2530",
          }}
        >
          {STORIES.map((story, index) => {
            const monsters = story.relatedMonsters
              .map((id) => getMonster(id))
              .filter(Boolean);

            return (
              <div
                key={story.id}
                className="story-card"
                onClick={() => navigate(`/stories/${story.id}`)}
                style={{ background: "#08070a", cursor: "pointer" }}
              >
                <div style={{ padding: "1.75rem" }}>
                  {/* Number */}
                  <p
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.25em",
                      color: "#2e2530",
                      textTransform: "uppercase",
                      marginBottom: "0.6rem",
                    }}
                  >
                    Tale {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "#ddd0b8",
                      letterSpacing: "0.04em",
                      lineHeight: 1.3,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {story.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Crimson Text', serif",
                      fontSize: "0.95rem",
                      color: "#6e6358",
                      lineHeight: 1.65,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      marginBottom: "1rem",
                    }}
                  >
                    {story.summary}
                  </p>

                  {/* Monsters and chapters */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "0.9rem",
                      borderTop: "1px solid #1c1820",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {monsters.map(
                        (m) =>
                          m && (
                            <span
                              key={m.id}
                              style={{
                                fontFamily: "'Cinzel', serif",
                                fontSize: "0.55rem",
                                letterSpacing: "0.1em",
                                color: "#5a4f42",
                                border: "1px solid #1c1820",
                                padding: "0.15rem 0.5rem",
                                textTransform: "uppercase",
                              }}
                            >
                              {m.name}
                            </span>
                          )
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        color: "#3a2e1e",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {story.chapters.length} chapters
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ height: "4rem" }} />
      </div>
    </div>
  );
}
