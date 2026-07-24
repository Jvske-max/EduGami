import { createFileRoute, redirect } from '@tanstack/react-router';
import { Leaderboard } from '../components/Leaderboard';

export const Route = createFileRoute('/leaderboard')({
  // Nuestro middleware del frontend
  beforeLoad: () => {
    const token = localStorage.getItem('edugami_token');
    
    // Si no hay token, bloqueamos el acceso y lo enviamos al login
    if (!token) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: () => (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream p-4">
      <Leaderboard />
    </div>
  )
});