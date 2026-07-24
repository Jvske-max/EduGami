import { createFileRoute, redirect } from '@tanstack/react-router';
import { TeacherDashboard } from '../components/TeacherDashboard';

export const Route = createFileRoute('/teacher')({
  beforeLoad: () => {
    const token = localStorage.getItem('edugami_token');
    const role = localStorage.getItem('edugami_role');

    // 1. Si no hay sesión, al login
    if (!token) {
      throw redirect({ to: '/login' });
    }

    // 2. Si es un Estudiante intentando entrar a la URL /teacher, lo regresamos a su panel
    if (role === 'STUDENT') {
      throw redirect({ to: '/' });
    }
  },
  component: TeacherDashboard,
});