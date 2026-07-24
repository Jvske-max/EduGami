import { Search, Bell, PlusCircle, Sparkles, Zap } from "lucide-react";
import { ClassMetricsCard } from "./ClassMetricsCard";

const teacherClasses = [
  { title: "Sistemas de Aprendizaje", section: "Sección 701", stripe: "bg-brand-blue", students: 24, participation: 85, risk: 2 },
  { title: "Programación Web II", section: "Sección 701", stripe: "bg-brand-orange", students: 18, participation: 92, risk: 0 },
  { title: "Bases de Datos I", section: "Sección 702", stripe: "bg-brand-purple", students: 30, participation: 78, risk: 4 },
];

export function QuizWizard() {
  return (
    <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 lg:px-10 lg:py-10 lg:pb-10 bg-brand-cream font-sans text-zinc-900">
      {/* Top bar */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar alumno o clase…"
            className="w-full rounded-xl border border-zinc-950/5 bg-white py-2.5 pl-9 pr-3 text-sm outline-none ring-brand-green/30 transition placeholder:text-zinc-400 focus:ring-2"
          />
        </div>
        <button className="tactile grid size-10 place-items-center rounded-xl bg-white text-zinc-600 shadow-black/10 ring-1 ring-black/5 hover:text-brand-green">
          <Bell className="size-4" strokeWidth={2.5} />
        </button>
      </div>

      <header className="mb-10">
        <h1 className="mb-2 text-3xl font-semibold leading-tight tracking-tight text-balance">Resumen Docente</h1>
        <p className="max-w-[56ch] text-pretty text-zinc-500">Monitorea el progreso de tus secciones y diseña nuevas dinámicas gamificadas.</p>
      </header>

      {/* Hero Action: Crear Micro-Lección */}
      <section className="mb-12">
        <div className="relative flex flex-col md:flex-row items-center justify-between overflow-hidden rounded-[28px] bg-brand-paper border border-zinc-200 p-8">
          <div className="relative z-10 max-w-[50ch] mb-6 md:mb-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-orange/10 text-brand-orange px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles className="size-3" strokeWidth={3} /> Creador Rápido
            </div>
            <h2 className="mb-3 text-2xl font-semibold leading-tight text-zinc-900">Diseña una nueva micro-lección</h2>
            <p className="mb-6 text-zinc-500 text-sm">
              Usa nuestras plantillas pre-configuradas para armar un quiz interactivo de 5 minutos y evalúa a tus alumnos sin fricción.
            </p>
            <button
              className="tactile inline-flex items-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-sm font-bold text-white shadow-[0_4px_0_0_#46a302] hover:bg-brand-green/90 transition-colors"
            >
              <PlusCircle className="size-5" strokeWidth={2.5} />
              Crear Lección Gamificada
            </button>
          </div>
          
          <div className="relative z-10 w-full md:w-auto flex justify-center">
            {/* Aquí luego irá una pequeña ilustración o icono grande para decorar */}
            <div className="grid size-32 place-items-center rounded-full bg-brand-green/10 text-brand-green">
               <Zap className="size-16" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Aulas */}
      <section>
        <h3 className="text-xl font-semibold mb-6">Métricas por Aula</h3>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {teacherClasses.map((cls) => (
            <ClassMetricsCard
              key={cls.title}
              title={cls.title}
              section={cls.section}
              stripeColor={cls.stripe}
              studentsCount={cls.students}
              participationRate={cls.participation}
              atRiskCount={cls.risk}
            />
          ))}
        </div>
      </section>
    </main>
  );
}