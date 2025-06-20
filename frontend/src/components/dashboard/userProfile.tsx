// components/dashboard/UserProfile.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/components/auth/authContext';
import { LogOut, Settings, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserProfileProps {
  isCollapsed?: boolean;
}

export default function UserProfile({ isCollapsed = false }: UserProfileProps) {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const getDisplayName = () => {
    return user?.displayName || user?.email || 'User';
  };

  const getDisplayEmail = () => {
    return user?.email || '';
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Profile Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2 w-full rounded-lg hover:bg-white/5 transition-colors`}
        title={isCollapsed ? getDisplayName() : undefined}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-medium">
            {getInitials(user.displayName, user.email)}
          </span>
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0 text-left">
            <p className="text-white text-sm font-medium truncate">
              {getDisplayName()}
            </p>
            <p className="text-white/50 text-xs truncate">
              {getDisplayEmail()}
            </p>
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div 
          className={`absolute bottom-full mb-2 bg-[#2a2a2a] border border-white/20 rounded-lg shadow-lg z-50 ${
            isCollapsed 
              ? 'left-0 w-56' // When collapsed, position dropdown to the right
              : 'left-0 right-0' // When expanded, span full width
          }`}
        >
          <div className="px-4 py-2 border-b border-white/10">
            <p className="text-white text-sm font-medium truncate">
              {getDisplayName()}
            </p>
            <p className="text-white/50 text-xs truncate">
              {getDisplayEmail()}
            </p>
          </div>
          <div className="border-white/10">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}