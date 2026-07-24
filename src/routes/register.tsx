import { createFileRoute, redirect } from '@tanstack/react-router';
import { Register } from '../components/Register';

export const Route = createFileRoute('/register')({
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
  component: () => (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream p-4">
      <Register />
    </div>
  ),
});