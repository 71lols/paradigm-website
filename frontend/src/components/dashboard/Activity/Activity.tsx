// components/dashboard/Activity/Activity.tsx
'use client';
import { useState, useEffect } from 'react';
import { Search, Users, Phone, FileText, Clock, Calendar, Star, Play, MoreHorizontal, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/authContext';
import { activityService, ActivitySession } from '@/lib/activityService';

export default function Activity() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sessions, setSessions] = useState<ActivitySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadActivities();
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Don't close if clicking on the dropdown button or dropdown content
      if (target.closest('.dropdown-container') || target.closest('.dropdown-menu')) {
        return;
      }
      setOpenDropdown(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await activityService.getActivities();
      
      if (response.success && response.data) {
        setSessions(response.data);
      } else {
        setError(response.error || 'Failed to load activities');
      }
    } catch (err) {
      setError('Failed to load activities');
      console.error('Error loading activities:', err);
    } finally {
      setLoading(false);
    }
  };

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
    router.push(`/dashboard/activity/${sessionId}`);
  };

  const handleToggleStar = async (sessionId: string) => {
    try {
      const response = await activityService.toggleStar(sessionId);
      if (response.success && response.data) {
        setSessions(sessions.map(session => 
          session.id === sessionId ? response.data! : session
        ));
      } else {
        console.error('Failed to toggle star:', response.error);
      }
    } catch (err) {
      console.error('Error toggling star:', err);
    }
  };

  const handleDeleteActivity = async (sessionId: string) => {
    if (!confirm('Are you sure you want to delete this activity? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await activityService.deleteActivity(sessionId);
      if (response.success) {
        setSessions(sessions.filter(session => session.id !== sessionId));
        alert('✅ Activity deleted successfully!');
      } else {
        alert(`❌ Failed to delete activity: ${response.error}`);
      }
    } catch (err) {
      console.error('Error deleting activity:', err);
      alert(`❌ Error deleting activity: ${err}`);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInHours < 48) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading your activities...</p>
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
            className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-200 cursor-pointer"
            onClick={() => handleViewDetails(session.id)}
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
                      <span>{formatTimestamp(session.timestamp)}</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {session.tags && session.tags.length > 0 && (
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
                  )}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStar(session.id);
                    }}
                    className={`p-1 rounded transition-colors ${
                      session.isStarred 
                        ? 'text-yellow-400 hover:text-yellow-300' 
                        : 'text-white/50 hover:text-yellow-400'
                    }`}
                    title={session.isStarred ? 'Remove star' : 'Add star'}
                  >
                    <Star className={`w-4 h-4 ${session.isStarred ? 'fill-current' : ''}`} />
                  </button>
                  
                  <div className="relative dropdown-container">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(openDropdown === session.id ? null : session.id);
                      }}
                      className="text-white/50 hover:text-white p-1 rounded transition-colors"
                      title="More options"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {openDropdown === session.id && (
                      <div className="absolute right-0 top-6 bg-gray-800 border border-white/20 rounded-lg shadow-lg z-10 min-w-[120px] dropdown-menu">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteActivity(session.id);
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 text-sm flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* View Details Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(session.id);
                  }}
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
      {filteredSessions.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-white/30 mb-4">
            <FileText className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-white font-medium mb-2">
            {sessions.length === 0 ? 'No activities yet' : 'No sessions found'}
          </h3>
          <p className="text-white/50 text-sm">
            {searchQuery 
              ? 'Try adjusting your search terms' 
              : 'Your conversation sessions will appear here when you start recording with the Paradigm desktop app'
            }
          </p>
          {sessions.length === 0 && (
            <div className="mt-6">
              <p className="text-white/40 text-sm mb-4">
                To get started, download and run the Paradigm desktop app to begin capturing conversations.
              </p>
              <button className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                Download Desktop App
              </button>
            </div>
          )}
        </div>
      )}


    </div>
  );
}