import { useState } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { loginUser } from '../services/auth.service';
import { Zap, Flame, Trophy, Eye, EyeOff } from 'lucide-react';
import mascotOwl from "@/assets/mascot-owl.png";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await loginUser({ email, password });

      // Guardamos el token y el rol devueltos por el backend
      localStorage.setItem('edugami_token', data.token);
      localStorage.setItem('edugami_role', data.user.role);

      // Redirección condicional según el rol
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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-brand-cream font-sans">
      {/* ================= PANEL IZQUIERDO DE MARCA (DESKTOP) ================= */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-10 bg-gradient-to-br from-brand-green to-brand-blue text-white relative overflow-hidden">
        {/* Círculos decorativos de fondo */}
        <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full bg-white/5" />

        {/* Logo EduGami con icono Zap */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-white/20 backdrop-blur-md shadow-inner">
            <Zap className="size-6 text-white" strokeWidth={3} />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">EduGami</span>
        </div>

        {/* Búho Mascota + Mensaje Motivacional */}
        <div className="relative z-10 flex flex-col items-center text-center my-auto py-6">
          <div className="relative mb-6">
            <div className="grid size-52 place-items-center rounded-full bg-white/15 backdrop-blur-md shadow-lg border border-white/20">
              <img
                src={mascotOwl}
                alt="Mascota búho EduGami leyendo un libro"
                width={176}
                height={176}
                className="size-40 object-contain drop-shadow-xl"
              />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-3">
            ¡Tu aventura de aprendizaje continúa! 📚
          </h1>
          <p className="text-white/90 text-sm font-semibold max-w-md leading-relaxed">
            Accede a tu panel, completa quizzes rápidos de 5 minutos y mantén tu racha diaria al máximo.
          </p>
        </div>

        {/* 3 Chips de Estadísticas */}
        <div className="relative z-10 grid grid-cols-3 gap-3 w-full max-w-md mx-auto">
          <div className="flex items-center gap-2.5 rounded-2xl bg-white/15 backdrop-blur-md p-3 border border-white/20 shadow-xs">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-orange/30 text-white">
              <Flame className="size-5 fill-current" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase text-white/70 tracking-wider">Racha</p>
              <p className="text-xs font-black text-white truncate">5 Días</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-2xl bg-white/15 backdrop-blur-md p-3 border border-white/20 shadow-xs">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-green/30 text-white">
              <Zap className="size-5 fill-current" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase text-white/70 tracking-wider">Puntos</p>
              <p className="text-xs font-black text-white truncate">1,250 XP</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-2xl bg-white/15 backdrop-blur-md p-3 border border-white/20 shadow-xs">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-purple/30 text-white">
              <Trophy className="size-5 fill-current" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase text-white/70 tracking-wider">Liga</p>
              <p className="text-xs font-black text-white truncate">Diamante</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PANEL DERECHO DE FORMULARIO ================= */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 bg-brand-paper">
        {/* Header móvil */}
        <div className="flex md:hidden items-center gap-2 mb-8">
          <div className="grid size-10 place-items-center rounded-xl bg-brand-green text-white shadow-[0_3px_0_0_#46a302]">
            <Zap className="size-5" strokeWidth={3} />
          </div>
          <span className="text-2xl font-black tracking-tight text-zinc-900">EduGami</span>
        </div>

        <div className="w-full max-w-md bg-white border border-zinc-200/80 rounded-[28px] p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-800">
              Iniciar sesión 🎮
            </h2>
            <p className="text-zinc-500 font-bold mt-2 text-xs sm:text-sm">
              Accede a tu panel EduGami para continuar tus clases.
            </p>
          </div>

          {error && (
            <div className="p-4 mb-6 text-xs sm:text-sm font-bold text-destructive bg-destructive/10 border-2 border-destructive/20 rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-zinc-600 mb-1.5 uppercase tracking-wider">
                Correo institucional
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu.correo@udh.edu.ve"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/30 transition-all font-medium placeholder:text-zinc-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-zinc-600 mb-1.5 uppercase tracking-wider">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/30 transition-all font-medium placeholder:text-zinc-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1.5 transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <label htmlFor="remember" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-600 cursor-pointer">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-4 rounded border-zinc-300 text-brand-green focus:ring-brand-green/30 cursor-pointer"
                />
                Recuérdame
              </label>
              <a href="#" className="text-xs sm:text-sm font-bold text-brand-green hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="tactile w-full py-4 mt-2 font-black text-white bg-brand-green rounded-xl shadow-[0_4px_0_0_#46a302] hover:bg-brand-green-dark uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'INGRESANDO...' : 'ENTRAR'}
            </button>
          </form>

          {/* ENLACE CRUZADO A REGISTER */}
          <div className="mt-8 text-center pt-5 border-t border-zinc-200/80">
            <p className="text-xs sm:text-sm font-semibold text-zinc-500">
              ¿Aún no tienes una cuenta?{' '}
              <Link to="/register" className="text-brand-green font-bold hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};