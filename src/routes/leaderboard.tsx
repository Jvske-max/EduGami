import { createFileRoute, redirect } from '@tanstack/react-router';
import { Leaderboard } from '../components/Leaderboard';

export const Route = createFileRoute('/leaderboard')({
  beforeLoad: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('edugami_token');
      
      if (!token) {
        throw redirect({
          to: '/login',
        });
      }
    }
  },
  component: () => (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream p-4">
      <Leaderboard />
    </div>
  )
});