import { useState, useEffect } from 'react';
import { Employee } from '@/types';
import { employeeService } from '@/services/employeeService';

export const useEmployee = (id: string | null) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await employeeService.getEmployeeById(id);
        setEmployee(data);
        setError(data ? null : 'Employee not found');
      } catch (err) {
        setError('Failed to fetch employee');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  return { employee, isLoading, error };
};

