import api from '../api/axios';

// Obtener las aulas (el backend ya sabe si es profe o alumno gracias al Token)
export const getMyClassrooms = async () => {
  const response = await api.get('/classrooms');
  return response.data;
};

// Crear un aula nueva (Solo Profesor)
export const createClassroom = async (data: { title: string; section: string; stripeColor: string }) => {
  const response = await api.post('/classrooms', data);
  return response.data;
};

// Editar un aula existente (Solo Profesor)
export const updateClassroom = async (id: string, data: { title?: string; section?: string; stripeColor?: string }) => {
  const response = await api.patch(`/classrooms/${id}`, data);
  return response.data;
};

// Eliminar un aula (Solo Profesor)
export const deleteClassroom = async (id: string) => {
  const response = await api.delete(`/classrooms/${id}`);
  return response.data;
};

// Inscribirse en un aula (Solo Estudiante)
export const enrollInClassroom = async (classroomId: string) => {
  const response = await api.post(`/classrooms/${classroomId}/enroll`);
  return response.data;
};