'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button, Input, Card } from '@/components/ui';

// Mock users for demo display
const MOCK_USERS = [
  { loginId: 'ADM001', name: 'Admin User', role: 'ADMIN' },
  { loginId: 'HR001', name: 'HR Manager', role: 'HR' },
  { loginId: 'EMP001', name: 'John Doe', role: 'EMPLOYEE' },
];

export default function LoginPage() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/employees');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!loginId.trim()) {
      setError('Please enter a login ID');
      return;
    }

    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await login(loginId.trim().toUpperCase(), password);
      
      if (!success) {
        setError('Invalid login ID or password. Please try again.');
      } else {
        // Redirect will happen automatically via useEffect when isAuthenticated changes
        router.push('/employees');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Dayflow HRMS
            </span>
          </h1>
          <p className="text-dark-textSecondary text-base mt-2">
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Login ID */}
            <Input
              label="Login ID"
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value.toUpperCase())}
              placeholder="e.g., ADM001, HR001, EMP001"
              error={error && !password ? error : undefined}
              disabled={isSubmitting}
              required
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter your password"
              error={error && password ? error : undefined}
              disabled={isSubmitting}
              required
            />

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-950/30 border border-red-500/50 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Users */}
          <div className="mt-8 pt-6 border-t border-dark-border">
            <p className="text-xs font-medium text-dark-textSecondary mb-4 uppercase tracking-wide">
              Demo Accounts
            </p>
            <div className="space-y-3">
              {MOCK_USERS.map((user) => (
                <div
                  key={user.loginId}
                  className="flex items-center justify-between p-3 bg-dark-surfaceHover rounded-lg border border-dark-border hover:border-primary-500/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-dark-text">
                      {user.name}
                    </p>
                    <p className="text-xs text-dark-textSecondary">
                      {user.role}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginId(user.loginId);
                      setPassword('password123'); // Mock password
                      setError('');
                    }}
                    className="px-3 py-1.5 text-xs font-mono bg-dark-surface border border-dark-border rounded text-primary-400 hover:border-primary-500 hover:bg-dark-surfaceHover transition-colors"
                  >
                    {user.loginId}
                  </button>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-dark-textSecondary text-center">
              Click any login ID to auto-fill credentials
            </p>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-dark-textSecondary mt-6">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
