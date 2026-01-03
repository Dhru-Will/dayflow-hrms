'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button, Card } from './ui';

interface AttendanceManagerProps {
  onCheckIn: () => void;
  onCheckOut: () => void;
  isCheckedIn: boolean;
  checkInTime: string | null;
}

export default function AttendanceManager({
  onCheckIn,
  onCheckOut,
  isCheckedIn,
  checkInTime,
}: AttendanceManagerProps) {
  const { user } = useAuth();
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <Card className="p-8">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-dark-text mb-3">
            Today's Attendance
          </h2>
          <div className="flex items-center gap-4 mt-4">
            <div>
              <p className="text-xs text-dark-textSecondary uppercase tracking-wide mb-1">
                Current Status
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isCheckedIn ? 'bg-green-500' : 'bg-gray-500'
                  } animate-pulse`}
                />
                <span className="text-lg font-semibold text-dark-text">
                  {isCheckedIn ? 'Checked In' : 'Not Checked In'}
                </span>
              </div>
            </div>
            {checkInTime && (
              <div>
                <p className="text-xs text-dark-textSecondary uppercase tracking-wide mb-1">
                  Check-In Time
                </p>
                <p className="text-lg font-semibold text-dark-text">
                  {checkInTime}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          {!isCheckedIn ? (
            <Button
              variant="primary"
              size="lg"
              onClick={onCheckIn}
              className="min-w-[140px]"
            >
              <div className="flex items-center gap-2">
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Check In
              </div>
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="lg"
              onClick={onCheckOut}
              className="min-w-[140px]"
            >
              <div className="flex items-center gap-2">
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Check Out
              </div>
            </Button>
          )}
        </div>
      </div>

      {/* Current Time Display */}
      <div className="mt-6 pt-6 border-t border-dark-border">
        <div className="flex items-center justify-between">
          <p className="text-sm text-dark-textSecondary">Current Time</p>
          <p className="text-lg font-mono font-semibold text-dark-text">
            {currentTime}
          </p>
        </div>
      </div>
    </Card>
  );
}

