/**
 * Enrollment types based on the API response structure
 */

export interface EnrollmentStats {
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
}

export interface Course {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  difficulty: string;
  category: string;
  isPublished: boolean;
  estimatedHours: number | null;
  prerequisites: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  _count: {
    modules: number;
  };
}

export type EnrollmentStatus = 'ACTIVE' | 'COMPLETED' | 'DROPPED' | 'PAUSED';

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  progress: number;
  enrolledAt: string;
  completedAt: string | null;
  lastActivity: string;
  course: Course;
  stats: EnrollmentStats;
}
