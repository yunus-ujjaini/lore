import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { monsters, categories } from '../content-loader';
import { useMonsterFilter } from '../hooks/useMonsterFilter';
import MonsterCard from '../components/MonsterCard';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function BestiaryPage() {
  const navigate = useNavigate();

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

  const handleMonsterClick = (id: string) => {
    navigate(`/bestiary/${id}`);
  };

  // Error state (if no monsters loaded)
  if (!monsters || Object.keys(monsters).length === 0) {
    return (
      <div className="bestiary">
        <header className="bestiary__hero">
          <h1 className="bestiary__title">BESTIARY</h1>
          <p className="bestiary__tagline">A field guide to the monsters of the Northern Realms</p>
        </header>
        <ErrorState />
      </div>
    );
  }

  return (
    <div className="bestiary">
      {/* Hero Section with entrance animation */}
      <motion.header 
        className="bestiary__hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="bestiary__title">BESTIARY</h1>
        <p className="bestiary__tagline">A field guide to the monsters of the Northern Realms</p>
      </motion.header>

      {/* Filters */}
      <FilterBar
        categories={categories}
        filterState={filterState}
        searchInput={searchInput}
        onSearchChange={setSearch}
        onSearchClear={clearSearch}
        onCategorySelect={setCategory}
        onThreatSelect={setThreatLevel}
      />

      {/* Monster Grid with staggered card appearance */}
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
                onClick={handleMonsterClick}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Footer */}
      <footer className="bestiary__footer">
        <p>{filteredMonsters.length} monsters shown — data-driven from content layer</p>
      </footer>
    </div>
  );
}
