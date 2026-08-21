import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MONSTERS, CATEGORIES, type MonsterCategory } from "../data/monsters";
import ThreatStars from "../components/ThreatStars";

const SESSION_KEY = "bestiary_filters";

interface Filters {
  search: string;
  category: MonsterCategory | "";
  threat: number | 0;
}

function loadFilters(): Filters {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { search: "", category: "", threat: 0 };
}

const CATEGORY_COLORS: Record<MonsterCategory, string> = {
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

export default function Bestiary() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>(loadFilters);

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(filters));
  }, [filters]);

  const filtered = MONSTERS.filter((m) => {
    const matchSearch =
      !filters.search ||
      m.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      m.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchCategory = !filters.category || m.category === filters.category;
    const matchThreat = !filters.threat || m.threatLevel === filters.threat;
    return matchSearch && matchCategory && matchThreat;
  });

  const resetFilters = () => setFilters({ search: "", category: "", threat: 0 });

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
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,26,26,0.12) 0%, transparent 70%)",
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
          A Witcher's Field Guide
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
          BESTIARY
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
          Knowledge of your quarry is the difference between a witcher who grows old and one who does not.
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem 2rem",
        }}
      >
        <div
          style={{
            background: "#100e14",
            border: "1px solid #2e2530",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {/* Search */}
          <div style={{ marginBottom: "1.25rem" }}>
            <input
              className="search-input"
              type="text"
              placeholder="Search monsters..."
              value={filters.search}
              onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: "1rem" }}>
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "#5a4f42",
                textTransform: "uppercase",
                marginBottom: "0.6rem",
              }}
            >
              Category
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              <button
                className={`filter-pill${!filters.category ? " active" : ""}`}
                onClick={() => setFilters((f) => ({ ...f, category: "" }))}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill${filters.category === cat ? " active" : ""}`}
                  onClick={() =>
                    setFilters((f) => ({ ...f, category: f.category === cat ? "" : cat }))
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Threat Level */}
          <div>
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "#5a4f42",
                textTransform: "uppercase",
                marginBottom: "0.6rem",
              }}
            >
              Threat Level
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              <button
                className={`filter-pill${!filters.threat ? " active" : ""}`}
                onClick={() => setFilters((f) => ({ ...f, threat: 0 }))}
              >
                All
              </button>
              {[1, 2, 3, 4, 5].map((t) => (
                <button
                  key={t}
                  className={`filter-pill${filters.threat === t ? " active" : ""}`}
                  onClick={() =>
                    setFilters((f) => ({ ...f, threat: f.threat === t ? 0 : (t as 1 | 2 | 3 | 4 | 5) }))
                  }
                  style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
                >
                  <ThreatStars level={t} max={t} size={11} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              color: "#5a4f42",
              textTransform: "uppercase",
            }}
          >
            {filtered.length} {filtered.length === 1 ? "entry" : "entries"} found
          </p>
          {(filters.search || filters.category || filters.threat) && (
            <button
              onClick={resetFilters}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: "#b8852a",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Monster Grid */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "6rem 2rem",
              border: "1px solid #2e2530",
            }}
          >
            <p
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "1.2rem",
                color: "#3a2e1e",
                marginBottom: "1rem",
              }}
            >
              No Entries Found
            </p>
            <p
              style={{
                fontFamily: "'IM Fell English', serif",
                fontStyle: "italic",
                color: "#5a4f42",
                marginBottom: "1.5rem",
              }}
            >
              Even the most thorough bestiary has its limits.
            </p>
            <button
              onClick={resetFilters}
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: "#b8852a",
                background: "none",
                border: "1px solid #b8852a",
                padding: "0.5rem 1.5rem",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1px",
              background: "#2e2530",
            }}
          >
            {filtered.map((monster) => (
              <div
                key={monster.id}
                className="monster-card"
                onClick={() => navigate(`/bestiary/${monster.id}`)}
                style={{ background: "#08070a" }}
              >
                {/* Category color bar */}
                <div
                  style={{
                    height: "3px",
                    background: `linear-gradient(90deg, ${CATEGORY_COLORS[monster.category]}, transparent)`,
                  }}
                />
                <div style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                      gap: "0.5rem",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "#ddd0b8",
                        letterSpacing: "0.05em",
                        lineHeight: 1.2,
                      }}
                    >
                      {monster.name}
                    </h3>
                    <ThreatStars level={monster.threatLevel} size={12} />
                  </div>

                  <span
                    className="category-badge"
                    style={{
                      color: "#8a7d6a",
                      borderColor: "#2e2530",
                      display: "inline-block",
                      marginBottom: "0.9rem",
                    }}
                  >
                    {monster.category}
                  </span>

                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#6e6358",
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {monster.description}
                  </p>

                  <div
                    style={{
                      marginTop: "1rem",
                      paddingTop: "1rem",
                      borderTop: "1px solid #1c1820",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
                        color: "#3a2e1e",
                        textTransform: "uppercase",
                      }}
                    >
                      {monster.relatedStories.length} {monster.relatedStories.length === 1 ? "tale" : "tales"}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        color: "#b8852a",
                        textTransform: "uppercase",
                      }}
                    >
                      Read Entry →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ height: "4rem" }} />
      </div>
    </div>
  );
}
