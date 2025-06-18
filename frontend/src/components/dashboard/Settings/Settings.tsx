// components/dashboard/Settings/Settings.tsx
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/authContext';
import { apiService } from '@/lib/api';
import { 
  User, 
  Shield, 
  Database, 
  CreditCard, 
  Save, 
  Trash2, 
  Mail,
  Key,
  AlertTriangle,
  Check,
  X,
  Edit3
} from 'lucide-react';

interface Profile {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  createdAt: string;
  profile: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    avatar: string;
  };
  preferences: {
    notifications: boolean;
    theme: string;
  };
}

const tabs = [
  { id: 'profile', label: 'Personal profile', icon: User },
  { id: 'security', label: 'Security & access', icon: Shield },
  { id: 'privacy', label: 'Data & privacy', icon: Database },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

export default function Settings() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    displayName: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });
  
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await apiService.getProfile();
      
      if (response.success) {
        setProfile(response.data);
        setProfileForm({
          displayName: response.data.displayName || '',
          firstName: response.data.profile?.firstName || '',
          lastName: response.data.profile?.lastName || '',
          phoneNumber: response.data.profile?.phoneNumber || ''
        });
      } else {
        setError(response.message || 'Failed to load profile');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      const response = await apiService.updateProfile(profileForm);
      
      if (response.success) {
        setSuccess('Profile updated successfully!');
        await loadProfile(); // Refresh profile data
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Failed to update profile');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') return;
    
    try {
      setSaving(true);
      const response = await apiService.deleteAccount();
      
      if (response.success) {
        await logout();
        // Redirect will happen from logout
      } else {
        setError(response.message || 'Failed to delete account');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to delete account');
    } finally {
      setSaving(false);
      setShowDeleteModal(false);
    }
  };

  const handleResetPassword = async () => {
    if (!user?.email) return;
    
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      const response = await apiService.resetPassword(user.email);
      
      if (response.success) {
        setSuccess('Password reset email sent! Check your inbox.');
        setTimeout(() => setSuccess(''), 5000);
      } else {
        setError(response.message || 'Failed to send reset email');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to send reset email');
    } finally {
      setSaving(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Personal Information</h2>
              <p className="text-white/70 mb-6">Update your personal details and profile information.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">Display Name</label>
                <input
                  type="text"
                  value={profileForm.displayName}
                  onChange={(e) => setProfileForm({...profileForm, displayName: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Enter your display name"
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/50 cursor-not-allowed"
                />
                <p className="text-white/50 text-xs mt-1">Email cannot be changed</p>
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">First Name</label>
                <input
                  type="text"
                  value={profileForm.firstName}
                  onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <label className="block text-white/70 text-sm mb-2">Last Name</label>
                <input
                  type="text"
                  value={profileForm.lastName}
                  onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Enter your last name"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-white/70 text-sm mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={profileForm.phoneNumber}
                  onChange={(e) => setProfileForm({...profileForm, phoneNumber: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Changes
              </button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Security & Access</h2>
              <p className="text-white/70 mb-6">Manage your account security and authentication settings.</p>
            </div>

            <div className="space-y-6">
              {/* Email Verification Status */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Email Verification
                    </h3>
                    <p className="text-white/70 text-sm">
                      Your email verification status
                    </p>
                  </div>
                  <div className="text-right">
                    {user?.emailVerified ? (
                      <div className="flex items-center gap-2 text-green-400">
                        <Check className="w-5 h-5" />
                        <span>Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-yellow-400">
                        <AlertTriangle className="w-5 h-5" />
                        <span>Not Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Password Reset */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Key className="w-5 h-5" />
                      Password
                    </h3>
                    <p className="text-white/70 text-sm">
                      Change your account password
                    </p>
                  </div>
                  <button
                    onClick={handleResetPassword}
                    disabled={saving}
                    className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-600/50 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Send Reset Email
                  </button>
                </div>
              </div>

              {/* Account Info */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">Account Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">User ID:</span>
                    <span className="text-white font-mono text-xs">{user?.uid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Account Created:</span>
                    <span className="text-white">
                      {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Unknown'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Role:</span>
                    <span className="text-white">{profile?.role || 'User'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Data & Privacy</h2>
              <p className="text-white/70 mb-6">Manage your data and privacy settings.</p>
            </div>

            <div className="space-y-6">
              {/* Delete Account Section */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-red-400 font-semibold mb-2">Delete Account</h3>
                    <p className="text-white/70 text-sm mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>

              {/* Data Export (Future Feature) */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">Data Export</h3>
                <p className="text-white/70 text-sm mb-4">
                  Download a copy of your data including contexts, categories, and settings.
                </p>
                <button
                  disabled
                  className="bg-white/10 text-white/50 px-4 py-2 rounded-lg cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Billing</h2>
              <p className="text-white/70 mb-6">Manage your subscription and billing information.</p>
            </div>

            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Billing Coming Soon</h3>
              <p className="text-white/70">
                Subscription and billing features are currently in development.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/70">Manage your account and preferences</p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center justify-between">
            <p className="text-red-400">{error}</p>
            <button onClick={() => setError('')} className="text-red-400 hover:text-red-300">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center justify-between">
            <p className="text-green-400">{success}</p>
            <button onClick={() => setSuccess('')} className="text-green-400 hover:text-green-300">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-white/10 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-white'
                      : 'border-transparent text-white/70 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {renderTabContent()}
        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h2 className="text-xl font-bold text-white">Delete Account</h2>
              </div>
              
              <p className="text-white/70 mb-4">
                This action cannot be undone. This will permanently delete your account and all associated data.
              </p>
              
              <div className="mb-6">
                <label className="block text-white/70 text-sm mb-2">
                  Type <strong>DELETE</strong> to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  placeholder="DELETE"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirm('');
                  }}
                  className="flex-1 bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirm !== 'DELETE' || saving}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}