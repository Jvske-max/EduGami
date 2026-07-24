import type { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import type { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

// --- PROFESOR: Crear una nueva tarea ---
export const createAssignment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, dueDate, classroomId, academicCutId } = req.body;

    if (!title || !classroomId || !academicCutId) {
      res.status(400).json({ error: 'Faltan datos obligatorios para crear la tarea.' });
      return;
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        classroomId,
        academicCutId
      }
    });

    res.status(201).json({
      message: '📝 Tarea tradicional creada exitosamente',
      assignment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la tarea.' });
  }
};

// --- ESTUDIANTE: Entregar la tarea ---
export const submitAssignment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { assignmentId, contentUrl } = req.body;
    const studentId = req.user?.id;

    if (!studentId || req.user?.role !== 'STUDENT') {
      res.status(403).json({ error: 'Solo los estudiantes pueden realizar entregas.' });
      return;
    }

    if (!assignmentId) {
      res.status(400).json({ error: 'ID de la tarea es obligatorio.' });
      return;
    }

    // Validamos que el estudiante no haya entregado esta tarea antes
    const existingSubmission = await prisma.assignmentSubmission.findFirst({
      where: { studentId, assignmentId }
    });

    if (existingSubmission) {
      res.status(400).json({ error: 'Ya realizaste una entrega para esta tarea.' });
      return;
    }

    const submission = await prisma.assignmentSubmission.create({
      data: {
        contentUrl,
        studentId,
        assignmentId
      }
    });

    res.status(201).json({
      message: '✅ ¡Entrega realizada con éxito!',
      submission
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la entrega.' });
  }
};

// --- PROFESOR: Calificar una entrega ---
export const gradeSubmission = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { submissionId } = req.params;
    const { grade, feedback } = req.body;

    if (!submissionId || typeof submissionId !== 'string') {
      res.status(400).json({ error: 'ID de la entrega no es válido.' });
      return;
    }

    const updatedSubmission = await prisma.assignmentSubmission.update({
      where: { id: submissionId },
      data: {
        grade: grade !== undefined ? Number(grade) : undefined,
        feedback
      }
    });

    res.status(200).json({
      message: '✅ Calificación y feedback guardados exitosamente.',
      submission: updatedSubmission
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al calificar la tarea. Verifica que el ID de la entrega sea correcto.' });
  }
};