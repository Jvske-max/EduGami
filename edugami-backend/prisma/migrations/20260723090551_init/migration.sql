/*
  Warnings:

  - You are about to drop the column `classroomId` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `academicCutId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_classroomId_fkey";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "classroomId",
ADD COLUMN     "academicCutId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AcademicCut" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "classroomId" TEXT NOT NULL,

    CONSTRAINT "AcademicCut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "classroomId" TEXT NOT NULL,
    "academicCutId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentSubmission" (
    "id" TEXT NOT NULL,
    "contentUrl" TEXT,
    "grade" DOUBLE PRECISION,
    "feedback" TEXT,
    "studentId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssignmentSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AcademicCut" ADD CONSTRAINT "AcademicCut_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_academicCutId_fkey" FOREIGN KEY ("academicCutId") REFERENCES "AcademicCut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_academicCutId_fkey" FOREIGN KEY ("academicCutId") REFERENCES "AcademicCut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
