import { createFileRoute, redirect } from '@tanstack/react-router';
import { Register } from '../components/Register';

export const Route = createFileRoute('/register')({
  head: () => ({
    meta: [
      { title: "Crear cuenta · EduGami" },
      { name: "description", content: "Regístrate en EduGami y empieza a ganar XP con micro-lecciones gamificadas." },
      { property: "og:title", content: "Crear cuenta · EduGami" },
      { property: "og:description", content: "Regístrate en EduGami y empieza a ganar XP con micro-lecciones gamificadas." },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('edugami_token');
      const role = localStorage.getItem('edugami_role');

      if (token) {
        if (role === 'TEACHER') {
          throw redirect({ to: '/teacher' });
        } else {
          throw redirect({ to: '/' });
        }
      }
    }
  },
  component: Register,
});