import { o as __toESM } from "../_runtime.mjs";
import { t as api } from "./axios-DQ1GboXV.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as getCurrentProfile } from "./auth.service-Cao6cV6i.mjs";
import { A as Award, D as Check, O as BookOpen, T as CircleCheck, _ as Lock, b as Flame, f as Search, g as LogOut, h as Play, i as Trophy, k as Bell, l as Sparkles, n as X, o as Target, s as Star, t as Zap, v as House, w as Clock, x as FileText, y as Gamepad2 } from "../_libs/lucide-react.mjs";
import { a as enrollInClassroom, c as submitAssignment, l as submitQuizAttempt, o as getMyClassrooms } from "./quiz.service-JkT41LD8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C5HqtRt3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getLeaderboard = async () => {
	return (await api.get("/leaderboard")).data;
};
var navItems = [
	{
		id: "inicio",
		icon: House,
		label: "Inicio"
	},
	{
		id: "clases",
		icon: BookOpen,
		label: "Clases"
	},
	{
		id: "quizzes",
		icon: Zap,
		label: "Quizzes"
	},
	{
		id: "logros",
		icon: Trophy,
		label: "Logros"
	}
];
var DashboardContent = () => {
	const navigate = useNavigate();
	const [activeStudentTab, setActiveStudentTab] = (0, import_react.useState)("inicio");
	const [userProfile, setUserProfile] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [classrooms, setClassrooms] = (0, import_react.useState)([]);
	const [leaderboardData, setLeaderboardData] = (0, import_react.useState)([]);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [classCode, setClassCode] = (0, import_react.useState)("");
	const [isEnrolling, setIsEnrolling] = (0, import_react.useState)(false);
	const [isEnrollingNew, setIsEnrollingNew] = (0, import_react.useState)(false);
	const [selectedClassId, setSelectedClassId] = (0, import_react.useState)(null);
	const [achievementFilter, setAchievementFilter] = (0, import_react.useState)("all");
	const [activeTask, setActiveTask] = (0, import_react.useState)(null);
	const [taskUrl, setTaskUrl] = (0, import_react.useState)("");
	const [isSubmittingTask, setIsSubmittingTask] = (0, import_react.useState)(false);
	const [activeQuiz, setActiveQuiz] = (0, import_react.useState)(null);
	const [quizAnswers, setQuizAnswers] = (0, import_react.useState)({});
	const [isSubmittingQuiz, setIsSubmittingQuiz] = (0, import_react.useState)(false);
	const handleLogout = () => {
		localStorage.removeItem("edugami_token");
		localStorage.removeItem("edugami_role");
		navigate({ to: "/login" });
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
			if (clsList.length > 0 && !selectedClassId) setSelectedClassId(clsList[0].id);
		} catch (error) {
			console.error("Error al cargar datos", error);
			if (error.response?.status === 401 || typeof window !== "undefined" && !localStorage.getItem("edugami_token")) handleLogout();
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			const token = localStorage.getItem("edugami_token");
			const role = localStorage.getItem("edugami_role");
			if (!token) {
				handleLogout();
				return;
			}
			if (role === "TEACHER") {
				navigate({ to: "/teacher" });
				return;
			}
		}
		loadData();
	}, []);
	const handleEnroll = async (e) => {
		e.preventDefault();
		if (!classCode.trim()) return;
		setIsEnrolling(true);
		try {
			await enrollInClassroom(classCode);
			setClassCode("");
			setIsEnrollingNew(false);
			await loadData();
		} catch (error) {
			alert("Error al unirse. Verifica el código.");
		} finally {
			setIsEnrolling(false);
		}
	};
	const handleTaskSubmit = async (e) => {
		e.preventDefault();
		if (!taskUrl.trim()) return;
		setIsSubmittingTask(true);
		try {
			await submitAssignment({
				assignmentId: activeTask.id,
				contentUrl: taskUrl
			});
			alert("¡Tarea entregada con éxito! +XP añadida.");
			setActiveTask(null);
			setTaskUrl("");
			await loadData();
		} catch (error) {
			alert(error.response?.data?.error || "Error al entregar la tarea.");
		} finally {
			setIsSubmittingTask(false);
		}
	};
	const handleQuizSubmit = async (e) => {
		e.preventDefault();
		setIsSubmittingQuiz(true);
		try {
			const formattedAnswers = Object.keys(quizAnswers).map((questionId) => ({
				questionId,
				optionId: quizAnswers[questionId]
			}));
			const result = await submitQuizAttempt({
				quizId: activeQuiz.id,
				answers: formattedAnswers
			});
			alert(`${result.message} (Puntuación: ${result.score}) ⚡`);
			setActiveQuiz(null);
			setQuizAnswers({});
			await loadData();
		} catch (error) {
			console.error("Detalles del error del Quiz:", error);
			const mensajeReal = error.response?.data?.error || `Error del sistema: ${error.message}`;
			alert(mensajeReal);
		} finally {
			setIsSubmittingQuiz(false);
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex-1 min-h-screen bg-brand-cream flex justify-center items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-2xl font-bold text-brand-green animate-pulse",
			children: "Cargando tu entorno virtual... ⏳"
		})
	});
	const allPendingQuizzes = [];
	classrooms.forEach((c) => {
		(c.cuts || []).forEach((cut) => {
			(cut.quizzes || []).forEach((quiz) => {
				if (!quiz.attempts?.some((att) => att.studentId === userProfile?.id || att.userId === userProfile?.id)) allPendingQuizzes.push({
					...quiz,
					classroomTitle: c.title
				});
			});
		});
	});
	const hasPendingQuizzes = allPendingQuizzes.length > 0;
	const firstPendingQuiz = hasPendingQuizzes ? allPendingQuizzes[0] : null;
	let totalTasksCompleted = 0;
	let totalQuizzesCompleted = 0;
	let totalTasksSubmitted = 0;
	classrooms.forEach((c) => {
		(c.assignments || []).forEach((asg) => {
			if (asg.submissions?.some((sub) => sub.studentId === userProfile?.id)) {
				totalTasksSubmitted++;
				totalTasksCompleted++;
			}
		});
		(c.cuts || []).forEach((cut) => {
			(cut.quizzes || []).forEach((qz) => {
				if (qz.attempts?.some((att) => att.studentId === userProfile?.id)) totalQuizzesCompleted++;
			});
		});
	});
	const currentXP = userProfile?.xpTotal || 0;
	const currentStreak = userProfile?.streak || 0;
	const myLeaderboardRank = leaderboardData.findIndex((row) => row.id === userProfile?.id) + 1;
	const steamAchievements = [
		{
			id: "buho_nocturno",
			title: "El Búho Nocturno 🦉",
			description: "Entrega tu primera tarea tradicional a tiempo.",
			tier: "Común",
			tone: "border-blue-400 bg-blue-50 text-blue-700",
			unlocked: totalTasksSubmitted >= 1,
			progress: `${Math.min(totalTasksSubmitted, 1)} / 1`,
			icon: Sparkles
		},
		{
			id: "racha_imparable",
			title: "Racha Imparable 🔥",
			description: "Mantén una racha de al menos 3 días consecutivos de estudio.",
			tier: "Raro",
			tone: "border-orange-400 bg-orange-50 text-orange-700",
			unlocked: currentStreak >= 3,
			progress: `${Math.min(currentStreak, 3)} / 3 días`,
			icon: Flame
		},
		{
			id: "velocidad_rayo",
			title: "Velocidad de Rayo ⚡",
			description: "Completa tu primer quiz gamificado con éxito.",
			tier: "Común",
			tone: "border-green-400 bg-green-50 text-green-700",
			unlocked: totalQuizzesCompleted >= 1,
			progress: `${Math.min(totalQuizzesCompleted, 1)} / 1`,
			icon: Zap
		},
		{
			id: "estudiante_dedicado",
			title: "Estudiante Dedicado 📚",
			description: "Inscríbete en al menos 2 aulas virtuales activas.",
			tier: "Raro",
			tone: "border-purple-400 bg-purple-50 text-purple-700",
			unlocked: classrooms.length >= 2,
			progress: `${Math.min(classrooms.length, 2)} / 2 aulas`,
			icon: BookOpen
		},
		{
			id: "acumulador_xp",
			title: "Acumulador de XP 💎",
			description: "Alcanza los 500 puntos de experiencia acumulados.",
			tier: "Épico",
			tone: "border-cyan-400 bg-cyan-50 text-cyan-700",
			unlocked: currentXP >= 500,
			progress: `${Math.min(currentXP, 500)} / 500 XP`,
			icon: Trophy
		},
		{
			id: "top_leaderboard",
			title: "Liga Diamante 👑",
			description: "Posiciónate entre los 3 primeros lugares del ranking global.",
			tier: "Legendario",
			tone: "border-yellow-400 bg-yellow-50 text-yellow-800",
			unlocked: myLeaderboardRank > 0 && myLeaderboardRank <= 3,
			progress: myLeaderboardRank > 0 ? `Puesto #${myLeaderboardRank}` : "Sin puesto",
			icon: Award
		},
		{
			id: "maestro_edugami",
			title: "Maestro EduGami 🌟",
			description: "Alcanza 1,000 XP y completa tu meta semanal.",
			tier: "Legendario",
			tone: "border-emerald-500 bg-emerald-50 text-emerald-800",
			unlocked: currentXP >= 1e3,
			progress: `${Math.min(currentXP, 1e3)} / 1000 XP`,
			icon: Star
		}
	];
	const unlockedCount = steamAchievements.filter((a) => a.unlocked).length;
	const totalAchievements = steamAchievements.length;
	const achievementPercentage = Math.round(unlockedCount / totalAchievements * 100);
	const filteredAchievements = steamAchievements.filter((a) => {
		if (achievementFilter === "unlocked") return a.unlocked;
		if (achievementFilter === "locked") return !a.unlocked;
		return true;
	});
	const currentLevel = Math.floor(currentXP / 200) + 1;
	const nextLevelXP = currentLevel * 200;
	const levelProgress = Math.min(Math.round(currentXP % 200 / 200 * 100), 100);
	const WEEKLY_GOAL = 1e3;
	const progressPercent = Math.min(Math.round(currentXP / WEEKLY_GOAL * 100), 100);
	const xpRemaining = Math.max(WEEKLY_GOAL - currentXP, 0);
	const currentSelectedClass = classrooms.find((c) => c.id === selectedClassId) || classrooms[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen w-full bg-brand-cream font-sans text-zinc-900 selection:bg-brand-green/20 overflow-hidden relative",
		children: [
			activeTask && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white w-full max-w-md rounded-[28px] p-8 shadow-2xl relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveTask(null),
							className: "absolute top-6 right-6 text-zinc-400 hover:text-zinc-700",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-12 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								className: "size-6",
								strokeWidth: 2.5
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-gray-800 mb-2",
							children: "Entregar Tarea"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold text-brand-blue mb-6",
							children: activeTask.title
						}),
						activeTask.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-zinc-600 mb-6 p-4 bg-zinc-50 rounded-xl border border-zinc-100",
							children: activeTask.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleTaskSubmit,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
									children: "Enlace a tu trabajo (Google Drive, Docs, etc.)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "url",
									required: true,
									placeholder: "https://...",
									className: "w-full px-4 py-3 mb-6 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100 font-medium",
									value: taskUrl,
									onChange: (e) => setTaskUrl(e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: isSubmittingTask,
									className: "tactile w-full py-3 font-bold text-white bg-brand-blue rounded-xl shadow-[0_4px_0_0_#1cb0f6] hover:bg-blue-500 disabled:opacity-50",
									children: isSubmittingTask ? "Enviando..." : "Entregar y ganar XP"
								})
							]
						})
					]
				})
			}),
			activeQuiz && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white w-full max-w-lg rounded-[28px] p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveQuiz(null),
							className: "absolute top-6 right-6 text-zinc-400 hover:text-zinc-700",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-10 place-items-center rounded-xl bg-brand-green/10 text-brand-green",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
										className: "size-5",
										strokeWidth: 2.5
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-bold text-gray-800",
									children: activeQuiz.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm font-bold text-brand-green bg-brand-green/10 px-3 py-1 rounded-lg",
								children: [
									"+",
									activeQuiz.xpReward,
									" XP"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleQuizSubmit,
							className: "space-y-6",
							children: [activeQuiz.questions?.map((question, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-zinc-50 p-5 rounded-2xl border border-zinc-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-bold text-gray-800 mb-4",
									children: [
										idx + 1,
										". ",
										question.text
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-3",
									children: question.options?.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: `flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${quizAnswers[question.id] === opt.id ? "border-brand-green bg-brand-green/5" : "border-zinc-200 bg-white hover:border-brand-green/40"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "radio",
											name: `question_${question.id}`,
											value: opt.id,
											checked: quizAnswers[question.id] === opt.id,
											onChange: () => setQuizAnswers({
												...quizAnswers,
												[question.id]: opt.id
											}),
											className: "size-4 text-brand-green focus:ring-brand-green",
											required: true
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-zinc-700",
											children: opt.text
										})]
									}, opt.id))
								})]
							}, question.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: isSubmittingQuiz || Object.keys(quizAnswers).length !== activeQuiz.questions?.length,
								className: "tactile w-full py-4 font-bold text-white bg-brand-green rounded-xl shadow-[0_4px_0_0_#46a302] hover:bg-green-600 disabled:opacity-50",
								children: isSubmittingQuiz ? "Procesando..." : "Completar Quiz"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex w-64 flex-col border-r border-zinc-950/5 bg-brand-paper p-4 shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-8 px-4 py-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-9 place-items-center rounded-xl bg-brand-green shadow-[0_3px_0_0_#46a302]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
									className: "size-5 text-white",
									strokeWidth: 3
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl font-bold tracking-tight",
								children: "EduGami"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 space-y-1",
						children: navItems.map((item) => {
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveStudentTab(item.id),
								className: `w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeStudentTab === item.id ? "bg-brand-green/10 text-brand-green ring-1 ring-brand-green/30" : "text-zinc-500 hover:bg-zinc-950/5"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4 shrink-0",
									strokeWidth: 2.5
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
							}, item.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto flex items-center justify-between gap-2 rounded-2xl bg-zinc-950/5 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-10 shrink-0 place-items-center rounded-full bg-brand-green/20 text-sm font-bold text-brand-green",
								children: userProfile?.alias?.substring(0, 2).toUpperCase() || "JP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-bold text-gray-800",
									children: userProfile?.alias || "Estudiante"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] font-bold uppercase tracking-wider text-zinc-500",
									children: [
										"Nivel ",
										currentLevel,
										" • ",
										currentXP,
										" XP"
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleLogout,
							className: "p-2 text-zinc-400 hover:text-red-500 transition-colors",
							title: "Cerrar Sesión",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-5" })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 overflow-y-auto px-10 py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full max-w-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Buscar clase, tarea o quiz...",
								className: "w-full rounded-xl border border-zinc-950/5 bg-white py-2.5 pl-9 pr-3 text-sm outline-none ring-brand-green/30 transition placeholder:text-zinc-400 focus:ring-2 font-medium",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "tactile grid size-10 place-items-center rounded-xl bg-white text-zinc-600 shadow-black/10 ring-1 ring-black/5 hover:text-brand-green",
							"aria-label": "Notificaciones",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
								className: "size-4",
								strokeWidth: 2.5
							})
						})]
					}),
					activeStudentTab === "inicio" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-in fade-in",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "mb-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "mb-2 text-3xl font-bold leading-tight tracking-tight text-balance",
									children: [
										"¡Hola de nuevo, ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-brand-orange",
											children: userProfile?.alias
										}),
										"! 👋"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-[56ch] text-pretty text-zinc-500 font-medium",
									children: "Revisa tus misiones activas y asegúrate de mantener tu racha semanal."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
								className: "mb-12",
								children: hasPendingQuizzes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex items-center justify-between overflow-hidden rounded-[28px] bg-brand-green p-8 text-white",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative z-10 max-w-[46ch]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
														className: "size-3",
														strokeWidth: 3
													}), " Micro-lección 5 min"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "mb-3 text-2xl font-bold leading-tight md:text-3xl",
													children: "Continuar aprendiendo"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mb-6 text-white/85 font-medium",
													children: [
														"Tienes un quiz disponible: ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
															"\"",
															firstPendingQuiz?.title,
															"\""
														] }),
														". ¡Resuélvelo ahora y gana +",
														firstPendingQuiz?.xpReward || 40,
														" XP!"
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => setActiveQuiz(firstPendingQuiz),
													className: "tactile inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-green ring-1 ring-black/5 hover:bg-white/90 transition-colors shadow-sm",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
														className: "size-4 fill-current",
														strokeWidth: 0
													}), " Resolver Quiz Ahora"]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-white/10" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-24 right-24 size-48 rounded-full bg-white/5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pointer-events-none relative z-10 hidden md:block",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid size-56 place-items-center rounded-full bg-white/15 backdrop-blur-sm",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: "/assets/mascot-owl-CF-DyOIJ.png",
													alt: "Mascota búho",
													className: "size-44 drop-shadow-lg object-contain"
												})
											})
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex items-center justify-between overflow-hidden rounded-[28px] bg-zinc-800 p-8 text-white border-2 border-zinc-700",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative z-10 max-w-[46ch]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm text-yellow-300",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "💤" }), " Todo completado por hoy"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "mb-3 text-2xl font-bold leading-tight md:text-3xl",
													children: "¡Has terminado tus quizzes! 😴"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mb-6 text-zinc-300 font-medium",
													children: "No hay más quizzes pendientes por resolver en tus materias. Tu búho se ha dormido plácidamente. ¡Vuelve mañana para continuar tu racha!"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white border border-white/20",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-brand-green" }), " ¡Todo al día! Tómate un descanso"]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-white/5" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pointer-events-none relative z-10 hidden md:block",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid size-56 place-items-center rounded-full bg-white/10 backdrop-blur-sm",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: "/assets/sleeping-owl-DevXvSb6.png",
													alt: "Búho Durmiendo",
													className: "size-44 drop-shadow-xl object-contain rounded-2xl"
												})
											})
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold",
									children: "Mis Clases"
								}), classrooms.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setIsEnrollingNew(!isEnrollingNew),
									className: "text-sm font-bold text-brand-green hover:underline flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "+" }), " Unirme a otra"]
								})]
							}), classrooms.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center justify-center rounded-[28px] bg-white p-12 ring-1 ring-black/5 text-center shadow-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-6xl mb-4 block",
										children: "🎒"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-2xl font-bold text-gray-800 mb-2",
										children: "Tu mochila está vacía"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-zinc-500 font-medium mb-8 max-w-md",
										children: "Aún no estás inscrito en ninguna clase. Usa el código de tu profesor para unirte y comenzar tu aventura."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleEnroll,
										className: "flex w-full max-w-sm gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "Código de la clase...",
											required: true,
											className: "flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none ring-brand-green/30 transition focus:ring-2 focus:border-brand-green font-medium",
											value: classCode,
											onChange: (e) => setClassCode(e.target.value)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											disabled: isEnrolling,
											className: "tactile rounded-xl bg-brand-green px-6 font-bold text-white shadow-green-900 transition hover:bg-brand-green-dark disabled:opacity-50",
											children: isEnrolling ? "..." : "Unirme"
										})]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-5",
								children: [isEnrollingNew && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "overflow-hidden rounded-[20px] bg-brand-paper p-6 ring-2 ring-brand-green/20 border-dashed border-2 border-brand-green shadow-sm animate-in fade-in zoom-in-95",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-lg font-bold text-gray-800 mb-2",
											children: "Nueva Misión"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-zinc-500 mb-4",
											children: "Ingresa el código que te dio el profesor."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
											onSubmit: handleEnroll,
											className: "flex flex-col gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												placeholder: "Pegar código aquí...",
												required: true,
												className: "w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 outline-none ring-brand-green/30 transition focus:ring-2 focus:border-brand-green font-medium",
												value: classCode,
												onChange: (e) => setClassCode(e.target.value)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2 mt-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setIsEnrollingNew(false),
													className: "px-4 py-2 text-sm font-bold text-zinc-500 hover:bg-zinc-100 rounded-xl transition",
													children: "Cancelar"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "submit",
													disabled: isEnrolling,
													className: "tactile flex-1 rounded-xl bg-brand-green px-4 py-2 text-sm font-bold text-white shadow-green-900 transition hover:bg-brand-green-dark disabled:opacity-50",
													children: isEnrolling ? "Validando..." : "Unirme"
												})]
											})]
										})
									]
								}), classrooms.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "overflow-hidden rounded-[20px] bg-white p-1 ring-1 ring-black/5 shadow-sm group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-3 rounded-t-[19px] ${c.stripeColor || "bg-brand-blue"} opacity-90 group-hover:opacity-100 transition` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-lg font-bold text-gray-800",
												children: c.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mb-2 text-sm text-zinc-500 font-medium",
												children: [
													c.section,
													" • ",
													c.teacher?.name
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2.5 mt-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
														className: "text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2",
														children: "Misiones Activas"
													}),
													c.assignments && c.assignments.length > 0 && c.assignments.map((task) => {
														const isCompleted = task.submissions?.some((sub) => sub.userId === userProfile?.id || sub.studentId === userProfile?.id);
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: `flex items-center justify-between rounded-xl p-3 border mb-2 transition-colors ${isCompleted ? "bg-zinc-100/50 border-zinc-100 opacity-70" : "bg-zinc-50 border-zinc-100 hover:border-brand-blue/30"}`,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-3",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: `grid size-8 place-items-center rounded-lg ${isCompleted ? "bg-zinc-200 text-zinc-400" : "bg-brand-blue/10 text-brand-blue"}`,
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
																		className: "size-4",
																		strokeWidth: 2.5
																	})
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: `text-sm font-bold truncate max-w-[150px] ${isCompleted ? "text-zinc-400 line-through" : "text-gray-700"}`,
																	children: task.title
																})]
															}), isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "flex items-center gap-1 text-[10px] font-bold text-zinc-400 bg-zinc-200/50 px-2 py-1 rounded-md uppercase",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Listo"]
															}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => setActiveTask(task),
																className: "text-[10px] font-bold text-brand-blue hover:bg-brand-blue/10 px-2 py-1 rounded-md transition-colors uppercase",
																children: "Entregar"
															})]
														}, task.id);
													}),
													(c.cuts || []).flatMap((cut) => cut.quizzes || []).map((quiz) => {
														const isCompleted = quiz.attempts?.some((att) => att.userId === userProfile?.id || att.studentId === userProfile?.id);
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: `flex items-center justify-between rounded-xl p-3 border mb-2 transition-colors ${isCompleted ? "bg-zinc-100/50 border-zinc-100 opacity-70" : "bg-zinc-50 border-zinc-100 hover:border-brand-green/30"}`,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-3",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: `grid size-8 place-items-center rounded-lg ${isCompleted ? "bg-zinc-200 text-zinc-400" : "bg-brand-green/10 text-brand-green"}`,
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
																		className: "size-4",
																		strokeWidth: 2.5
																	})
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: `text-sm font-bold truncate max-w-[150px] ${isCompleted ? "text-zinc-400 line-through" : "text-gray-700"}`,
																	children: quiz.title
																})]
															}), isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "flex items-center gap-1 text-[10px] font-bold text-zinc-400 bg-zinc-200/50 px-2 py-1 rounded-md uppercase",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Listo"]
															}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => setActiveQuiz(quiz),
																className: "text-[10px] font-bold text-brand-green bg-brand-green/10 hover:bg-brand-green/20 px-2 py-1 rounded-md transition-colors uppercase",
																children: "Resolver"
															})]
														}, quiz.id);
													}),
													!c.assignments?.length && !(c.cuts || []).some((cut) => cut.quizzes?.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-zinc-400 font-medium italic",
														children: "No hay misiones pendientes."
													})
												]
											})
										]
									})]
								}, c.id))]
							})] })
						]
					}),
					activeStudentTab === "clases" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-in fade-in space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "flex flex-wrap justify-between items-end gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "text-3xl font-bold leading-tight tracking-tight",
									children: [
										"Mis ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-brand-blue",
											children: "Aulas Virtuales"
										}),
										" 📚"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-zinc-500 font-medium mt-1",
									children: "Estilo Classroom: Selecciona una materia para consultar tus pendientes y entregas completadas."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setIsEnrollingNew(!isEnrollingNew),
									className: "px-5 py-2.5 bg-brand-blue text-white font-bold rounded-xl shadow-[0_4px_0_0_#1cb0f6] hover:bg-blue-500 transition-colors text-sm",
									children: "+ Unirse a una Clase"
								})]
							}),
							isEnrollingNew && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleEnroll,
								className: "p-6 bg-white border-2 border-brand-blue rounded-2xl shadow-sm flex flex-col md:flex-row gap-3 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Ingresa el código del aula dado por tu profesor...",
									required: true,
									className: "flex-1 w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue font-medium",
									value: classCode,
									onChange: (e) => setClassCode(e.target.value)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 w-full md:w-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setIsEnrollingNew(false),
										className: "px-4 py-3 text-sm font-bold text-zinc-500 hover:bg-zinc-100 rounded-xl",
										children: "Cancelar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: isEnrolling,
										className: "flex-1 md:flex-none px-6 py-3 bg-brand-blue text-white font-bold rounded-xl shadow-[0_4px_0_0_#1cb0f6]",
										children: isEnrolling ? "Uniendo..." : "Unirme"
									})]
								})]
							}),
							classrooms.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-12 bg-white border-2 border-dashed border-zinc-200 rounded-[28px] text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-5xl block mb-3",
										children: "🎒"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold text-gray-800",
										children: "No estás inscrito en ninguna materia"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-zinc-500 mt-1",
										children: "Usa el botón de arriba para ingresar el código de tu profesor."
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-3 overflow-x-auto pb-2 scrollbar-none",
									children: classrooms.map((cls) => {
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setSelectedClassId(cls.id),
											className: `flex items-center gap-3 px-5 py-3 rounded-2xl font-bold text-sm transition-all shrink-0 ${cls.id === currentSelectedClass?.id ? "bg-white shadow-md border-2 border-brand-blue text-brand-blue" : "bg-white/60 border border-zinc-200 text-zinc-600 hover:bg-white"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-3 rounded-full ${cls.stripeColor || "bg-brand-blue"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cls.title })]
										}, cls.id);
									})
								}), currentSelectedClass && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white border-2 border-zinc-200 rounded-[28px] overflow-hidden shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `p-8 text-white ${currentSelectedClass.stripeColor || "bg-brand-blue"} relative`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-3xl font-extrabold",
											children: currentSelectedClass.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-white/80 font-medium text-sm mt-1",
											children: [
												currentSelectedClass.section,
												" • Prof. ",
												currentSelectedClass.teacher?.name
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-8 space-y-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "text-lg font-bold text-gray-800 mb-4 flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "text-brand-orange size-5" }), " Tareas y Quizzes Pendientes"]
										}), (() => {
											const pendingTasks = (currentSelectedClass.assignments || []).filter((a) => !a.submissions?.some((sub) => sub.studentId === userProfile?.id));
											const pendingQuizzes = (currentSelectedClass.cuts || []).flatMap((cut) => cut.quizzes || []).filter((q) => !q.attempts?.some((att) => att.studentId === userProfile?.id));
											if (pendingTasks.length === 0 && pendingQuizzes.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-6 bg-brand-green/10 border border-brand-green/20 rounded-2xl flex items-center gap-4 text-brand-green",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-8 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "font-bold text-base",
													children: "¡Estás al día en esta materia! 🎉"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-medium opacity-90",
													children: "Has completado todas las entregas y quizzes asignados por tu profesor."
												})] })]
											});
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-3",
												children: [pendingTasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "p-4 bg-zinc-50 border border-zinc-200 rounded-2xl flex justify-between items-center hover:border-brand-blue transition-colors",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "grid size-10 place-items-center bg-brand-blue/10 text-brand-blue rounded-xl",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															className: "font-bold text-gray-800 text-sm",
															children: task.title
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-xs text-zinc-400",
															children: ["Tarea Tradicional • ", task.dueDate ? `Entrega: ${new Date(task.dueDate).toLocaleDateString()}` : "Sin límite"]
														})] })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setActiveTask(task),
														className: "px-4 py-2 bg-brand-blue text-white font-bold text-xs rounded-xl shadow-[0_3px_0_0_#1cb0f6]",
														children: "Entregar Tarea"
													})]
												}, task.id)), pendingQuizzes.map((quiz) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "p-4 bg-zinc-50 border border-zinc-200 rounded-2xl flex justify-between items-center hover:border-brand-green transition-colors",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "grid size-10 place-items-center bg-brand-green/10 text-brand-green rounded-xl",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-5" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
															className: "font-bold text-gray-800 text-sm",
															children: quiz.title
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-xs text-brand-green font-bold",
															children: [
																"Quiz Gamificado • +",
																quiz.xpReward,
																" XP"
															]
														})] })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setActiveQuiz(quiz),
														className: "px-4 py-2 bg-brand-green text-white font-bold text-xs rounded-xl shadow-[0_3px_0_0_#46a302]",
														children: "Resolver Quiz"
													})]
												}, quiz.id))]
											});
										})()] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-6 border-t border-zinc-100",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
												className: "text-lg font-bold text-gray-800 mb-4 flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "text-brand-green size-5" }), " Actividades Completadas"]
											}), (() => {
												const doneTasks = (currentSelectedClass.assignments || []).filter((a) => a.submissions?.some((sub) => sub.studentId === userProfile?.id));
												const doneQuizzes = (currentSelectedClass.cuts || []).flatMap((cut) => cut.quizzes || []).filter((q) => q.attempts?.some((att) => att.studentId === userProfile?.id));
												if (doneTasks.length === 0 && doneQuizzes.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-zinc-400 italic",
													children: "No has entregado actividades en esta clase todavía."
												});
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-3",
													children: [doneTasks.map((task) => {
														const sub = task.submissions.find((s) => s.studentId === userProfile?.id);
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "p-4 bg-zinc-100/60 border border-zinc-200 rounded-2xl flex justify-between items-center opacity-80",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-3",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-brand-green shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
																	className: "font-bold text-gray-800 text-sm line-through",
																	children: task.title
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																	className: "text-xs text-zinc-400",
																	children: ["Entregado el ", new Date(sub.submittedAt).toLocaleDateString()]
																})] })]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-xs font-bold text-brand-green bg-brand-green/10 px-3 py-1 rounded-lg",
																children: sub.grade !== null ? `Nota: ${sub.grade} pts` : "Entregado"
															})]
														}, task.id);
													}), doneQuizzes.map((quiz) => {
														const att = quiz.attempts.find((a) => a.studentId === userProfile?.id);
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "p-4 bg-zinc-100/60 border border-zinc-200 rounded-2xl flex justify-between items-center opacity-80",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-3",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-brand-green shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
																	className: "font-bold text-gray-800 text-sm line-through",
																	children: quiz.title
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																	className: "text-xs text-zinc-400",
																	children: [
																		"Quiz resuelto • +",
																		att.xpEarned,
																		" XP ganados"
																	]
																})] })]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "text-xs font-bold text-brand-green bg-brand-green/10 px-3 py-1 rounded-lg",
																children: [att.score, " pts"]
															})]
														}, quiz.id);
													})]
												});
											})()]
										})]
									})]
								})]
							})
						]
					}),
					activeStudentTab === "quizzes" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-in fade-in space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "flex flex-wrap justify-between items-end gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "text-3xl font-bold leading-tight tracking-tight",
									children: [
										"Modo ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-brand-green",
											children: "Juego y Quizzes"
										}),
										" 🎮"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-zinc-500 font-medium mt-1",
									children: "Mantiene tu racha viva, sube de nivel y desbloquea el árbol de conocimientos."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white px-5 py-3 rounded-2xl border-2 border-brand-green shadow-xs flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-6 text-brand-green fill-current" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold uppercase tracking-wider text-zinc-400",
										children: "Nivel de Juego"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-lg font-extrabold text-brand-green leading-none",
										children: ["Nivel ", currentLevel]
									})] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white border-2 border-zinc-200 rounded-[28px] p-6 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
											className: "size-7 text-brand-orange",
											strokeWidth: 2.5
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "text-lg font-bold text-gray-800",
											children: [
												"Racha Actual: ",
												currentStreak,
												" Días"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-zinc-500",
											children: "Resuelve al menos 1 quiz cada día para no romper tu racha."
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200",
										children: "🔥 ¡Estás en fuego!"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-7 gap-2 pt-2",
									children: [
										"Lun",
										"Mar",
										"Mié",
										"Jue",
										"Vie",
										"Sáb",
										"Dom"
									].map((day, idx) => {
										const isDayActive = idx < (currentStreak % 7 || 1);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `flex flex-col items-center p-3 rounded-xl border text-center transition-all ${isDayActive ? "bg-brand-orange/10 border-brand-orange text-brand-orange font-bold" : "bg-zinc-50 border-zinc-200 text-zinc-400"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: `size-5 mb-1 ${isDayActive ? "fill-current" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs",
												children: day
											})]
										}, day);
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white border-2 border-zinc-200 rounded-[28px] p-6 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm font-bold text-gray-800",
										children: ["Progreso a Nivel ", currentLevel + 1]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-bold text-brand-green",
										children: [
											currentXP,
											" / ",
											nextLevelXP,
											" XP"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-4 bg-zinc-100 rounded-full overflow-hidden p-0.5 border border-zinc-200",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-brand-green rounded-full transition-all duration-500",
										style: { width: `${levelProgress}%` }
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-xl font-bold text-gray-800 mb-6 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gamepad2, { className: "text-brand-green size-6" }), " Misiones y Niveles Gamificados"]
							}), classrooms.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-8 bg-white border-2 border-dashed border-zinc-200 rounded-2xl text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-zinc-500 font-medium",
									children: "Inscríbete en aulas para desbloquear mapas de quizzes."
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-5",
								children: classrooms.flatMap((c) => (c.cuts || []).flatMap((cut) => (cut.quizzes || []).map((qz) => {
									const isCompleted = qz.attempts?.some((att) => att.studentId === userProfile?.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `p-6 rounded-[24px] border-2 transition-all ${isCompleted ? "bg-zinc-50 border-zinc-200 opacity-90" : "bg-white border-brand-green/30 hover:border-brand-green shadow-sm"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-start mb-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `grid size-12 place-items-center rounded-2xl ${isCompleted ? "bg-zinc-200 text-zinc-500" : "bg-brand-green text-white shadow-sm"}`,
													children: isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-6 stroke-[3]" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-6 fill-current" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "font-bold text-gray-800 text-base",
													children: qz.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-zinc-500",
													children: [
														c.title,
														" • ",
														cut.name
													]
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs font-extrabold text-brand-green bg-brand-green/10 px-3 py-1 rounded-lg",
												children: [
													"+",
													qz.xpReward,
													" XP"
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between pt-4 border-t border-zinc-100",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-zinc-400 font-medium",
												children: [qz.questions?.length || 0, " Pregunta(s)"]
											}), isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex items-center gap-1 text-xs font-bold text-brand-green bg-brand-green/10 px-3 py-1.5 rounded-xl",
												children: "⭐ Completado"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setActiveQuiz(qz),
												className: "px-5 py-2 bg-brand-green text-white font-bold text-xs rounded-xl shadow-[0_3px_0_0_#46a302] hover:bg-green-600",
												children: "¡JUGAR QUIZ!"
											})]
										})]
									}, qz.id);
								})))
							})] })
						]
					}),
					activeStudentTab === "logros" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-in fade-in space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "flex flex-wrap justify-between items-end gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "text-3xl font-bold leading-tight tracking-tight",
									children: [
										"Sistema de ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-brand-orange",
											children: "Logros Steam"
										}),
										" 🏆"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-zinc-500 font-medium mt-1",
									children: "Desbloquea insignias completando entregas, manteniendo tu racha y dominando la tabla de posiciones."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white px-5 py-3 rounded-2xl border-2 border-brand-orange shadow-xs text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-bold uppercase tracking-wider text-zinc-400",
										children: "Progreso Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-lg font-extrabold text-brand-orange leading-none",
										children: [
											unlockedCount,
											" de ",
											totalAchievements,
											" (",
											achievementPercentage,
											"%)"
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white border-2 border-zinc-200 rounded-[28px] p-6 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-bold text-gray-800",
										children: "Insignias Desbloqueadas"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-bold text-brand-orange",
										children: [achievementPercentage, "% Completado"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-4 bg-zinc-100 rounded-full overflow-hidden p-0.5 border border-zinc-200",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-brand-orange rounded-full transition-all duration-500",
										style: { width: `${achievementPercentage}%` }
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2 border-b border-zinc-200 pb-4",
								children: [
									{
										id: "all",
										label: `Todos (${totalAchievements})`
									},
									{
										id: "unlocked",
										label: `Desbloqueados (${unlockedCount})`
									},
									{
										id: "locked",
										label: `Bloqueados (${totalAchievements - unlockedCount})`
									}
								].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setAchievementFilter(f.id),
									className: `px-4 py-2 rounded-xl text-xs font-bold transition-all ${achievementFilter === f.id ? "bg-brand-orange text-white shadow-xs" : "bg-white text-zinc-500 border border-zinc-200 hover:bg-zinc-50"}`,
									children: f.label
								}, f.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-5",
								children: filteredAchievements.map((ach) => {
									const Icon = ach.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `p-6 rounded-[24px] border-2 transition-all flex items-start gap-4 ${ach.unlocked ? "bg-white border-zinc-200 shadow-sm" : "bg-zinc-100/60 border-zinc-200 opacity-60 grayscale"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `grid size-14 place-items-center rounded-2xl border-2 shrink-0 ${ach.unlocked ? ach.tone : "bg-zinc-200 border-zinc-300 text-zinc-400"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												className: "size-7",
												strokeWidth: 2.5
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between items-start gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "font-bold text-gray-800 text-base",
														children: ach.title
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${ach.unlocked ? "bg-green-50 border-green-200 text-green-700" : "bg-zinc-200 border-zinc-300 text-zinc-500"}`,
														children: ach.tier
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-zinc-500 mt-1 font-medium",
													children: ach.description
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-4 pt-3 border-t border-zinc-100 flex justify-between items-center text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-bold text-zinc-400",
														children: ["Progreso: ", ach.progress]
													}), ach.unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-bold text-brand-green flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Desbloqueado"]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-bold text-zinc-400 flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3" }), " Bloqueado"]
													})]
												})
											]
										})]
									}, ach.id);
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex w-80 shrink-0 flex-col gap-6 overflow-y-auto border-l border-zinc-950/5 bg-brand-paper p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
								className: "size-6 text-brand-orange",
								strokeWidth: 2.5
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-bold uppercase tracking-wider text-zinc-500",
								children: "Racha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-lg font-bold leading-tight",
								children: [userProfile?.streak || 0, " días"]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
								className: "size-6 text-brand-blue",
								strokeWidth: 2.5
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-bold uppercase tracking-wider text-zinc-500",
								children: "XP Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg font-bold leading-tight",
								children: currentXP
							})] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[24px] bg-white p-6 ring-1 ring-black/5 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-sm font-bold text-gray-800",
									children: "Progreso Semanal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4 text-zinc-400" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative grid place-items-center py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, { percent: progressPercent }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-2xl font-bold leading-none text-gray-800",
										children: [progressPercent, "%"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500",
										children: "Meta"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-pretty text-center text-xs font-medium text-zinc-500",
								children: xpRemaining > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"Estás a solo ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-brand-green font-bold",
										children: [xpRemaining, " XP"]
									}),
									" de completar tu meta semanal."
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-brand-green font-bold",
									children: "¡Meta semanal completada! 🎉"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-bold text-gray-800",
							children: "Liga Diamante"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-500",
							children: "Global"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: leaderboardData.map((row, index) => {
							const isMe = row.id === userProfile?.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex items-center justify-between rounded-xl p-2.5 ${isMe ? "bg-brand-green/10 ring-1 ring-inset ring-brand-green/30" : "bg-white ring-1 ring-black/5"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `w-4 text-xs font-bold ${isMe ? "text-brand-green" : "text-zinc-400"}`,
											children: index + 1
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `grid size-8 place-items-center rounded-full text-[10px] font-bold ${isMe ? "bg-brand-green text-white shadow-sm" : "bg-zinc-100 text-zinc-500"}`,
											children: row.alias?.slice(0, 2).toUpperCase()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-sm text-gray-800 ${isMe ? "font-bold" : "font-medium"}`,
											children: row.alias
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `text-xs font-bold tabular-nums ${isMe ? "text-brand-green" : "text-gray-600"}`,
									children: [row.xpTotal.toLocaleString("es"), " XP"]
								})]
							}, row.id);
						})
					})] })
				]
			})
		]
	});
};
function ProgressRing({ percent }) {
	const size = 128;
	const stroke = 12;
	const radius = (size - stroke) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference * (1 - percent / 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		className: "-rotate-90 drop-shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: size / 2,
			cy: size / 2,
			r: radius,
			stroke: "var(--color-brand-paper)",
			strokeWidth: stroke,
			fill: "none",
			className: "[stroke:theme(colors.zinc.200)]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: size / 2,
			cy: size / 2,
			r: radius,
			stroke: "var(--color-brand-green)",
			strokeWidth: stroke,
			strokeLinecap: "round",
			fill: "none",
			strokeDasharray: circumference,
			strokeDashoffset: offset,
			style: { transition: "stroke-dashoffset 1s ease-in-out" }
		})]
	});
}
var SplitComponent = DashboardContent;
//#endregion
export { SplitComponent as component };
