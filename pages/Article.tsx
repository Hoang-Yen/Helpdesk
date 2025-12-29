import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';
import { useData } from '../DataContext';

export const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const { articles, categories } = useData();
  
  const article = articles.find(a => a.id === id);

  if (!article) {
    return <Navigate to="/" replace />;
  }

  const category = categories.find(c => c.id === article.categoryId);
  const relatedArticles = articles.filter(a => article.relatedArticleIds.includes(a.id));

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-spoux-700 transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-300" />
          <Link to={`/category/${category?.id}`} className="hover:text-spoux-700 transition-colors">{category?.name}</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-300" />
          <span className="text-gray-900 font-medium">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article Content */}
          <article className="lg:col-span-3">
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                <header className="mb-8 border-b border-gray-100 pb-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-spoux-50 text-spoux-700">
                      {category?.name}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="h-4 w-4 mr-1.5" />
                    Last updated {article.lastUpdated}
                  </div>
                </header>

                <div className="prose prose-teal max-w-none text-gray-600">
                  <p className="lead text-xl text-gray-700 mb-8">{article.excerpt}</p>
                  
                  {article.sections.map(section => (
                    <div key={section.id} id={section.id} className="scroll-mt-24 mb-10">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                      <div 
                        className="leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </div>
                  ))}
                </div>

                {/* Feedback Section */}
                <div className="mt-16 pt-8 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Was this article helpful?</h3>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setFeedback('yes')}
                      className={`flex items-center px-4 py-2 rounded-lg border transition-all ${feedback === 'yes' ? 'bg-spoux-50 border-spoux-200 text-spoux-700' : 'bg-white border-gray-200 text-gray-600 hover:border-spoux-200 hover:text-spoux-600'}`}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Yes
                    </button>
                    <button 
                      onClick={() => setFeedback('no')}
                      className={`flex items-center px-4 py-2 rounded-lg border transition-all ${feedback === 'no' ? 'bg-gray-100 border-gray-300 text-gray-900' : 'bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600'}`}
                    >
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      No
                    </button>
                  </div>
                  {feedback && (
                    <p className="mt-3 text-sm text-green-600 animate-fade-in">Thanks for your feedback!</p>
                  )}
                </div>
             </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Table of Contents - Sticky */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">On this page</h4>
              <ul className="space-y-3">
                {article.sections.map(section => (
                  <li key={section.id}>
                    <button 
                      onClick={() => handleScrollToSection(section.id)}
                      className="text-sm text-gray-500 hover:text-spoux-700 hover:underline text-left block w-full truncate transition-colors"
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Related Articles</h4>
                <ul className="space-y-4">
                  {relatedArticles.map(rel => (
                    <li key={rel.id}>
                      <Link to={`/article/${rel.id}`} className="group block">
                        <span className="text-sm font-medium text-gray-700 group-hover:text-spoux-700 leading-snug block mb-1">
                          {rel.title}
                        </span>
                        <span className="text-xs text-gray-400 group-hover:text-gray-500">Read article &rarr;</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};