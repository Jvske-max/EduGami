-- Enable Row Level Security (RLS) on all public tables
-- This blocks unauthorized direct HTTP access via Supabase PostgREST API
-- while allowing Prisma (which connects as superuser/direct DB user) to operate normally.

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Classroom" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AcademicCut" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Quiz" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Question" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Option" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "QuizAttempt" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Assignment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AssignmentSubmission" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "_ClassroomStudents" ENABLE ROW LEVEL SECURITY;
