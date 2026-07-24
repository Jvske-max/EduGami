import { Router } from 'express';
import { createAssignment, submitAssignment, gradeSubmission } from '../controllers/assignment.controller';
import { verifyToken, isTeacher } from '../middlewares/auth.middleware';

const router = Router();

// Rutas del Profesor
router.post('/', verifyToken, isTeacher, createAssignment); 
router.patch('/submissions/:submissionId/grade', verifyToken, isTeacher, gradeSubmission); // <-- NUEVA RUTA

// Ruta del Estudiante
router.post('/submit', verifyToken, submitAssignment);

export default router;