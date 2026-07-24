import api from '../api/axios';

export const createAssignment = async (data: { title: string; description?: string; dueDate?: string; classroomId: string; academicCutId: string }) => {
  const response = await api.post('/assignments', data);
  return response.data;
};

export const submitAssignment = async (data: { assignmentId: string; contentUrl: string }) => {
  const response = await api.post('/assignments/submit', data);
  return response.data;
};

export const gradeSubmission = async (submissionId: string, data: { grade: number; feedback?: string }) => {
  const response = await api.patch(`/assignments/submissions/${submissionId}/grade`, data);
  return response.data;
};