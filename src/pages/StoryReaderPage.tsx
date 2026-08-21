import { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { stories, monsters } from '../content-loader';
import { useStoryData } from '../hooks/useStoryData';
import RelatedMonsters from '../components/RelatedMonsters';
import NotFoundStory from '../components/NotFoundStory';
import BackNavigation from '../components/BackNavigation';
import SectionHeader from '../components/SectionHeader';
import StoryEnding from '../components/StoryEnding';
import ReadingProgressBar from '../components/ReadingProgressBar';
import NextTaleCard from '../components/NextTaleCard';

export default function StoryReaderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const { getStoryById, getNextStory } = useStoryData(stories);
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  const story = id ? getStoryById(id) : undefined;
  const nextStory = id ? getNextStory(id) : undefined;

  const relatedMonsters = useMemo(() => {
    if (!story?.monsterIds) return [];
    return story.monsterIds
      .map(monsterId => monsters[monsterId])
      .filter((m): m is NonNullable<typeof m> => m !== undefined);
  }, [story?.monsterIds]);

  useEffect(() => {
    window.scrollTo(0, 0);
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!story) {
    return <NotFoundStory storyId={id} />;
  }

  const imageUrl = story.image ? `${import.meta.env.BASE_URL}images/stories/${story.image}` : null;
  const sections = story.sections || (story.content ? [{ id: 'section-1', title: story.title, content: story.content }] : []);
  const handleMonsterClick = (monsterId: string) => navigate(`/bestiary/${monsterId}`);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        data-testid="story-reader"
        key={id}
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ minHeight: '100vh' }}
      >
        <ReadingProgressBar />

        {/* Hero */}
        <section data-testid="story-hero" style={{ position: 'relative', width: '100%', minHeight: '80vh', overflow: 'hidden', background: '#100e14' }}>
          {imageUrl && (
            <motion.img
              src={imageUrl}
              alt={`${story.title} illustration`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              initial={prefersReduced ? false : { scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = `${import.meta.env.BASE_URL}images/placeholders/missing.png`;
              }}
            />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,7,10,0.95) 0%, rgba(8,7,10,0.3) 50%, transparent 100%)' }} />
          <motion.div
            style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '0.3em', color: '#b8852a', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              A Witcher's Account
            </p>
            <h1 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 700, color: '#ddd0b8', letterSpacing: '0.05em', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              {story.title}
            </h1>
            <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: 'italic', fontSize: '1.1rem', color: '#8a7d6a', lineHeight: 1.7, borderLeft: '2px solid #2e2530', paddingLeft: '1.25rem', maxWidth: '600px' }}>
              {story.summary}
            </p>
          </motion.div>
        </section>

        {/* Back nav */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 2rem 0' }}>
          <BackNavigation to="/stories" label="The Tales" />
        </div>

        {/* Two-column layout */}
        <div className="story-reader-layout" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 220px', gap: '4rem', alignItems: 'start' }}>
          {/* Main content */}
          <div>
            {/* Progress strip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', padding: '0.75rem 1rem', background: '#100e14', border: '1px solid #2e2530' }}>
              <div style={{ flex: 1, height: '2px', background: '#1c1820', borderRadius: '1px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #8b1a1a, #b8852a)', transition: 'width 0.15s linear' }} />
              </div>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.15em', color: '#7a6d5a', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                {Math.round(progress)}% read
              </span>
            </div>

            {/* Chapters */}
            <div data-testid="story-content">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  ref={(el) => { chapterRefs.current[index] = el; }}
                  data-testid="story-section"
                  style={{ marginBottom: '3.5rem', borderLeft: `2px solid ${activeChapter === index ? '#b8852a' : '#2e2530'}`, paddingLeft: '2rem', marginLeft: '1rem', transition: 'border-color 0.3s' }}
                >
                  <SectionHeader index={index} title={section.title} isActive={activeChapter === index} />
                  {section.content.split('\n\n').map((para, pi) => (
                    <p
                      key={pi}
                      style={{ fontFamily: "'Crimson Text', Georgia, serif", fontSize: '1.15rem', color: '#c0b09a', lineHeight: 1.85, marginBottom: '1.25rem', textIndent: pi === 0 ? '0' : '2em' }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <StoryEnding />

            {/* Related Monsters */}
            <RelatedMonsters monsters={relatedMonsters} onMonsterClick={handleMonsterClick} />

            {/* Next Tale */}
            {nextStory && <NextTaleCard story={nextStory} />}

            {/* Navigation */}
            <nav style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }} aria-label="Story navigation">
              <Link to="/stories" style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: '#b8852a', textDecoration: 'none', textTransform: 'uppercase' }}>Return to Stories</Link>
              <Link to="/bestiary" style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.15em', color: '#b8852a', textDecoration: 'none', textTransform: 'uppercase' }}>Explore Bestiary</Link>
            </nav>
          </div>

          {/* Sidebar: Table of Contents */}
          <div className="story-reader-sidebar" style={{ position: 'sticky', top: '84px' }}>
            <div style={{ background: '#100e14', border: '1px solid #2e2530', padding: '1.25rem' }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', letterSpacing: '0.25em', color: '#7a6d5a', textTransform: 'uppercase', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #1c1820' }}>
                Chapters
              </p>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {sections.map((chapter, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      chapterRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', letterSpacing: '0.04em', color: activeChapter === index ? '#b8852a' : '#7a6d5a', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '0.3rem 0', transition: 'color 0.2s', lineHeight: 1.4, borderLeft: `2px solid ${activeChapter === index ? '#b8852a' : 'transparent'}`, paddingLeft: '0.6rem', display: 'block', width: '100%' }}
                  >
                    <span style={{ fontSize: '0.55rem', color: '#5a4e3a', display: 'block', marginBottom: '0.1rem' }}>
                      {index + 1}.
                    </span>
                    {chapter.title}
                  </button>
                ))}
              </div>

              {/* Progress in sidebar */}
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #1c1820' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: '#5a4e3a', textTransform: 'uppercase' }}>Progress</span>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.6rem', color: '#7a6d5a' }}>{Math.round(progress)}%</span>
                </div>
                <div style={{ height: '3px', background: '#1c1820', borderRadius: '1px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #8b1a1a, #b8852a)', transition: 'width 0.15s linear' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: '4rem' }} />
      </motion.div>
    </AnimatePresence>
  );
}
