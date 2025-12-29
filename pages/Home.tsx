import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Rocket, Bot, Target, CreditCard, PlayCircle, BookOpen } from 'lucide-react';
import { useData } from '../DataContext';

// Map icon strings to components
const IconMap: Record<string, React.FC<any>> = {
  Rocket, Bot, Target, CreditCard
};

interface HomeProps {
  onSearchClick: () => void;
}

export const Home: React.FC<HomeProps> = ({ onSearchClick }) => {
  const { articles, categories } = useData();
  const popularArticles = articles.filter(a => a.isPopular).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-spoux-700 pb-24 pt-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-spoux-300 blur-3xl"></div>
             <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-spoux-900 blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-spoux-100 text-lg mb-8 max-w-2xl mx-auto">
            Search our knowledge base for answers, tutorials, and best practices.
          </p>
          
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-spoux-600 transition-colors" />
            </div>
            <input
              type="text"
              readOnly
              onClick={onSearchClick}
              className="block w-full pl-12 pr-4 py-4 rounded-xl border-0 shadow-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/20 bg-white cursor-text text-base"
              placeholder="Search for articles (e.g., 'Integration', 'Billing')..."
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
                <kbd className="hidden md:inline-flex items-center border border-gray-200 rounded px-2 text-xs font-sans font-medium text-gray-400">Ctrl K</kbd>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container with negative margin to overlap Hero */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-20">
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category) => {
            const Icon = IconMap[category.iconName] || BookOpen;
            const count = articles.filter(a => a.categoryId === category.id).length;
            
            return (
              <Link 
                to={`/category/${category.id}`} 
                key={category.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 p-6 transition-all hover:-translate-y-1 group"
              >
                <div className="h-12 w-12 bg-spoux-50 rounded-lg flex items-center justify-center text-spoux-700 mb-4 group-hover:bg-spoux-700 group-hover:text-white transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{category.description}</p>
                <div className="flex items-center text-xs font-medium text-spoux-600 group-hover:text-spoux-700">
                  <span>{count} articles</span>
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Popular Articles */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Popular Articles</h2>
                <button onClick={onSearchClick} className="text-spoux-700 font-medium text-sm hover:underline">Search all</button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100 overflow-hidden">
              {popularArticles.map((article) => (
                <Link to={`/article/${article.id}`} key={article.id} className="block p-6 hover:bg-gray-50 transition-colors group">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-spoux-700 mb-1">{article.title}</h3>
                      <p className="text-gray-500 text-sm mb-2">{article.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="bg-spoux-50 text-spoux-700 px-2 py-0.5 rounded-full font-medium">
                          {categories.find(c => c.id === article.categoryId)?.name}
                        </span>
                        <span>Updated {article.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="text-gray-300 group-hover:text-spoux-500 mt-1">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar / Video CTA */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <PlayCircle className="h-32 w-32" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Video Tutorials</h3>
                <p className="text-gray-300 text-sm mb-6">Prefer watching over reading? Check out our step-by-step video guides.</p>
                <Link 
                  to="/videos"
                  className="inline-flex items-center justify-center w-full bg-white text-gray-900 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Watch Tutorials
                  <PlayCircle className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>

            <div className="bg-spoux-50 border border-spoux-100 rounded-2xl p-6">
               <h3 className="text-spoux-900 font-bold mb-2">Need direct support?</h3>
               <p className="text-spoux-700 text-sm mb-4">Our team is available Mon-Fri, 9am - 5pm EST.</p>
               <a href="#" className="text-spoux-700 font-semibold text-sm hover:underline flex items-center">
                 Contact Support <ArrowRight className="h-4 w-4 ml-1" />
               </a>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};