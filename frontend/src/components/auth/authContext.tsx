// contexts/AuthContext.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  sendPasswordResetEmail,
  signInWithCustomToken,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { apiService } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  signInWithGithub: () => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign up with email and password (using backend)
  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      setLoading(true);
      
      // Call backend to create user
      const response = await apiService.signUp({
        email,
        password,
        displayName,
      });

      if (response.success && response.data?.customToken) {
        // Sign in to Firebase with the custom token from backend
        await signInWithCustomToken(auth, response.data.customToken);
        
        return { user: response.data.user };
      } else {
        return { error: response.message || 'Failed to create account' };
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { error: error.message || 'Failed to create account' };
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password (direct Firebase)
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user };
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      // Handle Firebase auth errors
      let errorMessage = 'Failed to sign in';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        default:
          errorMessage = error.message || 'Failed to sign in';
      }
      
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      // Check if this is a new user and create backend profile
      await handleSocialSignIn(userCredential.user);
      
      return { user: userCredential.user };
    } catch (error: any) {
      console.error('Google sign in error:', error);
      
      let errorMessage = 'Failed to sign in with Google';
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign in cancelled';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup blocked by browser';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign in cancelled';
          break;
        default:
          errorMessage = error.message || 'Failed to sign in with Google';
      }
      
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Sign in with GitHub
  const signInWithGithub = async () => {
    try {
      setLoading(true);
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      // Check if this is a new user and create backend profile
      await handleSocialSignIn(userCredential.user);
      
      return { user: userCredential.user };
    } catch (error: any) {
      console.error('GitHub sign in error:', error);
      
      let errorMessage = 'Failed to sign in with GitHub';
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign in cancelled';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup blocked by browser';
          break;
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'Account exists with different sign-in method';
          break;
        default:
          errorMessage = error.message || 'Failed to sign in with GitHub';
      }
      
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Handle social sign-in and create backend profile if needed
  const handleSocialSignIn = async (user: User) => {
    try {
      // Wait a bit for the Firebase auth state to fully update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Now call our backend to create the user profile
      console.log('Creating backend profile for social user:', user.email);
      
      const createResponse = await apiService.createSocialUserProfile({
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        provider: user.providerData[0]?.providerId || 'unknown'
      });
      
      if (!createResponse.success) {
        console.error('Failed to create backend profile:', createResponse.message);
      } else {
        console.log('Backend profile created successfully');
      }
    } catch (error) {
      console.error('Error handling social sign in:', error);
      // Don't throw error here - let the user continue to dashboard
      // They can retry profile loading from there
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reset password (using backend)
  const resetPassword = async (email: string) => {
    try {
      await apiService.resetPassword(email);
    } catch (error: any) {
      console.error('Error sending password reset email:', error);
      throw new Error(error.message || 'Failed to send password reset email');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithGithub,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};