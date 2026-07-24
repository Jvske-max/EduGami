import { useState } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { loginUser } from '../services/auth.service';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await loginUser({ email, password });

      // 1. Guardamos el token y el rol devueltos por el backend
      localStorage.setItem('edugami_token', data.token);
      localStorage.setItem('edugami_role', data.user.role);

      // 2. Redirección condicional según el rol
      if (data.user.role === 'TEACHER') {
        navigate({ to: '/teacher' });
      } else {
        navigate({ to: '/' });
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Credenciales incorrectas. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 sm:p-10 bg-brand-paper border-2 border-border rounded-[28px] shadow-sm font-sans">
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-800">
          ¡Bienvenido a <span className="text-brand-green">EduGami</span>! 🎮
        </h2>
        <p className="text-muted-foreground font-bold mt-2 text-sm">
          Ingresa tus datos para continuar tu aventura.
        </p>
      </div>

      {error && (
        <div className="p-4 mb-6 text-sm font-bold text-destructive bg-destructive/10 border-2 border-destructive/20 rounded-xl text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">
            Correo Electrónico
          </label>
          <input 
            type="email" 
            placeholder="tu@correo.com" 
            className="w-full px-4 py-3 bg-white border border-zinc-200 text-foreground rounded-xl outline-none focus:border-brand-green focus:ring-4 focus:ring-green-100 transition-all font-medium placeholder:text-zinc-400"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">
            Contraseña
          </label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full px-4 py-3 bg-white border border-zinc-200 text-foreground rounded-xl outline-none focus:border-brand-green focus:ring-4 focus:ring-green-100 transition-all font-medium placeholder:text-zinc-400"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-4 mt-2 font-extrabold text-white bg-brand-green rounded-xl shadow-[0_4px_0_0_#46a302] tactile transition-colors hover:bg-brand-green-dark uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'INGRESANDO...' : 'INICIAR SESIÓN'}
        </button>
      </form>

      {/* ENLACE HACIA LA PANTALLA DE REGISTRO */}
      <div className="mt-6 text-center">
        <p className="text-sm font-bold text-zinc-500">
          ¿Aún no tienes una cuenta?{' '}
          <Link to="/register" className="text-brand-green hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>

    </div>
  );
};