// components/dashboard/Activity/Activity.tsx
'use client';
import { useState, useEffect } from 'react';
import { Search, Users, Phone, FileText, Clock, Calendar, Star, Play, MoreHorizontal } from 'lucide-react';

interface ActivitySession {
  id: string;
  title: string;
  description: string;
  duration: string;
  participants: number;
  timestamp: string;
  tags: string[];
  status: 'completed' | 'processing' | 'failed';
  type: 'meeting' | 'call' | 'voice-note' | 'interview';
  isStarred?: boolean;
}

// Mock data - replace with actual API calls
const mockSessions: ActivitySession[] = [
  {
    id: '1',
    title: 'Team Strategy Meeting',
    description: 'Quarterly planning discussion with key stakeholders',
    duration: '1h 0m',
    participants: 5,
    timestamp: 'Today at 05:39 PM',
    tags: ['work', 'strategy', 'quarterly'],
    status: 'completed',
    type: 'meeting',
    isStarred: true
  },
  {
    id: '2',
    title: 'Client Call - Project Alpha',
    description: 'Project requirements and timeline discussion',
    duration: '30m',
    participants: 3,
    timestamp: 'Today at 03:39 PM',
    tags: ['client', 'project-alpha'],
    status: 'completed',
    type: 'call'
  },
  {
    id: '3',
    title: 'Personal Voice Note',
    description: 'Ideas for weekend project',
    duration: '2m',
    participants: 1,
    timestamp: 'Yesterday at 07:39 PM',
    tags: ['personal', 'ideas'],
    status: 'processing',
    type: 'voice-note'
  }
];

export default function Activity() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sessions, setSessions] = useState<ActivitySession[]>(mockSessions);
  const [loading, setLoading] = useState(false);

  const filteredSessions = sessions.filter(session => {
    const query = searchQuery.toLowerCase();
    return (
      session.title.toLowerCase().includes(query) ||
      session.description.toLowerCase().includes(query) ||
      session.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const getTypeIcon = (type: ActivitySession['type']) => {
    switch (type) {
      case 'meeting':
        return <Users className="w-5 h-5" />;
      case 'call':
        return <Phone className="w-5 h-5" />;
      case 'voice-note':
        return <FileText className="w-5 h-5" />;
      case 'interview':
        return <Users className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: ActivitySession['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-500/10';
      case 'processing':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'failed':
        return 'text-red-400 bg-red-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const handleViewDetails = (sessionId: string) => {
    // Navigate to detailed view or open modal
    console.log('View details for session:', sessionId);
  };

  const handleToggleStar = (sessionId: string) => {
    setSessions(sessions.map(session => 
      session.id === sessionId 
        ? { ...session, isStarred: !session.isStarred }
        : session
    ));
  };

  return (
    <div className="flex-1 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Activity & Notes</h1>
        <p className="text-white/70">Track your conversations and manage notes</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Search sessions, notes, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
          />
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              {/* Left Content */}
              <div className="flex items-start gap-4 flex-1">
                {/* Icon */}
                <div className="text-white/70 mt-1">
                  {getTypeIcon(session.type)}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold">{session.title}</h3>
                    {session.isStarred && (
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    )}
                  </div>
                  
                  <p className="text-white/70 text-sm mb-3">
                    {session.description}
                  </p>
                  
                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-white/50 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{session.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{session.participants} participant{session.participants > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{session.timestamp}</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {session.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Content */}
              <div className="flex items-center gap-2 ml-4">
                {/* Status Badge */}
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(session.status)}`}>
                  {session.status}
                </span>
                
                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleStar(session.id)}
                    className={`p-1 rounded transition-colors ${
                      session.isStarred 
                        ? 'text-yellow-400 hover:text-yellow-300' 
                        : 'text-white/50 hover:text-yellow-400'
                    }`}
                    title={session.isStarred ? 'Remove star' : 'Add star'}
                  >
                    <Star className={`w-4 h-4 ${session.isStarred ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={() => handleViewDetails(session.id)}
                    className="text-white/50 hover:text-white p-1 rounded transition-colors"
                    title="More options"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                
                {/* View Details Button */}
                <button
                  onClick={() => handleViewDetails(session.id)}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-500/10 transition-colors"
                >
                  <Play className="w-3 h-3" />
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-white/30 mb-4">
            <FileText className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-white font-medium mb-2">No sessions found</h3>
          <p className="text-white/50 text-sm">
            {searchQuery 
              ? 'Try adjusting your search terms' 
              : 'Your conversation sessions will appear here when you start recording'
            }
          </p>
        </div>
      )}
    </div>
  );
}