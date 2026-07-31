import { useState } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { registerUser } from '../services/auth.service';
import { Zap, Flame, Trophy, Eye, EyeOff } from 'lucide-react';
import mascotOwl from "@/assets/mascot-owl.png";

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    alias: '',
    password: '',
    role: 'STUDENT' as 'STUDENT' | 'TEACHER',
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms) {
      setError('Debes aceptar los términos y el código de honor para continuar.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await registerUser({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        alias: formData.alias,
      } as any);

      setSuccess(true);

      setTimeout(() => {
        navigate({ to: '/login' });
      }, 2000);
    } catch (err: any) {
      console.error("Error al registrar:", err);
      const serverMessage = err.response?.data?.error;
      const networkMessage = err.message ? `Error de conexión: ${err.message}` : null;
      setError(serverMessage || networkMessage || 'Ocurrió un error al registrar la cuenta.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-brand-cream p-4 font-sans">
        <div className="w-full max-w-md p-8 bg-white border border-zinc-200 rounded-[28px] text-center shadow-md">
          <span className="text-7xl mb-4 block animate-bounce">🎉</span>
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 mb-2">¡Cuenta Creada!</h2>
          <p className="text-zinc-600 font-semibold text-sm">
            Preparando tu entorno... Redirigiendo al inicio de sesión.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-brand-cream font-sans">
      {/* ================= PANEL IZQUIERDO DE MARCA (BENEFITS) ================= */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-10 bg-gradient-to-br from-brand-blue to-brand-purple text-white relative overflow-hidden">
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

        {/* Mascota búho + Mensaje */}
        <div className="relative z-10 flex flex-col items-center text-center my-auto py-4">
          <div className="relative mb-6">
            <div className="grid size-44 place-items-center rounded-full bg-white/15 backdrop-blur-md shadow-lg border border-white/20">
              <img
                src={mascotOwl}
                alt="Mascota búho EduGami leyendo un libro"
                width={160}
                height={160}
                className="size-36 object-contain drop-shadow-xl"
              />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">
            ¡Empieza tu aventura hoy! 🚀
          </h1>
          <p className="text-white/90 text-sm font-semibold max-w-sm leading-relaxed mb-6">
            Únete a la comunidad de aprendizaje gamificado de la Universidad Alejandro de Humboldt.
          </p>

          {/* Tarjetas de Beneficios */}
          <div className="space-y-3 w-full max-w-md text-left">
            <div className="flex items-start gap-3.5 rounded-2xl bg-white/15 backdrop-blur-md p-4 border border-white/20 shadow-xs">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-orange/30 text-white">
                <Flame className="size-5 fill-current" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Racha diaria</h3>
                <p className="text-xs text-white/80 font-medium leading-relaxed">
                  Estudia 5 minutos al día y mantén tu racha viva
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl bg-white/15 backdrop-blur-md p-4 border border-white/20 shadow-xs">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-green/30 text-white">
                <Zap className="size-5 fill-current" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Quizzes rápidos</h3>
                <p className="text-xs text-white/80 font-medium leading-relaxed">
                  Micro-lecciones que suman XP en cada clase
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl bg-white/15 backdrop-blur-md p-4 border border-white/20 shadow-xs">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-purple/30 text-white">
                <Trophy className="size-5 fill-current" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Logros y ligas</h3>
                <p className="text-xs text-white/80 font-medium leading-relaxed">
                  Compite con seudónimo en la liga semanal
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center">
          <p className="text-xs font-semibold text-white/70">EduGami LMS • Universidad Alejandro de Humboldt</p>
        </div>
      </div>

      {/* ================= PANEL DERECHO DE FORMULARIO ================= */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 bg-brand-paper">
        {/* Header móvil */}
        <div className="flex md:hidden items-center gap-2 mb-6">
          <div className="grid size-10 place-items-center rounded-xl bg-brand-green text-white shadow-[0_3px_0_0_#46a302]">
            <Zap className="size-5" strokeWidth={3} />
          </div>
          <span className="text-2xl font-black tracking-tight text-zinc-900">EduGami</span>
        </div>

        <div className="w-full max-w-md bg-white border border-zinc-200/80 rounded-[28px] p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-800">
              Únete a <span className="text-brand-green">EduGami</span>
            </h2>
            <p className="text-zinc-500 font-bold mt-1.5 text-xs sm:text-sm">
              Tu aventura de aprendizaje comienza hoy.
            </p>
          </div>

          {error && (
            <div className="p-4 mb-6 text-xs sm:text-sm font-bold text-destructive bg-destructive/10 border-2 border-destructive/20 rounded-xl text-center">
              {error}
            </div>
          )}

          {/* SELECTOR SEGMENTADO DE ROL */}
          <div className="mb-5">
            <span className="block text-xs font-bold text-zinc-600 mb-1.5 uppercase tracking-wider">
              Rol en la plataforma
            </span>
            <div className="flex bg-zinc-100 p-1.5 rounded-2xl shadow-inner" role="group" aria-label="Selección de rol">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, role: 'STUDENT' }))}
                className={`flex-1 py-2.5 font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 ${
                  formData.role === 'STUDENT'
                    ? 'bg-white shadow-sm text-brand-blue ring-1 ring-black/5'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                👨‍🎓 Estudiante
              </button>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, role: 'TEACHER' }))}
                className={`flex-1 py-2.5 font-bold text-xs sm:text-sm rounded-xl transition-all duration-200 ${
                  formData.role === 'TEACHER'
                    ? 'bg-white shadow-sm text-brand-orange ring-1 ring-black/5'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                👨‍🏫 Docente
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold text-zinc-600 mb-1.5 uppercase tracking-wider">
                Nombre completo
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Ej. Fernando Silva"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/30 transition-all font-medium placeholder:text-zinc-400"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

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
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="alias" className="block text-xs font-bold text-zinc-600 mb-1.5 uppercase tracking-wider">
                Alias para el ranking
              </label>
              <input
                id="alias"
                name="alias"
                type="text"
                placeholder="Ej. BúhoSabio99"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/30 transition-all font-medium placeholder:text-zinc-400"
                value={formData.alias}
                onChange={handleChange}
                required
              />
              <p className="text-[11px] font-semibold text-zinc-500 mt-1">
                Se muestra en el leaderboard en vez de tu nombre real
              </p>
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
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
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

            <div className="pt-1">
              <label htmlFor="terms" className="flex items-start gap-2.5 text-xs font-semibold text-zinc-600 cursor-pointer">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                  className="size-4 mt-0.5 rounded border-zinc-300 text-brand-green focus:ring-brand-green/30 cursor-pointer"
                />
                <span>
                  Acepto los{' '}
                  <a href="#" className="text-brand-green font-bold hover:underline">términos de servicio</a>
                  {' '}y el{' '}
                  <a href="#" className="text-brand-green font-bold hover:underline">código de honor</a>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="tactile w-full py-4 mt-2 font-black text-white bg-brand-green rounded-xl shadow-[0_4px_0_0_#46a302] hover:bg-brand-green-dark uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'CREANDO CUENTA...' : 'CREAR CUENTA'}
            </button>
          </form>

          {/* ENLACE CRUZADO A LOGIN */}
          <div className="mt-6 text-center pt-4 border-t border-zinc-200/80">
            <p className="text-xs sm:text-sm font-semibold text-zinc-500">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-brand-green font-bold hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};