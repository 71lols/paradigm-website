// app/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/authContext';
import { useRouter } from 'next/navigation';
import { apiService } from '@/lib/api';
import Sidebar from '@/components/dashboard/sidebar';
import AIContexts from '@/components/dashboard/AIContexts/AIContexts';
import Settings from '@/components/dashboard/Settings/Settings';

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
        return <Settings />;
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