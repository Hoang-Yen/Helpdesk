import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article, Category, VideoTutorial } from './types';
import { ARTICLES as INITIAL_ARTICLES, CATEGORIES as INITIAL_CATEGORIES, VIDEOS as INITIAL_VIDEOS } from './data';
import { getArticlesFromSheet } from './lib/sheets';

interface DataContextType {
  articles: Article[];
  categories: Category[];
  videos: VideoTutorial[];
  updateArticle: (article: Article) => void;
  addArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  importFromSheets: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [videos, setVideos] = useState<VideoTutorial[]>(INITIAL_VIDEOS);

  useEffect(() => {
    // Load data from localStorage on mount, fall back to static data
    const savedArticles = localStorage.getItem('spoux_articles');
    if (savedArticles) {
      try {
        setArticles(JSON.parse(savedArticles));
      } catch (e) {
        console.error("Failed to parse articles from localStorage", e);
        setArticles(INITIAL_ARTICLES);
      }
    } else {
      setArticles(INITIAL_ARTICLES);
    }
  }, []);

  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem('spoux_articles', JSON.stringify(newArticles));
  };

  const updateArticle = (updatedArticle: Article) => {
    const newArticles = articles.map(a => a.id === updatedArticle.id ? updatedArticle : a);
    saveArticles(newArticles);
  };

  const addArticle = (article: Article) => {
    saveArticles([...articles, article]);
  };

  const deleteArticle = (id: string) => {
    saveArticles(articles.filter(a => a.id !== id));
  };

  const importFromSheets = async () => {
    const sheetArticles = await getArticlesFromSheet();
    if (sheetArticles.length > 0) {
      saveArticles(sheetArticles);
    } else {
      throw new Error("No data found in Google Sheets");
    }
  };

  return (
    <DataContext.Provider value={{ articles, categories, videos, updateArticle, addArticle, deleteArticle, importFromSheets }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};
