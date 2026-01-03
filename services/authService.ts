import { User } from '@/types';
import { MOCK_USERS } from '@/constants';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const authService = {
  login: async (loginId: string, password: string): Promise<User | null> => {
    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login_id: loginId, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        return {
          id: data.id,
          loginId: data.login_id,
          name: data.name,
          email: data.email,
          role: data.role,
        };
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    
    // Fallback to mock users for demo
    const user = MOCK_USERS.find((u) => u.loginId === loginId);
    return user || null;
  },

  logout: async (): Promise<void> => {
    try {
      await fetch(`${API_URL}/logout/`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
};

