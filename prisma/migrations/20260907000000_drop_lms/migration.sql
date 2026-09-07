-- Remove the LMS. Courses, enrollments, grading and certificates now live in a
-- separate application, so these tables are dropped rather than migrated.

-- User no longer belongs to a Cohort
ALTER TABLE "User" DROP CONSTRAINT IF EXISTS "User_cohortId_fkey";
ALTER TABLE "User" DROP COLUMN IF EXISTS "cohortId";

-- LMS tables (CASCADE clears the foreign keys between them)
DROP TABLE IF EXISTS "Note" CASCADE;
DROP TABLE IF EXISTS "Bookmark" CASCADE;
DROP TABLE IF EXISTS "Certificate" CASCADE;
DROP TABLE IF EXISTS "Submission" CASCADE;
DROP TABLE IF EXISTS "Assignment" CASCADE;
DROP TABLE IF EXISTS "Progress" CASCADE;
DROP TABLE IF EXISTS "Enrollment" CASCADE;
DROP TABLE IF EXISTS "Lesson" CASCADE;
DROP TABLE IF EXISTS "Module" CASCADE;
DROP TABLE IF EXISTS "Course" CASCADE;
DROP TABLE IF EXISTS "Cohort" CASCADE;

-- LMS enums
DROP TYPE IF EXISTS "SubmissionStatus";
DROP TYPE IF EXISTS "AssignmentType";
DROP TYPE IF EXISTS "EnrollmentStatus";
DROP TYPE IF EXISTS "LessonType";
DROP TYPE IF EXISTS "Difficulty";
