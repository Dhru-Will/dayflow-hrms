'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getRoleDisplayName } from '@/utils';

export default function AvatarDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleProfile = () => {
    setIsOpen(false);
    router.push('/profile');
  };

  if (!user) return null;

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-dark-surfaceHover transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
          {getInitials(user.name)}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-dark-text">{user.name}</p>
          <p className="text-xs text-dark-textSecondary">
            {getRoleDisplayName(user.role)}
          </p>
        </div>
        <svg
          className={`w-4 h-4 text-dark-textSecondary transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-dark-surface border border-dark-border rounded-lg shadow-lg z-50 overflow-hidden">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-dark-border">
            <p className="text-sm font-medium text-dark-text">{user.name}</p>
            <p className="text-xs text-dark-textSecondary mt-1">{user.email}</p>
            <p className="text-xs text-primary-400 mt-1">
              {getRoleDisplayName(user.role)}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={handleProfile}
              className="w-full px-4 py-2 text-left text-sm text-dark-text hover:bg-dark-surfaceHover transition-colors flex items-center gap-3"
            >
              <svg
                className="w-4 h-4 text-dark-textSecondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              My Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-950/20 transition-colors flex items-center gap-3"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

