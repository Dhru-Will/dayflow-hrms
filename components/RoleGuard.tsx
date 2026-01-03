'use client';

import React, { ReactNode } from 'react';
import { Role } from '@/types';
import { useRole } from '@/context/AuthContext';
import { hasRole, isAdmin, isHR, isEmployee } from '@/utils/roles';

export interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: Role[];
  allowedRole?: Role;
  requireAdmin?: boolean;
  requireHR?: boolean;
  requireEmployee?: boolean;
  fallback?: ReactNode;
  showFallback?: boolean;
}

/**
 * RoleGuard component for conditionally rendering content based on user role
 * 
 * @example
 * // Allow only ADMIN
 * <RoleGuard requireAdmin>
 *   <AdminOnlyContent />
 * </RoleGuard>
 * 
 * @example
 * // Allow ADMIN or HR
 * <RoleGuard allowedRoles={['ADMIN', 'HR']}>
 *   <AdminOrHRContent />
 * </RoleGuard>
 * 
 * @example
 * // With fallback
 * <RoleGuard requireAdmin fallback={<div>Access Denied</div>}>
 *   <AdminContent />
 * </RoleGuard>
 */
export default function RoleGuard({
  children,
  allowedRoles,
  allowedRole,
  requireAdmin = false,
  requireHR = false,
  requireEmployee = false,
  fallback = null,
  showFallback = false,
}: RoleGuardProps) {
  const currentRole = useRole();

  // Determine if user has access
  let hasAccess = false;

  // Check specific role requirements
  if (requireAdmin) {
    hasAccess = isAdmin(currentRole);
  } else if (requireHR) {
    hasAccess = isHR(currentRole);
  } else if (requireEmployee) {
    hasAccess = isEmployee(currentRole);
  }
  // Check allowed roles array
  else if (allowedRoles && allowedRoles.length > 0) {
    hasAccess = hasRole(currentRole, allowedRoles);
  }
  // Check single allowed role
  else if (allowedRole) {
    hasAccess = currentRole === allowedRole;
  }
  // If no restrictions specified, allow all authenticated users
  else {
    hasAccess = currentRole !== null;
  }

  // If user has access, render children
  if (hasAccess) {
    return <>{children}</>;
  }

  // If fallback should be shown, render it
  if (showFallback && fallback) {
    return <>{fallback}</>;
  }

  // Otherwise, render nothing
  return null;
}

