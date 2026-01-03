import { Role } from '@/types';

/**
 * Central roles constant
 */
export const ROLES = {
  ADMIN: 'ADMIN' as const,
  HR: 'HR' as const,
  EMPLOYEE: 'EMPLOYEE' as const,
} as const;

/**
 * All available roles as an array
 */
export const ALL_ROLES: Role[] = ['ADMIN', 'HR', 'EMPLOYEE'];

/**
 * Check if the given role is ADMIN
 * @param role - The role to check
 * @returns True if role is ADMIN, false otherwise
 */
export const isAdmin = (role: Role | null | undefined): boolean => {
  return role === ROLES.ADMIN;
};

/**
 * Check if the given role is HR
 * @param role - The role to check
 * @returns True if role is HR, false otherwise
 */
export const isHR = (role: Role | null | undefined): boolean => {
  return role === ROLES.HR;
};

/**
 * Check if the given role is EMPLOYEE
 * @param role - The role to check
 * @returns True if role is EMPLOYEE, false otherwise
 */
export const isEmployee = (role: Role | null | undefined): boolean => {
  return role === ROLES.EMPLOYEE;
};

/**
 * Check if the given role matches any of the provided allowed roles
 * @param role - The role to check
 * @param allowedRoles - Array of roles that are allowed
 * @returns True if role is in allowedRoles, false otherwise
 */
export const hasRole = (
  role: Role | null | undefined,
  allowedRoles: Role[]
): boolean => {
  if (!role) return false;
  return allowedRoles.includes(role);
};

/**
 * Check if the given role has any of the specified roles
 * @param role - The role to check
 * @param roles - One or more roles to check against
 * @returns True if role matches any of the provided roles
 */
export const hasAnyRole = (
  role: Role | null | undefined,
  ...roles: Role[]
): boolean => {
  if (!role) return false;
  return roles.includes(role);
};

