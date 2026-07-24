import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Save, Smartphone, CheckCircle2, Circle, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/quiz-wizard")({
  head: () => ({
    meta: [{ title: "Creador de Lección · EduGami" }],
  }),
  component: QuizWizard,
});

function QuizWizard() {
  // Estado para mantener los datos en tiempo real
  const [question, setQuestion] = useState("¿Cuál es el objetivo principal de la Gamificación?");
  const [options, setOptions] = useState([
    "Jugar videojuegos en clase",
    "Aplicar mecánicas de juego en contextos no lúdicos",
    "Dar puntos por asistencia",
    "Reemplazar al profesor"
  ]);
  const [correctIndex, setCorrectIndex] = useState(1); // El índice de la respuesta correcta

  // Función para actualizar una opción específica
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-brand-cream font-sans text-zinc-900 selection:bg-brand-green/20">
      
      {/* Top Navigation - Modo Focus */}
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            to="/teacher"
            className="flex size-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold leading-none">Nueva Micro-Lección</h1>
            <p className="text-xs font-medium text-zinc-500 mt-1">Borrador sin guardar</p>
          </div>
        </div>
        
        <button className="tactile inline-flex items-center gap-2 rounded-xl bg-brand-green px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_0_0_#46a302]">
          <Save className="size-4" strokeWidth={2.5} />
          Guardar y Publicar
        </button>
      </header>

      {/* Editor Split Screen */}
      <main className="flex flex-1 overflow-hidden">
        
        {/* Panel Izquierdo: Formulario de Edición */}
        <section className="flex-1 overflow-y-auto bg-white p-8 lg:p-12">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue">
              <Zap className="size-3" strokeWidth={3} /> Trivia Rápida
            </div>
            
            <h2 className="mb-6 text-2xl font-semibold text-zinc-900">Escribe tu pregunta</h2>
            
            {/* Input de la Pregunta */}
            <div className="mb-8">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ej: ¿Qué es el modelo OSI?"
                className="w-full resize-none rounded-2xl border-2 border-zinc-200 bg-zinc-50 p-4 text-lg font-medium outline-none transition focus:border-brand-green focus:bg-white"
                rows={3}
              />
            </div>

            <h3 className="mb-4 text-lg font-semibold text-zinc-900">Respuestas (Selecciona la correcta)</h3>
            
            {/* Inputs de las Respuestas */}
            <div className="space-y-3">
              {options.map((opt, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 rounded-2xl border-2 p-3 transition-colors ${
                    correctIndex === index ? "border-brand-green bg-brand-green/5" : "border-zinc-200 bg-white hover:border-zinc-300"
                  }`}
                >
                  <button
                    onClick={() => setCorrectIndex(index)}
                    className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${
                      correctIndex === index ? "border-brand-green bg-brand-green" : "border-zinc-300 bg-white"
                    }`}
                  >
                    {correctIndex === index && <CheckCircle2 className="size-4 text-white" strokeWidth={3} />}
                  </button>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Opción ${index + 1}`}
                    className="flex-1 bg-transparent text-sm font-medium outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Panel Derecho: Previsualización Móvil (Oculto en pantallas pequeñas) */}
        <section className="hidden w-[450px] shrink-0 flex-col items-center justify-center border-l border-zinc-200 bg-brand-paper p-8 lg:flex">
          <div className="mb-6 flex items-center gap-2 text-zinc-400">
            <Smartphone className="size-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Vista del Estudiante</span>
          </div>

          {/* Teléfono Virtual */}
          <div className="relative h-[650px] w-[320px] overflow-hidden rounded-[2.5rem] border-[10px] border-zinc-900 bg-brand-cream shadow-2xl">
            
            {/* Barra de progreso superior del juego */}
            <div className="flex items-center justify-between px-5 pt-10 pb-4">
               <div className="h-3 flex-1 rounded-full bg-zinc-200">
                 <div className="h-full w-1/3 rounded-full bg-brand-green"></div>
               </div>
               <div className="ml-4 flex items-center gap-1 text-brand-orange">
                 <Zap className="size-4 fill-current" />
                 <span className="text-sm font-bold tabular-nums">40 XP</span>
               </div>
            </div>

            {/* Contenido del Teléfono */}
            <div className="flex h-full flex-col px-5 pb-8">
              <h4 className="mb-6 mt-4 text-xl font-bold leading-tight text-zinc-900">
                {question || "Escribe una pregunta..."}
              </h4>

              <div className="mt-auto space-y-3 pb-16">
                <AnimatePresence mode="popLayout">
                  {options.map((opt, index) => (
                    <motion.div
                      key={index}
                      layout // Esto hace que se reacomoden suavemente si cambian de tamaño
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", bounce: 0.4, duration: 0.6, delay: index * 0.1 }}
                      className="flex min-h-[60px] w-full items-center justify-center rounded-2xl border-2 border-zinc-200 bg-white p-3 text-center text-sm font-semibold text-zinc-700 shadow-[0_3px_0_0_theme(colors.zinc.200)]"
                    >
                      {opt || `Opción ${index + 1}`}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}