'use client';

import { useEffect } from 'react';
import { Employee } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { isAdmin, isHR, canViewSalary, formatCurrency, formatDate } from '@/utils';
import { Button } from './ui';

interface EmployeeDetailModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

// Get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export default function EmployeeDetailModal({
  employee,
  isOpen,
  onClose,
}: EmployeeDetailModalProps) {
  const { user } = useAuth();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !employee) return null;

  const isAdminOrHR = user && (isAdmin(user.role) || isHR(user.role));
  const isReadOnly = user && !isAdminOrHR;
  const showSalary = user && canViewSalary(user.role);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-dark-surface border border-dark-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-dark-surface border-b border-dark-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-dark-text">Employee Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-surfaceHover rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 text-dark-textSecondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Section */}
          <div className="flex items-center gap-6 pb-6 border-b border-dark-border">
            <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-2xl">
              {getInitials(employee.name)}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-dark-text mb-1">
                {employee.name}
              </h3>
              <p className="text-dark-textSecondary">{employee.position}</p>
              <p className="text-sm text-dark-textSecondary mt-1">
                {employee.employeeId}
              </p>
            </div>
            {isReadOnly && (
              <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                <span className="text-xs font-medium text-yellow-400">Read Only</span>
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-2 block">
                Department
              </label>
              <p className="text-dark-text font-medium">{employee.department}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-2 block">
                Position
              </label>
              <p className="text-dark-text font-medium">{employee.position}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-2 block">
                Email
              </label>
              <p className="text-dark-text font-medium">{employee.email}</p>
            </div>
            {employee.phone && (
              <div>
                <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-2 block">
                  Phone
                </label>
                <p className="text-dark-text font-medium">{employee.phone}</p>
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-2 block">
                Join Date
              </label>
              <p className="text-dark-text font-medium">
                {formatDate(employee.joinDate)}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-2 block">
                Status
              </label>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  employee.status === 'ACTIVE'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-red-500/20 text-red-400 border border-red-500/50'
                }`}
              >
                {employee.status}
              </span>
            </div>
            {employee.manager && (
              <div>
                <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-2 block">
                  Manager
                </label>
                <p className="text-dark-text font-medium">{employee.manager}</p>
              </div>
            )}
            {employee.attendanceStatus && (
              <div>
                <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-2 block">
                  Attendance Status
                </label>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      employee.attendanceStatus === 'present'
                        ? 'bg-green-500'
                        : employee.attendanceStatus === 'absent'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                  />
                  <span className="text-dark-text font-medium capitalize">
                    {employee.attendanceStatus.replace('-', ' ')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Salary Section - Only for ADMIN */}
          {showSalary && employee.salary && (
            <div className="pt-6 border-t border-dark-border">
              <div className="bg-primary-950/20 border border-primary-500/30 rounded-lg p-4">
                <label className="text-xs font-medium text-primary-400 uppercase tracking-wide mb-2 block">
                  Salary
                </label>
                <p className="text-2xl font-bold text-dark-text">
                  {formatCurrency(employee.salary)}
                </p>
                <p className="text-xs text-primary-300 mt-1">
                  Visible to ADMIN only
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons - Only for ADMIN/HR */}
          {isAdminOrHR && (
            <div className="pt-6 border-t border-dark-border flex gap-3">
              <Button variant="primary" className="flex-1">
                Edit Employee
              </Button>
              <Button variant="outline" className="flex-1">
                View History
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

