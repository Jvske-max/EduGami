import {
  Home, BookOpen, Zap, Trophy, FileText, CheckCircle2, Flame, Sparkles, Award
} from "lucide-react";

export const navItems = [
  { icon: Home, label: "Inicio", active: true },
  { icon: BookOpen, label: "Clases" },
  { icon: Zap, label: "Quizzes" },
  { icon: Trophy, label: "Logros" },
];

export const classes = [
  {
    title: "Sistemas de Aprendizaje",
    subtitle: "Universidad Alejandro de Humboldt",
    stripe: "bg-brand-blue",
    items: [
      { label: "Análisis de Caso 2", due: "Mañana", dueTone: "text-zinc-400", icon: FileText, iconTone: "bg-brand-orange/10 text-brand-orange" },
      { label: "Material: LMS vs EVEA", due: null, dueTone: "", icon: BookOpen, iconTone: "bg-zinc-200 text-zinc-500" },
    ],
  },
  {
    title: "Programación Web II",
    subtitle: "Sección 701 · Vespertino",
    stripe: "bg-brand-orange",
    items: [
      { label: "Entrega de Dashboard", due: "Hoy", dueTone: "text-destructive", icon: FileText, iconTone: "bg-brand-orange/10 text-brand-orange" },
      { label: "Práctica: Tailwind CSS", due: "Entregado", dueTone: "text-zinc-400 italic", icon: CheckCircle2, iconTone: "bg-brand-green/10 text-brand-green" },
    ],
  },
  {
    title: "Bases de Datos I",
    subtitle: "Prof. Elena Ruiz",
    stripe: "bg-brand-purple",
    items: [
      { label: "Quiz: Normalización 3FN", due: "5 min", dueTone: "text-brand-green", icon: Zap, iconTone: "bg-brand-green/10 text-brand-green" },
      { label: "Guía: Modelo Relacional", due: null, dueTone: "", icon: BookOpen, iconTone: "bg-zinc-200 text-zinc-500" },
    ],
  },
];

export const leaderboard = [
  { rank: 1, alias: "BúhoSabio", xp: 4520, me: false },
  { rank: 2, alias: "Tú (Juan)", xp: 3420, me: true },
  { rank: 3, alias: "RayoCodificador", xp: 3110, me: false },
  { rank: 4, alias: "PixelNómada", xp: 2890, me: false },
];

export const achievements = [
  { label: "El Búho Nocturno", icon: Sparkles, tone: "bg-brand-orange/10 text-brand-orange", unlocked: true },
  { label: "Racha Imparable", icon: Flame, tone: "bg-brand-blue/10 text-brand-blue", unlocked: true },
  { label: "Velocidad de Rayo", icon: Zap, tone: "bg-brand-green/10 text-brand-green", unlocked: true },
  { label: "Próximo logro", icon: Award, tone: "bg-zinc-100 text-zinc-400", unlocked: false },
];