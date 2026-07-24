import { connectRedis } from './config/redis';
import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import classroomRoutes from './routes/classroom.routes';
import quizRoutes from './routes/quiz.routes';
import attemptRoutes from './routes/attempt.routes';
import leaderboardRoutes from './routes/leaderboard.routes';
import assignmentRoutes from './routes/assignment.routes';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares globales con CORS explícito para producción
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Rutas principales con prefijo /api
app.use('/api/auth', authRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/assignments', assignmentRoutes);

// Rutas fallback sin prefijo /api (para evitar 404 si la URL configurada en Vercel omite /api)
app.use('/auth', authRoutes);
app.use('/classrooms', classroomRoutes);
app.use('/quizzes', quizRoutes);
app.use('/attempts', attemptRoutes);
app.use('/leaderboard', leaderboardRoutes);
app.use('/assignments', assignmentRoutes);

// Ruta de prueba de salud del servidor (Soporta / y /health y /api/health)
const healthHandler = (_req: Request, res: Response) => {
  res.json({ 
    status: 'success', 
    message: 'Servidor EduGami en línea 🚀',
    timestamp: new Date().toISOString()
  });
};

app.get('/', healthHandler);
app.get('/health', healthHandler);
app.get('/api/health', healthHandler);

connectRedis();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});