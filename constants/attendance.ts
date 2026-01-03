import { AttendanceRecord } from '@/types';

// Generate mock attendance history (last 30 days)
const generateMockHistory = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Randomly generate attendance status
    const rand = Math.random();
    let status: AttendanceRecord['status'] = 'present';
    let checkIn: string | null = '09:00';
    let checkOut: string | null = '18:00';
    let hoursWorked = 8;
    
    if (rand < 0.1) {
      // 10% chance of absent
      status = 'absent';
      checkIn = null;
      checkOut = null;
      hoursWorked = 0;
    } else if (rand < 0.15) {
      // 5% chance of on-leave
      status = 'on-leave';
      checkIn = null;
      checkOut = null;
      hoursWorked = 0;
    } else if (rand < 0.25) {
      // 10% chance of partial (late check-in or early check-out)
      status = 'partial';
      if (rand < 0.5) {
        checkIn = '10:30';
        hoursWorked = 7.5;
      } else {
        checkOut = '16:00';
        hoursWorked = 7;
      }
    }
    
    records.push({
      id: `att-${i}`,
      date: dateStr,
      checkIn,
      checkOut,
      status,
      hoursWorked,
    });
  }
  
  return records;
};

export const MOCK_ATTENDANCE_HISTORY: AttendanceRecord[] = generateMockHistory();

