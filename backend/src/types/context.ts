// src/types/context.ts

export interface AIContext {
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

export interface CreateContextRequest {
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

export interface UpdateContextRequest {
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

export interface ContextCategory {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  isDefault: boolean;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface ContextFilters {
  category?: string;
  search?: string;
  isActive?: boolean;
  sortBy?: 'title' | 'lastUsed' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}