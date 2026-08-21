import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { monsters, stories, categories } from '../content-loader';
import { useMonsterFilter } from '../hooks/useMonsterFilter';
import MonsterCard from '../components/MonsterCard';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function BestiaryPage() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();

  const {
    filterState,
    filteredMonsters,
    searchInput,
    setSearch,
    setCategory,
    setThreatLevel,
    resetFilters,
    clearSearch,
  } = useMonsterFilter(monsters);

  const storyList = Object.values(stories);
  const getRelatedCount = (monsterId: string) =>
    storyList.filter(s => s.monsterIds.includes(monsterId)).length;

  const handleMonsterClick = (id: string) => {
    navigate(`/bestiary/${id}`);
  };

  if (!monsters || Object.keys(monsters).length === 0) {
    return (
      <div className="bestiary">
        <header className="bestiary__hero">
          <p className="bestiary__eyebrow">A Witcher's Field Guide</p>
          <h1 className="bestiary__title">BESTIARY</h1>
          <div className="medallion-divider" style={{ maxWidth: '400px', margin: '0 auto 1.5rem' }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: '#b8852a' }}>&#10022;</span>
          </div>
          <p className="bestiary__tagline">Knowledge of your quarry is the difference between a witcher who grows old and one who does not.</p>
        </header>
        <ErrorState />
      </div>
    );
  }

  return (
    <div className="bestiary">
      <motion.header
        className="bestiary__hero"
        initial={prefersReduced ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="bestiary__eyebrow">A Witcher's Field Guide</p>
        <h1 className="bestiary__title">BESTIARY</h1>
        <div className="medallion-divider" style={{ maxWidth: '400px', margin: '0 auto 1.5rem' }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.2em', color: '#b8852a' }}>&#10022;</span>
        </div>
        <p className="bestiary__tagline">Knowledge of your quarry is the difference between a witcher who grows old and one who does not.</p>
      </motion.header>

      <FilterBar
        categories={categories}
        filterState={filterState}
        searchInput={searchInput}
        filteredCount={filteredMonsters.length}
        totalCount={Object.keys(monsters).length}
        onSearchChange={setSearch}
        onSearchClear={clearSearch}
        onCategorySelect={setCategory}
        onThreatSelect={setThreatLevel}
        onReset={resetFilters}
      />

      {filteredMonsters.length === 0 ? (
        <EmptyState onReset={resetFilters} />
      ) : (
        <motion.div
          className="bestiary__grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredMonsters.map((monster) => (
            <motion.div key={monster.id} variants={itemVariants}>
              <MonsterCard
                monster={monster}
                relatedStoryCount={getRelatedCount(monster.id)}
                onClick={handleMonsterClick}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <footer className="bestiary__footer">
        {filteredMonsters.length} monsters shown
      </footer>
    </div>
  );
}
