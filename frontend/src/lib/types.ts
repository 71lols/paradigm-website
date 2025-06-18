// lib/types.ts - API response types

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    avatar?: string;
  };
  preferences?: {
    notifications?: boolean;
    theme?: string;
  };
  provider?: string;
}

export interface UpdateProfileRequest {
  displayName?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  displayName?: string;
}

export interface SocialProfileRequest {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  provider: string;
}