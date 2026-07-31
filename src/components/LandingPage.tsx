import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Zap,
  Flame,
  Trophy,
  Award,
  CheckCircle2,
  BookOpen,
  Users,
  Sparkles,
  ArrowRight,
  Shield,
  Star,
  ChevronRight,
  Menu,
  X,
  Play,
  GraduationCap,
  TrendingUp,
  Target
} from "lucide-react";
import mascotOwl from "@/assets/mascot-owl.png";
import mascotOwlSleeping from "@/assets/mascot-owl-sleeping.png";

export const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="min-h-screen bg-brand-cream text-zinc-900 font-sans selection:bg-brand-green/20 selection:text-brand-green">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-brand-cream/85 backdrop-blur-md border-b border-zinc-950/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo EduGami */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="grid size-10 place-items-center rounded-2xl bg-brand-green shadow-[0_3px_0_0_#46a302] group-hover:scale-105 transition-transform">
              <Zap className="size-5 text-white" strokeWidth={3} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-zinc-900 group-hover:text-brand-green transition-colors">
                EduGami
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 -mt-1">
                LMS UDH
              </span>
            </div>
          </Link>

          {/* Links Escritorio */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            <a
              href="#caracteristicas"
              className="text-sm font-bold text-zinc-600 hover:text-brand-green transition-colors"
            >
              Características
            </a>
            <a
              href="#metodologia"
              className="text-sm font-bold text-zinc-600 hover:text-brand-green transition-colors"
            >
              Metodología
            </a>
            <a
              href="#estadisticas"
              className="text-sm font-bold text-zinc-600 hover:text-brand-green transition-colors"
            >
              Estadísticas
            </a>
            <a
              href="#docentes"
              className="text-sm font-bold text-zinc-600 hover:text-brand-green transition-colors"
            >
              Docentes
            </a>
          </nav>

          {/* Botones CTA Escritorio */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-zinc-700 hover:bg-zinc-950/5 transition-colors"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="tactile px-5 py-2.5 rounded-xl text-sm font-black text-white bg-brand-green shadow-[0_4px_0_0_#46a302] hover:bg-brand-green-dark transition-all"
            >
              Empezar gratis
            </Link>
          </div>

          {/* Botón Menú Móvil */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-zinc-600 hover:bg-zinc-950/5 transition-colors"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Dropdown Menú Móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-zinc-200 px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-3">
              <a
                href="#caracteristicas"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-zinc-700 py-2 px-3 rounded-lg hover:bg-zinc-50"
              >
                Características
              </a>
              <a
                href="#metodologia"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-zinc-700 py-2 px-3 rounded-lg hover:bg-zinc-50"
              >
                Metodología
              </a>
              <a
                href="#estadisticas"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-zinc-700 py-2 px-3 rounded-lg hover:bg-zinc-50"
              >
                Estadísticas
              </a>
              <a
                href="#docentes"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-zinc-700 py-2 px-3 rounded-lg hover:bg-zinc-50"
              >
                Docentes
              </a>
            </nav>
            <div className="pt-2 border-t border-zinc-100 flex flex-col gap-2.5">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl font-bold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 text-sm"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="tactile w-full text-center py-3 rounded-xl font-black text-white bg-brand-green shadow-[0_4px_0_0_#46a302] text-sm uppercase tracking-wider"
              >
                Empezar gratis
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-28 overflow-hidden">
          {/* Destellos de fondo estilo Glassmorphism Contrast */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-gradient-to-tr from-brand-green/20 to-brand-blue/20 rounded-full blur-3xl pointer-events-none -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Columna Izquierda: Copywriting + CTAs */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                
                {/* Glowing Badge Tag */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-brand-green/30 shadow-xs backdrop-blur-md">
                  <span className="flex size-2 rounded-full bg-brand-green animate-ping" />
                  <span className="text-xs sm:text-sm font-extrabold text-brand-green tracking-wide">
                    🎮 Plataforma Gamificada N°1 en UDH
                  </span>
                </div>

                {/* Headline Principal */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 leading-[1.15] text-balance">
                  Transforma tu aprendizaje universitario en un{" "}
                  <span className="bg-gradient-to-r from-brand-green via-brand-blue to-brand-purple bg-clip-text text-transparent">
                    juego donde siempre ganas
                  </span>
                </h1>

                {/* Subtext */}
                <p className="text-base sm:text-lg text-zinc-600 font-semibold max-w-2xl leading-relaxed text-pretty">
                  EduGami fusiona la gestión académica de Google Classroom con la experiencia interactiva de Duolingo. Resuelve micro-quizzes de 5 minutos, mantén tu racha diaria y domina tus materias en la Universidad Alejandro de Humboldt.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
                  <Link
                    to="/register"
                    className="tactile w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-black text-white bg-brand-green shadow-[0_5px_0_0_#46a302] hover:bg-brand-green-dark transition-all flex items-center justify-center gap-3 uppercase tracking-wide"
                  >
                    <span>Empezar gratis</span>
                    <ArrowRight className="size-5" strokeWidth={3} />
                  </Link>

                  <Link
                    to="/login"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-zinc-700 bg-white border border-zinc-200/90 hover:bg-zinc-50 hover:border-zinc-300 transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Play className="size-4 fill-zinc-700" />
                    <span>Iniciar sesión</span>
                  </Link>
                </div>

                {/* Micro prueba social */}
                <div className="flex items-center gap-4 pt-4 text-xs sm:text-sm font-semibold text-zinc-500">
                  <div className="flex -space-x-2">
                    <div className="size-8 rounded-full bg-brand-green/20 border-2 border-white flex items-center justify-center font-black text-brand-green text-xs">JS</div>
                    <div className="size-8 rounded-full bg-brand-blue/20 border-2 border-white flex items-center justify-center font-black text-brand-blue text-xs">FS</div>
                    <div className="size-8 rounded-full bg-brand-orange/20 border-2 border-white flex items-center justify-center font-black text-brand-orange text-xs">MG</div>
                  </div>
                  <span>Usado por estudiantes y profesores en UDH</span>
                </div>
              </div>

              {/* Columna Derecha: Mascota Owl + Floating Stat Cards + Interactive Mockup */}
              <div className="lg:col-span-5 relative flex justify-center items-center">
                
                {/* Glowing Backlight */}
                <div className="absolute size-72 sm:size-96 rounded-full bg-gradient-to-br from-brand-green/30 to-brand-blue/30 blur-2xl -z-10" />

                {/* Contenedor Principal del Hero Preview */}
                <div className="relative w-full max-w-md bg-zinc-900/95 border border-white/10 rounded-[32px] p-6 shadow-2xl backdrop-blur-xl text-white overflow-hidden group">
                  
                  {/* Banner Mockup Top */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="size-3 rounded-full bg-red-500/80" />
                      <div className="size-3 rounded-full bg-amber-500/80" />
                      <div className="size-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-zinc-400 ml-2">edugami.udh.edu.ve</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green text-[10px] font-black uppercase tracking-wider">
                      EN VIVO
                    </span>
                  </div>

                  {/* Mascota Búho Principal */}
                  <div className="relative z-10 flex justify-center my-4">
                    <div className="relative">
                      <div className="grid size-44 place-items-center rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-xl">
                        <img
                          src={mascotOwl}
                          alt="Búho sabio EduGami leyendo"
                          width={160}
                          height={160}
                          className="size-36 object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Micro Quiz Mock Interactive Preview Card */}
                  <div className="relative z-10 bg-white/10 border border-white/15 rounded-2xl p-4 backdrop-blur-md mt-4">
                    <div className="flex items-center justify-between text-xs font-bold text-white/80 mb-2">
                      <span>Misión Diaria UDH</span>
                      <span className="text-brand-green font-mono">+50 XP</span>
                    </div>
                    <p className="text-xs font-semibold text-white mb-3">
                      ¿Cuál es la diferencia clave entre HTTP y HTTPS?
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-brand-green/20 border border-brand-green/40 text-brand-green font-bold">
                        <span>🔒 Cifrado SSL/TLS de capa de transporte</span>
                        <CheckCircle2 className="size-4 shrink-0" />
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 font-medium">
                        ⚡ Mayor velocidad de transmisión simple
                      </div>
                    </div>
                  </div>

                  {/* FLOATING STAT CARDS */}
                  {/* Floating Card 1: Racha Activa (Arriba a la Izquierda) */}
                  <div className="absolute -top-4 -left-4 sm:-left-6 z-20 flex items-center gap-3 bg-white text-zinc-900 px-4 py-3 rounded-2xl shadow-xl border border-zinc-200 transition-transform duration-300">
                    <div className="grid size-10 place-items-center rounded-xl bg-brand-orange/15 text-brand-orange">
                      <Flame className="size-6 fill-brand-orange" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Racha Activa</p>
                      <p className="text-sm font-black text-zinc-800">🔥 5 Días seguidos</p>
                    </div>
                  </div>

                  {/* Floating Card 2: XP Ganados (Derecha Medio) */}
                  <div className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 z-20 flex items-center gap-3 bg-white text-zinc-900 px-4 py-3 rounded-2xl shadow-xl border border-zinc-200 transition-transform duration-300">
                    <div className="grid size-10 place-items-center rounded-xl bg-brand-green/15 text-brand-green">
                      <Zap className="size-6 fill-brand-green" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Puntos Totales</p>
                      <p className="text-sm font-black text-brand-green">⚡ +1,250 XP</p>
                    </div>
                  </div>

                  {/* Floating Card 3: Liga Diamante (Abajo a la Izquierda) */}
                  <div className="absolute -bottom-4 -left-4 sm:-left-6 z-20 flex items-center gap-3 bg-white text-zinc-900 px-4 py-3 rounded-2xl shadow-xl border border-zinc-200 transition-transform duration-300">
                    <div className="grid size-10 place-items-center rounded-xl bg-brand-purple/15 text-brand-purple">
                      <Trophy className="size-6 fill-brand-purple" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Posición Semanal</p>
                      <p className="text-sm font-black text-brand-purple">🏆 Liga Diamante #1</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ================= FEATURES GRID ================= */}
        <section id="caracteristicas" className="py-20 bg-brand-paper border-y border-zinc-950/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-black uppercase tracking-wider">
                Diseñado para la Universidad de hoy
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight text-balance">
                Todo lo que necesitas para aprobar con la máxima calificación
              </h2>
              <p className="text-base sm:text-lg text-zinc-600 font-semibold text-pretty">
                EduGami combina el rigor académico universitario con dinámicas de juego probadas para mantener el compromiso de estudiantes y profesores.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Feature 1 */}
              <div className="bg-white p-7 rounded-[28px] border border-zinc-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between">
                <div>
                  <div className="grid size-14 place-items-center rounded-2xl bg-brand-green/10 text-brand-green mb-6 group-hover:scale-110 transition-transform">
                    <Zap className="size-7" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">
                    Micro-learning (5 min)
                  </h3>
                  <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                    Quizzes ultra-rápidos de 5 minutos diseñados para repasar conceptos clave entre clases o mientras vas camino a la universidad.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center text-xs font-bold text-brand-green">
                  <span>Aprende a tu ritmo</span>
                  <ChevronRight className="size-4 ml-1" />
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-7 rounded-[28px] border border-zinc-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between">
                <div>
                  <div className="grid size-14 place-items-center rounded-2xl bg-brand-purple/10 text-brand-purple mb-6 group-hover:scale-110 transition-transform">
                    <Award className="size-7" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">
                    Logros Estilo Steam
                  </h3>
                  <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                    Desbloquea insignias por mantener rachas, entregar tareas a tiempo y obtener calificaciones destacadas. Medallas Comunes, Raras y Legendarias.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center text-xs font-bold text-brand-purple">
                  <span>Colecciona medallas</span>
                  <ChevronRight className="size-4 ml-1" />
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-7 rounded-[28px] border border-zinc-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between">
                <div>
                  <div className="grid size-14 place-items-center rounded-2xl bg-brand-orange/10 text-brand-orange mb-6 group-hover:scale-110 transition-transform">
                    <Trophy className="size-7" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">
                    Leaderboards en Tiempo Real
                  </h3>
                  <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                    Compite sanamente en la liga semanal con tu seudónimo. Sube de categoría desde la Liga Bronce hasta la codiciada Liga Diamante.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center text-xs font-bold text-brand-orange">
                  <span>Sube en el ranking</span>
                  <ChevronRight className="size-4 ml-1" />
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-7 rounded-[28px] border border-zinc-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between">
                <div>
                  <div className="grid size-14 place-items-center rounded-2xl bg-brand-blue/10 text-brand-blue mb-6 group-hover:scale-110 transition-transform">
                    <GraduationCap className="size-7" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">
                    Classroom + Duolingo
                  </h3>
                  <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                    Entrega trabajos académicos tradicionales y recibe notas de 0 a 20 pts, mientras disfrutas la adrenalina de una racha y recompensas XP.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center text-xs font-bold text-brand-blue">
                  <span>EVEA híbrido integral</span>
                  <ChevronRight className="size-4 ml-1" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS (METODOLOGÍA 3 PASOS) ================= */}
        <section id="metodologia" className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-black uppercase tracking-wider">
                Metodología en 3 simples pasos
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight text-balance">
                ¿Cómo funciona EduGami?
              </h2>
              <p className="text-base sm:text-lg text-zinc-600 font-semibold text-pretty">
                Diseñado para integrarse en tu rutina diaria sin complicaciones ni curvas de aprendizaje complejas.
              </p>
            </div>

            {/* Stepper Interactivo */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              
              {/* Paso 1 */}
              <div
                onClick={() => setActiveStep(1)}
                className={`cursor-pointer p-8 rounded-[32px] border-2 transition-all relative ${
                  activeStep === 1
                    ? "bg-white border-brand-green shadow-lg scale-102"
                    : "bg-white/60 border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="size-12 rounded-2xl bg-brand-green text-white font-black text-xl flex items-center justify-center shadow-[0_3px_0_0_#46a302]">
                    1
                  </span>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Paso 01</span>
                </div>
                <h3 className="text-2xl font-black text-zinc-900 mb-3">Únete a tu clase</h3>
                <p className="text-sm text-zinc-600 font-semibold leading-relaxed">
                  Solicita el código único a tu profesor de la UDH e inscríbete en tus aulas virtuales en menos de 10 segundos.
                </p>
                <div className="mt-6 p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 text-xs font-mono text-zinc-600 flex items-center justify-between">
                  <span>Código: <strong className="text-brand-green">UDH-8A-2026</strong></span>
                  <CheckCircle2 className="size-4 text-brand-green" />
                </div>
              </div>

              {/* Paso 2 */}
              <div
                onClick={() => setActiveStep(2)}
                className={`cursor-pointer p-8 rounded-[32px] border-2 transition-all relative ${
                  activeStep === 2
                    ? "bg-white border-brand-blue shadow-lg scale-102"
                    : "bg-white/60 border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="size-12 rounded-2xl bg-brand-blue text-white font-black text-xl flex items-center justify-center shadow-[0_3px_0_0_#1cb0f6]">
                    2
                  </span>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Paso 02</span>
                </div>
                <h3 className="text-2xl font-black text-zinc-900 mb-3">Resuelve micro-quizzes</h3>
                <p className="text-sm text-zinc-600 font-semibold leading-relaxed">
                  Completa retos dinámicos preparados por tus profesores. Cada respuesta correcta incrementa tu multiplicador y suma XP.
                </p>
                <div className="mt-6 p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 text-xs font-bold text-brand-blue flex items-center justify-between">
                  <span>Misión activa: 5 preguntas</span>
                  <Zap className="size-4 fill-current" />
                </div>
              </div>

              {/* Paso 3 */}
              <div
                onClick={() => setActiveStep(3)}
                className={`cursor-pointer p-8 rounded-[32px] border-2 transition-all relative ${
                  activeStep === 3
                    ? "bg-white border-brand-orange shadow-lg scale-102"
                    : "bg-white/60 border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="size-12 rounded-2xl bg-brand-orange text-white font-black text-xl flex items-center justify-center shadow-[0_3px_0_0_#cc7800]">
                    3
                  </span>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Paso 03</span>
                </div>
                <h3 className="text-2xl font-black text-zinc-900 mb-3">Sube en el ranking</h3>
                <p className="text-sm text-zinc-600 font-semibold leading-relaxed">
                  Compite con tus compañeros de clase, desbloquea logros épicos y demuestra quién domina la materia al final del trimestre.
                </p>
                <div className="mt-6 p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 text-xs font-bold text-brand-orange flex items-center justify-between">
                  <span>Recompensa: Insignia Diamante</span>
                  <Trophy className="size-4 fill-current" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= STATS SECTION ================= */}
        <section id="estadisticas" className="py-16 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-brand-green/10 blur-2xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full bg-brand-blue/10 blur-2xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
              
              <div className="pt-6 md:pt-0">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-green mb-2 tracking-tight">
                  +10,000
                </div>
                <p className="text-sm sm:text-base font-bold text-zinc-300">
                  Quizzes resueltos con éxito
                </p>
                <p className="text-xs text-zinc-400 font-medium mt-1">
                  Evaluaciones continuas e interactivas
                </p>
              </div>

              <div className="pt-6 md:pt-0">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-blue mb-2 tracking-tight">
                  98%
                </div>
                <p className="text-sm sm:text-base font-bold text-zinc-300">
                  Retención de estudiantes
                </p>
                <p className="text-xs text-zinc-400 font-medium mt-1">
                  Reducción significativa del desinterés en clase
                </p>
              </div>

              <div className="pt-6 md:pt-0">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-orange mb-2 tracking-tight">
                  +50
                </div>
                <p className="text-sm sm:text-base font-bold text-zinc-300">
                  Clases activas en UDH
                </p>
                <p className="text-xs text-zinc-400 font-medium mt-1">
                  Secciones integradas con éxito
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ================= CALL TO ACTION BANNER ================= */}
        <section id="docentes" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-brand-green via-emerald-600 to-brand-blue p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
              
              {/* Decorative circles */}
              <div className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-white/10" />
              <div className="pointer-events-none absolute -left-20 -bottom-20 size-96 rounded-full bg-white/5" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-md">
                    <Sparkles className="size-4" />
                    <span>Inicia tu experiencia gamificada</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                    ¿Listo para transformar la educación en la UDH?
                  </h2>

                  <p className="text-white/90 text-base sm:text-lg font-semibold max-w-2xl leading-relaxed">
                    Tanto si eres un estudiante buscando subir sus notas como si eres un docente interesado en crear aulas dinámicas, EduGami es tu mejor aliado.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center lg:justify-start">
                    <Link
                      to="/register"
                      className="tactile w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-black text-brand-green bg-white shadow-[0_5px_0_0_#e2e8f0] hover:bg-zinc-50 transition-all text-center uppercase tracking-wide"
                    >
                      Registrarme como Estudiante
                    </Link>
                    <Link
                      to="/register"
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-white/20 border border-white/30 hover:bg-white/30 backdrop-blur-md transition-all text-center"
                    >
                      Registrarme como Docente
                    </Link>
                  </div>
                </div>

                {/* Mascota Durmiendo / Búho Sabio Banner */}
                <div className="lg:col-span-4 flex justify-center">
                  <div className="relative">
                    <div className="grid size-56 sm:size-64 place-items-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-2xl">
                      <img
                        src={mascotOwlSleeping}
                        alt="Mascota búho descansando"
                        width={200}
                        height={200}
                        className="size-48 object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-zinc-200/80 pt-16 pb-12 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            
            {/* Columna Marca */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="grid size-9 place-items-center rounded-xl bg-brand-green shadow-[0_3px_0_0_#46a302]">
                  <Zap className="size-5 text-white" strokeWidth={3} />
                </div>
                <span className="text-2xl font-black tracking-tight text-zinc-900">
                  EduGami
                </span>
              </Link>
              <p className="text-sm text-zinc-600 font-medium max-w-sm leading-relaxed">
                Entorno Virtual de Enseñanza y Aprendizaje (EVEA) híbrido de la Universidad Alejandro de Humboldt. Fusiona el rigor académico con gamificación diaria.
              </p>
              <p className="text-xs font-bold text-zinc-400">
                Caracas, Venezuela • 2026
              </p>
            </div>

            {/* Columna Navegación */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                Plataforma
              </h4>
              <ul className="space-y-2.5 text-sm font-semibold text-zinc-600">
                <li>
                  <a href="#caracteristicas" className="hover:text-brand-green transition-colors">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#metodologia" className="hover:text-brand-green transition-colors">
                    Metodología 3 pasos
                  </a>
                </li>
                <li>
                  <a href="#estadisticas" className="hover:text-brand-green transition-colors">
                    Estadísticas UDH
                  </a>
                </li>
                <li>
                  <Link to="/leaderboard" className="hover:text-brand-green transition-colors">
                    Ranking de Estudiantes
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna Accesos */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                Accesos
              </h4>
              <ul className="space-y-2.5 text-sm font-semibold text-zinc-600">
                <li>
                  <Link to="/login" className="hover:text-brand-green transition-colors">
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-brand-green transition-colors">
                    Crear cuenta estudiante
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-brand-green transition-colors">
                    Portal docente
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna Institucional */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                Institución
              </h4>
              <ul className="space-y-2.5 text-sm font-semibold text-zinc-600">
                <li className="text-zinc-700 font-bold">
                  Universidad Alejandro de Humboldt
                </li>
                <li>Facultad de Ingeniería</li>
                <li>Ingeniería de Informática</li>
                <li className="text-xs text-zinc-400 pt-2">
                  Desarrollado por Fernando Silva & Isaac
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-zinc-500">
            <p>© 2026 EduGami LMS. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:underline">Código de Honor</a>
              <a href="#" className="hover:underline">Términos de Servicio</a>
              <a href="#" className="hover:underline">Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
