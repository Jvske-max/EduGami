import { createFileRoute, redirect } from '@tanstack/react-router';
import { Login } from '../components/Login';

export const Route = createFileRoute('/login')({
  head: () => ({
    meta: [
      { title: "Iniciar sesión · EduGami" },
      { name: "description", content: "Accede a tu panel EduGami: quizzes rápidos, racha diaria, XP y tus clases." },
      { property: "og:title", content: "Iniciar sesión · EduGami" },
      { property: "og:description", content: "Accede a tu panel EduGami: quizzes rápidos, racha diaria, XP y tus clases." },
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
  component: Login,
});