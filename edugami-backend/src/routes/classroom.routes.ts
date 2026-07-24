import { Router } from 'express';
import { createClassroom, getMyClassrooms, enrollStudent, updateClassroom, deleteClassroom } from '../controllers/classroom.controller';
import { verifyToken, isTeacher } from '../middlewares/auth.middleware';

const router = Router();

// Rutas de Creación, Modificación y Eliminación
router.post('/', verifyToken, isTeacher, createClassroom); // Solo Profesores
router.patch('/:id', verifyToken, isTeacher, updateClassroom); // Editar Aula (Solo Docentes)
router.delete('/:id', verifyToken, isTeacher, deleteClassroom); // Eliminar Aula (Solo Docentes)
router.post('/:id/enroll', verifyToken, enrollStudent);    // Solo Estudiantes

// Rutas de Lectura (GET)
router.get('/', verifyToken, getMyClassrooms);             // Dinámico: Depende de quién pregunte

export default router;