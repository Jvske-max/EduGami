import { createFileRoute, redirect } from '@tanstack/react-router';
import { DashboardContent } from '../components/DashboardContent';

export const Route = createFileRoute('/dashboard')({
  head: () => ({
    meta: [
      { title: "Mi Panel · EduGami" },
      { name: "description", content: "Tu panel de estudiante EduGami con tus quizzes, clases y racha de aprendizaje." },
      { property: "og:title", content: "Mi Panel · EduGami" },
      { property: "og:description", content: "Tu panel de estudiante EduGami con tus quizzes, clases y racha de aprendizaje." },
    ],
  }),
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
