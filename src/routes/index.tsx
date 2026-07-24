import { createFileRoute, redirect } from '@tanstack/react-router';
import { DashboardContent } from '../components/DashboardContent';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: "Inicio — EduGami" },
      { name: "description", content: "Tu panel de estudiante EduGami" },
    ],
  }),
  // Guardia de seguridad: Si no hay token, lo mandamos al login
  beforeLoad: () => {
    const token = localStorage.getItem('edugami_token');
    const role = localStorage.getItem('edugami_role');

    if (!token) {
      throw redirect({ to: '/login' });
    }

    // Si es profesor, lo redirigimos a su panel correspondiente
    if (role === 'TEACHER') {
      throw redirect({ to: '/teacher' });
    }
  },
  // Renderizamos ÚNICAMENTE nuestro nuevo componente dinámico
  component: DashboardContent,
});