import { Router } from 'express';
import { getLeaderboard } from '../controllers/leaderboard.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Ruta protegida general (cualquiera con sesión iniciada puede ver la tabla)
router.get('/', verifyToken, getLeaderboard);

export default router;