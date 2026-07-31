import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { getCurrentProfile } from '../services/auth.service';
import { getMyClassrooms, enrollInClassroom } from '../services/classroom.service';
import { getLeaderboard } from '../services/leaderboard.service';
import { submitAssignment } from '../services/assignment.service';
import { submitQuizAttempt } from '../services/quiz.service';
import {
  Home, BookOpen, Zap, Trophy, Play, FileText,
  Flame, Sparkles, Bell, Search, Clock, Target, Award, LogOut, X, CheckCircle2,
  Star, Lock, Check, Calendar, Shield, ExternalLink, ChevronRight, Gamepad2
} from "lucide-react";

import mascotOwl from "@/assets/mascot-owl.png"; 
import mascotOwlSleeping from "@/assets/mascot-owl-sleeping.png";

const navItems = [
  { id: 'inicio', icon: Home, label: "Inicio" },
  { id: 'clases', icon: BookOpen, label: "Clases" },
  { id: 'quizzes', icon: Zap, label: "Quizzes" },
  { id: 'logros', icon: Trophy, label: "Logros" },
];

export const DashboardContent = () => {
  const navigate = useNavigate();
  
  // Estado de navegación por pestañas del estudiante
  const [activeStudentTab, setActiveStudentTab] = useState<'inicio' | 'clases' | 'quizzes' | 'logros'>('inicio');

  // Estados Dinámicos Base
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estados de Formularios y Modales
  const [classCode, setClassCode] = useState('');
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrollingNew, setIsEnrollingNew] = useState(false);

  // Filtros de pestaña "Clases" y "Logros"
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [achievementFilter, setAchievementFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  // Estados para Tareas
  const [activeTask, setActiveTask] = useState<any>(null);
  const [taskUrl, setTaskUrl] = useState('');
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);

  // Estados para Quizzes
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState<any>({});
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);
  const [hasQuizAvailableOverride, setHasQuizAvailableOverride] = useState<boolean | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('edugami_token');
    localStorage.removeItem('edugami_role');
    navigate({ to: '/login' });
  };

  const loadData = async () => {
    try {
      const [profileRes, classRes, boardRes] = await Promise.all([
        getCurrentProfile(),
        getMyClassrooms(),
        getLeaderboard()
      ]);
      setUserProfile(profileRes.user);
      const clsList = classRes.classrooms || [];
      setClassrooms(clsList);
      setLeaderboardData(boardRes.leaderboard || []);

      if (clsList.length > 0 && !selectedClassId) {
        setSelectedClassId(clsList[0].id);
      }
    } catch (error: any) {
      console.error("Error al cargar datos", error);
      if (error.response?.status === 401 || (typeof window !== 'undefined' && !localStorage.getItem('edugami_token'))) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('edugami_token');
      const role = localStorage.getItem('edugami_role');
      if (!token) {
        handleLogout();
        return;
      }
      if (role === 'TEACHER') {
        navigate({ to: '/teacher' });
        return;
      }
    }
    loadData();
  }, []);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classCode.trim()) return;
    setIsEnrolling(true);
    try {
      await enrollInClassroom(classCode);
      setClassCode('');
      setIsEnrollingNew(false);
      await loadData();
    } catch (error) {
      alert('Error al unirse. Verifica el código.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskUrl.trim()) return;
    setIsSubmittingTask(true);
    try {
      await submitAssignment({ assignmentId: activeTask.id, contentUrl: taskUrl });
      alert("¡Tarea entregada con éxito! +XP añadida.");
      setActiveTask(null);
      setTaskUrl('');
      await loadData();
    } catch (error: any) {
      alert(error.response?.data?.error || "Error al entregar la tarea.");
    } finally {
      setIsSubmittingTask(false);
    }
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingQuiz(true);
    try {
      const formattedAnswers = Object.keys(quizAnswers).map(questionId => ({
        questionId,
        optionId: quizAnswers[questionId]
      }));
      
      const result = await submitQuizAttempt({ quizId: activeQuiz.id, answers: formattedAnswers });
      alert(`${result.message} (Puntuación: ${result.score}) ⚡`);
      setActiveQuiz(null);
      setQuizAnswers({});
      await loadData();
    } catch (error: any) {
      console.error("Detalles del error del Quiz:", error);
      const mensajeReal = error.response?.data?.error || `Error del sistema: ${error.message}`;
      alert(mensajeReal);
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 min-h-screen bg-brand-cream flex justify-center items-center">
        <p className="text-2xl font-bold text-brand-green animate-pulse">Cargando tu entorno virtual... ⏳</p>
      </div>
    );
  }

  // RECOPILAR QUIZZES PENDIENTES
  const allPendingQuizzes: any[] = [];
  classrooms.forEach((c) => {
    (c.cuts || []).forEach((cut: any) => {
      (cut.quizzes || []).forEach((quiz: any) => {
        const isCompleted = quiz.attempts?.some((att: any) => att.studentId === userProfile?.id || att.userId === userProfile?.id);
        if (!isCompleted) {
          allPendingQuizzes.push({ ...quiz, classroomTitle: c.title });
        }
      });
    });
  });

  const hasPendingQuizzes = allPendingQuizzes.length > 0;
  const hasQuizAvailable = hasQuizAvailableOverride !== null ? hasQuizAvailableOverride : hasPendingQuizzes;
  const firstPendingQuiz = hasPendingQuizzes ? allPendingQuizzes[0] : null;

  // CÁLCULO DE RECOPILACIÓN DE TAREAS Y ACTIVIDADES COMPLETADAS
  let totalTasksCompleted = 0;
  let totalQuizzesCompleted = 0;
  let totalTasksSubmitted = 0;

  classrooms.forEach((c) => {
    (c.assignments || []).forEach((asg: any) => {
      if (asg.submissions?.some((sub: any) => sub.studentId === userProfile?.id)) {
        totalTasksSubmitted++;
        totalTasksCompleted++;
      }
    });
    (c.cuts || []).forEach((cut: any) => {
      (cut.quizzes || []).forEach((qz: any) => {
        if (qz.attempts?.some((att: any) => att.studentId === userProfile?.id)) {
          totalQuizzesCompleted++;
        }
      });
    });
  });

  // SISTEMA DE LOGROS ESTILO STEAM
  const currentXP = userProfile?.xpTotal || 0;
  const currentStreak = userProfile?.streak || 0;
  const myLeaderboardRank = leaderboardData.findIndex((row: any) => row.id === userProfile?.id) + 1;

  const steamAchievements = [
    {
      id: 'buho_nocturno',
      title: 'El Búho Nocturno 🦉',
      description: 'Entrega tu primera tarea tradicional a tiempo.',
      tier: 'Común',
      tone: 'border-blue-400 bg-blue-50 text-blue-700',
      unlocked: totalTasksSubmitted >= 1,
      progress: `${Math.min(totalTasksSubmitted, 1)} / 1`,
      icon: Sparkles
    },
    {
      id: 'racha_imparable',
      title: 'Racha Imparable 🔥',
      description: 'Mantén una racha de al menos 3 días consecutivos de estudio.',
      tier: 'Raro',
      tone: 'border-orange-400 bg-orange-50 text-orange-700',
      unlocked: currentStreak >= 3,
      progress: `${Math.min(currentStreak, 3)} / 3 días`,
      icon: Flame
    },
    {
      id: 'velocidad_rayo',
      title: 'Velocidad de Rayo ⚡',
      description: 'Completa tu primer quiz gamificado con éxito.',
      tier: 'Común',
      tone: 'border-green-400 bg-green-50 text-green-700',
      unlocked: totalQuizzesCompleted >= 1,
      progress: `${Math.min(totalQuizzesCompleted, 1)} / 1`,
      icon: Zap
    },
    {
      id: 'estudiante_dedicado',
      title: 'Estudiante Dedicado 📚',
      description: 'Inscríbete en al menos 2 aulas virtuales activas.',
      tier: 'Raro',
      tone: 'border-purple-400 bg-purple-50 text-purple-700',
      unlocked: classrooms.length >= 2,
      progress: `${Math.min(classrooms.length, 2)} / 2 aulas`,
      icon: BookOpen
    },
    {
      id: 'acumulador_xp',
      title: 'Acumulador de XP 💎',
      description: 'Alcanza los 500 puntos de experiencia acumulados.',
      tier: 'Épico',
      tone: 'border-cyan-400 bg-cyan-50 text-cyan-700',
      unlocked: currentXP >= 500,
      progress: `${Math.min(currentXP, 500)} / 500 XP`,
      icon: Trophy
    },
    {
      id: 'top_leaderboard',
      title: 'Liga Diamante 👑',
      description: 'Posiciónate entre los 3 primeros lugares del ranking global.',
      tier: 'Legendario',
      tone: 'border-yellow-400 bg-yellow-50 text-yellow-800',
      unlocked: myLeaderboardRank > 0 && myLeaderboardRank <= 3,
      progress: myLeaderboardRank > 0 ? `Puesto #${myLeaderboardRank}` : 'Sin puesto',
      icon: Award
    },
    {
      id: 'maestro_edugami',
      title: 'Maestro EduGami 🌟',
      description: 'Alcanza 1,000 XP y completa tu meta semanal.',
      tier: 'Legendario',
      tone: 'border-emerald-500 bg-emerald-50 text-emerald-800',
      unlocked: currentXP >= 1000,
      progress: `${Math.min(currentXP, 1000)} / 1000 XP`,
      icon: Star
    }
  ];

  const unlockedCount = steamAchievements.filter(a => a.unlocked).length;
  const totalAchievements = steamAchievements.length;
  const achievementPercentage = Math.round((unlockedCount / totalAchievements) * 100);

  const filteredAchievements = steamAchievements.filter(a => {
    if (achievementFilter === 'unlocked') return a.unlocked;
    if (achievementFilter === 'locked') return !a.unlocked;
    return true;
  });

  // CÁLCULOS DE NIVEL DE JUEGO (PARA PESTAÑA QUIZZES)
  const currentLevel = Math.floor(currentXP / 200) + 1;
  const nextLevelXP = currentLevel * 200;
  const levelProgress = Math.min(Math.round((currentXP % 200) / 200 * 100), 100);

  // CÁLCULOS SEMANALES
  const WEEKLY_GOAL = 1000;
  const progressPercent = Math.min(Math.round((currentXP / WEEKLY_GOAL) * 100), 100);
  const xpRemaining = Math.max(WEEKLY_GOAL - currentXP, 0);

  // AULA SELECCIONADA PARA PESTAÑA "CLASES"
  const currentSelectedClass = classrooms.find(c => c.id === selectedClassId) || classrooms[0];

  return (
    <div className="flex flex-col lg:flex-row h-screen lg:h-screen w-full bg-brand-cream font-sans text-zinc-900 selection:bg-brand-green/20 overflow-hidden relative">
      
      {/* ================= HEADER MÓVIL ================= */}
      <header className="flex lg:hidden items-center justify-between border-b border-zinc-200 bg-brand-paper px-4 py-3 shrink-0 z-30 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="grid size-8 place-items-center rounded-xl bg-brand-green shadow-[0_2px_0_0_#46a302]">
            <Zap className="size-4 text-white" strokeWidth={3} />
          </div>
          <span className="text-lg font-bold tracking-tight text-zinc-900">EduGami</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-brand-green/10 px-2.5 py-1 text-xs font-bold text-brand-green">
            <Zap className="size-3.5 fill-current" />
            <span>{currentXP} XP</span>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-brand-orange/10 px-2.5 py-1 text-xs font-bold text-brand-orange">
            <Flame className="size-3.5 fill-current" />
            <span>{userProfile?.streak || 0}d</span>
          </div>
          <button onClick={handleLogout} className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors" title="Cerrar Sesión">
            <LogOut className="size-5" />
          </button>
        </div>
      </header>

      {/* ================= MODAL DE TAREAS ================= */}
      {activeTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-[94vw] max-w-md rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 shadow-2xl relative max-h-[90dvh] overflow-y-auto">
            <button onClick={() => setActiveTask(null)} className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700"><X className="size-5" /></button>
            <div className="grid size-12 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue mb-4">
              <FileText className="size-6" strokeWidth={2.5} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Entregar Tarea</h2>
            <p className="text-sm font-bold text-brand-blue mb-6">{activeTask.title}</p>
            {activeTask.description && <p className="text-sm text-zinc-600 mb-6 p-4 bg-zinc-50 rounded-xl border border-zinc-100">{activeTask.description}</p>}
            
            <form onSubmit={handleTaskSubmit}>
              <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Enlace a tu trabajo (Google Drive, Docs, etc.)</label>
              <input type="url" required placeholder="https://..." className="w-full px-4 py-3 mb-6 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100 font-medium" value={taskUrl} onChange={(e) => setTaskUrl(e.target.value)} />
              <button type="submit" disabled={isSubmittingTask} className="tactile w-full py-3 font-bold text-white bg-brand-blue rounded-xl shadow-[0_4px_0_0_#1cb0f6] hover:bg-blue-500 disabled:opacity-50">
                {isSubmittingTask ? 'Enviando...' : 'Entregar y ganar XP'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL DE QUIZZES ================= */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-[94vw] max-w-lg rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 shadow-2xl relative max-h-[90dvh] overflow-y-auto">
            <button onClick={() => setActiveQuiz(null)} className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700"><X className="size-5" /></button>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-brand-green/10 text-brand-green">
                  <Zap className="size-5" strokeWidth={2.5} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{activeQuiz.title}</h2>
              </div>
              <span className="text-xs sm:text-sm font-bold text-brand-green bg-brand-green/10 px-3 py-1 rounded-lg">+{activeQuiz.xpReward} XP</span>
            </div>
            
            <form onSubmit={handleQuizSubmit} className="space-y-6">
              {activeQuiz.questions?.map((question: any, idx: number) => (
                <div key={question.id} className="bg-zinc-50 p-4 sm:p-5 rounded-2xl border border-zinc-200">
                  <h3 className="font-bold text-gray-800 mb-4 text-sm sm:text-base">{idx + 1}. {question.text}</h3>
                  <div className="space-y-3">
                    {question.options?.map((opt: any) => (
                      <label key={opt.id} className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${quizAnswers[question.id] === opt.id ? 'border-brand-green bg-brand-green/5' : 'border-zinc-200 bg-white hover:border-brand-green/40'}`}>
                        <input type="radio" name={`question_${question.id}`} value={opt.id} checked={quizAnswers[question.id] === opt.id} onChange={() => setQuizAnswers({...quizAnswers, [question.id]: opt.id})} className="size-4 text-brand-green focus:ring-brand-green" required />
                        <span className="font-medium text-xs sm:text-sm text-zinc-700">{opt.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button type="submit" disabled={isSubmittingQuiz || Object.keys(quizAnswers).length !== activeQuiz.questions?.length} className="tactile w-full py-3.5 sm:py-4 font-bold text-white bg-brand-green rounded-xl shadow-[0_4px_0_0_#46a302] hover:bg-green-600 disabled:opacity-50">
                {isSubmittingQuiz ? 'Procesando...' : 'Completar Quiz'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= BARRA LATERAL ESCRITORIO (IZQUIERDA) ================= */}
      <nav className="hidden lg:flex w-64 flex-col border-r border-zinc-950/5 bg-brand-paper p-4 shrink-0">
        <div className="mb-8 px-4 py-6">
          <div className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-xl bg-brand-green shadow-[0_3px_0_0_#46a302]">
              <Zap className="size-5 text-white" strokeWidth={3} />
            </div>
            <span className="text-xl font-bold tracking-tight">EduGami</span>
          </div>
        </div>
        
        <div className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeStudentTab === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => setActiveStudentTab(item.id as any)}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  isActive ? "bg-brand-green/10 text-brand-green ring-1 ring-brand-green/30" : "text-zinc-500 hover:bg-zinc-950/5"
                }`}
              >
                <Icon className="size-4 shrink-0" strokeWidth={2.5} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 rounded-2xl bg-zinc-950/5 p-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-green/20 text-sm font-bold text-brand-green">
              {userProfile?.alias?.substring(0, 2).toUpperCase() || 'JP'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-gray-800">{userProfile?.alias || 'Estudiante'}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Nivel {currentLevel} • {currentXP} XP
              </p>
            </div>
          </div>
          <button onClick={handleLogout} className="p-2 text-zinc-400 hover:text-red-500 transition-colors" title="Cerrar Sesión">
            <LogOut className="size-5" />
          </button>
        </div>
      </nav>

      {/* ================= BARRA NAVEGACIÓN MÓVIL (INFERIOR) ================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden items-center justify-around border-t border-zinc-200 bg-white/95 backdrop-blur-md px-2 py-2 shadow-lg pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeStudentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveStudentTab(item.id as any)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                isActive ? "text-brand-green font-bold scale-105" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <Icon className="size-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 pt-4 lg:pt-10 pb-24 lg:pb-10 min-w-0">
        
        {/* Top Search Bar */}
        <div className="mb-6 lg:mb-8 flex items-center justify-between gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Buscar clase, tarea o quiz..."

              className="w-full rounded-xl border border-zinc-950/5 bg-white py-2.5 pl-9 pr-3 text-sm outline-none ring-brand-green/30 transition placeholder:text-zinc-400 focus:ring-2 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="tactile grid size-10 place-items-center rounded-xl bg-white text-zinc-600 shadow-black/10 ring-1 ring-black/5 hover:text-brand-green" aria-label="Notificaciones">
            <Bell className="size-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* ================= PESTAÑA 1: INICIO ================= */}
        {activeStudentTab === 'inicio' && (
          <div className="animate-in fade-in">
            <header className="mb-10">
              <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight text-balance">
                ¡Hola de nuevo, <span className="text-brand-orange">{userProfile?.alias}</span>! 👋
              </h1>
              <p className="max-w-[56ch] text-pretty text-zinc-500 font-medium">
                Revisa tus misiones activas y asegúrate de mantener tu racha semanal.
              </p>
            </header>

            <section className="mb-12">
              {hasQuizAvailable ? (
                <div className="relative flex items-center justify-between overflow-hidden rounded-[28px] bg-brand-green p-8 text-white shadow-sm">
                  <div className="relative z-10 max-w-[46ch]">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      <Clock className="size-3.5" strokeWidth={3} /> Micro-lección · 5 min
                    </div>
                    <h2 className="mb-3 text-2xl font-bold leading-tight md:text-3xl">Continuar aprendiendo</h2>
                    <p className="mb-6 text-white/90 font-medium leading-relaxed">
                      {firstPendingQuiz
                        ? `${firstPendingQuiz.classroomTitle || 'Materia'} • "${firstPendingQuiz.title}" (+${firstPendingQuiz.xpReward || 40} XP)`
                        : 'Tienes un quiz disponible listo para resolver y sumar XP a tu racha.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => firstPendingQuiz && setActiveQuiz(firstPendingQuiz)}
                      className="tactile inline-flex items-center gap-2.5 rounded-xl bg-white px-5 py-3.5 text-sm font-extrabold text-brand-green shadow-[0_4px_0_0_#46a302] hover:bg-white/95 transition-all"
                    >
                      <Play className="size-4 fill-current" strokeWidth={0} /> Comenzar quiz
                    </button>
                  </div>

                  {/* Círculos decorativos absolutos */}
                  <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-white/10" />
                  <div className="pointer-events-none absolute -bottom-24 right-24 size-48 rounded-full bg-white/5" />

                  {/* Mascota en círculo translúcido */}
                  <div className="pointer-events-none relative z-10 hidden md:block">
                    <div className="grid size-56 place-items-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                      <img
                        src={mascotOwl}
                        alt="Mascota búho EduGami leyendo un libro"
                        width={176}
                        height={176}
                        className="size-44 object-contain drop-shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative flex items-center justify-between overflow-hidden rounded-[28px] bg-brand-blue/15 p-8 text-zinc-700 ring-1 ring-black/5 shadow-xs">
                  <div className="relative z-10 max-w-[46ch]">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-blue/20 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-blue backdrop-blur-sm">
                      <Clock className="size-3.5" strokeWidth={3} /> Sin quizzes activos
                    </div>
                    <h2 className="mb-3 text-2xl font-bold leading-tight text-zinc-900 md:text-3xl">
                      El búho está descansando
                    </h2>
                    <p className="mb-6 text-zinc-600 font-medium leading-relaxed">
                      No tienes quizzes pendientes por ahora. Vuelve más tarde o repasa material de tus clases para mantener la racha.
                    </p>
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="inline-flex items-center gap-2.5 rounded-xl bg-white/70 px-5 py-3.5 text-sm font-extrabold text-zinc-400 cursor-not-allowed border border-zinc-200/60 shadow-none"
                    >
                      <Play className="size-4 fill-current opacity-40" strokeWidth={0} /> No hay quizzes disponibles
                    </button>
                  </div>

                  {/* Círculos decorativos absolutos */}
                  <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-brand-blue/10" />
                  <div className="pointer-events-none absolute -bottom-24 right-24 size-48 rounded-full bg-brand-blue/5" />

                  {/* Mascota durmiendo en círculo translúcido */}
                  <div className="pointer-events-none relative z-10 hidden md:block">
                    <div className="grid size-56 place-items-center rounded-full bg-white/40 backdrop-blur-sm border border-white/40 shadow-xs">
                      <img
                        src={mascotOwlSleeping}
                        alt="Mascota búho durmiendo"
                        width={176}
                        height={176}
                        className="size-44 object-contain drop-shadow-md"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* VISTA GENERAL DE CLASES */}
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">Mis Clases</h3>
                {classrooms.length > 0 && (
                  <button onClick={() => setIsEnrollingNew(!isEnrollingNew)} className="text-sm font-bold text-brand-green hover:underline flex items-center gap-1">
                    <span>+</span> Unirme a otra
                  </button>
                )}
              </div>
              
              {classrooms.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-[28px] bg-white p-12 ring-1 ring-black/5 text-center shadow-sm">
                  <span className="text-6xl mb-4 block">🎒</span>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Tu mochila está vacía</h4>
                  <p className="text-zinc-500 font-medium mb-8 max-w-md">Aún no estás inscrito en ninguna clase. Usa el código de tu profesor para unirte y comenzar tu aventura.</p>
                  <form onSubmit={handleEnroll} className="flex w-full max-w-sm gap-2">
                    <input type="text" placeholder="Código de la clase..." required className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none ring-brand-green/30 transition focus:ring-2 focus:border-brand-green font-medium" value={classCode} onChange={(e) => setClassCode(e.target.value)} />
                    <button type="submit" disabled={isEnrolling} className="tactile rounded-xl bg-brand-green px-6 font-bold text-white shadow-green-900 transition hover:bg-brand-green-dark disabled:opacity-50">
                      {isEnrolling ? '...' : 'Unirme'}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {isEnrollingNew && (
                    <div className="overflow-hidden rounded-[20px] bg-brand-paper p-6 ring-2 ring-brand-green/20 border-dashed border-2 border-brand-green shadow-sm animate-in fade-in zoom-in-95">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">Nueva Misión</h4>
                      <p className="text-sm text-zinc-500 mb-4">Ingresa el código que te dio el profesor.</p>
                      <form onSubmit={handleEnroll} className="flex flex-col gap-2">
                        <input type="text" placeholder="Pegar código aquí..." required className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 outline-none ring-brand-green/30 transition focus:ring-2 focus:border-brand-green font-medium" value={classCode} onChange={(e) => setClassCode(e.target.value)} />
                        <div className="flex gap-2 mt-2">
                          <button type="button" onClick={() => setIsEnrollingNew(false)} className="px-4 py-2 text-sm font-bold text-zinc-500 hover:bg-zinc-100 rounded-xl transition">Cancelar</button>
                          <button type="submit" disabled={isEnrolling} className="tactile flex-1 rounded-xl bg-brand-green px-4 py-2 text-sm font-bold text-white shadow-green-900 transition hover:bg-brand-green-dark disabled:opacity-50">
                            {isEnrolling ? 'Validando...' : 'Unirme'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {classrooms.map((c) => (
                    <article key={c.id} className="overflow-hidden rounded-[20px] bg-white p-1 ring-1 ring-black/5 shadow-sm group">
                      <div className={`h-3 rounded-t-[19px] ${c.stripeColor || 'bg-brand-blue'} opacity-90 group-hover:opacity-100 transition`} />
                      <div className="p-5">
                        <h4 className="text-lg font-bold text-gray-800">{c.title}</h4>
                        <p className="mb-2 text-sm text-zinc-500 font-medium">{c.section} • {c.teacher?.name}</p>
                        
                        <div className="space-y-2.5 mt-4">
                          <h5 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Misiones Activas</h5>
                          
                          {/* TAREAS */}
                          {c.assignments && c.assignments.length > 0 && c.assignments.map((task: any) => {
                            const isCompleted = task.submissions?.some((sub: any) => sub.userId === userProfile?.id || sub.studentId === userProfile?.id);
                            return (
                              <div key={task.id} className={`flex items-center justify-between rounded-xl p-3 border mb-2 transition-colors ${isCompleted ? 'bg-zinc-100/50 border-zinc-100 opacity-70' : 'bg-zinc-50 border-zinc-100 hover:border-brand-blue/30'}`}>
                                <div className="flex items-center gap-3">
                                  <div className={`grid size-8 place-items-center rounded-lg ${isCompleted ? 'bg-zinc-200 text-zinc-400' : 'bg-brand-blue/10 text-brand-blue'}`}>
                                    <FileText className="size-4" strokeWidth={2.5} />
                                  </div>
                                  <span className={`text-sm font-bold truncate max-w-[150px] ${isCompleted ? 'text-zinc-400 line-through' : 'text-gray-700'}`}>
                                    {task.title}
                                  </span>
                                </div>
                                {isCompleted ? (
                                  <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 bg-zinc-200/50 px-2 py-1 rounded-md uppercase">
                                    <CheckCircle2 className="size-3" /> Listo
                                  </span>
                                ) : (
                                  <button onClick={() => setActiveTask(task)} className="text-[10px] font-bold text-brand-blue hover:bg-brand-blue/10 px-2 py-1 rounded-md transition-colors uppercase">
                                    Entregar
                                  </button>
                                )}
                              </div>
                            );
                          })}

                          {/* QUIZZES */}
                          {(c.cuts || []).flatMap((cut: any) => cut.quizzes || []).map((quiz: any) => {
                            const isCompleted = quiz.attempts?.some((att: any) => att.userId === userProfile?.id || att.studentId === userProfile?.id);
                            return (
                              <div key={quiz.id} className={`flex items-center justify-between rounded-xl p-3 border mb-2 transition-colors ${isCompleted ? 'bg-zinc-100/50 border-zinc-100 opacity-70' : 'bg-zinc-50 border-zinc-100 hover:border-brand-green/30'}`}>
                                <div className="flex items-center gap-3">
                                  <div className={`grid size-8 place-items-center rounded-lg ${isCompleted ? 'bg-zinc-200 text-zinc-400' : 'bg-brand-green/10 text-brand-green'}`}>
                                    <Zap className="size-4" strokeWidth={2.5} />
                                  </div>
                                  <span className={`text-sm font-bold truncate max-w-[150px] ${isCompleted ? 'text-zinc-400 line-through' : 'text-gray-700'}`}>
                                    {quiz.title}
                                  </span>
                                </div>
                                {isCompleted ? (
                                  <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 bg-zinc-200/50 px-2 py-1 rounded-md uppercase">
                                    <CheckCircle2 className="size-3" /> Listo
                                  </span>
                                ) : (
                                  <button onClick={() => setActiveQuiz(quiz)} className="text-[10px] font-bold text-brand-green bg-brand-green/10 hover:bg-brand-green/20 px-2 py-1 rounded-md transition-colors uppercase">
                                    Resolver
                                  </button>
                                )}
                              </div>
                            );
                          })}

                          {(!c.assignments?.length && !(c.cuts || []).some((cut: any) => cut.quizzes?.length > 0)) && (
                            <p className="text-xs text-zinc-400 font-medium italic">No hay misiones pendientes.</p>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* ================= PESTAÑA 2: CLASES (ESTILO GOOGLE CLASSROOM) ================= */}
        {activeStudentTab === 'clases' && (
          <div className="animate-in fade-in space-y-8">
            <header className="flex flex-wrap justify-between items-end gap-4">
              <div>
                <h1 className="text-3xl font-bold leading-tight tracking-tight">
                  Mis <span className="text-brand-blue">Aulas Virtuales</span> 📚
                </h1>
                <p className="text-zinc-500 font-medium mt-1">
                  Estilo Classroom: Selecciona una materia para consultar tus pendientes y entregas completadas.
                </p>
              </div>

              <button 
                onClick={() => setIsEnrollingNew(!isEnrollingNew)} 
                className="px-5 py-2.5 bg-brand-blue text-white font-bold rounded-xl shadow-[0_4px_0_0_#1cb0f6] hover:bg-blue-500 transition-colors text-sm"
              >
                + Unirse a una Clase
              </button>
            </header>

            {isEnrollingNew && (
              <form onSubmit={handleEnroll} className="p-6 bg-white border-2 border-brand-blue rounded-2xl shadow-sm flex flex-col md:flex-row gap-3 items-center">
                <input 
                  type="text" 
                  placeholder="Ingresa el código del aula dado por tu profesor..." 
                  required 
                  className="flex-1 w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue font-medium"
                  value={classCode} 
                  onChange={(e) => setClassCode(e.target.value)} 
                />
                <div className="flex gap-2 w-full md:w-auto">
                  <button type="button" onClick={() => setIsEnrollingNew(false)} className="px-4 py-3 text-sm font-bold text-zinc-500 hover:bg-zinc-100 rounded-xl">Cancelar</button>
                  <button type="submit" disabled={isEnrolling} className="flex-1 md:flex-none px-6 py-3 bg-brand-blue text-white font-bold rounded-xl shadow-[0_4px_0_0_#1cb0f6]">
                    {isEnrolling ? 'Uniendo...' : 'Unirme'}
                  </button>
                </div>
              </form>
            )}

            {classrooms.length === 0 ? (
              <div className="p-12 bg-white border-2 border-dashed border-zinc-200 rounded-[28px] text-center">
                <span className="text-5xl block mb-3">🎒</span>
                <h3 className="text-xl font-bold text-gray-800">No estás inscrito en ninguna materia</h3>
                <p className="text-sm text-zinc-500 mt-1">Usa el botón de arriba para ingresar el código de tu profesor.</p>
              </div>
            ) : (
              <div className="space-y-8">
                
                {/* SELECTOR HORIZONTAL DE CLASES */}
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {classrooms.map((cls) => {
                    const isSelected = cls.id === (currentSelectedClass?.id);
                    return (
                      <button
                        key={cls.id}
                        onClick={() => setSelectedClassId(cls.id)}
                        className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-bold text-sm transition-all shrink-0 ${
                          isSelected 
                            ? 'bg-white shadow-md border-2 border-brand-blue text-brand-blue' 
                            : 'bg-white/60 border border-zinc-200 text-zinc-600 hover:bg-white'
                        }`}
                      >
                        <span className={`size-3 rounded-full ${cls.stripeColor || 'bg-brand-blue'}`} />
                        <span>{cls.title}</span>
                      </button>
                    );
                  })}
                </div>

                {currentSelectedClass && (
                  <div className="bg-white border-2 border-zinc-200 rounded-[28px] overflow-hidden shadow-sm">
                    {/* BANNER DE LA CLASE */}
                    <div className={`p-8 text-white ${currentSelectedClass.stripeColor || 'bg-brand-blue'} relative`}>
                      <h2 className="text-3xl font-extrabold">{currentSelectedClass.title}</h2>
                      <p className="text-white/80 font-medium text-sm mt-1">{currentSelectedClass.section} • Prof. {currentSelectedClass.teacher?.name}</p>
                    </div>

                    <div className="p-8 space-y-8">
                      {/* PENDIENTES */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                          <Clock className="text-brand-orange size-5" /> Tareas y Quizzes Pendientes
                        </h3>

                        {(() => {
                          const pendingTasks = (currentSelectedClass.assignments || []).filter(
                            (a: any) => !a.submissions?.some((sub: any) => sub.studentId === userProfile?.id)
                          );
                          const pendingQuizzes = (currentSelectedClass.cuts || []).flatMap((cut: any) => cut.quizzes || []).filter(
                            (q: any) => !q.attempts?.some((att: any) => att.studentId === userProfile?.id)
                          );

                          if (pendingTasks.length === 0 && pendingQuizzes.length === 0) {
                            return (
                              <div className="p-6 bg-brand-green/10 border border-brand-green/20 rounded-2xl flex items-center gap-4 text-brand-green">
                                <CheckCircle2 className="size-8 shrink-0" />
                                <div>
                                  <h4 className="font-bold text-base">¡Estás al día en esta materia! 🎉</h4>
                                  <p className="text-xs font-medium opacity-90">Has completado todas las entregas y quizzes asignados por tu profesor.</p>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div className="space-y-3">
                              {pendingTasks.map((task: any) => (
                                <div key={task.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl flex justify-between items-center hover:border-brand-blue transition-colors">
                                  <div className="flex items-center gap-3">
                                    <div className="grid size-10 place-items-center bg-brand-blue/10 text-brand-blue rounded-xl">
                                      <FileText className="size-5" />
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-gray-800 text-sm">{task.title}</h4>
                                      <p className="text-xs text-zinc-400">Tarea Tradicional • {task.dueDate ? `Entrega: ${new Date(task.dueDate).toLocaleDateString()}` : 'Sin límite'}</p>
                                    </div>
                                  </div>
                                  <button onClick={() => setActiveTask(task)} className="px-4 py-2 bg-brand-blue text-white font-bold text-xs rounded-xl shadow-[0_3px_0_0_#1cb0f6]">
                                    Entregar Tarea
                                  </button>
                                </div>
                              ))}

                              {pendingQuizzes.map((quiz: any) => (
                                <div key={quiz.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl flex justify-between items-center hover:border-brand-green transition-colors">
                                  <div className="flex items-center gap-3">
                                    <div className="grid size-10 place-items-center bg-brand-green/10 text-brand-green rounded-xl">
                                      <Zap className="size-5" />
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-gray-800 text-sm">{quiz.title}</h4>
                                      <p className="text-xs text-brand-green font-bold">Quiz Gamificado • +{quiz.xpReward} XP</p>
                                    </div>
                                  </div>
                                  <button onClick={() => setActiveQuiz(quiz)} className="px-4 py-2 bg-brand-green text-white font-bold text-xs rounded-xl shadow-[0_3px_0_0_#46a302]">
                                    Resolver Quiz
                                  </button>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>

                      {/* ACTIVIDADES COMPLETADAS */}
                      <div className="pt-6 border-t border-zinc-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                          <CheckCircle2 className="text-brand-green size-5" /> Actividades Completadas
                        </h3>

                        {(() => {
                          const doneTasks = (currentSelectedClass.assignments || []).filter(
                            (a: any) => a.submissions?.some((sub: any) => sub.studentId === userProfile?.id)
                          );
                          const doneQuizzes = (currentSelectedClass.cuts || []).flatMap((cut: any) => cut.quizzes || []).filter(
                            (q: any) => q.attempts?.some((att: any) => att.studentId === userProfile?.id)
                          );

                          if (doneTasks.length === 0 && doneQuizzes.length === 0) {
                            return <p className="text-xs text-zinc-400 italic">No has entregado actividades en esta clase todavía.</p>;
                          }

                          return (
                            <div className="space-y-3">
                              {doneTasks.map((task: any) => {
                                const sub = task.submissions.find((s: any) => s.studentId === userProfile?.id);
                                return (
                                  <div key={task.id} className="p-4 bg-zinc-100/60 border border-zinc-200 rounded-2xl flex justify-between items-center opacity-80">
                                    <div className="flex items-center gap-3">
                                      <CheckCircle2 className="size-5 text-brand-green shrink-0" />
                                      <div>
                                        <h4 className="font-bold text-gray-800 text-sm line-through">{task.title}</h4>
                                        <p className="text-xs text-zinc-400">Entregado el {new Date(sub.submittedAt).toLocaleDateString()}</p>
                                      </div>
                                    </div>
                                    <span className="text-xs font-bold text-brand-green bg-brand-green/10 px-3 py-1 rounded-lg">
                                      {sub.grade !== null ? `Nota: ${sub.grade} pts` : 'Entregado'}
                                    </span>
                                  </div>
                                );
                              })}

                              {doneQuizzes.map((quiz: any) => {
                                const att = quiz.attempts.find((a: any) => a.studentId === userProfile?.id);
                                return (
                                  <div key={quiz.id} className="p-4 bg-zinc-100/60 border border-zinc-200 rounded-2xl flex justify-between items-center opacity-80">
                                    <div className="flex items-center gap-3">
                                      <CheckCircle2 className="size-5 text-brand-green shrink-0" />
                                      <div>
                                        <h4 className="font-bold text-gray-800 text-sm line-through">{quiz.title}</h4>
                                        <p className="text-xs text-zinc-400">Quiz resuelto • +{att.xpEarned} XP ganados</p>
                                      </div>
                                    </div>
                                    <span className="text-xs font-bold text-brand-green bg-brand-green/10 px-3 py-1 rounded-lg">
                                      {att.score} pts
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })()}
                      </div>

                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= PESTAÑA 3: QUIZZES (MODO JUEGO / PROGRESS MAP) ================= */}
        {activeStudentTab === 'quizzes' && (
          <div className="animate-in fade-in space-y-8">
            <header className="flex flex-wrap justify-between items-end gap-4">
              <div>
                <h1 className="text-3xl font-bold leading-tight tracking-tight">
                  Modo <span className="text-brand-green">Juego y Quizzes</span> 🎮
                </h1>
                <p className="text-zinc-500 font-medium mt-1">
                  Mantiene tu racha viva, sube de nivel y desbloquea el árbol de conocimientos.
                </p>
              </div>

              {/* LEVEL BADGE */}
              <div className="bg-white px-5 py-3 rounded-2xl border-2 border-brand-green shadow-xs flex items-center gap-3">
                <Zap className="size-6 text-brand-green fill-current" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Nivel de Juego</p>
                  <p className="text-lg font-extrabold text-brand-green leading-none">Nivel {currentLevel}</p>
                </div>
              </div>
            </header>

            {/* TRACKER DE RACHA SEMANAL (LUNES - DOMINGO) */}
            <div className="bg-white border-2 border-zinc-200 rounded-[28px] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <Flame className="size-7 text-brand-orange" strokeWidth={2.5} />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Racha Actual: {currentStreak} Días</h3>
                    <p className="text-xs text-zinc-500">Resuelve al menos 1 quiz cada día para no romper tu racha.</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  🔥 ¡Estás en fuego!
                </span>
              </div>

              <div className="grid grid-cols-7 gap-2 pt-2">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, idx) => {
                  const isDayActive = idx < (currentStreak % 7 || 1);
                  return (
                    <div key={day} className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all ${isDayActive ? 'bg-brand-orange/10 border-brand-orange text-brand-orange font-bold' : 'bg-zinc-50 border-zinc-200 text-zinc-400'}`}>
                      <Flame className={`size-5 mb-1 ${isDayActive ? 'fill-current' : ''}`} />
                      <span className="text-xs">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BARRA DE PROGRESO DE NIVEL */}
            <div className="bg-white border-2 border-zinc-200 rounded-[28px] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-800">Progreso a Nivel {currentLevel + 1}</span>
                <span className="text-xs font-bold text-brand-green">{currentXP} / {nextLevelXP} XP</span>
              </div>
              <div className="h-4 bg-zinc-100 rounded-full overflow-hidden p-0.5 border border-zinc-200">
                <div className="h-full bg-brand-green rounded-full transition-all duration-500" style={{ width: `${levelProgress}%` }} />
              </div>
            </div>

            {/* ÁRBOL DE QUIZZES DISPONIBLES COMO NIVELES */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Gamepad2 className="text-brand-green size-6" /> Misiones y Niveles Gamificados
              </h3>

              {classrooms.length === 0 ? (
                <div className="p-8 bg-white border-2 border-dashed border-zinc-200 rounded-2xl text-center">
                  <p className="text-sm text-zinc-500 font-medium">Inscríbete en aulas para desbloquear mapas de quizzes.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {classrooms.flatMap((c) => 
                    (c.cuts || []).flatMap((cut: any) => 
                      (cut.quizzes || []).map((qz: any) => {
                        const isCompleted = qz.attempts?.some((att: any) => att.studentId === userProfile?.id);
                        return (
                          <div key={qz.id} className={`p-6 rounded-[24px] border-2 transition-all ${isCompleted ? 'bg-zinc-50 border-zinc-200 opacity-90' : 'bg-white border-brand-green/30 hover:border-brand-green shadow-sm'}`}>
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-3">
                                <div className={`grid size-12 place-items-center rounded-2xl ${isCompleted ? 'bg-zinc-200 text-zinc-500' : 'bg-brand-green text-white shadow-sm'}`}>
                                  {isCompleted ? <Check className="size-6 stroke-[3]" /> : <Zap className="size-6 fill-current" />}
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-800 text-base">{qz.title}</h4>
                                  <p className="text-xs text-zinc-500">{c.title} • {cut.name}</p>
                                </div>
                              </div>
                              <span className="text-xs font-extrabold text-brand-green bg-brand-green/10 px-3 py-1 rounded-lg">
                                +{qz.xpReward} XP
                              </span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                              <span className="text-xs text-zinc-400 font-medium">
                                {qz.questions?.length || 0} Pregunta(s)
                              </span>
                              {isCompleted ? (
                                <span className="flex items-center gap-1 text-xs font-bold text-brand-green bg-brand-green/10 px-3 py-1.5 rounded-xl">
                                  ⭐ Completado
                                </span>
                              ) : (
                                <button onClick={() => setActiveQuiz(qz)} className="px-5 py-2 bg-brand-green text-white font-bold text-xs rounded-xl shadow-[0_3px_0_0_#46a302] hover:bg-green-600">
                                  ¡JUGAR QUIZ!
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )
                  )}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= PESTAÑA 4: LOGROS (SISTEMA ESTILO STEAM) ================= */}
        {activeStudentTab === 'logros' && (
          <div className="animate-in fade-in space-y-8">
            <header className="flex flex-wrap justify-between items-end gap-4">
              <div>
                <h1 className="text-3xl font-bold leading-tight tracking-tight">
                  Sistema de <span className="text-brand-orange">Logros Steam</span> 🏆
                </h1>
                <p className="text-zinc-500 font-medium mt-1">
                  Desbloquea insignias completando entregas, manteniendo tu racha y dominando la tabla de posiciones.
                </p>
              </div>

              <div className="bg-white px-5 py-3 rounded-2xl border-2 border-brand-orange shadow-xs text-right">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Progreso Total</p>
                <p className="text-lg font-extrabold text-brand-orange leading-none">{unlockedCount} de {totalAchievements} ({achievementPercentage}%)</p>
              </div>
            </header>

            {/* BARRA DE PROGRESO DE LOGROS */}
            <div className="bg-white border-2 border-zinc-200 rounded-[28px] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-800">Insignias Desbloqueadas</span>
                <span className="text-xs font-bold text-brand-orange">{achievementPercentage}% Completado</span>
              </div>
              <div className="h-4 bg-zinc-100 rounded-full overflow-hidden p-0.5 border border-zinc-200">
                <div className="h-full bg-brand-orange rounded-full transition-all duration-500" style={{ width: `${achievementPercentage}%` }} />
              </div>
            </div>

            {/* FILTROS DE LOGROS */}
            <div className="flex gap-2 border-b border-zinc-200 pb-4">
              {[
                { id: 'all', label: `Todos (${totalAchievements})` },
                { id: 'unlocked', label: `Desbloqueados (${unlockedCount})` },
                { id: 'locked', label: `Bloqueados (${totalAchievements - unlockedCount})` }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setAchievementFilter(f.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    achievementFilter === f.id ? 'bg-brand-orange text-white shadow-xs' : 'bg-white text-zinc-500 border border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* GRID DE LOGROS ESTILO STEAM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredAchievements.map((ach) => {
                const Icon = ach.icon;
                return (
                  <div key={ach.id} className={`p-6 rounded-[24px] border-2 transition-all flex items-start gap-4 ${ach.unlocked ? 'bg-white border-zinc-200 shadow-sm' : 'bg-zinc-100/60 border-zinc-200 opacity-60 grayscale'}`}>
                    <div className={`grid size-14 place-items-center rounded-2xl border-2 shrink-0 ${ach.unlocked ? ach.tone : 'bg-zinc-200 border-zinc-300 text-zinc-400'}`}>
                      <Icon className="size-7" strokeWidth={2.5} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-gray-800 text-base">{ach.title}</h4>
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${ach.unlocked ? 'bg-green-50 border-green-200 text-green-700' : 'bg-zinc-200 border-zinc-300 text-zinc-500'}`}>
                          {ach.tier}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1 font-medium">{ach.description}</p>

                      <div className="mt-4 pt-3 border-t border-zinc-100 flex justify-between items-center text-xs">
                        <span className="font-bold text-zinc-400">Progreso: {ach.progress}</span>
                        {ach.unlocked ? (
                          <span className="font-bold text-brand-green flex items-center gap-1">
                            <CheckCircle2 className="size-4" /> Desbloqueado
                          </span>
                        ) : (
                          <span className="font-bold text-zinc-400 flex items-center gap-1">
                            <Lock className="size-3" /> Bloqueado
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </main>

      {/* ================= BARRA DERECHA (DATOS REALES) ================= */}
      <aside className="hidden xl:flex w-80 shrink-0 flex-col gap-6 overflow-y-auto border-l border-zinc-950/5 bg-brand-paper p-6">
        
        {/* Racha y XP REAL */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5 shadow-sm">
            <Flame className="size-6 text-brand-orange" strokeWidth={2.5} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Racha</p>
              <p className="text-lg font-bold leading-tight">{userProfile?.streak || 0} días</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5 shadow-sm">
            <Zap className="size-6 text-brand-blue" strokeWidth={2.5} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">XP Total</p>
              <p className="text-lg font-bold leading-tight">{currentXP}</p>
            </div>
          </div>
        </div>

        {/* Progreso Semanal REAL */}
        <div className="rounded-[24px] bg-white p-6 ring-1 ring-black/5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-800">Progreso Semanal</h4>
            <Target className="size-4 text-zinc-400" />
          </div>
          <div className="relative grid place-items-center py-2">
            <ProgressRing percent={progressPercent} />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold leading-none text-gray-800">{progressPercent}%</span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Meta</span>
            </div>
          </div>
          <p className="mt-4 text-pretty text-center text-xs font-medium text-zinc-500">
            {xpRemaining > 0 ? (
              <>Estás a solo <strong className="text-brand-green font-bold">{xpRemaining} XP</strong> de completar tu meta semanal.</>
            ) : (
              <strong className="text-brand-green font-bold">¡Meta semanal completada! 🎉</strong>
            )}
          </p>
        </div>

        {/* Leaderboard REAL */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-800">Liga Diamante</h4>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-500">Global</span>
          </div>
          <div className="space-y-2">
            {leaderboardData.map((row: any, index: number) => {
              const isMe = row.id === userProfile?.id;
              return (
                <div key={row.id}
                  className={`flex items-center justify-between rounded-xl p-2.5 ${
                    isMe ? "bg-brand-green/10 ring-1 ring-inset ring-brand-green/30" : "bg-white ring-1 ring-black/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-4 text-xs font-bold ${isMe ? "text-brand-green" : "text-zinc-400"}`}>{index + 1}</span>
                    <div className={`grid size-8 place-items-center rounded-full text-[10px] font-bold ${isMe ? "bg-brand-green text-white shadow-sm" : "bg-zinc-100 text-zinc-500"}`}>
                      {row.alias?.slice(0, 2).toUpperCase()}
                    </div>
                    <span className={`text-sm text-gray-800 ${isMe ? "font-bold" : "font-medium"}`}>{row.alias}</span>
                  </div>
                  <span className={`text-xs font-bold tabular-nums ${isMe ? "text-brand-green" : "text-gray-600"}`}>
                    {row.xpTotal.toLocaleString("es")} XP
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </aside>
    </div>
  );
};

function ProgressRing({ percent }: { percent: number }) {
  const size = 128;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);
  return (
    <svg width={size} height={size} className="-rotate-90 drop-shadow-sm">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--color-brand-paper)" strokeWidth={stroke} fill="none" className="[stroke:theme(colors.zinc.200)]" />
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--color-brand-green)" strokeWidth={stroke} strokeLinecap="round" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
    </svg>
  );
}