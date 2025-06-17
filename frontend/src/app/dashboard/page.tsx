// app/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/authContext';
import { useRouter } from 'next/navigation';
import { apiService } from '@/lib/api';
import Sidebar from '@/components/dashboard/sidebar';
import AIContexts from '@/components/dashboard/AIContexts/AIContexts';

export default function DashboardPage() {
  const { user, logout, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('context');
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      loadProfile();
    }
  }, [user, authLoading, router]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProfile();
      
      if (response.success) {
        setProfile(response.data);
      } else {
        setError(response.message || 'Failed to load profile');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'context':
        return <AIContexts />;
      case 'settings':
        return (
          <div className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                  <p className="text-white/70">Manage your account and preferences</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                  <p className="text-red-400">{error}</p>
                  <button
                    onClick={loadProfile}
                    className="mt-2 text-blue-400 hover:text-blue-300 text-sm underline"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* User Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Firebase User Info */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    🔥 Firebase User Info
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <label className="text-white/70 text-sm">Email</label>
                      <p className="text-white">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">User ID</label>
                      <p className="text-white font-mono text-xs break-all">
                        {user.uid}
                      </p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Email Verified</label>
                      <p className="text-white">
                        {user.emailVerified ? (
                          <span className="text-green-400">✓ Verified</span>
                        ) : (
                          <span className="text-yellow-400">⚠ Not verified</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Backend Profile Info */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    🚀 Backend Profile
                  </h2>
                  {profile ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-white/70 text-sm">Role</label>
                        <p className="text-white">{profile.role || 'user'}</p>
                      </div>
                      <div>
                        <label className="text-white/70 text-sm">Created</label>
                        <p className="text-white text-sm">
                          {new Date(profile.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-green-400 text-sm">
                        ✅ Backend connection successful!
                      </div>
                    </div>
                  ) : (
                    <div className="text-white/70">
                      <p>Profile data not available</p>
                      <button
                        onClick={loadProfile}
                        className="mt-2 text-blue-400 hover:text-blue-300 text-sm underline"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <AIContexts />;
    }
  };

  return (
    <div className="min-h-screen bg-[#191919] flex">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
      {renderContent()}
    </div>
  );
}