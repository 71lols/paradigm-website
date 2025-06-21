// lib/activityService.ts
import { auth } from './firebase';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

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
  }
  
  export interface UpdateActivityData {
    title?: string;
    description?: string;
    tags?: string[];
    isStarred?: boolean;
    summary?: string;
    notes?: string;
  }
  
  interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  }
  
  class ActivityService {
    private baseUrl = `${API_BASE_URL}/api/activities`;

    // Get authentication token from Firebase
    private async getAuthToken(): Promise<string | null> {
      try {
        const user = auth.currentUser;
        if (!user) return null;
        
        const token = await user.getIdToken();
        return token;
      } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
      }
    }

    // Make authenticated API request
    private async makeRequest<T>(
      endpoint: string,
      options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
      const url = `${this.baseUrl}${endpoint}`;
      
      // Get auth token for protected routes
      const token = await this.getAuthToken();
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
      };

      // Add auth header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      try {
        const response = await fetch(url, {
          ...options,
          headers,
        });

        const data: ApiResponse<T> = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }

        return data;
      } catch (error) {
        console.error(`API request failed for ${endpoint}:`, error);
        throw error;
      }
    }
  
    async getActivities(): Promise<ApiResponse<ActivitySession[]>> {
      try {
        return await this.makeRequest<ActivitySession[]>('');
      } catch (error) {
        console.error('Error fetching activities:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to fetch activities'
        };
      }
    }
  
    async getActivity(id: string): Promise<ApiResponse<ActivitySession>> {
      try {
        return await this.makeRequest<ActivitySession>(`/${id}`);
      } catch (error) {
        console.error('Error fetching activity:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to fetch activity'
        };
      }
    }
  
    async createActivity(activityData: CreateActivityData): Promise<ApiResponse<ActivitySession>> {
      try {
        return await this.makeRequest<ActivitySession>('', {
          method: 'POST',
          body: JSON.stringify(activityData),
        });
      } catch (error) {
        console.error('Error creating activity:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to create activity'
        };
      }
    }
  
    async updateActivity(id: string, updateData: UpdateActivityData): Promise<ApiResponse<ActivitySession>> {
      try {
        return await this.makeRequest<ActivitySession>(`/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(updateData),
        });
      } catch (error) {
        console.error('Error updating activity:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to update activity'
        };
      }
    }
  
    async deleteActivity(id: string): Promise<ApiResponse<void>> {
      try {
        return await this.makeRequest<void>(`/${id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Error deleting activity:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to delete activity'
        };
      }
    }
  
    async toggleStar(id: string): Promise<ApiResponse<ActivitySession>> {
      try {
        return await this.makeRequest<ActivitySession>(`/${id}/star`, {
          method: 'PATCH',
        });
      } catch (error) {
        console.error('Error toggling star:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to toggle star'
        };
      }
    }
  }
  
  export const activityService = new ActivityService();