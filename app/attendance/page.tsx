'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useAIAssistant } from '@/context/AIAssistantContext';
import { AttendanceRecord, AttendanceState } from '@/types';
import { MOCK_ATTENDANCE_HISTORY } from '@/constants/attendance';
import AppLayout from '@/components/AppLayout';
import AttendanceManager from '@/components/AttendanceManager';
import AttendanceHistory from '@/components/AttendanceHistory';
import { Button, Loading } from '@/components/ui';

export default function AttendancePage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { openAssistant } = useAIAssistant();
  const router = useRouter();
  
  // Local state for attendance
  const [attendanceState, setAttendanceState] = useState<AttendanceState>(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('attendance_state');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Check if it's today's data
          const today = new Date().toISOString().split('T')[0];
          if (parsed.currentDate === today) {
            return parsed;
          }
        } catch (e) {
          // Invalid data, use default
        }
      }
    }
    return {
      isCheckedIn: false,
      checkInTime: null,
      checkOutTime: null,
      currentDate: new Date().toISOString().split('T')[0],
    };
  });

  const [history, setHistory] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE_HISTORY);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('attendance_state', JSON.stringify(attendanceState));
    }
  }, [attendanceState]);

  const handleCheckIn = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    setAttendanceState({
      ...attendanceState,
      isCheckedIn: true,
      checkInTime: timeStr,
    });

    // Update today's record in history
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = history.find((r) => r.date === today);
    
    if (todayRecord) {
      setHistory(
        history.map((r) =>
          r.date === today
            ? {
                ...r,
                checkIn: timeStr,
                status: r.checkOut ? 'present' : 'partial',
              }
            : r
        )
      );
    } else {
      // Add new record for today
      setHistory([
        {
          id: `att-today-${Date.now()}`,
          date: today,
          checkIn: timeStr,
          checkOut: null,
          status: 'partial',
          hoursWorked: 0,
        },
        ...history,
      ]);
    }
  };

  const handleCheckOut = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    // Calculate hours worked
    const checkInTime = attendanceState.checkInTime;
    let hoursWorked = 0;
    
    if (checkInTime) {
      const [checkInHour, checkInMin] = checkInTime.split(':').map(Number);
      const [checkOutHour, checkOutMin] = timeStr.split(':').map(Number);
      const checkInMinutes = checkInHour * 60 + checkInMin;
      const checkOutMinutes = checkOutHour * 60 + checkOutMin;
      hoursWorked = (checkOutMinutes - checkInMinutes) / 60;
    }

    setAttendanceState({
      ...attendanceState,
      isCheckedIn: false,
      checkOutTime: timeStr,
    });

    // Update today's record in history
    const today = new Date().toISOString().split('T')[0];
    setHistory(
      history.map((r) =>
        r.date === today
          ? {
              ...r,
              checkOut: timeStr,
              status: hoursWorked >= 7.5 ? 'present' : 'partial',
              hoursWorked: Math.round(hoursWorked * 10) / 10,
            }
          : r
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
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-text mb-2">Attendance</h1>
          <p className="text-sm text-dark-textSecondary">
            Track and manage your attendance
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => openAssistant('attendance')}
          className="flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Get Insights
        </Button>
      </div>

      {/* Attendance Manager */}
      <div className="mb-8">
        <AttendanceManager
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
          isCheckedIn={attendanceState.isCheckedIn}
          checkInTime={attendanceState.checkInTime}
        />
      </div>

      {/* Attendance History */}
      <AttendanceHistory records={history} />
    </AppLayout>
  );
}
