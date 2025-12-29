import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Search } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${isHome ? 'bg-spoux-700 text-white border-b border-spoux-600' : 'bg-white text-gray-900 border-b border-gray-200 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <Logo className={`h-8 w-8 ${isHome ? 'text-white' : 'text-spoux-700'} transition-transform group-hover:scale-105`} />
              <span className="font-bold text-xl tracking-tight">SpouX <span className="font-normal opacity-80">Help Center</span></span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={`text-sm font-medium hover:opacity-80 transition-colors`}>Home</Link>
            <Link to="/videos" className={`text-sm font-medium hover:opacity-80 transition-colors`}>Video Tutorials</Link>
            <a href="#" className={`text-sm font-medium hover:opacity-80 transition-colors`}>Contact Support</a>
            <a href="https://spoux.io" target="_blank" rel="noreferrer" className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${isHome ? 'bg-white/10 hover:bg-white/20' : 'bg-spoux-50 text-spoux-700 hover:bg-spoux-100'}`}>
              Go to SpouX
            </a>
          </nav>

          {/* Mobile Search Icon & Menu placeholder - Keeping simple for this iteration */}
          <div className="flex md:hidden items-center">
             <button onClick={onSearchClick} className="p-2">
               <Search className="w-6 h-6" />
             </button>
          </div>
        </div>
      </div>
    </header>
  );
};
