'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEmployees } from '@/hooks/useEmployees';
import { isAdmin, isHR } from '@/utils/roles';
import { Employee } from '@/types';
import AppLayout from '@/components/AppLayout';
import EmployeeCard from '@/components/EmployeeCard';
import { Loading, EmptyState } from '@/components/ui';

export default function EmployeesPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const { employees, isLoading: employeesLoading } = useEmployees();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  // Filter employees based on role
  const getFilteredEmployees = () => {
    if (!user) return [];
    
    // ADMIN and HR see all employees
    if (isAdmin(user.role) || isHR(user.role)) {
      return employees;
    }
    
    // EMPLOYEE sees limited info - only basic fields visible
    // For now, they see all employees but with limited detail view
    return employees;
  };

  const filteredEmployees = getFilteredEmployees();

  const handleCardClick = (employee: Employee) => {
    // Navigate to detail page
    router.push(`/employees/${employee.id}`);
  };

  if (authLoading) {
    return <Loading fullScreen text="Loading..." />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-text mb-2">Employees</h1>
        {!employeesLoading && (
          <p className="text-sm text-dark-textSecondary">
            {filteredEmployees.length} {filteredEmployees.length === 1 ? 'employee' : 'employees'} found
          </p>
        )}
      </div>

      {employeesLoading ? (
        <Loading size="lg" text="Loading employees..." />
      ) : filteredEmployees.length === 0 ? (
        <EmptyState
          icon={
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          title="No employees found"
          description="There are no employees to display at this time."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onClick={() => handleCardClick(employee)}
            />
          ))}
        </div>
      )}
    </AppLayout>
  );
}

