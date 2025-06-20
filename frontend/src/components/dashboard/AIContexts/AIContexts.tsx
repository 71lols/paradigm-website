// components/dashboard/AIContexts.tsx
'use client';
import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Calendar, X, Save, Trash2, Tag, Loader2 } from 'lucide-react';
import { contextService, AIContext, ContextCategory } from '@/lib/contextService';

const colorOptions = [
  { name: 'blue', class: 'border-l-blue-500', bg: 'bg-blue-500' },
  { name: 'purple', class: 'border-l-purple-500', bg: 'bg-purple-500' },
  { name: 'green', class: 'border-l-green-500', bg: 'bg-green-500' },
  { name: 'pink', class: 'border-l-pink-500', bg: 'bg-pink-500' },
  { name: 'orange', class: 'border-l-orange-500', bg: 'bg-orange-500' },
  { name: 'red', class: 'border-l-red-500', bg: 'bg-red-500' }
];

export default function AIContexts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [contexts, setContexts] = useState<AIContext[]>([]);
  const [categories, setCategories] = useState<ContextCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [showNewContextModal, setShowNewContextModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewLabelModal, setShowNewLabelModal] = useState(false);
  const [editingContext, setEditingContext] = useState<AIContext | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Form states
  const [newContextForm, setNewContextForm] = useState({
    title: '',
    description: '',
    category: 'Personal',
    color: 'blue'
  });
  
  const [editContextForm, setEditContextForm] = useState({
    title: '',
    description: '',
    category: '',
    color: ''
  });
  
  const [newLabelForm, setNewLabelForm] = useState({ name: '' });

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [contextsResponse, categoriesResponse] = await Promise.all([
        contextService.getContexts(),
        contextService.getCategories()
      ]);
      
      setContexts(contextsResponse.contexts);
      setCategories(categoriesResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredContexts = contexts.filter(context => {
    const matchesSearch = context.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         context.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || context.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'business': return 'text-blue-400';
      case 'education': return 'text-purple-400';
      case 'personal': return 'text-green-400';
      case 'creative': return 'text-pink-400';
      default: return 'text-gray-400';
    }
  };

  const getContextColorClasses = (color: string) => {
    const colorOption = colorOptions.find(c => c.name === color);
    return colorOption ? colorOption.class : 'border-l-gray-500';
  };

  const handleNewContext = () => {
    setNewContextForm({
      title: '',
      description: '',
      category: categories.length > 0 ? categories[0].name : 'Personal',
      color: 'blue'
    });
    setShowNewContextModal(true);
  };

  const handleCreateContext = async () => {
    if (!newContextForm.title.trim() || submitting) return;
    
    try {
      setSubmitting(true);
      const newContext = await contextService.createContext(newContextForm);
      setContexts([newContext, ...contexts]);
      setShowNewContextModal(false);
      setNewContextForm({ title: '', description: '', category: 'Personal', color: 'blue' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create context');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewLabel = () => {
    setNewLabelForm({ name: '' });
    setShowNewLabelModal(true);
  };

  const handleCreateLabel = async () => {
    if (!newLabelForm.name.trim() || submitting) return;
    
    try {
      setSubmitting(true);
      const newCategory = await contextService.createCategory(newLabelForm.name.trim());
      setCategories([...categories, newCategory]);
      setShowNewLabelModal(false);
      setNewLabelForm({ name: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditContext = (context: AIContext) => {
    setEditingContext(context);
    setEditContextForm({
      title: context.title,
      description: context.description,
      category: context.category,
      color: context.color
    });
    setShowEditModal(true);
  };

  const handleUpdateContext = async () => {
    if (!editingContext || !editContextForm.title.trim() || submitting) return;
    
    try {
      setSubmitting(true);
      const updatedContext = await contextService.updateContext(editingContext.id, editContextForm);
      setContexts(contexts.map(c => c.id === editingContext.id ? updatedContext : c));
      setShowEditModal(false);
      setEditingContext(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update context');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteContext = async (contextId: string) => {
    if (!confirm('Are you sure you want to delete this context?')) return;
    
    try {
      await contextService.deleteContext(contextId);
      setContexts(contexts.filter(c => c.id !== contextId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete context');
    }
  };

  const handleUseContext = async (contextId: string) => {
    try {
      const updatedContext = await contextService.useContext(contextId);
      
      // Update the context list to reflect the active state change
      setContexts(contexts.map(c => 
        c.id === contextId 
          ? updatedContext
          : { ...c, isActive: false }
      ));
      
      // Show success message or navigate to chat interface
      alert(`Context "${updatedContext.title}" is now active!\n\nYou can now start chatting with this AI assistant context.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to activate context');
    }
  };

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
  };

  const closeModal = () => {
    setShowNewContextModal(false);
    setShowEditModal(false);
    setShowNewLabelModal(false);
    setEditingContext(null);
    setError(null);
  };

  // Get all unique category names for the filter buttons
  const allCategoryNames = ['All', ...Array.from(new Set(categories.map(c => c.name)))];

  if (loading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
          <p className="text-white/70">Loading your AI contexts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      {/* Error Banner */}
      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center justify-between">
          <p className="text-red-400">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Contexts</h1>
          <p className="text-white/70">Manage your AI assistant contexts for different tasks and scenarios</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleNewLabel}
            disabled={submitting}
            className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            New Label
          </button>
          <button 
            onClick={handleNewContext}
            disabled={submitting}
            className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            New context
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Search contexts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {allCategoryNames.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Context Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContexts.map((context) => (
          <div
            key={context.id}
            className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-200 border-l-4 ${getContextColorClasses(context.color)} ${
              context.isActive ? 'ring-2 ring-white/30' : ''
            }`}
          >
            {/* Context Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-semibold">{context.title}</h3>
                  {context.isActive && (
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-white/70 text-sm">{context.description}</p>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => handleEditContext(context)}
                  className="text-white/50 hover:text-white p-1 transition-colors"
                  title="Edit context"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteContext(context.id)}
                  className="text-white/50 hover:text-red-400 p-1 transition-colors"
                  title="Delete context"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Context Meta */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-sm font-medium ${getCategoryColor(context.category)}`}>
                {context.category}
              </span>
              <div className="flex items-center gap-1 text-white/50 text-xs">
                <Calendar className="w-3 h-3" />
                {new Date(context.lastUsed).toLocaleDateString()}
              </div>
            </div>

            {/* Action Button */}
            <button 
              onClick={() => handleUseContext(context.id)}
              disabled={context.isActive}
              className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{context.isActive ? 'Currently Active' : 'Use Context'}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredContexts.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-white/30 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-white font-medium mb-2">No contexts found</h3>
          <p className="text-white/50 text-sm mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Create your first AI context to get started'}
          </p>
          {!searchQuery && (
            <button 
              onClick={handleNewContext}
              className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Create Your First Context
            </button>
          )}
        </div>
      )}

      {/* New Context Modal */}
      {showNewContextModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#191919] border border-white/10 rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Create New Context</h2>
              <button onClick={closeModal} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Title</label>
                <input
                  type="text"
                  value={newContextForm.title}
                  onChange={(e) => setNewContextForm({...newContextForm, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Enter context title"
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Description</label>
                <textarea
                  value={newContextForm.description}
                  onChange={(e) => setNewContextForm({...newContextForm, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 h-20 resize-none"
                  placeholder="Describe what this context helps with"
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Category</label>
                <select
                  value={newContextForm.category}
                  onChange={(e) => setNewContextForm({...newContextForm, category: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.name} className="bg-[#191919]">
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Color</label>
                <div className="flex gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setNewContextForm({...newContextForm, color: color.name})}
                      className={`w-8 h-8 rounded-full ${color.bg} ${
                        newContextForm.color === color.name ? 'ring-2 ring-white ring-offset-2 ring-offset-[#191919]' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                disabled={submitting}
                className="flex-1 bg-white/5 border border-white/20 text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateContext}
                disabled={!newContextForm.title.trim() || submitting}
                className="flex-1 bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {submitting ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Context Modal */}
      {showEditModal && editingContext && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#191919] border border-white/10 rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Edit Context</h2>
              <button onClick={closeModal} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Title</label>
                <input
                  type="text"
                  value={editContextForm.title}
                  onChange={(e) => setEditContextForm({...editContextForm, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Description</label>
                <textarea
                  value={editContextForm.description}
                  onChange={(e) => setEditContextForm({...editContextForm, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 h-20 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Category</label>
                <select
                  value={editContextForm.category}
                  onChange={(e) => setEditContextForm({...editContextForm, category: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.name} className="bg-[#191919]">
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Color</label>
                <div className="flex gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setEditContextForm({...editContextForm, color: color.name})}
                      className={`w-8 h-8 rounded-full ${color.bg} ${
                        editContextForm.color === color.name ? 'ring-2 ring-white ring-offset-2 ring-offset-[#191919]' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                disabled={submitting}
                className="flex-1 bg-white/5 border border-white/20 text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateContext}
                disabled={!editContextForm.title.trim() || submitting}
                className="flex-1 bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {submitting ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Label Modal */}
      {showNewLabelModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#191919] border border-white/10 rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Create New Label</h2>
              <button onClick={closeModal} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Label Name</label>
                <input
                  type="text"
                  value={newLabelForm.name}
                  onChange={(e) => setNewLabelForm({name: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Enter label name"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                disabled={submitting}
                className="flex-1 bg-white/5 border border-white/20 text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateLabel}
                disabled={!newLabelForm.name.trim() || submitting}
                className="flex-1 bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Tag className="w-4 h-4" />
                )}
                {submitting ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}