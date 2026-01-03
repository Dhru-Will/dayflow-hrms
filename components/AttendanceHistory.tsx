'use client';

import { AttendanceRecord } from '@/types';
import { Card, EmptyState } from './ui';

interface AttendanceHistoryProps {
  records: AttendanceRecord[];
}

const getStatusBadge = (status: AttendanceRecord['status']) => {
  const styles = {
    present: 'bg-green-500/20 text-green-400 border-green-500/50',
    absent: 'bg-red-500/20 text-red-400 border-red-500/50',
    'on-leave': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    partial: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {status === 'on-leave' ? 'On Leave' : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
  });
};

export default function AttendanceHistory({ records }: AttendanceHistoryProps) {
  return (
    <Card>
      <h2 className="text-lg font-bold text-dark-text mb-6">Attendance History</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border">
              <th className="text-left py-3 px-4 text-xs font-semibold text-dark-textSecondary uppercase tracking-wide">
                Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-dark-textSecondary uppercase tracking-wide">
                Check In
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-dark-textSecondary uppercase tracking-wide">
                Check Out
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-dark-textSecondary uppercase tracking-wide">
                Hours
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-dark-textSecondary uppercase tracking-wide">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.id}
                className="border-b border-dark-border/50 hover:bg-dark-surfaceHover transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="font-medium text-dark-text">
                    {formatDate(record.date)}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-dark-text font-mono">
                    {record.checkIn || '—'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-dark-text font-mono">
                    {record.checkOut || '—'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-dark-text">
                    {record.hoursWorked ? `${record.hoursWorked}h` : '—'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  {getStatusBadge(record.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {records.length === 0 && (
        <EmptyState
          icon={
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title="No attendance records"
          description="Your attendance history will appear here once you start checking in."
        />
      )}
    </Card>
  );
}

