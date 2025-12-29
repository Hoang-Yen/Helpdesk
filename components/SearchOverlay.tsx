import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, ChevronRight, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';
import { Article } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const { articles, categories } = useData();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = articles.filter(article => 
      article.title.toLowerCase().includes(lowerQuery) || 
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
    setResults(filtered);
  }, [query, articles]);

  const handleLinkClick = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  const highlightMatch = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? <span key={i} className="bg-yellow-200 text-gray-900 rounded-[2px] px-0.5">{part}</span> 
        : part
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6">
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <div className="relative border-b border-gray-100">
          <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            className="w-full h-14 pl-12 pr-12 text-lg text-gray-900 placeholder-gray-400 border-0 focus:ring-0 focus:outline-none"
            placeholder="Search for articles, guides, or tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="absolute right-3 top-3 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto bg-gray-50/50">
          {query === '' && (
            <div className="p-4 text-sm text-gray-500">
              <p className="mb-2 font-medium text-xs uppercase tracking-wider text-gray-400">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Billing', 'API Keys', 'Integration', 'Validation'].map(term => (
                  <button 
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-spoux-300 hover:text-spoux-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query !== '' && results.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-lg font-medium text-gray-900">No results found</p>
              <p>We couldn't find anything matching "{query}"</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Articles</div>
              <ul>
                {results.map(article => {
                  const category = categories.find(c => c.id === article.categoryId);
                  return (
                    <li key={article.id}>
                      <button
                        onClick={() => handleLinkClick(`/article/${article.id}`)}
                        className="w-full text-left px-4 py-3 hover:bg-spoux-50 group transition-colors flex items-start gap-3"
                      >
                        <div className="mt-1 p-1.5 bg-white border border-gray-200 rounded-md text-gray-400 group-hover:border-spoux-200 group-hover:text-spoux-600">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {highlightMatch(article.title, query)}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500 mt-0.5">
                            <span className="text-spoux-600 font-medium">{category?.name}</span>
                            <span className="mx-1.5">&middot;</span>
                            <span className="truncate">{highlightMatch(article.excerpt, query)}</span>
                            {article.tags?.some(t => t.toLowerCase().includes(query.toLowerCase())) && (
                              <span className="ml-2 inline-flex items-center text-gray-400">
                                <Tag className="w-3 h-3 mr-1" />
                                {article.tags.find(t => t.toLowerCase().includes(query.toLowerCase()))}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-spoux-400" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-between text-xs text-gray-500">
           <span>Press <kbd className="font-sans px-1.5 py-0.5 bg-white border border-gray-200 rounded-md text-gray-600 mx-1">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};