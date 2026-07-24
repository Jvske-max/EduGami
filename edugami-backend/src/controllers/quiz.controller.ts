import type { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import type { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const createQuiz = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, xpReward, academicCutId, questions } = req.body;

    // 1. Validaciones básicas
    if (!title || !academicCutId || !questions || questions.length === 0) {
      res.status(400).json({ error: 'Faltan datos obligatorios para crear el Quiz.' });
      return;
    }

    // 2. Creación del Quiz con sus Preguntas y Opciones anidadas
    const newQuiz = await prisma.quiz.create({
      data: {
        title,
        xpReward: xpReward || 40,
        academicCutId,
        questions: {
          create: questions.map((q: any) => ({
            text: q.text,
            options: {
              create: q.options.map((o: any) => ({
                text: o.text,
                isCorrect: o.isCorrect
              }))
            }
          }))
        }
      },
      // 3. Le pedimos a Prisma que nos devuelva la estructura completa confirmada
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Quiz gamificado creado con éxito 🎮',
      quiz: newQuiz
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno al crear el Quiz.' });
  }
};