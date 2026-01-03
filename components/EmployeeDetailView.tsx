'use client';

import { Employee } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { isAdmin, isHR } from '@/utils/roles';
import { canViewSalary, formatCurrency, formatDate } from '@/utils';
import { Card } from './ui';
import { Button } from './ui';

interface EmployeeDetailViewProps {
  employee: Employee;
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

export default function EmployeeDetailView({ employee }: EmployeeDetailViewProps) {
  const { user } = useAuth();

  const isAdminOrHR = user && (isAdmin(user.role) || isHR(user.role));
  const isReadOnly = user && !isAdminOrHR;
  const showSalary = user && canViewSalary(user.role);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="p-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-2xl flex-shrink-0">
            {getInitials(employee.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h1 className="text-2xl font-bold text-dark-text mb-1">
                  {employee.name}
                </h1>
                <p className="text-lg text-dark-textSecondary mb-1">
                  {employee.position}
                </p>
                <p className="text-sm text-dark-textSecondary">
                  {employee.employeeId}
                </p>
              </div>
              {isReadOnly && (
                <div className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                  <span className="text-sm font-medium text-yellow-400">Read Only</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 mt-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  employee.status === 'ACTIVE'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-red-500/20 text-red-400 border border-red-500/50'
                }`}
              >
                {employee.status}
              </span>
              {employee.attendanceStatus && (
                <div className="flex items-center gap-2 px-3 py-1 bg-dark-surfaceHover border border-dark-border rounded-full">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      employee.attendanceStatus === 'present'
                        ? 'bg-green-500'
                        : employee.attendanceStatus === 'absent'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                  />
                  <span className="text-sm text-dark-textSecondary capitalize">
                    {employee.attendanceStatus.replace('-', ' ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-dark-text mb-6 pb-3 border-b border-dark-border">
            Basic Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-1 block">
                Department
              </label>
              <p className="text-dark-text font-medium">{employee.department}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-1 block">
                Position
              </label>
              <p className="text-dark-text font-medium">{employee.position}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-1 block">
                Email
              </label>
              <p className="text-dark-text font-medium">{employee.email}</p>
            </div>
            {employee.phone && (
              <div>
                <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-1 block">
                  Phone
                </label>
                <p className="text-dark-text font-medium">{employee.phone}</p>
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-1 block">
                Join Date
              </label>
              <p className="text-dark-text font-medium">
                {formatDate(employee.joinDate)}
              </p>
            </div>
            {employee.manager && (
              <div>
                <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-1 block">
                  Manager
                </label>
                <p className="text-dark-text font-medium">{employee.manager}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Additional Information - Only for ADMIN/HR */}
        {isAdminOrHR && (
        <Card>
          <h3 className="text-lg font-semibold text-dark-text mb-6 pb-3 border-b border-dark-border">
            Additional Information
          </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-1 block">
                  Employee ID
                </label>
                <p className="text-dark-text font-medium font-mono">
                  {employee.employeeId}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-1 block">
                  Status
                </label>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    employee.status === 'ACTIVE'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                      : 'bg-red-500/20 text-red-400 border border-red-500/50'
                  }`}
                >
                  {employee.status}
                </span>
              </div>
              {employee.attendanceStatus && (
                <div>
                  <label className="text-xs font-medium text-dark-textSecondary uppercase tracking-wide mb-1 block">
                    Current Attendance
                  </label>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
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
          </Card>
        )}
      </div>

      {/* Salary Section - Only for ADMIN */}
      {showSalary && employee.salary && (
        <Card className="bg-primary-950/20 border-primary-500/30">
          <h3 className="text-lg font-semibold text-primary-400 mb-6 pb-3 border-b border-primary-500/30">
            Compensation
          </h3>
          <div className="space-y-2">
            <label className="text-xs font-medium text-primary-300 uppercase tracking-wide block">
              Annual Salary
            </label>
            <p className="text-3xl font-bold text-dark-text">
              {formatCurrency(employee.salary)}
            </p>
            <p className="text-xs text-primary-300 mt-2">
              Visible to ADMIN only
            </p>
          </div>
        </Card>
      )}

      {/* Action Buttons - Only for ADMIN/HR */}
      {isAdminOrHR && (
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-dark-text mb-1">
                Actions
              </h3>
              <p className="text-sm text-dark-textSecondary">
                Manage employee information and records
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="primary">Edit Employee</Button>
              <Button variant="outline">View History</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

