import { createFileRoute, redirect } from '@tanstack/react-router';
import { Login } from '../components/Login';

export const Route = createFileRoute('/login')({
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
      <Login />
    </div>
  )
});