import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, FileText, ArrowLeft, Rocket, Bot, Target, CreditCard, BookOpen } from 'lucide-react';
import { useData } from '../DataContext';

const IconMap: Record<string, React.FC<any>> = {
    Rocket, Bot, Target, CreditCard
};

export const Category: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { categories, articles } = useData();
  
  const category = categories.find(c => c.id === id);

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const categoryArticles = articles.filter(a => a.categoryId === id);
  const Icon = IconMap[category.iconName] || BookOpen;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-spoux-700 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
        </Link>

        {/* Category Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 flex items-start gap-6">
            <div className="hidden sm:flex h-16 w-16 bg-spoux-50 rounded-xl items-center justify-center text-spoux-700 shrink-0">
               <Icon className="h-8 w-8" />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
                <p className="text-lg text-gray-500">{category.description}</p>
            </div>
        </div>

        {/* Articles List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
           {categoryArticles.length > 0 ? (
             categoryArticles.map(article => (
                <Link key={article.id} to={`/article/${article.id}`} className="block p-6 hover:bg-gray-50 transition-colors group">
                   <div className="flex items-start">
                      <div className="shrink-0 mt-1 mr-4 text-spoux-200 group-hover:text-spoux-500 transition-colors">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-spoux-700 mb-1">{article.title}</h3>
                          <p className="text-gray-500 text-sm">{article.excerpt}</p>
                      </div>
                      <div className="shrink-0 ml-4 self-center">
                          <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-spoux-400" />
                      </div>
                   </div>
                </Link>
             ))
           ) : (
             <div className="p-12 text-center text-gray-500">
                <p>No articles found in this category yet.</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};