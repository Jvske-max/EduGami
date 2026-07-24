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

// Middlewares globales
app.use(cors()); // Permite peticiones desde tu frontend
app.use(express.json()); // Permite recibir JSON en el body de las peticiones
app.use('/api/auth', authRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/assignments', assignmentRoutes);

// Ruta de prueba
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ 
    status: 'success', 
    message: 'Servidor EduGami en línea 🚀',
    timestamp: new Date().toISOString()
  });
});

connectRedis();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});