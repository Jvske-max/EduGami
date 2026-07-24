import { createFileRoute, redirect } from '@tanstack/react-router';
import { TeacherDashboard } from '../components/TeacherDashboard';

export const Route = createFileRoute('/teacher')({
  beforeLoad: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('edugami_token');
      const role = localStorage.getItem('edugami_role');

      if (!token) {
        throw redirect({ to: '/login' });
      }

      if (role === 'STUDENT') {
        throw redirect({ to: '/' });
      }
    }
  },
  component: TeacherDashboard,
});