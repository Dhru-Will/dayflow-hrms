'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { isAdmin } from '@/utils/roles';
import AppLayout from '@/components/AppLayout';
import { Tabs, Loading } from '@/components/ui';
import ResumeTab from '@/components/profile/ResumeTab';
import PrivateInfoTab from '@/components/profile/PrivateInfoTab';
import SecurityTab from '@/components/profile/SecurityTab';
import SalaryInfoTab from '@/components/profile/SalaryInfoTab';

export default function ProfilePage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return <Loading fullScreen text="Loading..." />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  // Build tabs based on role
  const tabs = [
    {
      id: 'resume',
      label: 'Resume',
      content: <ResumeTab />,
    },
    {
      id: 'private',
      label: 'Private Info',
      content: <PrivateInfoTab />,
    },
    {
      id: 'security',
      label: 'Security',
      content: <SecurityTab />,
    },
  ];

  // Only add Salary Info tab for ADMIN
  if (isAdmin(user.role)) {
    tabs.push({
      id: 'salary',
      label: 'Salary Info',
      content: <SalaryInfoTab />,
    });
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-text mb-2">My Profile</h1>
        <p className="text-sm text-dark-textSecondary">
          Manage your profile information and settings
        </p>
      </div>

      {/* Profile Header */}
      <div className="mb-8 p-6 bg-dark-surface border border-dark-border rounded-xl">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-2xl">
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-dark-text mb-1">{user.name}</h2>
            <p className="text-dark-textSecondary">{user.email}</p>
            <p className="text-sm text-primary-400 mt-1">
              {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} defaultTab="resume" />
    </AppLayout>
  );
}

