-- CreateEnum
CREATE TYPE "branch" AS ENUM ('MARINE_CORPS', 'NAVY', 'COAST_GUARD', 'ARMY', 'AIR_FORCE');

-- CreateEnum
CREATE TYPE "personnelcategory" AS ENUM ('ENLISTED', 'OFFICER', 'WARRANT_OFFICER');

-- CreateTable
CREATE TABLE "data_version" (
    "table" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "data_version_pkey" PRIMARY KEY ("table")
);

-- CreateTable
CREATE TABLE "military_occupation" (
    "id" SERIAL NOT NULL,
    "branch" "branch" NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "personnel_category" "personnelcategory" NOT NULL,

    CONSTRAINT "military_occupation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "military_occupation_branch_code_personnel_category_key" ON "military_occupation"("branch", "code", "personnel_category");
