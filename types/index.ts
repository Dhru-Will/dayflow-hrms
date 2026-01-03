export type Role = 'ADMIN' | 'HR' | 'EMPLOYEE';

export interface User {
  id: string;
  loginId: string;
  role: Role;
  name: string;
  email: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'on-leave';

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  position: string;
  joinDate: string;
  salary?: number; // Only visible to ADMIN
  status: 'ACTIVE' | 'INACTIVE';
  attendanceStatus?: AttendanceStatus; // Current attendance status
  manager?: string;
  phone?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: 'present' | 'absent' | 'on-leave' | 'partial';
  hoursWorked?: number;
}

export interface AttendanceState {
  isCheckedIn: boolean;
  checkInTime: string | null;
  checkOutTime: string | null;
  currentDate: string;
}

export type LeaveType = 'vacation' | 'sick' | 'personal' | 'other';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export interface TimeOffRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  submittedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
}

