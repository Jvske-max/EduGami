import { Users, AlertTriangle, TrendingUp } from "lucide-react";

interface ClassMetricsProps {
  title: string;
  section: string;
  stripeColor: string;
  studentsCount: number;
  participationRate: number;
  atRiskCount: number;
}

export function ClassMetricsCard({ title, section, stripeColor, studentsCount, participationRate, atRiskCount }: ClassMetricsProps) {
  return (
    <article className="overflow-hidden rounded-[20px] bg-white p-1 ring-1 ring-black/5 transition hover:ring-black/10">
      <div className={`h-2 rounded-t-[19px] ${stripeColor}`} />
      <div className="p-5">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="mb-5 text-sm text-zinc-500">{section}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl bg-zinc-50 p-3">
            <div className="flex items-center gap-2 mb-1 text-zinc-500">
              <Users className="size-4" />
              <span className="text-xs font-medium">Alumnos</span>
            </div>
            <p className="text-lg font-semibold">{studentsCount}</p>
          </div>
          <div className="rounded-xl bg-zinc-50 p-3">
            <div className="flex items-center gap-2 mb-1 text-zinc-500">
              <TrendingUp className="size-4" />
              <span className="text-xs font-medium">Participación</span>
            </div>
            <p className="text-lg font-semibold text-brand-green">{participationRate}%</p>
          </div>
        </div>

        {atRiskCount > 0 ? (
          <div className="flex items-center justify-between rounded-xl bg-red-50 p-3 text-red-600">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4" strokeWidth={2.5} />
              <span className="text-sm font-medium">Alumnos en riesgo</span>
            </div>
            <span className="font-bold">{atRiskCount}</span>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-xl bg-brand-green/10 p-3 text-brand-green">
            <span className="text-sm font-medium">Clase al día</span>
            <span className="font-bold">100%</span>
          </div>
        )}
      </div>
    </article>
  );
}