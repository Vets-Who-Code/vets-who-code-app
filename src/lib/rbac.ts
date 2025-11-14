import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { options } from '@/pages/api/auth/options';

export type Role = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN' | 'MENTOR';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    name: string | null;
    email: string;
    role: Role;
  };
}

/**
 * Require authentication for API route
 *
 * Usage:
 * export default requireAuth(async (req, res) => {
 *   // req.user is available here
 *   res.json({ user: req.user });
 * });
 */
export function requireAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, options);

    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized - Please sign in' });
    }

    req.user = {
      id: session.user.id,
      name: session.user.name || null,
      email: session.user.email || '',
      role: (session.user.role as Role) || 'STUDENT',
    };

    return handler(req, res);
  };
}

/**
 * Require specific role(s) for API route
 *
 * Usage:
 * // Require admin only
 * export default requireRole('ADMIN')(async (req, res) => {
 *   res.json({ message: 'Admin only' });
 * });
 *
 * // Require instructor or admin
 * export default requireRole(['INSTRUCTOR', 'ADMIN'])(async (req, res) => {
 *   res.json({ message: 'Instructors and admins only' });
 * });
 */
export function requireRole(roles: Role | Role[]) {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  return (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) => {
    return requireAuth(async (req, res) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          error: 'Forbidden - Insufficient permissions',
          required: allowedRoles,
          current: req.user?.role || 'none'
        });
      }

      return handler(req, res);
    });
  };
}

/**
 * Check if user has specific role
 */
export function hasRole(userRole: Role, requiredRoles: Role | Role[]): boolean {
  const required = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  return required.includes(userRole);
}

/**
 * Check if user is admin
 */
export function isAdmin(userRole: Role): boolean {
  return userRole === 'ADMIN';
}

/**
 * Check if user is instructor or admin
 */
export function isInstructorOrAdmin(userRole: Role): boolean {
  return ['INSTRUCTOR', 'ADMIN'].includes(userRole);
}

/**
 * Check if user can manage course content
 * (Instructors and Admins can manage courses)
 */
export function canManageCourses(userRole: Role): boolean {
  return isInstructorOrAdmin(userRole);
}

/**
 * Check if user can grade assignments
 * (Instructors, Mentors, and Admins can grade)
 */
export function canGradeAssignments(userRole: Role): boolean {
  return ['INSTRUCTOR', 'ADMIN', 'MENTOR'].includes(userRole);
}
