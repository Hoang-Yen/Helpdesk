import React, { useState } from 'react';
import { useData } from '../DataContext';
import { Article, Section } from '../types';
import { Plus, Trash2, Edit, Save, ArrowLeft, LayoutGrid, FileText, Lock, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';

export const Admin: React.FC = () => {
  const { articles, updateArticle, addArticle, deleteArticle, categories } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Auth State
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('spoux_admin_auth') === 'true');

  // Form State
  const [formData, setFormData] = useState<Article | null>(null);
  const [tagInput, setTagInput] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'spoux2025') {
      setIsAuthenticated(true);
      sessionStorage.setItem('spoux_admin_auth', 'true');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('spoux_admin_auth');
  };

  const startEdit = (article: Article) => {
    setFormData(JSON.parse(JSON.stringify(article))); // Deep copy
    setTagInput(article.tags ? article.tags.join(', ') : '');
    setEditingId(article.id);
    setIsCreating(false);
  };

  const startCreate = () => {
    const newArticle: Article = {
      id: '',
      categoryId: categories[0].id,
      title: '',
      excerpt: '',
      tags: [],
      sections: [],
      relatedArticleIds: [],
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isPopular: false
    };
    setFormData(newArticle);
    setTagInput('');
    setIsCreating(true);
    setEditingId('new');
  };

  const handleSave = () => {
    if (!formData || !formData.title || !formData.id) {
      alert("Title and ID are required");
      return;
    }
    
    // Auto-generate ID if empty
    if (!formData.id.trim()) {
         formData.id = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    // Process Tags
    formData.tags = tagInput.split(',').map(t => t.trim()).filter(t => t !== '');

    if (isCreating) {
      if (articles.some(a => a.id === formData.id)) {
        alert("ID already exists. Please choose a unique title or ID.");
        return;
      }
      addArticle(formData);
    } else {
      updateArticle(formData);
    }
    
    setEditingId(null);
    setFormData(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      deleteArticle(id);
    }
  };

  // Field updaters
  const updateField = (field: keyof Article, value: any) => {
    if (formData) setFormData({ ...formData, [field]: value });
  };

  const updateSection = (index: number, field: keyof Section, value: string) => {
    if (!formData) return;
    const newSections = [...formData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData({ ...formData, sections: newSections });
  };

  const addSection = () => {
    if (!formData) return;
    setFormData({
      ...formData,
      sections: [...formData.sections, { id: `sec-${Date.now()}`, title: '', content: '' }]
    });
  };

  const removeSection = (index: number) => {
    if (!formData) return;
    const newSections = formData.sections.filter((_, i) => i !== index);
    setFormData({ ...formData, sections: newSections });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
           <div className="text-center mb-8">
             <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-spoux-50 text-spoux-700 mb-4">
               <Lock className="h-8 w-8" />
             </div>
             <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
             <p className="text-gray-500 mt-2">Please enter the password to manage the help center.</p>
           </div>
           <form onSubmit={handleLogin} className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
               <input 
                 type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spoux-500 focus:border-spoux-500"
                 placeholder="Enter password..."
                 autoFocus
               />
             </div>
             <button 
               type="submit"
               className="w-full bg-spoux-700 text-white font-bold py-3 rounded-lg hover:bg-spoux-800 transition-colors shadow-sm"
             >
               Login
             </button>
           </form>
           <div className="mt-6 text-center">
             <Link to="/" className="text-sm text-gray-400 hover:text-spoux-600">Back to Help Center</Link>
           </div>
        </div>
      </div>
    );
  }

  // Render Editor
  if (editingId && formData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
            <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => { setEditingId(null); setFormData(null); }}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">{isCreating ? 'New Article' : 'Edit Article'}</h1>
                </div>
                <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-spoux-700 text-white rounded-lg hover:bg-spoux-800 transition-colors font-medium"
                >
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">Meta Data</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Article Title</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spoux-500 focus:border-spoux-500"
                            value={formData.title}
                            onChange={(e) => updateField('title', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (ID)</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                            value={formData.id}
                            readOnly={!isCreating}
                            onChange={(e) => updateField('id', e.target.value)}
                            placeholder={isCreating ? "Auto-generated from title" : ""}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short description)</label>
                        <textarea 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spoux-500 focus:border-spoux-500"
                            rows={2}
                            value={formData.excerpt}
                            onChange={(e) => updateField('excerpt', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spoux-500 focus:border-spoux-500"
                            value={formData.categoryId}
                            onChange={(e) => updateField('categoryId', e.target.value)}
                        >
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spoux-500 focus:border-spoux-500"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            placeholder="e.g. billing, setup, api"
                        />
                    </div>
                    <div className="flex items-center pt-6">
                         <label className="flex items-center gap-2 cursor-pointer">
                             <input 
                                type="checkbox" 
                                checked={formData.isPopular} 
                                onChange={(e) => updateField('isPopular', e.target.checked)}
                                className="w-5 h-5 text-spoux-600 rounded border-gray-300 focus:ring-spoux-500"
                             />
                             <span className="text-sm font-medium text-gray-700">Mark as Popular</span>
                         </label>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Content Sections</h2>
                    <button 
                        onClick={addSection}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 shadow-sm"
                    >
                        <Plus className="w-4 h-4" /> Add Section
                    </button>
                </div>
                
                {formData.sections.map((section, idx) => (
                    <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative group">
                        <button 
                            onClick={() => removeSection(idx)}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            title="Remove Section"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="mb-4 pr-10">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Section Title</label>
                            <input 
                                type="text"
                                className="w-full text-lg font-bold border-0 border-b border-gray-200 px-0 py-1 focus:ring-0 focus:border-spoux-500 placeholder-gray-300"
                                placeholder="Enter section title..."
                                value={section.title}
                                onChange={(e) => updateSection(idx, 'title', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Content (Markdown Supported)</label>
                            <textarea 
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-spoux-500 focus:border-spoux-500 font-mono text-sm"
                                rows={8}
                                value={section.content}
                                onChange={(e) => updateSection(idx, 'content', e.target.value)}
                                placeholder="Write your content here. Markdown is supported (e.g., **bold**, *italic*, [link](url))..."
                            />
                            <p className="mt-2 text-xs text-gray-400 flex justify-between">
                              <span>Supports Markdown & HTML</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="h-20"></div> {/* Spacer */}
        </div>
      </div>
    );
  }

  // Render Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
       <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
             <div className="flex items-center gap-3">
                 <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Logo className="w-6 h-6 text-spoux-700" />
                 </Link>
                 <span className="text-gray-300">|</span>
                 <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
             </div>
             <div className="flex items-center gap-4">
                 <Link to="/" className="text-sm font-medium text-gray-500 hover:text-spoux-700">View Site</Link>
                 <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-gray-600" title="Logout">
                    <LogOut className="w-5 h-5" />
                 </button>
                 <button 
                    onClick={startCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-spoux-700 text-white rounded-lg hover:bg-spoux-800 transition-colors font-medium shadow-sm"
                 >
                     <Plus className="w-4 h-4" />
                     New Article
                 </button>
             </div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Article</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tags</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Last Updated</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {articles.map(article => (
                          <tr key={article.id} className="hover:bg-gray-50 transition-colors group">
                              <td className="px-6 py-4">
                                  <div className="font-medium text-gray-900">{article.title}</div>
                                  <div className="text-xs text-gray-400 mt-1 truncate max-w-xs">{article.id}</div>
                              </td>
                              <td className="px-6 py-4">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                      {categories.find(c => c.id === article.categoryId)?.name}
                                  </span>
                              </td>
                              <td className="px-6 py-4">
                                  <div className="flex gap-1 flex-wrap">
                                      {article.tags?.slice(0, 2).map(tag => (
                                          <span key={tag} className="inline-flex text-[10px] bg-spoux-50 text-spoux-600 px-1.5 py-0.5 rounded border border-spoux-100">
                                              {tag}
                                          </span>
                                      ))}
                                      {article.tags?.length > 2 && <span className="text-[10px] text-gray-400">+{article.tags.length - 2}</span>}
                                  </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                  {article.lastUpdated}
                              </td>
                              <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                      <button 
                                        onClick={() => startEdit(article)}
                                        className="p-2 text-gray-400 hover:text-spoux-600 hover:bg-spoux-50 rounded-lg transition-colors"
                                        title="Edit"
                                      >
                                          <Edit className="w-4 h-4" />
                                      </button>
                                      <button 
                                        onClick={() => handleDelete(article.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                      >
                                          <Trash2 className="w-4 h-4" />
                                      </button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
              {articles.length === 0 && (
                  <div className="p-12 text-center text-gray-500">
                      <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                      <p>No articles found. Create your first one!</p>
                  </div>
              )}
          </div>
       </div>
    </div>
  );
};