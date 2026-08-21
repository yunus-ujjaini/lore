import { useParams, useNavigate, Link } from "react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import { getStory, getRelatedStories } from "../data/stories";
import { getMonster } from "../data/monsters";
import ThreatStars from "../components/ThreatStars";

export default function StoryReader() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const story = id ? getStory(id) : undefined;
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  const nextTales = useMemo(
    () => (story ? getRelatedStories(story.id, 1) : []),
    [story?.id]
  );

  useEffect(() => {
    setProgress(0);
    setActiveChapter(0);
    chapterRefs.current = [];
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      const pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
      setProgress(pct);

      // Determine active chapter
      if (chapterRefs.current.length > 0) {
        let active = 0;
        chapterRefs.current.forEach((ref, i) => {
          if (ref) {
            const rect = ref.getBoundingClientRect();
            if (rect.top <= 120) active = i;
          }
        });
        setActiveChapter(active);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!story) {
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
          Tale Not Found
        </p>
        <p
          style={{
            fontFamily: "'IM Fell English', serif",
            fontStyle: "italic",
            color: "#5a4f42",
            marginBottom: "2rem",
          }}
        >
          This story has not yet been recorded.
        </p>
        <button
          onClick={() => navigate("/stories")}
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
          Return to Stories
        </button>
      </div>
    );
  }

  const relatedMonsters = story.relatedMonsters.map((mid) => getMonster(mid)).filter(Boolean);
  const nextTale = nextTales[0];

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Progress bar */}
      <div
        className="progress-bar"
        style={{ width: `${progress}%`, top: "64px" }}
      />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "3rem 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 220px",
          gap: "4rem",
          alignItems: "start",
        }}
      >
        {/* Main Content */}
        <div>
          {/* Back */}
          <button
            onClick={() => navigate("/stories")}
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
              marginBottom: "2.5rem",
            }}
          >
            ← The Tales
          </button>

          {/* Title */}
          <div style={{ marginBottom: "2.5rem" }}>
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                color: "#b8852a",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              A Witcher's Account
            </p>
            <h1
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                color: "#ddd0b8",
                letterSpacing: "0.05em",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              {story.title}
            </h1>
            <p
              style={{
                fontFamily: "'IM Fell English', serif",
                fontStyle: "italic",
                fontSize: "1.1rem",
                color: "#8a7d6a",
                lineHeight: 1.7,
                borderLeft: "2px solid #2e2530",
                paddingLeft: "1.25rem",
              }}
            >
              {story.summary}
            </p>
          </div>

          {/* Progress indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "3rem",
              padding: "0.75rem 1rem",
              background: "#100e14",
              border: "1px solid #2e2530",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "2px",
                background: "#1c1820",
                borderRadius: "1px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #8b1a1a, #b8852a)",
                  transition: "width 0.15s linear",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                color: "#5a4f42",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {Math.round(progress)}% read
            </span>
          </div>

          {/* Chapters */}
          <div ref={contentRef}>
            {story.chapters.map((chapter, index) => (
              <div
                key={index}
                ref={(el) => { chapterRefs.current[index] = el; }}
                className={`chapter-section${activeChapter === index ? " active" : ""}`}
                style={{ marginBottom: "3.5rem" }}
              >
                {/* Chapter header */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <p
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.25em",
                      color: activeChapter === index ? "#b8852a" : "#3a2e1e",
                      textTransform: "uppercase",
                      marginBottom: "0.4rem",
                      transition: "color 0.3s",
                    }}
                  >
                    Chapter {index + 1}
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "1.3rem",
                      fontWeight: 600,
                      color: activeChapter === index ? "#ddd0b8" : "#9a8d7a",
                      letterSpacing: "0.04em",
                      lineHeight: 1.3,
                      transition: "color 0.3s",
                    }}
                  >
                    {chapter.title}
                  </h2>
                </div>

                {/* Chapter content */}
                <div>
                  {chapter.content.split("\n\n").map((para, pi) => (
                    <p
                      key={pi}
                      style={{
                        fontFamily: "'Crimson Text', Georgia, serif",
                        fontSize: "1.15rem",
                        color: "#c0b09a",
                        lineHeight: 1.85,
                        marginBottom: "1.25rem",
                        textIndent: pi === 0 ? "0" : "2em",
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* End divider */}
          <div className="medallion-divider" style={{ margin: "3rem 0" }}>
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                color: "#b8852a",
                whiteSpace: "nowrap",
              }}
            >
              ✦ End of Tale ✦
            </span>
          </div>

          {/* Related Monsters */}
          {relatedMonsters.length > 0 && (
            <div style={{ marginBottom: "3rem" }}>
              <h3
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.25em",
                  color: "#5a4f42",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Monsters Encountered
              </h3>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                {relatedMonsters.map(
                  (m) =>
                    m && (
                      <Link
                        key={m.id}
                        to={`/bestiary/${m.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0.75rem 1rem",
                            background: "#100e14",
                            border: "1px solid #2e2530",
                            transition: "border-color 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLDivElement).style.borderColor = "#b8852a";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLDivElement).style.borderColor = "#2e2530";
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div>
                              <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.9rem", color: "#ddd0b8", marginBottom: "0.2rem" }}>
                                {m.name}
                              </p>
                              <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.1em", color: "#5a4f42", textTransform: "uppercase" }}>
                                {m.category}
                              </p>
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <ThreatStars level={m.threatLevel} size={12} />
                            <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#8b1a1a", textTransform: "uppercase" }}>
                              Bestiary →
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                )}
              </div>
            </div>
          )}

          {/* Next Tale */}
          {nextTale && (
            <div
              style={{
                background: "#100e14",
                border: "1px solid #2e2530",
                padding: "2rem",
                cursor: "pointer",
                transition: "border-color 0.25s",
              }}
              onClick={() => navigate(`/stories/${nextTale.id}`)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#8b1a1a";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#2e2530";
              }}
            >
              <p
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  color: "#5a4f42",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Next Tale
              </p>
              <h4
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1.1rem",
                  color: "#ddd0b8",
                  letterSpacing: "0.04em",
                  marginBottom: "0.5rem",
                }}
              >
                {nextTale.title}
              </h4>
              <p
                style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: "0.95rem",
                  color: "#5a4f42",
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {nextTale.summary}
              </p>
              <p
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "#8b1a1a",
                  textTransform: "uppercase",
                  marginTop: "1rem",
                }}
              >
                Continue Reading →
              </p>
            </div>
          )}

          <div style={{ height: "4rem" }} />
        </div>

        {/* Right sidebar: Table of Contents */}
        <div style={{ position: "sticky", top: "84px" }}>
          <div
            style={{
              background: "#100e14",
              border: "1px solid #2e2530",
              padding: "1.25rem",
            }}
          >
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                color: "#5a4f42",
                textTransform: "uppercase",
                marginBottom: "1rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid #1c1820",
              }}
            >
              Chapters
            </p>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              {story.chapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => {
                    chapterRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.04em",
                    color: activeChapter === index ? "#b8852a" : "#5a4f42",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: "0.3rem 0",
                    transition: "color 0.2s",
                    lineHeight: 1.4,
                    borderLeft: `2px solid ${activeChapter === index ? "#b8852a" : "transparent"}`,
                    paddingLeft: "0.6rem",
                    display: "block",
                    width: "100%",
                  }}
                >
                  <span style={{ fontSize: "0.55rem", color: "#3a2e1e", display: "block", marginBottom: "0.1rem" }}>
                    {index + 1}.
                  </span>
                  {chapter.title}
                </button>
              ))}
            </div>

            {/* Reading progress in sidebar */}
            <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #1c1820" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.55rem", letterSpacing: "0.15em", color: "#3a2e1e", textTransform: "uppercase" }}>
                  Progress
                </span>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.6rem", color: "#5a4f42" }}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div style={{ height: "3px", background: "#1c1820", borderRadius: "1px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #8b1a1a, #b8852a)",
                    transition: "width 0.15s linear",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
