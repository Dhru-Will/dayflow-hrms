'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { isAdmin, isHR } from '@/utils/roles';
import { TimeOffRequest, LeaveType } from '@/types';
import { MOCK_TIME_OFF_REQUESTS } from '@/constants/timeOff';
import AppLayout from '@/components/AppLayout';
import LeaveApplicationForm from '@/components/LeaveApplicationForm';
import LeaveStatusList from '@/components/LeaveStatusList';
import AllLeaveRequests from '@/components/AllLeaveRequests';
import { Loading } from '@/components/ui';

export default function TimeOffPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<TimeOffRequest[]>(MOCK_TIME_OFF_REQUESTS);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  // Get user's requests (for employee view)
  const getUserRequests = () => {
    if (!user) return [];
    // In a real app, filter by current user's employeeId
    // For mock, return requests for EMP001 (John Doe)
    return requests.filter((r) => r.employeeId === 'EMP001');
  };

  const isAdminOrHR = user && (isAdmin(user.role) || isHR(user.role));
  const userRequests = getUserRequests();

  const handleSubmitLeave = (data: {
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    reason: string;
  }) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const newRequest: TimeOffRequest = {
      id: `req-${Date.now()}`,
      employeeId: user?.id === '3' ? 'EMP001' : 'EMP002', // Mock employee ID
      employeeName: user?.name || 'Employee',
      leaveType: data.leaveType,
      startDate: data.startDate,
      endDate: data.endDate,
      days,
      reason: data.reason,
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
    };

    setRequests([newRequest, ...requests]);
  };

  const handleApprove = (id: string) => {
    setRequests(
      requests.map((req) =>
        req.id === id
          ? {
              ...req,
              status: 'approved' as const,
              reviewedBy: user?.name || 'Admin',
              reviewedDate: new Date().toISOString().split('T')[0],
            }
          : req
      )
    );
  };

  const handleReject = (id: string) => {
    setRequests(
      requests.map((req) =>
        req.id === id
          ? {
              ...req,
              status: 'rejected' as const,
              reviewedBy: user?.name || 'Admin',
              reviewedDate: new Date().toISOString().split('T')[0],
            }
          : req
      )
    );
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
        <h1 className="text-3xl font-bold text-dark-text mb-2">Time Off</h1>
        <p className="text-sm text-dark-textSecondary">
          {isAdminOrHR
            ? 'Manage all employee leave requests'
            : 'Request and track your time off'}
        </p>
      </div>

      {isAdminOrHR ? (
        // Admin/HR View
        <div className="space-y-6">
          <AllLeaveRequests
            requests={requests}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </div>
      ) : (
        // Employee View
        <div className="space-y-6">
          <LeaveApplicationForm onSubmit={handleSubmitLeave} />
          <LeaveStatusList requests={userRequests} />
        </div>
      )}
    </AppLayout>
  );
}
