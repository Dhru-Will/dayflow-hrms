'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '@/types';

// Mock users data - in real app, this would come from login response
const MOCK_USERS: User[] = [
  {
    id: '1',
    loginId: 'ADM001',
    name: 'Admin User',
    role: 'ADMIN',
    email: 'admin@dayflow.com',
  },
  {
    id: '2',
    loginId: 'HR001',
    name: 'HR Manager',
    role: 'HR',
    email: 'hr@dayflow.com',
  },
  {
    id: '3',
    loginId: 'EMP001',
    name: 'John Doe',
    role: 'EMPLOYEE',
    email: 'john.doe@dayflow.com',
  },
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  // Mock login function - simulates login response
  mockLogin: (userId: string) => void;
  // Login function that accepts loginId and password
  login: (loginId: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount (persist across page refreshes)
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Update authenticated state when user changes
  useEffect(() => {
    setIsAuthenticated(user !== null);
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
  }, [user]);

  const mockLogin = (userId: string) => {
    // Simulate mock login response
    const foundUser = MOCK_USERS.find((u) => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
    }
  };

  const login = async (loginId: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock login: Find user by loginId
    // In a real app, password would be validated on the backend
    // For mock: any password works, but loginId must match
    const foundUser = MOCK_USERS.find((u) => u.loginId === loginId.toUpperCase());
    
    if (foundUser && password) {
      // Password validation would happen here in real app
      // For mock: any non-empty password is accepted
      setUser(foundUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        setUser,
        mockLogin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to get current user
 * @returns Current user object or null if not logged in
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Hook to get current user directly
 * @returns Current user object or null
 */
export const useCurrentUser = (): User | null => {
  const { user } = useAuth();
  return user;
};

/**
 * Hook to get current role
 * @returns Current user's role or null if not logged in
 */
export const useRole = (): Role | null => {
  const { user } = useAuth();
  return user?.role || null;
};

/**
 * Hook to check if user is logged in
 * @returns Boolean indicating if user is authenticated
 */
export const useIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};

