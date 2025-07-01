// components/dashboard/Sidebar.tsx
'use client';
import { useState } from 'react';
import { Search, Layers, Settings, Download, ChevronRight, FileText } from 'lucide-react';
import UserProfile from './userProfile';
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export default function Sidebar({ activeSection = 'context', onSectionChange }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const router = useRouter();

  const menuItems = [
    {
      id: 'activity',
      label: 'Activity',
      icon: FileText,
    },
    {
      id: 'context',
      label: 'Context',
      icon: Layers,
    },
    {
      id: 'settings',
      label: 'Settings', 
      icon: Settings,
    },
  ];

  const handleSectionClick = (sectionId: string) => {
    onSectionChange?.(sectionId);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSearchClick = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
  };

  const handleDownloadClick = () => {
    router.push('/');
    // Scroll to CTA section after navigation with a longer delay
    setTimeout(() => {
      const ctaElement = document.getElementById('CTA');
      if (ctaElement) {
        ctaElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If element not found, try again after a bit more time
        setTimeout(() => {
          const ctaElement = document.getElementById('CTA');
          if (ctaElement) {
            ctaElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
    }, 300);
  };

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} h-screen bg-[#191919] border-r border-white/10 flex flex-col transition-all duration-300 ease-in-out`}>
      {/* Logo / Collapse Button */}
      <div className={`${isCollapsed ? 'p-3' : 'p-6'} border-b border-white/10 transition-all duration-300 flex items-center justify-center relative`}>
        {isCollapsed ? (
          <button
            onClick={toggleSidebar}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            {isLogoHovered ? (
              <ChevronRight className="w-5 h-5 text-white" />
            ) : (
              <Image
                src="/Logo-NoText.png"
                alt="Paradigm Logo"
                width={25}
                height={25}
                className="object-contain"
                priority
              />
            )}
          </button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <Image
              src="/Logo.png"
              alt="Paradigm Logo"
              width={150}
              height={125}
              className="object-contain"
              priority
            />
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
          </div>
        )}
      </div>

      {/* Search */}
      <div className={`${isCollapsed ? 'p-2' : 'p-4'}`}>
        <div className="relative">
          {isCollapsed ? (
            <button
              onClick={handleSearchClick}
              className="w-full bg-white/5 border border-white/20 rounded-lg py-3 text-white/50 hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center justify-center"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          ) : (
            <>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
              />
            </>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className={`flex-1 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-3 py-2'} rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t border-white/10`}>
        {/* Download Paradigm */}
        <button 
          onClick={handleDownloadClick}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'gap-3 px-3 py-2'} rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 mb-4`}
          title={isCollapsed ? 'Download Paradigm' : undefined}
        >
          <Download className="w-5 h-5" />
          {!isCollapsed && 'Download Paradigm'}
        </button>

        {/* User Profile */}
        <UserProfile isCollapsed={isCollapsed} />
      </div>
    </div>
  );
}