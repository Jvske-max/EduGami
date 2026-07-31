import { createFileRoute, redirect } from '@tanstack/react-router';
import { DashboardContent } from '../components/DashboardContent';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: "Inicio · EduGami" },
      { name: "description", content: "Tu panel de estudiante EduGami con tus quizzes, clases y racha de aprendizaje." },
      { property: "og:title", content: "Inicio · EduGami" },
      { property: "og:description", content: "Tu panel de estudiante EduGami con tus quizzes, clases y racha de aprendizaje." },
    ],
  }),
  // Guardia de seguridad: Verificación compatible con SSR
  beforeLoad: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('edugami_token');
      const role = localStorage.getItem('edugami_role');

      if (!token) {
        throw redirect({ to: '/login' });
      }

      if (role === 'TEACHER') {
        throw redirect({ to: '/teacher' });
      }
    }
  },
  component: DashboardContent,
});