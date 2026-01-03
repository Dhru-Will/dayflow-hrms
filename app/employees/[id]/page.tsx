'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useEmployee } from '@/hooks/useEmployee';
import AppLayout from '@/components/AppLayout';
import EmployeeDetailView from '@/components/EmployeeDetailView';
import { Loading, EmptyState } from '@/components/ui';

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const employeeId = params?.id as string;
  const { employee, isLoading: employeeLoading, error } = useEmployee(employeeId);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || employeeLoading) {
    return (
      <AppLayout>
        <Loading size="lg" text="Loading employee details..." />
      </AppLayout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (error || !employee) {
    return (
      <AppLayout>
        <EmptyState
          icon={
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
          title={error || 'Employee not found'}
          description="The employee you're looking for doesn't exist or has been removed."
          action={
            <Link
              href="/employees"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Employees
            </Link>
          }
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/employees"
          className="inline-flex items-center gap-2 text-dark-textSecondary hover:text-dark-text transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Employees
        </Link>
      </div>

      {/* Employee Detail View */}
      <EmployeeDetailView employee={employee} />
    </AppLayout>
  );
}

