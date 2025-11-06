-- AlterTable
ALTER TABLE "Course" ADD COLUMN "order" INTEGER;
ALTER TABLE "Course" ADD COLUMN "phase" TEXT;
ALTER TABLE "Course" ADD COLUMN "weekDuration" INTEGER;
ALTER TABLE "Course" ADD COLUMN "weekNumber" INTEGER;

-- CreateTable
CREATE TABLE "Cohort" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PLANNING',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "currentWeek" INTEGER NOT NULL DEFAULT 1,
    "currentPhase" TEXT NOT NULL DEFAULT 'SOFTWARE_ENGINEERING',
    "maxStudents" INTEGER NOT NULL DEFAULT 30,
    "description" TEXT,
    "applicationOpenDate" DATETIME,
    "applicationCloseDate" DATETIME,
    "selectionComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "image" TEXT,
    "bio" TEXT,
    "title" TEXT,
    "location" TEXT,
    "githubUrl" TEXT,
    "linkedinUrl" TEXT,
    "websiteUrl" TEXT,
    "skills" TEXT,
    "branch" TEXT,
    "rank" TEXT,
    "yearsServed" INTEGER,
    "mos" TEXT,
    "deployments" TEXT,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "cohort" TEXT,
    "cohortId" TEXT,
    "graduationDate" DATETIME,
    "skillLevel" TEXT,
    "assessmentDate" DATETIME,
    "assessmentScore" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_cohortId_fkey" FOREIGN KEY ("cohortId") REFERENCES "Cohort" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("assessmentDate", "assessmentScore", "bio", "branch", "cohort", "createdAt", "deployments", "email", "emailVerified", "githubUrl", "graduationDate", "id", "image", "isActive", "linkedinUrl", "location", "mos", "name", "rank", "role", "skillLevel", "skills", "title", "updatedAt", "websiteUrl", "yearsServed") SELECT "assessmentDate", "assessmentScore", "bio", "branch", "cohort", "createdAt", "deployments", "email", "emailVerified", "githubUrl", "graduationDate", "id", "image", "isActive", "linkedinUrl", "location", "mos", "name", "rank", "role", "skillLevel", "skills", "title", "updatedAt", "websiteUrl", "yearsServed" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Cohort_name_key" ON "Cohort"("name");
