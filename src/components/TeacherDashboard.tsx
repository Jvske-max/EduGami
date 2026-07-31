import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { getCurrentProfile } from '../services/auth.service';
import { getMyClassrooms, createClassroom, updateClassroom, deleteClassroom } from '../services/classroom.service';
import { createAssignment, gradeSubmission } from '../services/assignment.service';
import { createQuiz } from '../services/quiz.service';
import {
  BookOpen, Zap, Plus, LogOut, Users, Settings, Activity, Search, Bell, Copy,
  CheckCircle2, Edit, Trash2, ExternalLink, ChevronRight, X, FileText, Award,
  Check, Filter, Clock, Sparkles
} from "lucide-react";

export const TeacherDashboard = () => {
  const navigate = useNavigate();
  
  // Estado de Navegación por Pestañas
  const [activeTab, setActiveTab] = useState<'principal' | 'aulas' | 'estudiantes' | 'configuracion'>('principal');

  // Estados Generales de Datos
  const [userProfile, setUserProfile] = useState<any>(null);
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Pestaña "Mis Aulas": Aula seleccionada
  const [selectedClassroomId, setSelectedClassroomId] = useState<string | null>(null);

  // Modal para Calificar Entrega
  const [gradingSubmission, setGradingSubmission] = useState<any>(null);
  const [gradeForm, setGradeForm] = useState({ grade: '', feedback: '' });
  const [isGrading, setIsGrading] = useState(false);

  // Estados para Creación de Aula
  const [isCreating, setIsCreating] = useState(false);
  const [newClass, setNewClass] = useState({ title: '', section: '', stripeColor: 'bg-brand-blue' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para Creación de Tarea
  const [isCreatingAssignment, setIsCreatingAssignment] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '', description: '', classroomId: '', academicCutId: '', dueDate: ''
  });
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);

  // Estados para Creación de Quiz
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: '', classroomId: '', academicCutId: '', xpReward: 40,
    questionText: '', correctOption: '', wrongOption: ''
  });
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);

  // Pestaña "Configuración": Edición y Eliminación de Aula
  const [editingClassroom, setEditingClassroom] = useState<any>(null);
  const [deletingClassroom, setDeletingClassroom] = useState<any>(null);
  const [isUpdatingClass, setIsUpdatingClass] = useState(false);
  const [isDeletingClass, setIsDeletingClass] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('edugami_token');
    localStorage.removeItem('edugami_role');
    navigate({ to: '/login' });
  };

  const loadDashboardData = async () => {
    try {
      const profileData = await getCurrentProfile();
      setUserProfile(profileData.user);
      const classData = await getMyClassrooms();
      const list = classData.classrooms || [];
      setClassrooms(list);

      // Si no hay aula seleccionada previamente y hay aulas disponibles, seleccionar la primera
      if (list.length > 0 && !selectedClassroomId) {
        setSelectedClassroomId(list[0].id);
      }
    } catch (error) {
      console.error("Error al cargar datos del profesor", error);
      handleLogout();
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
      if (role === 'STUDENT') {
        navigate({ to: '/dashboard' });
        return;
      }
    }
    loadDashboardData();
  }, []);

  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // HANDLERS DE CREACIÓN
  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createClassroom(newClass);
      await loadDashboardData(); 
      setIsCreating(false);
      setNewClass({ title: '', section: '', stripeColor: 'bg-brand-blue' });
    } catch (error) {
      alert("Error al crear el aula. Verifica los datos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingTask(true);
    try {
      await createAssignment(newAssignment);
      await loadDashboardData();
      alert("¡Tarea asignada exitosamente!");
      setIsCreatingAssignment(false);
      setNewAssignment({ title: '', description: '', classroomId: '', academicCutId: '', dueDate: '' });
    } catch (error) {
      alert("Error al crear la tarea. Verifica los datos.");
    } finally {
      setIsSubmittingTask(false);
    }
  };

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingQuiz(true);
    try {
      const payload = {
        title: newQuiz.title,
        xpReward: Number(newQuiz.xpReward),
        academicCutId: newQuiz.academicCutId,
        questions: [
          {
            text: newQuiz.questionText,
            options: [
              { text: newQuiz.correctOption, isCorrect: true },
              { text: newQuiz.wrongOption, isCorrect: false }
            ]
          }
        ]
      };
      await createQuiz(payload);
      await loadDashboardData();
      alert("¡Quiz gamificado creado con éxito!");
      setIsCreatingQuiz(false);
      setNewQuiz({ title: '', classroomId: '', academicCutId: '', xpReward: 40, questionText: '', correctOption: '', wrongOption: '' });
    } catch (error) {
      alert("Error al crear el quiz.");
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  // HANDLER DE CALIFICACIÓN DE ENTREGAS
  const handleGradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSubmission) return;
    setIsGrading(true);
    try {
      await gradeSubmission(gradingSubmission.id, {
        grade: Number(gradeForm.grade),
        feedback: gradeForm.feedback
      });
      await loadDashboardData();
      alert("¡Calificación y retroalimentación guardadas con éxito!");
      setGradingSubmission(null);
      setGradeForm({ grade: '', feedback: '' });
    } catch (error) {
      alert("Error al calificar la entrega.");
    } finally {
      setIsGrading(false);
    }
  };

  // HANDLERS DE CONFIGURACIÓN (EDITAR Y ELIMINAR AULA)
  const handleUpdateClassroom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClassroom) return;
    setIsUpdatingClass(true);
    try {
      await updateClassroom(editingClassroom.id, {
        title: editingClassroom.title,
        section: editingClassroom.section,
        stripeColor: editingClassroom.stripeColor
      });
      await loadDashboardData();
      alert("¡Aula actualizada exitosamente!");
      setEditingClassroom(null);
    } catch (error) {
      alert("Error al actualizar el aula.");
    } finally {
      setIsUpdatingClass(false);
    }
  };

  const handleDeleteClassroom = async () => {
    if (!deletingClassroom) return;
    setIsDeletingClass(true);
    try {
      await deleteClassroom(deletingClassroom.id);
      await loadDashboardData();
      alert("Aula eliminada con éxito.");
      setDeletingClassroom(null);
      if (selectedClassroomId === deletingClassroom.id) {
        setSelectedClassroomId(null);
      }
    } catch (error) {
      alert("Error al eliminar el aula.");
    } finally {
      setIsDeletingClass(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 min-h-screen bg-brand-cream flex justify-center items-center">
        <p className="text-2xl font-bold text-brand-orange animate-pulse">Cargando Centro de Comando... ⚙️</p>
      </div>
    );
  }

  // AULA SELECCIONADA PARA PESTAÑA "MIS AULAS"
  const currentSelectedClassroom = classrooms.find(c => c.id === selectedClassroomId) || classrooms[0];

  // CÁLCULO DE ESTUDIANTES ÚNICOS Y NOTA ACUMULADA PARA LA PESTAÑA "ESTUDIANTES"
  const studentDirectory: Array<{
    student: any;
    classroomTitle: string;
    section: string;
    submissionsCount: number;
    quizzesCompleted: number;
    accumulatedGrade: number;
  }> = [];

  classrooms.forEach((cls) => {
    (cls.students || []).forEach((st: any) => {
      // Calcular tareas entregadas por el estudiante en este aula
      let gradedSum = 0;
      let gradedCount = 0;
      let submissionsCount = 0;

      (cls.assignments || []).forEach((asg: any) => {
        const sub = (asg.submissions || []).find((s: any) => s.studentId === st.id);
        if (sub) {
          submissionsCount++;
          if (sub.grade !== null && sub.grade !== undefined) {
            gradedSum += Number(sub.grade);
            gradedCount++;
          }
        }
      });

      // Calcular quizzes completados
      let quizzesCompleted = 0;
      (cls.cuts || []).forEach((cut: any) => {
        (cut.quizzes || []).forEach((qz: any) => {
          const att = (qz.attempts || []).find((a: any) => a.studentId === st.id);
          if (att) {
            quizzesCompleted++;
          }
        });
      });

      const accumulatedGrade = gradedCount > 0 ? Number((gradedSum / gradedCount).toFixed(1)) : 0;

      studentDirectory.push({
        student: st,
        classroomTitle: cls.title,
        section: cls.section,
        submissionsCount,
        quizzesCompleted,
        accumulatedGrade
      });
    });
  });

  const filteredStudents = studentDirectory.filter(item => 
    item.student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.student.alias?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.classroomTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedClassForTask = classrooms.find(c => c.id === newAssignment.classroomId);

  return (
    <div className="flex flex-col lg:flex-row h-screen lg:h-screen w-full bg-brand-cream font-sans text-zinc-900 selection:bg-brand-orange/20 overflow-hidden relative">
      
      {/* ================= HEADER MÓVIL ================= */}
      <header className="flex lg:hidden items-center justify-between border-b border-zinc-200 bg-brand-paper px-4 py-3 shrink-0 z-30 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="grid size-8 place-items-center rounded-xl bg-brand-orange shadow-[0_2px_0_0_#cc7800]">
            <Zap className="size-4 text-white" strokeWidth={3} />
          </div>
          <span className="text-lg font-bold tracking-tight text-zinc-900">
            EduGami <span className="text-xs text-brand-orange font-bold">Profe</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold text-brand-orange">
            <span>Prof. {userProfile?.alias || 'Docente'}</span>
          </div>
          <button onClick={handleLogout} className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors" title="Cerrar Sesión">
            <LogOut className="size-5" />
          </button>
        </div>
      </header>

      {/* ================= MODAL CALIFICAR ENTREGA ================= */}
      {gradingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-[94vw] max-w-md rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 shadow-2xl relative max-h-[90dvh] overflow-y-auto">
            <button onClick={() => setGradingSubmission(null)} className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700">
              <X className="size-5" />
            </button>
            <div className="grid size-12 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue mb-4">
              <Award className="size-6" strokeWidth={2.5} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Calificar Entrega</h2>
            <p className="text-sm font-bold text-brand-blue mb-1">{gradingSubmission.assignmentTitle}</p>
            <p className="text-xs text-zinc-500 mb-4">Estudiante: <strong>{gradingSubmission.studentName}</strong></p>

            {gradingSubmission.contentUrl && (
              <a 
                href={gradingSubmission.contentUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue bg-blue-50 px-3 py-2 rounded-xl mb-6 hover:bg-blue-100 transition-colors w-full justify-center"
              >
                <ExternalLink className="size-4" /> Ver Archivo / Trabajo Entregado
              </a>
            )}
            
            <form onSubmit={handleGradeSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Nota (Escala 0 - 20 pts)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="20" 
                  step="0.5" 
                  required 
                  placeholder="Ej. 18.5" 
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100 font-medium"
                  value={gradeForm.grade} 
                  onChange={(e) => setGradeForm({...gradeForm, grade: e.target.value})} 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Retroalimentación / Comentarios</label>
                <textarea 
                  rows={3} 
                  placeholder="Excelente trabajo, bien estructurado..." 
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100 font-medium"
                  value={gradeForm.feedback} 
                  onChange={(e) => setGradeForm({...gradeForm, feedback: e.target.value})} 
                />
              </div>

              <button 
                type="submit" 
                disabled={isGrading} 
                className="tactile w-full py-3.5 font-bold text-white bg-brand-blue rounded-xl shadow-[0_4px_0_0_#1cb0f6] hover:bg-blue-500 disabled:opacity-50 mt-2"
              >
                {isGrading ? 'Guardando...' : 'Guardar Calificación'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL EDITAR AULA ================= */}
      {editingClassroom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-[94vw] max-w-md rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 shadow-2xl relative max-h-[90dvh] overflow-y-auto">
            <button onClick={() => setEditingClassroom(null)} className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-700">
              <X className="size-5" />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Edit className="text-brand-orange size-6" /> Modificar Aula
            </h2>

            <form onSubmit={handleUpdateClassroom} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Nombre de la Materia</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-orange font-medium"
                  value={editingClassroom.title} 
                  onChange={(e) => setEditingClassroom({...editingClassroom, title: e.target.value})} 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Sección / Turno</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-orange font-medium"
                  value={editingClassroom.section} 
                  onChange={(e) => setEditingClassroom({...editingClassroom, section: e.target.value})} 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">Color del Aula</label>
                <div className="flex gap-3">
                  {['bg-brand-blue', 'bg-brand-green', 'bg-brand-orange', 'bg-brand-purple', 'bg-red-500'].map((color) => (
                    <button 
                      key={color} 
                      type="button" 
                      onClick={() => setEditingClassroom({...editingClassroom, stripeColor: color})} 
                      className={`size-8 rounded-full ${color} transition-transform ${editingClassroom.stripeColor === color ? 'scale-125 ring-4 ring-offset-2 ring-zinc-200' : 'hover:scale-110'}`} 
                    />
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isUpdatingClass} 
                className="tactile w-full py-3.5 font-bold text-white bg-brand-orange rounded-xl shadow-[0_4px_0_0_#cc7800] hover:bg-orange-600 disabled:opacity-50 mt-4"
              >
                {isUpdatingClass ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL ELIMINAR AULA ================= */}
      {deletingClassroom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-[94vw] max-w-md rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 shadow-2xl relative text-center max-h-[90dvh] overflow-y-auto">
            <div className="grid size-14 place-items-center rounded-full bg-red-100 text-red-600 mx-auto mb-4">
              <Trash2 className="size-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">¿Eliminar Aula?</h2>
            <p className="text-sm text-zinc-600 mb-6">
              Estás a punto de eliminar el aula <strong>"{deletingClassroom.title}"</strong> ({deletingClassroom.section}). Esta acción borrará todas sus tareas, quizzes y registros de forma permanente.
            </p>

            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => setDeletingClassroom(null)} 
                className="flex-1 py-3 font-bold text-zinc-600 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="button" 
                onClick={handleDeleteClassroom} 
                disabled={isDeletingClass} 
                className="flex-1 py-3 font-bold text-white bg-red-600 rounded-xl shadow-[0_4px_0_0_#b91c1c] hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {isDeletingClass ? 'Eliminando...' : 'Sí, Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= BARRA LATERAL ESCRITORIO ================= */}
      <nav className="hidden lg:flex w-64 flex-col border-r border-zinc-950/5 bg-brand-paper p-4 shrink-0">
        <div className="mb-8 px-4 py-6">
          <div className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-xl bg-brand-orange shadow-[0_3px_0_0_#cc7800]">
              <Zap className="size-5 text-white" strokeWidth={3} />
            </div>
            <span className="text-xl font-bold tracking-tight">EduGami <span className="text-sm font-medium text-brand-orange">Profe</span></span>
          </div>
        </div>
        
        <div className="flex-1 space-y-1">
          {[
            { id: 'principal', icon: Activity, label: "Panel Principal" },
            { id: 'aulas', icon: BookOpen, label: "Mis Aulas" },
            { id: 'estudiantes', icon: Users, label: "Estudiantes" },
            { id: 'configuracion', icon: Settings, label: "Configuración" },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  isActive ? "bg-brand-orange/10 text-brand-orange ring-1 ring-brand-orange/30" : "text-zinc-500 hover:bg-zinc-950/5"
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
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-orange/20 text-sm font-bold text-brand-orange">
              {userProfile?.alias?.substring(0, 2).toUpperCase() || 'PR'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-gray-800">Prof. {userProfile?.alias || 'Docente'}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Docente Activo
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
        {[
          { id: 'principal', icon: Activity, label: "Panel" },
          { id: 'aulas', icon: BookOpen, label: "Aulas" },
          { id: 'estudiantes', icon: Users, label: "Alumnos" },
          { id: 'configuracion', icon: Settings, label: "Config" },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                isActive ? "text-brand-orange font-bold scale-105" : "text-zinc-500 hover:text-zinc-800"
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
        
        {/* Top bar de búsqueda */}
        <div className="mb-6 lg:mb-8 flex items-center justify-between gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Buscar por estudiante, materia o entrega..."
              className="w-full rounded-xl border border-zinc-950/5 bg-white py-2.5 pl-9 pr-3 text-sm outline-none ring-brand-orange/30 transition placeholder:text-zinc-400 focus:ring-2 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="tactile grid size-10 place-items-center rounded-xl bg-white text-zinc-600 shadow-black/10 ring-1 ring-black/5 hover:text-brand-orange">
            <Bell className="size-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* ================= PESTAÑA 1: PANEL PRINCIPAL ================= */}
        {activeTab === 'principal' && (
          <div className="animate-in fade-in">
            <header className="mb-8 flex justify-between items-end">
              <div>
                <h1 className="mb-2 text-3xl font-bold leading-tight tracking-tight text-balance">
                  ¡Hola, <span className="text-brand-orange">Prof. {userProfile?.alias}</span>! 👨‍🏫
                </h1>
                <p className="max-w-[56ch] text-pretty text-zinc-500 font-medium">
                  Bienvenido al Centro de Comando. Diseña actividades y monitorea el rendimiento académico.
                </p>
              </div>
              
              <button 
                onClick={() => { setIsCreating(!isCreating); setIsCreatingAssignment(false); setIsCreatingQuiz(false); }}
                className="tactile inline-flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white shadow-[0_4px_0_0_#cc7800] transition-colors hover:bg-orange-600"
              >
                <Plus className="size-4" strokeWidth={3} />
                {isCreating ? 'Cancelar' : 'Nueva Aula'}
              </button>
            </header>

            {/* FORMULARIOS DE CREACIÓN RÁPIDA */}
            {isCreatingAssignment && (
              <form onSubmit={handleCreateAssignment} className="mb-10 p-8 bg-white border-2 border-brand-blue/20 rounded-[28px] shadow-sm animate-in fade-in slide-in-from-top-4">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Activity className="text-brand-blue" /> Asignar Nueva Tarea
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Título de la Tarea</label>
                    <input type="text" required placeholder="Ej. Ensayo sobre Modelo OSI" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue font-medium" value={newAssignment.title} onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Fecha Límite</label>
                    <input type="date" required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue font-medium text-zinc-600" value={newAssignment.dueDate} onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Aula Destino</label>
                    <select required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue font-medium" value={newAssignment.classroomId} onChange={(e) => setNewAssignment({...newAssignment, classroomId: e.target.value, academicCutId: ''})}>
                      <option value="" disabled>Selecciona un aula...</option>
                      {classrooms.map(c => (
                        <option key={c.id} value={c.id}>{c.title} ({c.section})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Corte Académico</label>
                    <select required disabled={!newAssignment.classroomId} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue font-medium disabled:opacity-50" value={newAssignment.academicCutId} onChange={(e) => setNewAssignment({...newAssignment, academicCutId: e.target.value})}>
                      <option value="" disabled>Selecciona el corte...</option>
                      {selectedClassForTask?.cuts?.map((cut: any) => (
                        <option key={cut.id} value={cut.id}>{cut.name} ({cut.weight}%)</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Instrucciones (Opcional)</label>
                  <textarea placeholder="Detalla lo que el estudiante debe hacer..." rows={3} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue font-medium" value={newAssignment.description} onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})} />
                </div>
                
                <button type="submit" disabled={isSubmittingTask || !newAssignment.academicCutId} className="tactile px-8 py-3 font-bold text-white bg-brand-blue rounded-xl shadow-[0_4px_0_0_#1cb0f6] hover:bg-blue-500 disabled:opacity-50">
                  {isSubmittingTask ? 'Publicando...' : 'Publicar Tarea'}
                </button>
              </form>
            )}

            {isCreatingQuiz && (
              <form onSubmit={handleCreateQuiz} className="mb-10 p-8 bg-white border-2 border-brand-green/20 rounded-[28px] shadow-sm animate-in fade-in slide-in-from-top-4">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Zap className="text-brand-green" /> Diseñar Nuevo Quiz
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Título del Quiz</label>
                    <input type="text" required placeholder="Ej. Control de Lectura 1" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-green font-medium" value={newQuiz.title} onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Recompensa (XP)</label>
                    <input type="number" required min="10" step="10" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-green font-medium text-brand-green" value={newQuiz.xpReward} onChange={(e) => setNewQuiz({...newQuiz, xpReward: Number(e.target.value)})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Aula Destino</label>
                    <select required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-green font-medium" value={newQuiz.classroomId} onChange={(e) => setNewQuiz({...newQuiz, classroomId: e.target.value, academicCutId: ''})}>
                      <option value="" disabled>Selecciona un aula...</option>
                      {classrooms.map(c => <option key={c.id} value={c.id}>{c.title} ({c.section})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Corte Académico</label>
                    <select required disabled={!newQuiz.classroomId} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-green font-medium disabled:opacity-50" value={newQuiz.academicCutId} onChange={(e) => setNewQuiz({...newQuiz, academicCutId: e.target.value})}>
                      <option value="" disabled>Selecciona el corte...</option>
                      {classrooms.find(c => c.id === newQuiz.classroomId)?.cuts?.map((cut: any) => (
                        <option key={cut.id} value={cut.id}>{cut.name} ({cut.weight}%)</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-5 bg-brand-paper rounded-2xl border border-zinc-200 mb-8">
                  <h4 className="text-sm font-bold text-gray-800 mb-4">Pregunta de Evaluación Rápida</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Pregunta</label>
                      <input type="text" required placeholder="Ej. ¿Qué capa del Modelo OSI enruta los paquetes?" className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl outline-none focus:border-brand-green" value={newQuiz.questionText} onChange={(e) => setNewQuiz({...newQuiz, questionText: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-brand-green mb-1.5 uppercase tracking-wider">Opción Correcta</label>
                        <input type="text" required placeholder="Ej. Capa de Red" className="w-full px-4 py-3 bg-white border border-brand-green/30 rounded-xl outline-none focus:border-brand-green" value={newQuiz.correctOption} onChange={(e) => setNewQuiz({...newQuiz, correctOption: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-red-500 mb-1.5 uppercase tracking-wider">Opción Incorrecta</label>
                        <input type="text" required placeholder="Ej. Capa Física" className="w-full px-4 py-3 bg-white border border-red-200 rounded-xl outline-none focus:border-red-500" value={newQuiz.wrongOption} onChange={(e) => setNewQuiz({...newQuiz, wrongOption: e.target.value})} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <button type="submit" disabled={isSubmittingQuiz || !newQuiz.academicCutId} className="tactile px-8 py-3 font-bold text-white bg-brand-green rounded-xl shadow-[0_4px_0_0_#46a302] hover:bg-green-600 disabled:opacity-50">
                  {isSubmittingQuiz ? 'Publicando...' : 'Publicar Quiz'}
                </button>
              </form>
            )}

            {isCreating && (
              <form onSubmit={handleCreateClass} className="mb-10 p-8 bg-white border-2 border-brand-orange/20 rounded-[28px] shadow-sm animate-in fade-in slide-in-from-top-4">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Configurar Nueva Aula</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Nombre de la Materia</label>
                    <input type="text" required placeholder="Ej. Ingeniería de Software" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-foreground rounded-xl outline-none focus:border-brand-orange font-medium" value={newClass.title} onChange={(e) => setNewClass({...newClass, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Sección o Turno</label>
                    <input type="text" required placeholder="Ej. Sección 8A - Noche" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-foreground rounded-xl outline-none focus:border-brand-orange font-medium" value={newClass.section} onChange={(e) => setNewClass({...newClass, section: e.target.value})} />
                  </div>
                </div>
                
                <div className="mb-8">
                  <label className="block text-[11px] font-bold text-zinc-500 mb-3 uppercase tracking-wider">Color del Aula</label>
                  <div className="flex gap-4">
                    {['bg-brand-blue', 'bg-brand-green', 'bg-brand-orange', 'bg-brand-purple', 'bg-red-500'].map((color) => (
                      <button key={color} type="button" onClick={() => setNewClass({...newClass, stripeColor: color})} className={`size-10 rounded-full ${color} transition-transform ${newClass.stripeColor === color ? 'scale-125 ring-4 ring-offset-2 ring-zinc-200' : 'hover:scale-110'}`} />
                    ))}
                  </div>
                </div>
                
                <button type="submit" disabled={isSubmitting} className="tactile px-8 py-3 font-bold text-white bg-brand-orange rounded-xl shadow-[0_4px_0_0_#cc7800] hover:bg-orange-600 disabled:opacity-50">
                  {isSubmitting ? 'Generando...' : 'Crear Aula y Generar Código'}
                </button>
              </form>
            )}

            {/* SECCIÓN RESUMEN DE AULAS */}
            <section className="mb-10">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Aulas Activas</h3>
                <button onClick={() => setActiveTab('aulas')} className="text-sm font-bold text-brand-orange hover:underline flex items-center gap-1">
                  Ver detalle completo <ChevronRight className="size-4" />
                </button>
              </div>

              {classrooms.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-[28px] bg-brand-paper p-12 ring-1 ring-black/5 text-center border-2 border-dashed border-zinc-200">
                  <span className="text-6xl mb-4 block opacity-50">🏫</span>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">No tienes aulas creadas</h4>
                  <p className="text-zinc-500 font-medium max-w-md">Crea tu primera clase para empezar a gestionar entregas y publicar actividades gamificadas.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {classrooms.map((c) => (
                    <article key={c.id} className="overflow-hidden rounded-[20px] bg-white p-1 ring-1 ring-black/5 transition shadow-sm group">
                      <div className={`h-3 rounded-t-[19px] ${c.stripeColor || 'bg-brand-blue'}`} />
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-800">{c.title}</h4>
                            <p className="text-sm text-zinc-500 font-medium">{c.section}</p>
                          </div>
                          <div className="flex flex-col items-center justify-center bg-zinc-50 rounded-xl px-3 py-2 border border-zinc-100">
                            <span className="text-lg font-bold text-brand-orange">{c._count?.students || 0}</span>
                            <span className="text-[10px] font-bold uppercase text-zinc-400">Alumnos</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-brand-paper rounded-xl border border-zinc-200 flex justify-between items-center">
                          <div className="overflow-hidden">
                            <p className="text-[10px] font-bold uppercase text-zinc-500 mb-1">Código de Acceso</p>
                            <p className="font-mono text-sm font-bold text-gray-800 truncate">{c.id}</p>
                          </div>
                          <button 
                            onClick={() => copyToClipboard(c.id)}
                            className="p-2 bg-white rounded-lg border border-zinc-200 text-zinc-500 hover:text-brand-orange hover:border-brand-orange transition-colors"
                            title="Copiar Código"
                          >
                            {copiedId === c.id ? <CheckCircle2 className="size-4 text-brand-green" /> : <Copy className="size-4" />}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* ================= PESTAÑA 2: MIS AULAS ================= */}
        {activeTab === 'aulas' && (
          <div className="animate-in fade-in">
            <header className="mb-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight">
                Mis <span className="text-brand-orange">Aulas y Evaluaciones</span> 📖
              </h1>
              <p className="text-zinc-500 font-medium mt-1">
                Selecciona una de tus clases para revisar las actividades publicadas y el listado de estudiantes que han cumplido con sus entregas.
              </p>
            </header>

            {classrooms.length === 0 ? (
              <div className="p-12 bg-brand-paper border-2 border-dashed border-zinc-200 rounded-[28px] text-center">
                <span className="text-5xl block mb-3">📚</span>
                <h3 className="text-xl font-bold text-gray-800">Aún no has creado ninguna clase</h3>
                <p className="text-sm text-zinc-500 mt-1 mb-6">Dirígete al Panel Principal o usa el botón de "Nueva Aula".</p>
                <button onClick={() => { setActiveTab('principal'); setIsCreating(true); }} className="px-6 py-3 bg-brand-orange text-white font-bold rounded-xl shadow-[0_4px_0_0_#cc7800]">
                  + Crear Mi Primera Aula
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                
                {/* BARRA SELECTORA DE AULAS */}
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {classrooms.map((cls) => {
                    const isSelected = cls.id === (currentSelectedClassroom?.id);
                    return (
                      <button
                        key={cls.id}
                        onClick={() => setSelectedClassroomId(cls.id)}
                        className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-bold text-sm transition-all shrink-0 ${
                          isSelected 
                            ? 'bg-white shadow-md border-2 border-brand-orange text-brand-orange' 
                            : 'bg-white/60 border border-zinc-200 text-zinc-600 hover:bg-white'
                        }`}
                      >
                        <span className={`size-3 rounded-full ${cls.stripeColor || 'bg-brand-blue'}`} />
                        <span>{cls.title} ({cls.section})</span>
                        <span className="text-[10px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full font-bold">
                          {cls._count?.students || 0} est.
                        </span>
                      </button>
                    );
                  })}
                </div>

                {currentSelectedClassroom && (
                  <div className="bg-white border-2 border-zinc-200 rounded-[28px] p-8 shadow-sm space-y-8">
                    
                    {/* CABECERA DEL AULA SELECCIONADA */}
                    <div className="flex flex-wrap justify-between items-center gap-4 pb-6 border-b border-zinc-100">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className={`size-4 rounded-full ${currentSelectedClassroom.stripeColor || 'bg-brand-blue'}`} />
                          <h2 className="text-2xl font-bold text-gray-800">{currentSelectedClassroom.title}</h2>
                        </div>
                        <p className="text-sm font-semibold text-zinc-500 mt-1">
                          Sección: <strong>{currentSelectedClassroom.section}</strong> • Código: <code className="bg-zinc-100 px-2 py-0.5 rounded text-gray-700">{currentSelectedClassroom.id}</code>
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => { setNewAssignment({...newAssignment, classroomId: currentSelectedClassroom.id}); setIsCreatingAssignment(true); setActiveTab('principal'); }}
                          className="px-4 py-2 bg-brand-blue/10 text-brand-blue font-bold text-xs rounded-xl hover:bg-brand-blue/20 transition-colors"
                        >
                          + Asignar Tarea
                        </button>
                        <button 
                          onClick={() => { setNewQuiz({...newQuiz, classroomId: currentSelectedClassroom.id}); setIsCreatingQuiz(true); setActiveTab('principal'); }}
                          className="px-4 py-2 bg-brand-green/10 text-brand-green font-bold text-xs rounded-xl hover:bg-brand-green/20 transition-colors"
                        >
                          + Diseñar Quiz
                        </button>
                      </div>
                    </div>

                    {/* SECCIÓN 1: TAREAS TRADICIONALES (MACRO-APRENDIZAJE) */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FileText className="text-brand-blue size-5" /> Tareas Tradicionales y Entregas
                      </h3>

                      {!currentSelectedClassroom.assignments || currentSelectedClassroom.assignments.length === 0 ? (
                        <p className="text-sm text-zinc-400 italic bg-zinc-50 p-4 rounded-xl border border-zinc-100">No has publicado tareas en esta aula todavía.</p>
                      ) : (
                        <div className="space-y-4">
                          {currentSelectedClassroom.assignments.map((asg: any) => {
                            const submissions = asg.submissions || [];
                            return (
                              <div key={asg.id} className="border-2 border-zinc-100 bg-zinc-50/50 rounded-2xl p-5 hover:border-brand-blue/30 transition-colors">
                                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                                  <div>
                                    <h4 className="font-bold text-gray-800 text-base">{asg.title}</h4>
                                    {asg.description && <p className="text-xs text-zinc-500 mt-1">{asg.description}</p>}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-bold bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full">
                                      {asg.academicCut?.name || 'Corte Académico'}
                                    </span>
                                    <span className="text-[11px] font-bold text-zinc-400 bg-white border border-zinc-200 px-3 py-1 rounded-full">
                                      {asg.dueDate ? `Límite: ${new Date(asg.dueDate).toLocaleDateString()}` : 'Sin fecha'}
                                    </span>
                                  </div>
                                </div>

                                {/* LISTA DE ESTUDIANTES QUE YA ENTREGARON */}
                                <div className="mt-4 pt-4 border-t border-zinc-200/60">
                                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
                                    Entregas Recibidas ({submissions.length} / {currentSelectedClassroom._count?.students || 0} estudiantes)
                                  </p>

                                  {submissions.length === 0 ? (
                                    <p className="text-xs text-zinc-400 italic">Ningún estudiante ha entregado esta tarea aún.</p>
                                  ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {submissions.map((sub: any) => (
                                        <div key={sub.id} className="bg-white p-3.5 rounded-xl border border-zinc-200 flex justify-between items-center shadow-xs">
                                          <div>
                                            <p className="text-sm font-bold text-gray-800">{sub.student?.name || sub.student?.alias || 'Estudiante'}</p>
                                            <p className="text-[10px] text-zinc-400">{new Date(sub.submittedAt).toLocaleString()}</p>
                                            {sub.contentUrl && (
                                              <a href={sub.contentUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-blue font-bold hover:underline flex items-center gap-1 mt-1">
                                                <ExternalLink className="size-3" /> Ver trabajo
                                              </a>
                                            )}
                                          </div>

                                          <div className="text-right">
                                            {sub.grade !== null && sub.grade !== undefined ? (
                                              <span className="inline-block text-xs font-extrabold text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-lg">
                                                {sub.grade} / 20 pts
                                              </span>
                                            ) : (
                                              <span className="inline-block text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                                                Pendiente
                                              </span>
                                            )}

                                            <button 
                                              onClick={() => {
                                                setGradingSubmission({
                                                  id: sub.id,
                                                  studentName: sub.student?.name || sub.student?.alias,
                                                  assignmentTitle: asg.title,
                                                  contentUrl: sub.contentUrl
                                                });
                                                setGradeForm({ grade: sub.grade !== null ? String(sub.grade) : '', feedback: sub.feedback || '' });
                                              }}
                                              className="block text-[11px] font-bold text-brand-blue hover:underline mt-1 ml-auto"
                                            >
                                              {sub.grade !== null ? 'Modificar Nota' : 'Calificar'}
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* SECCIÓN 2: QUIZZES GAMIFICADOS (MICRO-APRENDIZAJE) */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Zap className="text-brand-green size-5" /> Quizzes y Desafíos Gamificados
                      </h3>

                      {(!currentSelectedClassroom.cuts || !(currentSelectedClassroom.cuts.some((c: any) => c.quizzes?.length > 0))) ? (
                        <p className="text-sm text-zinc-400 italic bg-zinc-50 p-4 rounded-xl border border-zinc-100">No hay quizzes publicados en esta aula aún.</p>
                      ) : (
                        <div className="space-y-4">
                          {currentSelectedClassroom.cuts.flatMap((cut: any) => cut.quizzes || []).map((qz: any) => {
                            const attempts = qz.attempts || [];
                            return (
                              <div key={qz.id} className="border-2 border-zinc-100 bg-zinc-50/50 rounded-2xl p-5 hover:border-brand-green/30 transition-colors">
                                <div className="flex justify-between items-start gap-2 mb-3">
                                  <div>
                                    <h4 className="font-bold text-gray-800 text-base flex items-center gap-2">
                                      {qz.title}
                                      <span className="text-xs font-extrabold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-md">
                                        +{qz.xpReward} XP
                                      </span>
                                    </h4>
                                    <p className="text-xs text-zinc-500 mt-1">{qz.questions?.length || 0} pregunta(s)</p>
                                  </div>
                                </div>

                                {/* LISTA DE ESTUDIANTES QUE COMPLETARON EL QUIZ */}
                                <div className="mt-4 pt-4 border-t border-zinc-200/60">
                                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">
                                    Estudiantes que Completaron ({attempts.length} registrados)
                                  </p>

                                  {attempts.length === 0 ? (
                                    <p className="text-xs text-zinc-400 italic">Ningún estudiante ha resuelto este quiz todavía.</p>
                                  ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {attempts.map((att: any) => (
                                        <div key={att.id} className="bg-white p-3.5 rounded-xl border border-zinc-200 flex justify-between items-center shadow-xs">
                                          <div>
                                            <p className="text-sm font-bold text-gray-800">{att.student?.name || att.student?.alias || 'Estudiante'}</p>
                                            <p className="text-[10px] text-zinc-400">{new Date(att.completedAt).toLocaleString()}</p>
                                          </div>
                                          <div className="text-right">
                                            <span className="inline-block text-xs font-bold text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-lg">
                                              Puntuación: {att.score} pts (+{att.xpEarned} XP)
                                            </span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= PESTAÑA 3: ESTUDIANTES ================= */}
        {activeTab === 'estudiantes' && (
          <div className="animate-in fade-in">
            <header className="mb-8 flex flex-wrap justify-between items-end gap-4">
              <div>
                <h1 className="text-3xl font-bold leading-tight tracking-tight">
                  Directorio de <span className="text-brand-orange">Estudiantes</span> 👨‍🎓
                </h1>
                <p className="text-zinc-500 font-medium mt-1">
                  Consulta el listado completo de alumnos inscritos en tus aulas, sus entregas y su nota acumulada del semestre.
                </p>
              </div>

              <div className="bg-white px-4 py-2 rounded-xl border border-zinc-200 shadow-xs flex items-center gap-2">
                <Users className="size-4 text-brand-orange" />
                <span className="text-sm font-bold text-gray-800">Total: {filteredStudents.length} Alumnos</span>
              </div>
            </header>

            {filteredStudents.length === 0 ? (
              <div className="p-12 bg-white border-2 border-dashed border-zinc-200 rounded-[28px] text-center">
                <span className="text-5xl block mb-3">🔍</span>
                <h3 className="text-xl font-bold text-gray-800">No se encontraron estudiantes</h3>
                <p className="text-sm text-zinc-500 mt-1">Intenta con otro término de búsqueda o asegúrate de que los estudiantes usen el código de aula para unirse.</p>
              </div>
            ) : (
              <div className="bg-white border-2 border-zinc-200 rounded-[28px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-200 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                        <th className="py-4 px-6">Estudiante</th>
                        <th className="py-4 px-6">Aula / Materia</th>
                        <th className="py-4 px-6">Sección</th>
                        <th className="py-4 px-6 text-center">Actividades Cumplidas</th>
                        <th className="py-4 px-6 text-right">Nota Acumulada</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {filteredStudents.map((item, idx) => {
                        const grade = item.accumulatedGrade;
                        let gradeBadge = "bg-zinc-100 text-zinc-600";
                        if (grade >= 16) gradeBadge = "bg-brand-green/15 text-brand-green font-bold";
                        else if (grade >= 10) gradeBadge = "bg-brand-orange/15 text-brand-orange font-bold";
                        else if (grade > 0) gradeBadge = "bg-red-100 text-red-600 font-bold";

                        return (
                          <tr key={`${item.student.id}_${idx}`} className="hover:bg-zinc-50/80 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="grid size-9 place-items-center rounded-full bg-brand-orange/20 text-brand-orange font-bold text-sm">
                                  {item.student.alias?.substring(0, 2).toUpperCase() || 'ES'}
                                </div>
                                <div>
                                  <p className="font-bold text-gray-800 text-sm">{item.student.name || item.student.alias}</p>
                                  <p className="text-xs text-zinc-400">{item.student.email}</p>
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-6 font-bold text-sm text-gray-700">
                              {item.classroomTitle}
                            </td>

                            <td className="py-4 px-6 text-sm text-zinc-500 font-medium">
                              {item.section}
                            </td>

                            <td className="py-4 px-6 text-center">
                              <div className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full">
                                <span>📝 {item.submissionsCount} Tareas</span>
                                <span>•</span>
                                <span>⚡ {item.quizzesCompleted} Quizzes</span>
                              </div>
                            </td>

                            <td className="py-4 px-6 text-right">
                              <span className={`inline-block px-3 py-1.5 rounded-xl text-sm ${gradeBadge}`}>
                                {grade > 0 ? `${grade} / 20 pts` : 'Sin notas'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= PESTAÑA 4: CONFIGURACIÓN ================= */}
        {activeTab === 'configuracion' && (
          <div className="animate-in fade-in">
            <header className="mb-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight">
                Configuración y <span className="text-brand-orange">Gestión de Aulas</span> ⚙️
              </h1>
              <p className="text-zinc-500 font-medium mt-1">
                Edita la información de tus materias, actualiza nombres o secciones y elimina aulas que ya no utilices.
              </p>
            </header>

            {classrooms.length === 0 ? (
              <div className="p-12 bg-white border-2 border-dashed border-zinc-200 rounded-[28px] text-center">
                <span className="text-5xl block mb-3">🏫</span>
                <h3 className="text-xl font-bold text-gray-800">No hay aulas para configurar</h3>
                <p className="text-sm text-zinc-500 mt-1">Crea tu primera clase desde el panel principal.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classrooms.map((c) => (
                  <div key={c.id} className="bg-white border-2 border-zinc-200 rounded-[24px] overflow-hidden p-6 shadow-sm hover:border-brand-orange/40 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`size-4 rounded-full ${c.stripeColor || 'bg-brand-blue'}`} />
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{c.title}</h3>
                          <p className="text-xs text-zinc-500 font-semibold">{c.section}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingClassroom({ id: c.id, title: c.title, section: c.section, stripeColor: c.stripeColor })}
                          className="p-2 bg-zinc-100 hover:bg-brand-orange/10 hover:text-brand-orange text-zinc-600 rounded-xl transition-colors" 
                          title="Modificar Aula"
                        >
                          <Edit className="size-4" />
                        </button>
                        <button 
                          onClick={() => setDeletingClassroom({ id: c.id, title: c.title, section: c.section })}
                          className="p-2 bg-zinc-100 hover:bg-red-100 hover:text-red-600 text-zinc-600 rounded-xl transition-colors" 
                          title="Eliminar Aula"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-xs space-y-1.5 text-zinc-600 mb-4 font-medium">
                      <p>• <strong>{c._count?.students || 0}</strong> Estudiantes inscritos</p>
                      <p>• <strong>{c.assignments?.length || 0}</strong> Tareas tradicionales publicadas</p>
                      <p>• <strong>{(c.cuts || []).reduce((acc: number, cut: any) => acc + (cut.quizzes?.length || 0), 0)}</strong> Quizzes gamificados</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Código de inscripción</span>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono font-bold text-gray-800 bg-zinc-100 px-2 py-1 rounded">{c.id}</code>
                        <button 
                          onClick={() => copyToClipboard(c.id)} 
                          className="text-xs font-bold text-brand-orange hover:underline"
                        >
                          {copiedId === c.id ? '¡Copiado!' : 'Copiar'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* ================= BARRA DERECHA (MÉTRICAS RÁPIDAS) ================= */}
      <aside className="hidden xl:flex w-80 shrink-0 flex-col gap-6 overflow-y-auto border-l border-zinc-950/5 bg-brand-paper p-6">
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5 shadow-sm">
            <BookOpen className="size-6 text-brand-blue" strokeWidth={2.5} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Tus Aulas</p>
              <p className="text-lg font-bold leading-tight">{classrooms.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5 shadow-sm">
            <Users className="size-6 text-brand-purple" strokeWidth={2.5} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Alumnos</p>
              <p className="text-lg font-bold leading-tight">
                {classrooms.reduce((acc, curr) => acc + (curr._count?.students || 0), 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Atajos Rápidos */}
        <div className="rounded-[24px] bg-white p-6 ring-1 ring-black/5 shadow-sm">
          <h4 className="text-sm font-bold text-gray-800 mb-4">Creador Rápido</h4>
          <div className="space-y-3">
            <button 
              onClick={() => { setIsCreatingQuiz(!isCreatingQuiz); setIsCreatingAssignment(false); setIsCreating(false); setActiveTab('principal'); }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-brand-green hover:bg-brand-green/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="grid size-8 place-items-center rounded-lg bg-brand-green/10 text-brand-green">
                  <Zap className="size-4" />
                </div>
                <span className="font-bold text-sm text-gray-700 group-hover:text-brand-green">Nuevo Quiz</span>
              </div>
              <Plus className="size-4 text-zinc-400 group-hover:text-brand-green" />
            </button>

            <button 
              onClick={() => { setIsCreatingAssignment(!isCreatingAssignment); setIsCreatingQuiz(false); setIsCreating(false); setActiveTab('principal'); }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-brand-blue hover:bg-brand-blue/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="grid size-8 place-items-center rounded-lg bg-brand-blue/10 text-brand-blue">
                  <Activity className="size-4" />
                </div>
                <span className="font-bold text-sm text-gray-700 group-hover:text-brand-blue">Nueva Tarea</span>
              </div>
              <Plus className="size-4 text-zinc-400 group-hover:text-brand-blue" />
            </button>
          </div>
        </div>

      </aside>
    </div>
  );
};