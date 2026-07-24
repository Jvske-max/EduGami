import type { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import type { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const createClassroom = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, section, stripeColor } = req.body;
    const teacherId = req.user?.id; 

    if (!teacherId) {
      res.status(401).json({ error: 'Usuario no autenticado' });
      return;
    }

    const newClassroom = await prisma.classroom.create({
      data: {
        title,
        section,
        stripeColor: stripeColor || 'bg-brand-blue',
        teacherId,
        cuts: {
          create: [
            { name: 'Primer Corte', weight: 15 },
            { name: 'Segundo Corte', weight: 30 },
            { name: 'Tercer Corte', weight: 55 }
          ]
        }
      },
      include: {
        cuts: true 
      }
    });

    res.status(201).json({ 
      message: 'Aula creada exitosamente', 
      classroom: newClassroom 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el aula.' });
  }
};

export const getMyClassrooms = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;

    if (!userId) {
      res.status(401).json({ error: 'No autorizado' });
      return;
    }

    let classrooms;

    if (userRole === 'TEACHER') {
      classrooms = await prisma.classroom.findMany({
        where: { teacherId: userId },
        include: { 
          students: {
            select: {
              id: true,
              name: true,
              email: true,
              alias: true,
              xpTotal: true,
              streak: true
            }
          },
          assignments: {
            include: {
              academicCut: true,
              submissions: {
                include: {
                  student: { select: { id: true, name: true, alias: true, email: true } }
                },
                orderBy: { submittedAt: 'desc' }
              }
            },
            orderBy: { createdAt: 'desc' }
          },
          cuts: {
            include: { 
              quizzes: {
                include: {
                  questions: {
                    include: { options: true }
                  },
                  attempts: {
                    include: {
                      student: { select: { id: true, name: true, alias: true, email: true } }
                    },
                    orderBy: { completedAt: 'desc' }
                  }
                },
                orderBy: { createdAt: 'desc' }
              }
            } 
          },
          _count: { select: { students: true } } 
        },
        orderBy: { createdAt: 'desc' }
      });
    } 
    else {
      classrooms = await prisma.classroom.findMany({
        where: {
          students: { some: { id: userId } }
        },
        include: {
          teacher: { select: { name: true } },
          assignments: {
            include: { 
              submissions: {
                where: { studentId: userId }
              } 
            }
          }, 
          cuts: {
            include: { 
              quizzes: {
                include: {
                  questions: {
                    include: { options: true }
                  },
                  attempts: {
                    where: { studentId: userId }
                  }
                }
              }
            } 
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    }

    res.status(200).json({ classrooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las aulas.' });
  }
};

export const updateClassroom = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, section, stripeColor } = req.body;
    const teacherId = req.user?.id;

    if (!teacherId || req.user?.role !== 'TEACHER') {
      res.status(403).json({ error: 'No autorizado' });
      return;
    }

    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'ID de aula inválido' });
      return;
    }

    const existingClassroom = await prisma.classroom.findFirst({
      where: { id, teacherId }
    });

    if (!existingClassroom) {
      res.status(404).json({ error: 'Aula no encontrada o no pertenece al docente.' });
      return;
    }

    const updatedClassroom = await prisma.classroom.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existingClassroom.title,
        section: section !== undefined ? section : existingClassroom.section,
        stripeColor: stripeColor !== undefined ? stripeColor : existingClassroom.stripeColor,
      }
    });

    res.status(200).json({
      message: 'Aula actualizada con éxito',
      classroom: updatedClassroom
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el aula.' });
  }
};

export const deleteClassroom = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const teacherId = req.user?.id;

    if (!teacherId || req.user?.role !== 'TEACHER') {
      res.status(403).json({ error: 'No autorizado' });
      return;
    }

    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'ID de aula inválido' });
      return;
    }

    const existingClassroom = await prisma.classroom.findFirst({
      where: { id, teacherId }
    });

    if (!existingClassroom) {
      res.status(404).json({ error: 'Aula no encontrada o no pertenece al docente.' });
      return;
    }

    await prisma.$transaction(async (tx) => {
      // 1. Eliminar entregas de tareas del aula
      await tx.assignmentSubmission.deleteMany({
        where: { assignment: { classroomId: id } }
      });
      // 2. Eliminar tareas del aula
      await tx.assignment.deleteMany({
        where: { classroomId: id }
      });
      // 3. Obtener cortes y quizzes del aula
      const cuts = await tx.academicCut.findMany({
        where: { classroomId: id },
        select: { id: true }
      });
      const cutIds = cuts.map(c => c.id);
      
      const quizzes = await tx.quiz.findMany({
        where: { academicCutId: { in: cutIds } },
        select: { id: true }
      });
      const quizIds = quizzes.map(q => q.id);

      // 4. Eliminar intentos de quiz
      await tx.quizAttempt.deleteMany({
        where: { quizId: { in: quizIds } }
      });
      // 5. Eliminar opciones de preguntas
      const questions = await tx.question.findMany({
        where: { quizId: { in: quizIds } },
        select: { id: true }
      });
      const questionIds = questions.map(q => q.id);

      await tx.option.deleteMany({
        where: { questionId: { in: questionIds } }
      });
      // 6. Eliminar preguntas
      await tx.question.deleteMany({
        where: { quizId: { in: quizIds } }
      });
      // 7. Eliminar quizzes
      await tx.quiz.deleteMany({
        where: { academicCutId: { in: cutIds } }
      });
      // 8. Eliminar cortes académicos
      await tx.academicCut.deleteMany({
        where: { classroomId: id }
      });
      // 9. Eliminar la clase
      await tx.classroom.delete({
        where: { id }
      });
    });

    res.status(200).json({ message: 'Aula eliminada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el aula.' });
  }
};

export const enrollStudent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params; 
    const studentId = req.user?.id;

    if (!studentId || req.user?.role !== 'STUDENT') {
      res.status(403).json({ error: 'Solo los estudiantes pueden inscribirse.' });
      return;
    }

    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'ID de aula inválido.' });
      return;
    }

    const targetClassroom = await prisma.classroom.findUnique({ where: { id } });
    if (!targetClassroom) {
      res.status(404).json({ error: 'No se encontró ninguna aula con ese código.' });
      return;
    }

    const classroom = await prisma.classroom.update({
      where: { id },
      data: {
        students: {
          connect: { id: studentId } 
        }
      }
    });

    res.status(200).json({ 
      message: '¡Inscripción exitosa!', 
      classroom 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al inscribirse en el aula. Verifica que el ID sea correcto.' });
  }
};