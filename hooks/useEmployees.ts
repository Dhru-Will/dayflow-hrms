import { useState, useEffect } from 'react';
import { Employee } from '@/types';
import { employeeService } from '@/services/employeeService';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        const data = await employeeService.getAllEmployees();
        setEmployees(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch employees');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return { employees, isLoading, error };
};

