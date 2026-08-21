import { Routes, Route } from 'react-router-dom';
import BestiaryPage from './pages/BestiaryPage';
import MonsterDetailsPage from './pages/MonsterDetailsPage';
import StoriesPage from './pages/StoriesPage';
import StoryReaderPage from './pages/StoryReaderPage';
import GlobalNav from './components/GlobalNav';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <GlobalNav />
      <Routes>
        <Route path="/bestiary" element={<BestiaryPage />} />
        <Route path="/bestiary/:id" element={<MonsterDetailsPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/stories/:id" element={<StoryReaderPage />} />
        <Route path="*" element={<BestiaryPage />} />
      </Routes>
    </>
  );
}
