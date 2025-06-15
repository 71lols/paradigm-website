// lib/api.ts
import { auth } from './firebase';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

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
    const url = `${this.baseURL}${endpoint}`;
    
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
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Public methods for API endpoints

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.makeRequest('/health');
  }

  // Authentication endpoints
  async signUp(data: {
    email: string;
    password: string;
    displayName?: string;
  }): Promise<ApiResponse<{ user: any; customToken: string }>> {
    return this.makeRequest('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyToken(): Promise<ApiResponse<{ user: any }>> {
    return this.makeRequest('/api/auth/verify-token', {
      method: 'POST',
    });
  }

  async resetPassword(email: string): Promise<ApiResponse> {
    return this.makeRequest('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Protected endpoints (require authentication)
  async getProfile(): Promise<ApiResponse<any>> {
    return this.makeRequest('/api/auth/profile');
  }

  async updateProfile(data: {
    displayName?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
  }): Promise<ApiResponse<any>> {
    return this.makeRequest('/api/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async refreshToken(): Promise<ApiResponse<{ customToken: string }>> {
    return this.makeRequest('/api/auth/refresh-token', {
      method: 'POST',
    });
  }

  async deleteAccount(): Promise<ApiResponse> {
    return this.makeRequest('/api/auth/account', {
      method: 'DELETE',
    });
  }
}

// Create and export API service instance
export const apiService = new ApiService();

// Export types for use in components
export type { ApiResponse };