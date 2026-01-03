'use client';

import { Employee, AttendanceStatus } from '@/types';
import { Card } from './ui';

interface EmployeeCardProps {
  employee: Employee;
  onClick?: () => void;
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

// Get status indicator styles
const getStatusIndicator = (status: AttendanceStatus | undefined) => {
  switch (status) {
    case 'present':
      return {
        bg: 'bg-green-500',
        ring: 'ring-green-500/20',
        label: 'Present',
      };
    case 'absent':
      return {
        bg: 'bg-yellow-500',
        ring: 'ring-yellow-500/20',
        label: 'Absent',
      };
    case 'on-leave':
      return {
        bg: 'bg-blue-500',
        ring: 'ring-blue-500/20',
        label: 'On Leave',
        icon: true,
      };
    default:
      return {
        bg: 'bg-gray-500',
        ring: 'ring-gray-500/20',
        label: 'Unknown',
      };
  }
};

export default function EmployeeCard({ employee, onClick }: EmployeeCardProps) {
  const statusIndicator = getStatusIndicator(employee.attendanceStatus);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default: navigate to employee detail page (when implemented)
      console.log('Clicked employee:', employee.id);
    }
  };

  return (
    <Card
      hover
      onClick={handleClick}
      className="p-6 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-lg">
            {getInitials(employee.name)}
          </div>
        </div>

        {/* Employee Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-dark-text truncate">
                {employee.name}
              </h3>
              <p className="text-sm text-dark-textSecondary mt-0.5">
                {employee.position}
              </p>
            </div>

            {/* Status Indicator */}
            <div className="flex-shrink-0">
              <div
                className={`
                  relative w-3 h-3 rounded-full ${statusIndicator.bg}
                  ring-2 ${statusIndicator.ring}
                `}
                title={statusIndicator.label}
              >
                {statusIndicator.icon && (
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 text-blue-400 bg-dark-surface rounded-full p-0.5">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      className="w-full h-full"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Department */}
          <div className="mt-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-surfaceHover text-dark-textSecondary border border-dark-border">
              {employee.department}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
