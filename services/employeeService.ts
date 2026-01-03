import { Employee } from '@/types';
import { MOCK_EMPLOYEES } from '@/constants';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const employeeService = {
  getAllEmployees: async (): Promise<Employee[]> => {
    try {
      const response = await fetch(`${API_URL}/employees/`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        return data.map((emp: any) => ({
          id: emp.id.toString(),
          employeeId: emp.employee_id,
          name: emp.name,
          email: emp.email,
          department: emp.department,
          position: emp.position,
          joinDate: emp.join_date,
          salary: emp.salary,
          status: emp.status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
          manager: emp.manager,
          phone: emp.phone,
        }));
      }
    } catch (error) {
      console.error('Fetch employees error:', error);
    }
    
    // Fallback to mock data
    return [...MOCK_EMPLOYEES];
  },

  getEmployeeById: async (id: string): Promise<Employee | null> => {
    try {
      const response = await fetch(`${API_URL}/employees/${id}/`, {
        credentials: 'include',
      });

      if (response.ok) {
        const emp = await response.json();
        return {
          id: emp.id.toString(),
          employeeId: emp.employee_id,
          name: emp.name,
          email: emp.email,
          department: emp.department,
          position: emp.position,
          joinDate: emp.join_date,
          salary: emp.salary,
          status: emp.status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
          manager: emp.manager,
          phone: emp.phone,
        };
      }
    } catch (error) {
      console.error('Fetch employee error:', error);
    }
    
    // Fallback to mock data
    return MOCK_EMPLOYEES.find((emp) => emp.id === id) || null;
  },
};

