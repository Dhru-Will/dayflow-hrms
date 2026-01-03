'use client';

import { TimeOffRequest, LeaveStatus } from '@/types';
import { LEAVE_TYPES } from '@/constants/timeOff';
import { Button, Card, EmptyState } from './ui';

interface AllLeaveRequestsProps {
  requests: TimeOffRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const getStatusIcon = (status: LeaveStatus) => {
  switch (status) {
    case 'approved':
      return (
        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    case 'rejected':
      return (
        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    case 'pending':
      return (
        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

const getStatusBadge = (status: LeaveStatus) => {
  const styles = {
    approved: 'bg-green-500/20 text-green-400 border-green-500/50',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/50',
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {getStatusIcon(status)}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function AllLeaveRequests({
  requests,
  onApprove,
  onReject,
}: AllLeaveRequestsProps) {
  if (requests.length === 0) {
    return (
      <Card>
        <h2 className="text-lg font-bold text-dark-text mb-6">All Leave Requests</h2>
        <EmptyState
          icon={
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          title="No leave requests"
          description="There are no leave requests to review at this time."
        />
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-lg font-bold text-dark-text mb-6">All Leave Requests</h2>
      
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="p-5 bg-dark-surfaceHover border border-dark-border rounded-lg hover:border-primary-500/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">{LEAVE_TYPES[request.leaveType].icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-dark-text">{request.employeeName}</h3>
                    <span className="text-xs text-dark-textSecondary font-mono">
                      {request.employeeId}
                    </span>
                  </div>
                  <p className="text-sm text-dark-textSecondary">
                    {LEAVE_TYPES[request.leaveType].label} • {formatDate(request.startDate)} - {formatDate(request.endDate)}
                  </p>
                </div>
              </div>
              {getStatusBadge(request.status)}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-dark-textSecondary mb-1">Days</p>
                <p className="text-sm font-medium text-dark-text">{request.days} day{request.days !== 1 ? 's' : ''}</p>
              </div>
              <div>
                <p className="text-xs text-dark-textSecondary mb-1">Submitted</p>
                <p className="text-sm font-medium text-dark-text">{formatDate(request.submittedDate)}</p>
              </div>
              {request.reviewedDate && (
                <>
                  <div>
                    <p className="text-xs text-dark-textSecondary mb-1">Reviewed</p>
                    <p className="text-sm font-medium text-dark-text">{formatDate(request.reviewedDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-dark-textSecondary mb-1">Reviewed By</p>
                    <p className="text-sm font-medium text-dark-text">{request.reviewedBy}</p>
                  </div>
                </>
              )}
            </div>

            {request.reason && (
              <div className="mb-4 p-3 bg-dark-surface rounded border border-dark-border">
                <p className="text-xs text-dark-textSecondary mb-1">Reason</p>
                <p className="text-sm text-dark-text">{request.reason}</p>
              </div>
            )}

            {/* Action Buttons - Only for pending requests */}
            {request.status === 'pending' && (
              <div className="flex gap-3 pt-4 border-t border-dark-border">
                <Button
                  variant="primary"
                  onClick={() => onApprove(request.id)}
                  className="flex-1"
                >
                  <div className="flex items-center gap-2 justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Approve
                  </div>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onReject(request.id)}
                  className="flex-1"
                >
                  <div className="flex items-center gap-2 justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </div>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

