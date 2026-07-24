import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as CircleCheck, j as ArrowLeft, p as Save, t as Zap, u as Smartphone } from "../_libs/lucide-react.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz-wizard-Daplbdkc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuizWizard() {
	const [question, setQuestion] = (0, import_react.useState)("¿Cuál es el objetivo principal de la Gamificación?");
	const [options, setOptions] = (0, import_react.useState)([
		"Jugar videojuegos en clase",
		"Aplicar mecánicas de juego en contextos no lúdicos",
		"Dar puntos por asistencia",
		"Reemplazar al profesor"
	]);
	const [correctIndex, setCorrectIndex] = (0, import_react.useState)(1);
	const handleOptionChange = (index, value) => {
		const newOptions = [...options];
		newOptions[index] = value;
		setOptions(newOptions);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen w-full flex-col bg-brand-cream font-sans text-zinc-900 selection:bg-brand-green/20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/teacher",
					className: "flex size-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-bold leading-none",
					children: "Nueva Micro-Lección"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium text-zinc-500 mt-1",
					children: "Borrador sin guardar"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "tactile inline-flex items-center gap-2 rounded-xl bg-brand-green px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_0_0_#46a302]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {
					className: "size-4",
					strokeWidth: 2.5
				}), "Guardar y Publicar"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex flex-1 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "flex-1 overflow-y-auto bg-white p-8 lg:p-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8 inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-blue",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
								className: "size-3",
								strokeWidth: 3
							}), " Trivia Rápida"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-6 text-2xl font-semibold text-zinc-900",
							children: "Escribe tu pregunta"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: question,
								onChange: (e) => setQuestion(e.target.value),
								placeholder: "Ej: ¿Qué es el modelo OSI?",
								className: "w-full resize-none rounded-2xl border-2 border-zinc-200 bg-zinc-50 p-4 text-lg font-medium outline-none transition focus:border-brand-green focus:bg-white",
								rows: 3
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-4 text-lg font-semibold text-zinc-900",
							children: "Respuestas (Selecciona la correcta)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: options.map((opt, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex items-center gap-3 rounded-2xl border-2 p-3 transition-colors ${correctIndex === index ? "border-brand-green bg-brand-green/5" : "border-zinc-200 bg-white hover:border-zinc-300"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCorrectIndex(index),
									className: `grid size-6 shrink-0 place-items-center rounded-full border-2 ${correctIndex === index ? "border-brand-green bg-brand-green" : "border-zinc-300 bg-white"}`,
									children: correctIndex === index && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
										className: "size-4 text-white",
										strokeWidth: 3
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: opt,
									onChange: (e) => handleOptionChange(index, e.target.value),
									placeholder: `Opción ${index + 1}`,
									className: "flex-1 bg-transparent text-sm font-medium outline-none"
								})]
							}, index))
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "hidden w-[450px] shrink-0 flex-col items-center justify-center border-l border-zinc-200 bg-brand-paper p-8 lg:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center gap-2 text-zinc-400",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold uppercase tracking-wider",
						children: "Vista del Estudiante"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-[650px] w-[320px] overflow-hidden rounded-[2.5rem] border-[10px] border-zinc-900 bg-brand-cream shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-5 pt-10 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-3 flex-1 rounded-full bg-zinc-200",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-1/3 rounded-full bg-brand-green" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-4 flex items-center gap-1 text-brand-orange",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4 fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold tabular-nums",
								children: "40 XP"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full flex-col px-5 pb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mb-6 mt-4 text-xl font-bold leading-tight text-zinc-900",
							children: question || "Escribe una pregunta..."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-auto space-y-3 pb-16",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "popLayout",
								children: options.map((opt, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									layout: true,
									initial: {
										opacity: 0,
										scale: .8
									},
									animate: {
										opacity: 1,
										scale: 1
									},
									transition: {
										type: "spring",
										bounce: .4,
										duration: .6,
										delay: index * .1
									},
									className: "flex min-h-[60px] w-full items-center justify-center rounded-2xl border-2 border-zinc-200 bg-white p-3 text-center text-sm font-semibold text-zinc-700 shadow-[0_3px_0_0_theme(colors.zinc.200)]",
									children: opt || `Opción ${index + 1}`
								}, index))
							})
						})]
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { QuizWizard as component };
