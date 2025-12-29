import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onSearchClick: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onSearchClick }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header onSearchClick={onSearchClick} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
