// backend/src/types/activity.ts
export interface ActivitySession {
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
    userId: string;
    createdAt: string;
    updatedAt: string;
    // Detailed content
    summary?: string;
    notes?: string;
    transcript?: string;
    audioUrl?: string;
    participants_details?: Array<{
      name: string;
      email?: string;
      role?: string;
    }>;
    action_items?: Array<{
      id: string;
      task: string;
      assignee?: string;
      completed: boolean;
      due_date?: string;
    }>;
    key_points?: string[];
  }
  
  export interface CreateActivityData {
    title: string;
    description: string;
    duration: string;
    participants: number;
    tags: string[];
    type: 'meeting' | 'call' | 'voice-note' | 'interview';
    summary?: string;
    notes?: string;
    transcript?: string;
    audioUrl?: string;
    participants_details?: Array<{
      name: string;
      email?: string;
      role?: string;
    }>;
    action_items?: Array<{
      id: string;
      task: string;
      assignee?: string;
      completed: boolean;
      due_date?: string;
    }>;
    key_points?: string[];
  }
  
  export interface UpdateActivityData {
    title?: string;
    description?: string;
    tags?: string[];
    isStarred?: boolean;
    summary?: string;
    notes?: string;
    transcript?: string;
    audioUrl?: string;
    participants_details?: Array<{
      name: string;
      email?: string;
      role?: string;
    }>;
    action_items?: Array<{
      id: string;
      task: string;
      assignee?: string;
      completed: boolean;
      due_date?: string;
    }>;
    key_points?: string[];
  }