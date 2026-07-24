import { Router } from 'express';
// 1. Importamos las tres funciones del controlador
import { register, login, getMe } from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware'; 

const router = Router();

router.post('/register', register);
router.post('/login', login);

// 2. Nueva ruta protegida inyectada correctamente
router.get('/me', verifyToken, getMe);

// 3. Exportamos el router AL FINAL del archivo
export default router;