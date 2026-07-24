import { useState } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { registerUser } from '../services/auth.service';

export const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT' // Por defecto, es estudiante
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await registerUser(formData);
      setSuccess(true);
      
      // Esperamos 2 segundos para que el usuario vea el mensaje de éxito, y lo mandamos al Login
      setTimeout(() => {
        navigate({ to: '/login' });
      }, 2000);
      
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Ocurrió un error al registrar la cuenta.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- PANTALLA DE ÉXITO ---
  if (success) {
    return (
      <div className="w-full max-w-md p-10 bg-brand-paper border-2 border-border rounded-[28px] text-center shadow-sm font-sans">
        <span className="text-7xl mb-4 block animate-bounce">🎉</span>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-800 mb-2">¡Cuenta Creada!</h2>
        <p className="text-muted-foreground font-bold">Preparando tu entorno... redirigiendo al login.</p>
      </div>
    );
  }

  // --- PANTALLA DE REGISTRO ---
  return (
    <div className="w-full max-w-md p-8 sm:p-10 bg-brand-paper border-2 border-border rounded-[28px] shadow-sm font-sans">
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-800">
          Únete a <span className="text-brand-green">EduGami</span>
        </h2>
        <p className="text-muted-foreground font-bold mt-2 text-sm">
          Tu aventura de aprendizaje comienza hoy.
        </p>
      </div>

      {error && (
        <div className="p-4 mb-6 text-sm font-bold text-destructive bg-destructive/10 border-2 border-destructive/20 rounded-xl text-center">
          {error}
        </div>
      )}

      {/* SELECTOR DE ROL (Estilo Switch de Lovable) */}
      <div className="flex bg-zinc-100 p-1.5 rounded-2xl mb-6 shadow-inner">
        <button
          type="button"
          onClick={() => setFormData({ ...formData, role: 'STUDENT' })}
          className={`flex-1 py-2 font-bold text-sm rounded-xl transition-all duration-200 ${
            formData.role === 'STUDENT' 
              ? 'bg-white shadow-sm text-brand-blue ring-1 ring-black/5' 
              : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          👨‍🎓 Estudiante
        </button>
        <button
          type="button"
          onClick={() => setFormData({ ...formData, role: 'TEACHER' })}
          className={`flex-1 py-2 font-bold text-sm rounded-xl transition-all duration-200 ${
            formData.role === 'TEACHER' 
              ? 'bg-white shadow-sm text-brand-orange ring-1 ring-black/5' 
              : 'text-zinc-400 hover:text-zinc-600'
          }`}
        >
          👨‍🏫 Docente
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">
            Nombre Completo
          </label>
          <input 
            type="text" 
            name="name"
            placeholder="Ej. Fernando Silva" 
            className="w-full px-4 py-3 bg-white border border-zinc-200 text-foreground rounded-xl outline-none focus:border-brand-green focus:ring-4 focus:ring-green-100 transition-all font-medium placeholder:text-zinc-400"
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">
            Correo Electrónico
          </label>
          <input 
            type="email" 
            name="email"
            placeholder="tu@correo.com" 
            className="w-full px-4 py-3 bg-white border border-zinc-200 text-foreground rounded-xl outline-none focus:border-brand-green focus:ring-4 focus:ring-green-100 transition-all font-medium placeholder:text-zinc-400"
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">
            Contraseña
          </label>
          <input 
            type="password" 
            name="password"
            placeholder="••••••••" 
            className="w-full px-4 py-3 bg-white border border-zinc-200 text-foreground rounded-xl outline-none focus:border-brand-green focus:ring-4 focus:ring-green-100 transition-all font-medium placeholder:text-zinc-400"
            value={formData.password} 
            onChange={handleChange} 
            minLength={6}
            required 
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-4 mt-2 font-extrabold text-white bg-brand-green rounded-xl shadow-[0_4px_0_0_#46a302] tactile transition-colors hover:bg-brand-green-dark uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'CREANDO CUENTA...' : 'REGISTRARME'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm font-bold text-zinc-500">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-brand-green hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
      
    </div>
  );
};