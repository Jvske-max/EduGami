import { Router } from 'express';
import { createQuiz } from '../controllers/quiz.controller';
import { verifyToken, isTeacher } from '../middlewares/auth.middleware';

const router = Router();

// Ruta protegida: Solo accesible para docentes
router.post('/', verifyToken, isTeacher, createQuiz);

export default router;