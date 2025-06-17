// components/dashboard/AIContexts/AIContexts.tsx
'use client';
import { useState } from 'react';
import { Search, Plus, Edit, Calendar } from 'lucide-react';

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
    description: 'Help with meeting notes, agendas, and follow-ups',
    category: 'Business',
    lastUsed: '2023/06/06',
    color: 'blue'
  },
  {
    id: '3',
    title: 'Math Homework Helper',
    description: 'Help with meeting notes, agendas, and follow-ups', 
    category: 'Education',
    lastUsed: '2023/05/28',
    color: 'purple'
  }
];

const categories = ['All', 'Business', 'Education', 'Personal', 'Creative'];

export default function AIContexts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [contexts, setContexts] = useState<ContextCard[]>(sampleContexts);

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
    switch (color) {
      case 'blue': return 'border-l-blue-500';
      case 'purple': return 'border-l-purple-500';
      case 'green': return 'border-l-green-500';
      case 'pink': return 'border-l-pink-500';
      default: return 'border-l-gray-500';
    }
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
          <button className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Label
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
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

        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
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
              <button className="text-white/50 hover:text-white p-1">
                <Edit className="w-4 h-4" />
              </button>
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
            <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
              <span>Use</span>
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
          <p className="text-white/50 text-sm">
            {searchQuery ? 'Try adjusting your search terms' : 'Create your first AI context to get started'}
          </p>
        </div>
      )}
    </div>
  );
}