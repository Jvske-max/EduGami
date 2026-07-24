import { Zap, LayoutDashboard, Users, BookOpenCheck, Library } from "lucide-react";

const teacherNav = [
  { icon: LayoutDashboard, label: "Panel Principal", active: true },
  { icon: Users, label: "Mis Alumnos" },
  { icon: BookOpenCheck, label: "Calificaciones" },
  { icon: Library, label: "Banco de Preguntas" },
];

export function TeacherSidebar() {
  return (
    <nav className="hidden lg:flex w-64 flex-col border-r border-zinc-950/5 bg-brand-paper p-4">
      <div className="mb-8 px-4 py-6">
        <div className="flex items-center gap-2">
          <div className="grid size-9 place-items-center rounded-xl bg-brand-green shadow-[0_3px_0_0_#46a302]">
            <Zap className="size-5 text-white" strokeWidth={3} />
          </div>
          <span className="text-xl font-semibold tracking-tight">EduGami <span className="text-sm text-zinc-500 font-medium">Docente</span></span>
        </div>
      </div>

      <div className="flex-1 space-y-1">
        {teacherNav.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                item.active ? "bg-brand-green/10 text-brand-green" : "text-zinc-500 hover:bg-zinc-950/5"
              }`}
            >
              <Icon className="size-4 shrink-0" strokeWidth={2.5} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>

      <div className="mt-auto flex items-center gap-3 rounded-2xl bg-zinc-950/5 p-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-zinc-800 text-sm font-semibold text-white">FS</div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">Prof. Fernando S.</p>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Administrador</p>
        </div>
      </div>
    </nav>
  );
}