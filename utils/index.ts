import { Role } from '@/types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const canViewSalary = (role: Role): boolean => {
  return role === 'ADMIN';
};

export const getRoleDisplayName = (role: Role): string => {
  return role.charAt(0) + role.slice(1).toLowerCase();
};

// Re-export role utilities for convenience
export * from './roles';

