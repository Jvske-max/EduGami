import { createFileRoute, redirect } from '@tanstack/react-router';
import { Login } from '../components/Login';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    // Leemos ambos datos del almacenamiento local
    const token = localStorage.getItem('edugami_token');
    const role = localStorage.getItem('edugami_role');

    // Si hay token, evaluamos el rol para la redirección
    if (token) {
      if (role === 'TEACHER') {
        throw redirect({ to: '/teacher' });
      } else {
        throw redirect({ to: '/' }); 
      }
    }
  },
  component: () => (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream p-4">
      <Login />
    </div>
  )
});