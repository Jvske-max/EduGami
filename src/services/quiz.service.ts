import api from '../api/axios';

export const createQuiz = async (data: any) => {
  const response = await api.post('/quizzes', data);
  return response.data;
};

export const submitQuizAttempt = async (data: { quizId: string; answers: { questionId: string; optionId: string }[] }) => {
  // Asegúrate de que la ruta aquí es exactamente '/attempts/submit'
  const response = await api.post('/attempts/submit', data);
  return response.data;
};