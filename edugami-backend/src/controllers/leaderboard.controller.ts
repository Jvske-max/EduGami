import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import redisClient from '../config/redis';

const prisma = new PrismaClient();

export const getLeaderboard = async (_req: Request, res: Response): Promise<void> => {
  try {
    const CACHE_KEY = 'leaderboard_top10';

    // 1. Intentamos obtener los datos desde Redis (con fallback si Redis no está disponible)
    try {
      if (redisClient.isOpen) {
        const cachedData = await redisClient.get(CACHE_KEY);
        if (cachedData) {
          console.log('📦 Obteniendo Leaderboard desde Redis');
          res.status(200).json({
            message: '🏆 Liga Diamante - Top 10 (Cached)',
            leaderboard: JSON.parse(cachedData)
          });
          return;
        }
      }
    } catch (redisErr) {
      console.warn('⚠️ Redis no disponible, consultando base de datos directamente...');
    }

    // 2. Si no hay caché o Redis no está disponible, consultamos PostgreSQL
    console.log('🗄️ Obteniendo Leaderboard desde PostgreSQL');
    const topStudents = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      orderBy: { xpTotal: 'desc' },
      take: 10,
      select: {
        id: true,
        alias: true,
        xpTotal: true,
        streak: true
      }
    });

    // 3. Intentamos guardar en Redis si la conexión está abierta
    try {
      if (redisClient.isOpen) {
        await redisClient.setEx(CACHE_KEY, 300, JSON.stringify(topStudents));
      }
    } catch (redisErr) {
      // Ignorar errores de escritura en caché
    }

    res.status(200).json({
      message: '🏆 Liga Diamante - Top 10',
      leaderboard: topStudents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la tabla de clasificación.' });
  }
};