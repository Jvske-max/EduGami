import type { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import type { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const submitQuiz = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { quizId, answers } = req.body; // answers será un arreglo: [{ questionId, optionId }]
    const studentId = req.user?.id;

    if (!studentId) {
      res.status(401).json({ error: 'No autorizado' });
      return;
    }

    if (!quizId) {
      res.status(400).json({ error: 'ID de Quiz es requerido.' });
      return;
    }

    // Validar si el estudiante ya realizó este quiz previamente para evitar duplicación de XP
    const existingAttempt = await prisma.quizAttempt.findFirst({
      where: { studentId, quizId }
    });

    if (existingAttempt) {
      res.status(400).json({ error: 'Ya has completado este quiz anteriormente.' });
      return;
    }

    // 1. Buscamos el Quiz original con las respuestas correctas para validar en el servidor
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { 
        questions: { 
          include: { options: true } 
        } 
      }
    });

    if (!quiz) {
      res.status(404).json({ error: 'Quiz no encontrado' });
      return;
    }

    // 2. Calculamos la calificación real
    let score = 0;
    const totalQuestions = quiz.questions.length;

    if (totalQuestions > 0 && Array.isArray(answers)) {
      answers.forEach((ans: any) => {
        const question = quiz.questions.find(q => q.id === ans.questionId);
        if (question) {
          const selectedOption = question.options.find(o => o.id === ans.optionId);
          if (selectedOption && selectedOption.isCorrect) {
            score++;
          }
        }
      });
    }

    // 3. Calculamos la XP proporcional
    const xpEarned = totalQuestions > 0 ? Math.round((score / totalQuestions) * quiz.xpReward) : 0;

    // 4. Transacción: Guardamos el intento y le sumamos la XP al estudiante al mismo tiempo
    const result = await prisma.$transaction(async (tx) => {
      const attempt = await tx.quizAttempt.create({
        data: {
          score,
          xpEarned,
          studentId,
          quizId
        }
      });

      const updatedUser = await tx.user.update({
        where: { id: studentId },
        data: { 
          xpTotal: { increment: xpEarned }
        },
        select: { alias: true, xpTotal: true }
      });

      return { attempt, updatedUser };
    });

    res.status(200).json({
      message: `¡Quiz completado! Ganaste ${xpEarned} XP 🚀`,
      score: `${score}/${totalQuestions}`,
      player: result.updatedUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno al procesar el quiz.' });
  }
};