import { createFileRoute, redirect } from '@tanstack/react-router';
import { LandingPage } from '../components/LandingPage';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: "EduGami — Plataforma Gamificada N°1 en UDH" },
      { name: "description", content: "EVEA híbrido que fusiona la gestión académica con micro-aprendizaje gamificado en la Universidad Alejandro de Humboldt." },
      { property: "og:title", content: "EduGami — Plataforma Gamificada N°1 en UDH" },
      { property: "og:description", content: "Aprende, gana XP y mantén tu racha. Un EVEA que fusiona rigor académico con la energía de Duolingo." },
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
          throw redirect({ to: '/dashboard' });
        }
      }
    }
  },
  component: LandingPage,
});