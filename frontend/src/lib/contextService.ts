interface AIContext {
  id: string;
  title: string;
  description: string;
  category: string;
  color: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  lastUsed: string;
  isActive: boolean;
  settings?: {
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
  };
}

interface CreateContextRequest {
  title: string;
  description: string;
  category: string;
  color: string;
  settings?: {
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
  };
}

interface UpdateContextRequest {
  title?: string;
  description?: string;
  category?: string;
  color?: string;
  settings?: {
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
  };
}

interface ContextCategory {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  isDefault: boolean;
}

interface ContextFilters {
  category?: string;
  search?: string;
  isActive?: boolean;
  sortBy?: 'title' | 'lastUsed' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

class ContextService {
  private baseUrl: string;

  constructor() {
    // Remove trailing slash to prevent double slashes
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    let token = null;
    
    try {
      // Get the current Firebase user and their ID token
      const { auth } = await import('@/lib/firebase');
      
      if (auth.currentUser) {
        // Get fresh ID token from Firebase Auth
        token = await auth.currentUser.getIdToken(false); // false = don't force refresh
      } else {
        console.warn('No authenticated user found');
      }
    } catch (error) {
      console.error('Failed to get Firebase ID token:', error);
    }
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn('No auth token available. User may need to sign in.');
    }
    
    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || 'Request failed');
    }
    
    const data = await response.json();
    return data.data; // Assuming your backend returns { success, message, data }
  }

  // Context methods
  async getContexts(filters?: ContextFilters): Promise<{
    contexts: AIContext[];
    total: number;
    filters: ContextFilters;
  }> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const url = `${this.baseUrl}/api/contexts?${params.toString()}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: await this.getAuthHeaders(),
    });

    return this.handleResponse<{
      contexts: AIContext[];
      total: number;
      filters: ContextFilters;
    }>(response);
  }

  async getContext(contextId: string): Promise<AIContext> {
    const response = await fetch(`${this.baseUrl}/api/contexts/${contextId}`, {
      method: 'GET',
      headers: await this.getAuthHeaders(),
    });

    return this.handleResponse<AIContext>(response);
  }

  async createContext(contextData: CreateContextRequest): Promise<AIContext> {
    const response = await fetch(`${this.baseUrl}/api/contexts`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(contextData),
    });

    return this.handleResponse<AIContext>(response);
  }

  async updateContext(contextId: string, updateData: UpdateContextRequest): Promise<AIContext> {
    const response = await fetch(`${this.baseUrl}/api/contexts/${contextId}`, {
      method: 'PATCH',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(updateData),
    });

    return this.handleResponse<AIContext>(response);
  }

  async deleteContext(contextId: string): Promise<{ id: string }> {
    const response = await fetch(`${this.baseUrl}/api/contexts/${contextId}`, {
      method: 'DELETE',
      headers: await this.getAuthHeaders(),
    });

    return this.handleResponse<{ id: string }>(response);
  }

  async useContext(contextId: string): Promise<AIContext> {
    const response = await fetch(`${this.baseUrl}/api/contexts/${contextId}/use`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
    });

    return this.handleResponse<AIContext>(response);
  }

  async deactivateContext(contextId: string): Promise<AIContext> {
    const response = await fetch(`${this.baseUrl}/api/contexts/${contextId}/deactivate`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
    });

    return this.handleResponse<AIContext>(response);
  }

  // Category methods
  async getCategories(): Promise<ContextCategory[]> {
    const response = await fetch(`${this.baseUrl}/api/contexts/categories/list`, {
      method: 'GET',
      headers: await this.getAuthHeaders(),
    });

    return this.handleResponse<ContextCategory[]>(response);
  }

  async createCategory(name: string): Promise<ContextCategory> {
    const response = await fetch(`${this.baseUrl}/api/contexts/categories`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify({ name }),
    });

    return this.handleResponse<ContextCategory>(response);
  }

  async deleteCategory(categoryId: string): Promise<{ id: string }> {
    const response = await fetch(`${this.baseUrl}/api/contexts/categories/${categoryId}`, {
      method: 'DELETE',
      headers: await this.getAuthHeaders(),
    });

    return this.handleResponse<{ id: string }>(response);
  }
}

export const contextService = new ContextService();
export type { AIContext, CreateContextRequest, UpdateContextRequest, ContextCategory, ContextFilters };