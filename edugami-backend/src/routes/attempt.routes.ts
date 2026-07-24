import { Router } from 'express';
import { submitQuiz } from '../controllers/attempt.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Ruta protegida: Accesible para cualquier usuario autenticado
router.post('/submit', verifyToken, submitQuiz);

export default router;