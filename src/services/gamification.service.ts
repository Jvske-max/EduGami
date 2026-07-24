import api from '../api/axios';

// Obtener el Top 10 de estudiantes (Leaderboard)
export const getLeaderboard = async () => {
  const response = await api.get('/leaderboard');
  return response.data;
};

// Enviar las respuestas de un quiz (Suma XP automáticamente)
export const submitQuizAttempt = async (attemptData: any) => {
  const response = await api.post('/attempts/submit', attemptData);
  return response.data;
};