import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Article } from './pages/Article';
import { Category } from './pages/Category';
import { Videos } from './pages/Videos';
import { Admin } from './pages/Admin';
import { SearchOverlay } from './components/SearchOverlay';
import { DataProvider } from './DataContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={
            <Layout onSearchClick={() => setIsSearchOpen(true)}>
              <Routes>
                <Route path="/" element={<Home onSearchClick={() => setIsSearchOpen(true)} />} />
                <Route path="/article/:id" element={<Article />} />
                <Route path="/category/:id" element={<Category />} />
                <Route path="/videos" element={<Videos />} />
              </Routes>
            </Layout>
          } />
        </Routes>
        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </Router>
    </DataProvider>
  );
};

export default App;