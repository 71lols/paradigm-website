// components/dashboard/AIContexts.tsx
'use client';
import { useState } from 'react';
import { Search, Plus, Edit, Calendar, X, Save, Trash2, Tag } from 'lucide-react';

interface ContextCard {
  id: string;
  title: string;
  description: string;
  category: string;
  lastUsed: string;
  color: string;
}

const sampleContexts: ContextCard[] = [
  {
    id: '1',
    title: 'Meeting Assistant',
    description: 'Help with meeting notes, agendas, and follow-ups',
    category: 'Business',
    lastUsed: '2023/06/15',
    color: 'blue'
  },
  {
    id: '2', 
    title: 'Sales Call Coach',
    description: 'Assist with sales strategies, objection handling, and closing techniques',
    category: 'Business',
    lastUsed: '2023/06/06',
    color: 'blue'
  },
  {
    id: '3',
    title: 'Math Homework Helper',
    description: 'Support with mathematical concepts, problem-solving, and explanations', 
    category: 'Education',
    lastUsed: '2023/05/28',
    color: 'purple'
  }
];

const defaultCategories = ['All', 'Business', 'Education', 'Personal', 'Creative'];
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
  const [contexts, setContexts] = useState<ContextCard[]>(sampleContexts);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  
  // Modal states
  const [showNewContextModal, setShowNewContextModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewLabelModal, setShowNewLabelModal] = useState(false);
  const [editingContext, setEditingContext] = useState<ContextCard | null>(null);
  
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
      category: 'Personal',
      color: 'blue'
    });
    setShowNewContextModal(true);
  };

  const handleCreateContext = () => {
    if (!newContextForm.title.trim()) return;
    
    const newContext: ContextCard = {
      id: Date.now().toString(),
      title: newContextForm.title,
      description: newContextForm.description,
      category: newContextForm.category,
      lastUsed: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
      color: newContextForm.color
    };
    
    setContexts([...contexts, newContext]);
    setShowNewContextModal(false);
  };

  const handleNewLabel = () => {
    setNewLabelForm({ name: '' });
    setShowNewLabelModal(true);
  };

  const handleCreateLabel = () => {
    if (!newLabelForm.name.trim()) return;
    
    const labelName = newLabelForm.name.trim();
    if (!categories.includes(labelName)) {
      setCategories([...categories.slice(0, 1), labelName, ...categories.slice(1)]);
    }
    setShowNewLabelModal(false);
  };

  const handleEditContext = (contextId: string) => {
    const context = contexts.find(c => c.id === contextId);
    if (context) {
      setEditingContext(context);
      setEditContextForm({
        title: context.title,
        description: context.description,
        category: context.category,
        color: context.color
      });
      setShowEditModal(true);
    }
  };

  const handleUpdateContext = () => {
    if (!editingContext || !editContextForm.title.trim()) return;
    
    setContexts(contexts.map(c => 
      c.id === editingContext.id 
        ? { 
            ...c, 
            title: editContextForm.title,
            description: editContextForm.description,
            category: editContextForm.category,
            color: editContextForm.color
          }
        : c
    ));
    setShowEditModal(false);
    setEditingContext(null);
  };

  const handleDeleteContext = (contextId: string) => {
    if (confirm('Are you sure you want to delete this context?')) {
      setContexts(contexts.filter(c => c.id !== contextId));
    }
  };

  const handleUseContext = (contextId: string) => {
    const context = contexts.find(c => c.id === contextId);
    if (context) {
      // Update the last used date
      setContexts(contexts.map(c => 
        c.id === contextId 
          ? { ...c, lastUsed: new Date().toISOString().split('T')[0].replace(/-/g, '/') }
          : c
      ));
      
      // In a real app, this would navigate to the chat interface with the selected context
      alert(`Context "${context.title}" is now active!\n\nYou can now start chatting with this AI assistant context.`);
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
  };

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Contexts</h1>
          <p className="text-white/70">Manage your AI assistant contexts for different tasks and scenarios</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleNewLabel}
            className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Label
          </button>
          <button 
            onClick={handleNewContext}
            className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
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
          {categories.map((category) => (
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
            className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-200 border-l-4 ${getContextColorClasses(context.color)}`}
          >
            {/* Context Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">{context.title}</h3>
                <p className="text-white/70 text-sm">{context.description}</p>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => handleEditContext(context.id)}
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
                {context.lastUsed}
              </div>
            </div>

            {/* Action Button */}
            <button 
              onClick={() => handleUseContext(context.id)}
              className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Use Context</span>
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredContexts.length === 0 && (
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4">
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
                  {categories.filter(c => c !== 'All').map(category => (
                    <option key={category} value={category} className="bg-gray-800">
                      {category}
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
                        newContextForm.color === color.name ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateContext}
                disabled={!newContextForm.title.trim()}
                className="flex-1 bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Context Modal */}
      {showEditModal && editingContext && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4">
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
                  {categories.filter(c => c !== 'All').map(category => (
                    <option key={category} value={category} className="bg-gray-800">
                      {category}
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
                        editContextForm.color === color.name ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateContext}
                disabled={!editContextForm.title.trim()}
                className="flex-1 bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Label Modal */}
      {showNewLabelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4">
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
                className="flex-1 bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateLabel}
                disabled={!newLabelForm.name.trim()}
                className="flex-1 bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Tag className="w-4 h-4" />
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}