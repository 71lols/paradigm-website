// app/dashboard/activity/[id]/page.tsx
'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/components/auth/authContext';
import { activityService, ActivitySession } from '@/lib/activityService';
import { 
  ArrowLeft, 
  Star, 
  Users, 
  // Clock, 
  Calendar, 
  Phone, 
  FileText, 
  Edit3,
  Save,
  X,
  CheckSquare,
  Square,
  User,
  Download,
  Share,
  Copy,
  RefreshCw
} from 'lucide-react';

export default function ActivityDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [activity, setActivity] = useState<ActivitySession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const activityId = params.id as string;

  const loadActivity = useCallback(async () => {
    if (!user || !activityId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await activityService.getActivity(activityId);
      
      if (response.success && response.data) {
        setActivity(response.data);
        setEditedNotes(response.data.notes || '');
      } else {
        setError(response.error || 'Failed to load activity');
      }
    } catch (err) {
      setError('Failed to load activity');
      console.error('Error loading activity:', err);
    } finally {
      setLoading(false);
    }
  }, [user, activityId]);

  useEffect(() => {
    loadActivity();
  }, [loadActivity]);

  const handleToggleStar = async () => {
    if (!activity) return;
    
    try {
      const response = await activityService.toggleStar(activity.id);
      if (response.success && response.data) {
        setActivity(response.data);
      } else {
        console.error('Failed to toggle star:', response.error);
      }
    } catch (err) {
      console.error('Error toggling star:', err);
    }
  };

  const handleSaveNotes = async () => {
    if (!activity) return;
    
    try {
      setSaving(true);
      const response = await activityService.updateActivity(activity.id, {
        notes: editedNotes.trim()
      });
      
      if (response.success && response.data) {
        setActivity(response.data);
        setIsEditingNotes(false);
      } else {
        console.error('Failed to save notes:', response.error);
      }
    } catch (err) {
      console.error('Error saving notes:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedNotes(activity?.notes || '');
    setIsEditingNotes(false);
  };

  const handleCopyTranscript = async () => {
    if (!activity?.transcript) return;
    
    try {
      await navigator.clipboard.writeText(activity.transcript);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy transcript:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share && activity) {
      try {
        await navigator.share({
          title: activity.title,
          text: activity.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('Failed to copy URL:', err);
      }
    }
  };

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

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading activity...</p>
        </div>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-400 mb-4">
            <X className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Activity Not Found</h2>
          <p className="text-white/70 mb-6">{error || 'The activity you\'re looking for doesn\'t exist or has been deleted.'}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={loadActivity}
              className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#191919]">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-white/70">
                {getTypeIcon(activity.type)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{activity.title}</h1>
                <p className="text-white/70">{activity.description}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleStar}
              className={`p-2 rounded-lg transition-colors ${
                activity.isStarred 
                  ? 'text-yellow-400 hover:text-yellow-300 bg-yellow-500/10' 
                  : 'text-white/50 hover:text-yellow-400 hover:bg-yellow-500/10'
              }`}
              title={activity.isStarred ? 'Remove star' : 'Add star'}
            >
              <Star className={`w-5 h-5 ${activity.isStarred ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={handleShare}
              className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Share activity"
            >
              <Share className="w-5 h-5" />
            </button>
            {activity.audioUrl && (
              <a 
                href={activity.audioUrl}
                download
                className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="Download audio"
              >
                <Download className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Copy Success Notification */}
        {copySuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            Copied to clipboard!
          </div>
        )}

        {/* Meta Information */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* <div className="flex items-center gap-2 text-white/70">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Duration: {activity.duration}</span>
            </div> */}
            <div className="flex items-center gap-2 text-white/70">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatTimestamp(activity.timestamp)}</span>
            </div>
          </div>
          
          {/* Tags */}
          {activity.tags && activity.tags.length > 0 && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-white/50 text-sm">Tags:</span>
              {activity.tags.map((tag) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Summary Section */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Summary</h2>
            {activity.summary ? (
              <div className="prose prose-invert max-w-none">
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                  {activity.summary}
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/50">No summary available</p>
                <p className="text-white/30 text-sm mt-2">
                  {activity.status === 'processing' 
                    ? 'Summary is being generated...' 
                    : 'Summary will be generated automatically'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Notes Section */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Notes</h2>
              {!isEditingNotes && (
                <button
                  onClick={() => setIsEditingNotes(true)}
                  className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                  title="Edit notes"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {isEditingNotes ? (
              <div className="space-y-4">
                <textarea
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 min-h-[200px] resize-none"
                  placeholder="Add your notes here..."
                  autoFocus
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveNotes}
                    disabled={saving}
                    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving ? (
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    disabled={saving}
                    className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {activity.notes ? (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                      {activity.notes}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Edit3 className="w-12 h-12 text-white/30 mx-auto mb-4" />
                    <p className="text-white/50">No notes yet</p>
                    <button
                      onClick={() => setIsEditingNotes(true)}
                      className="text-blue-400 hover:text-blue-300 text-sm mt-2"
                    >
                      Add your first note
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Additional Sections */}
        {(activity.key_points || activity.action_items || activity.participants_details) && (
          <div className="mt-8 space-y-8">
            {/* Key Points */}
            {activity.key_points && activity.key_points.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Key Points</h2>
                <ul className="space-y-2">
                  {activity.key_points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-white/80">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Items */}
            {activity.action_items && activity.action_items.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Action Items</h2>
                <div className="space-y-3">
                  {activity.action_items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="text-white/50 mt-0.5">
                        {item.completed ? (
                          <CheckSquare className="w-4 h-4 text-green-400" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-white ${item.completed ? 'line-through opacity-70' : ''}`}>
                          {item.task}
                        </p>
                        {item.assignee && (
                          <p className="text-white/50 text-sm mt-1">Assigned to: {item.assignee}</p>
                        )}
                        {item.due_date && (
                          <p className="text-white/50 text-sm">Due: {new Date(item.due_date).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Participants */}
            {activity.participants_details && activity.participants_details.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Participants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activity.participants_details.map((participant, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{participant.name}</p>
                        {participant.email && (
                          <p className="text-white/50 text-sm">{participant.email}</p>
                        )}
                        {participant.role && (
                          <p className="text-white/70 text-sm">{participant.role}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Transcript Section */}
        {activity.transcript && (
          <div className="mt-8 bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Transcript</h2>
              <button
                onClick={handleCopyTranscript}
                className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                title="Copy transcript"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                {activity.transcript}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}