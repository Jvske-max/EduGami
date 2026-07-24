import { Flame, Zap, Target } from "lucide-react";
import { leaderboard, achievements } from "../data/mock";
import { motion } from "framer-motion";

// Componente interno para el anillo de progreso
function ProgressRing({ percent }: { percent: number }) {
  const size = 128;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);
  
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--color-brand-cream)"
        strokeWidth={stroke}
        fill="none"
        className="[stroke:theme(colors.zinc.100)]"
      />
      {/* Cambiamos <circle> por <motion.circle> y añadimos initial, animate y transition */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--color-brand-green)"
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      />
    </svg>
  );
}

export function GamificationPanel() {
  return (
    <aside className="flex w-full lg:w-80 shrink-0 flex-col gap-6 border-t lg:border-l lg:border-t-0 border-zinc-950/5 bg-brand-paper p-4 lg:p-6 mb-20 lg:mb-0">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5">
          <Flame className="size-6 text-brand-orange" strokeWidth={2.5} />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Racha</p>
            <p className="text-lg font-semibold leading-tight">12 días</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5">
          <Zap className="size-6 text-brand-blue" strokeWidth={2.5} />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">XP Total</p>
            <p className="text-lg font-semibold leading-tight">3.420</p>
          </div>
        </div>
      </div>

      <div className="rounded-[24px] bg-white p-6 ring-1 ring-black/5">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-sm font-semibold">Progreso Semanal</h4>
          <Target className="size-4 text-zinc-400" />
        </div>
        <div className="relative grid place-items-center py-2">
          <ProgressRing percent={75} />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold leading-none">75%</span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Meta</span>
          </div>
        </div>
        <p className="mt-4 text-pretty text-center text-xs text-zinc-500">
          ¡Estás a solo <strong className="text-zinc-700">120 XP</strong> de completar tu meta semanal!
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-semibold">Liga Diamante</h4>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500">4d restantes</span>
        </div>
        <div className="space-y-2">
          {leaderboard.map((row) => (
            <div key={row.alias} className={`flex items-center justify-between rounded-xl p-2.5 ${row.me ? "bg-brand-green/5 ring-1 ring-inset ring-brand-green/25" : "bg-white ring-1 ring-black/5"}`}>
              <div className="flex items-center gap-3">
                <span className={`w-4 text-xs font-bold ${row.me ? "text-brand-green" : "text-zinc-400"}`}>{row.rank}</span>
                <div className={`grid size-8 place-items-center rounded-full text-[10px] font-semibold ${row.me ? "bg-brand-green/20 text-brand-green" : "bg-zinc-100 text-zinc-500"}`}>
                  {row.alias.slice(0, 2).toUpperCase()}
                </div>
                <span className={`text-sm ${row.me ? "font-semibold" : "font-medium"}`}>{row.alias}</span>
              </div>
              <span className="text-xs font-semibold tabular-nums">{row.xp.toLocaleString("es")} XP</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-950/5 pt-5">
        <h4 className="mb-3 text-sm font-semibold">Últimos Logros</h4>
        <div className="flex gap-3">
          {achievements.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.label} title={a.label} className={`grid size-12 place-items-center rounded-xl ${a.tone} ${a.unlocked ? "" : "grayscale"}`}>
                <Icon className="size-6" strokeWidth={2.5} />
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}