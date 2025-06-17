// components/dashboard/Sidebar.tsx
'use client';
import { useState } from 'react';
import { Search, Layers, Settings, Download } from 'lucide-react';
import UserProfile from './userProfile';

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export default function Sidebar({ activeSection = 'context', onSectionChange }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
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

  return (
    <div className="w-64 h-screen bg-[#191919] border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-white text-xl font-semibold">LOGO</h1>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10">
        {/* Download Paradigm */}
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 mb-4">
          <Download className="w-4 h-4" />
          Download Paradigm
        </button>

        {/* User Profile */}
        <UserProfile />
      </div>
    </div>
  );
}