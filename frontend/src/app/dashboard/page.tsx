// app/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/authContext';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/sidebar';
import AIContexts from '@/components/dashboard/AIContexts/AIContexts';
import Settings from '@/components/dashboard/Settings/Settings';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [activeSection, setActiveSection] = useState('context');
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
  }, [user, authLoading, router]);

  if (authLoading) {
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
      <div className="fixed left-0 top-0 h-screen">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
        />
      </div>
      <div className="flex-1 ml-64 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}