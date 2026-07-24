import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as getCurrentProfile } from "./auth.service-Cao6cV6i.mjs";
import { A as Award, C as Copy, E as ChevronRight, M as Activity, O as BookOpen, S as ExternalLink, T as CircleCheck, a as Trash2, c as SquarePen, d as Settings, f as Search, g as LogOut, k as Bell, m as Plus, n as X, r as Users, t as Zap, x as FileText } from "../_libs/lucide-react.mjs";
import { i as deleteClassroom, n as createClassroom, o as getMyClassrooms, r as createQuiz, s as gradeSubmission, t as createAssignment, u as updateClassroom } from "./quiz.service-JkT41LD8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teacher-8R9MKrW2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TeacherDashboard = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = (0, import_react.useState)("principal");
	const [userProfile, setUserProfile] = (0, import_react.useState)(null);
	const [classrooms, setClassrooms] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [copiedId, setCopiedId] = (0, import_react.useState)(null);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedClassroomId, setSelectedClassroomId] = (0, import_react.useState)(null);
	const [gradingSubmission, setGradingSubmission] = (0, import_react.useState)(null);
	const [gradeForm, setGradeForm] = (0, import_react.useState)({
		grade: "",
		feedback: ""
	});
	const [isGrading, setIsGrading] = (0, import_react.useState)(false);
	const [isCreating, setIsCreating] = (0, import_react.useState)(false);
	const [newClass, setNewClass] = (0, import_react.useState)({
		title: "",
		section: "",
		stripeColor: "bg-brand-blue"
	});
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [isCreatingAssignment, setIsCreatingAssignment] = (0, import_react.useState)(false);
	const [newAssignment, setNewAssignment] = (0, import_react.useState)({
		title: "",
		description: "",
		classroomId: "",
		academicCutId: "",
		dueDate: ""
	});
	const [isSubmittingTask, setIsSubmittingTask] = (0, import_react.useState)(false);
	const [isCreatingQuiz, setIsCreatingQuiz] = (0, import_react.useState)(false);
	const [newQuiz, setNewQuiz] = (0, import_react.useState)({
		title: "",
		classroomId: "",
		academicCutId: "",
		xpReward: 40,
		questionText: "",
		correctOption: "",
		wrongOption: ""
	});
	const [isSubmittingQuiz, setIsSubmittingQuiz] = (0, import_react.useState)(false);
	const [editingClassroom, setEditingClassroom] = (0, import_react.useState)(null);
	const [deletingClassroom, setDeletingClassroom] = (0, import_react.useState)(null);
	const [isUpdatingClass, setIsUpdatingClass] = (0, import_react.useState)(false);
	const [isDeletingClass, setIsDeletingClass] = (0, import_react.useState)(false);
	const handleLogout = () => {
		localStorage.removeItem("edugami_token");
		localStorage.removeItem("edugami_role");
		navigate({ to: "/login" });
	};
	const loadDashboardData = async () => {
		try {
			const profileData = await getCurrentProfile();
			setUserProfile(profileData.user);
			const list = (await getMyClassrooms()).classrooms || [];
			setClassrooms(list);
			if (list.length > 0 && !selectedClassroomId) setSelectedClassroomId(list[0].id);
		} catch (error) {
			console.error("Error al cargar datos del profesor", error);
			handleLogout();
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
			if (role === "STUDENT") {
				navigate({ to: "/" });
				return;
			}
		}
		loadDashboardData();
	}, []);
	const copyToClipboard = (id) => {
		navigator.clipboard.writeText(id);
		setCopiedId(id);
		setTimeout(() => setCopiedId(null), 2e3);
	};
	const handleCreateClass = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			await createClassroom(newClass);
			await loadDashboardData();
			setIsCreating(false);
			setNewClass({
				title: "",
				section: "",
				stripeColor: "bg-brand-blue"
			});
		} catch (error) {
			alert("Error al crear el aula. Verifica los datos.");
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleCreateAssignment = async (e) => {
		e.preventDefault();
		setIsSubmittingTask(true);
		try {
			await createAssignment(newAssignment);
			await loadDashboardData();
			alert("¡Tarea asignada exitosamente!");
			setIsCreatingAssignment(false);
			setNewAssignment({
				title: "",
				description: "",
				classroomId: "",
				academicCutId: "",
				dueDate: ""
			});
		} catch (error) {
			alert("Error al crear la tarea. Verifica los datos.");
		} finally {
			setIsSubmittingTask(false);
		}
	};
	const handleCreateQuiz = async (e) => {
		e.preventDefault();
		setIsSubmittingQuiz(true);
		try {
			await createQuiz({
				title: newQuiz.title,
				xpReward: Number(newQuiz.xpReward),
				academicCutId: newQuiz.academicCutId,
				questions: [{
					text: newQuiz.questionText,
					options: [{
						text: newQuiz.correctOption,
						isCorrect: true
					}, {
						text: newQuiz.wrongOption,
						isCorrect: false
					}]
				}]
			});
			await loadDashboardData();
			alert("¡Quiz gamificado creado con éxito!");
			setIsCreatingQuiz(false);
			setNewQuiz({
				title: "",
				classroomId: "",
				academicCutId: "",
				xpReward: 40,
				questionText: "",
				correctOption: "",
				wrongOption: ""
			});
		} catch (error) {
			alert("Error al crear el quiz.");
		} finally {
			setIsSubmittingQuiz(false);
		}
	};
	const handleGradeSubmit = async (e) => {
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
			setGradeForm({
				grade: "",
				feedback: ""
			});
		} catch (error) {
			alert("Error al calificar la entrega.");
		} finally {
			setIsGrading(false);
		}
	};
	const handleUpdateClassroom = async (e) => {
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
			if (selectedClassroomId === deletingClassroom.id) setSelectedClassroomId(null);
		} catch (error) {
			alert("Error al eliminar el aula.");
		} finally {
			setIsDeletingClass(false);
		}
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex-1 min-h-screen bg-brand-cream flex justify-center items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-2xl font-bold text-brand-orange animate-pulse",
			children: "Cargando Centro de Comando... ⚙️"
		})
	});
	const currentSelectedClassroom = classrooms.find((c) => c.id === selectedClassroomId) || classrooms[0];
	const studentDirectory = [];
	classrooms.forEach((cls) => {
		(cls.students || []).forEach((st) => {
			let gradedSum = 0;
			let gradedCount = 0;
			let submissionsCount = 0;
			(cls.assignments || []).forEach((asg) => {
				const sub = (asg.submissions || []).find((s) => s.studentId === st.id);
				if (sub) {
					submissionsCount++;
					if (sub.grade !== null && sub.grade !== void 0) {
						gradedSum += Number(sub.grade);
						gradedCount++;
					}
				}
			});
			let quizzesCompleted = 0;
			(cls.cuts || []).forEach((cut) => {
				(cut.quizzes || []).forEach((qz) => {
					if ((qz.attempts || []).find((a) => a.studentId === st.id)) quizzesCompleted++;
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
	const filteredStudents = studentDirectory.filter((item) => item.student.name?.toLowerCase().includes(searchQuery.toLowerCase()) || item.student.alias?.toLowerCase().includes(searchQuery.toLowerCase()) || item.student.email?.toLowerCase().includes(searchQuery.toLowerCase()) || item.classroomTitle.toLowerCase().includes(searchQuery.toLowerCase()));
	const selectedClassForTask = classrooms.find((c) => c.id === newAssignment.classroomId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen w-full bg-brand-cream font-sans text-zinc-900 selection:bg-brand-orange/20 overflow-hidden relative",
		children: [
			gradingSubmission && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white w-full max-w-md rounded-[28px] p-8 shadow-2xl relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setGradingSubmission(null),
							className: "absolute top-6 right-6 text-zinc-400 hover:text-zinc-700",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-12 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {
								className: "size-6",
								strokeWidth: 2.5
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-gray-800 mb-1",
							children: "Calificar Entrega"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold text-brand-blue mb-1",
							children: gradingSubmission.assignmentTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-zinc-500 mb-4",
							children: ["Estudiante: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: gradingSubmission.studentName })]
						}),
						gradingSubmission.contentUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: gradingSubmission.contentUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex items-center gap-2 text-xs font-bold text-brand-blue bg-blue-50 px-3 py-2 rounded-xl mb-6 hover:bg-blue-100 transition-colors w-full justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), " Ver Archivo / Trabajo Entregado"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleGradeSubmit,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
									children: "Nota (Escala 0 - 20 pts)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									max: "20",
									step: "0.5",
									required: true,
									placeholder: "Ej. 18.5",
									className: "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100 font-medium",
									value: gradeForm.grade,
									onChange: (e) => setGradeForm({
										...gradeForm,
										grade: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
									children: "Retroalimentación / Comentarios"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 3,
									placeholder: "Excelente trabajo, bien estructurado...",
									className: "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100 font-medium",
									value: gradeForm.feedback,
									onChange: (e) => setGradeForm({
										...gradeForm,
										feedback: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: isGrading,
									className: "tactile w-full py-3.5 font-bold text-white bg-brand-blue rounded-xl shadow-[0_4px_0_0_#1cb0f6] hover:bg-blue-500 disabled:opacity-50 mt-2",
									children: isGrading ? "Guardando..." : "Guardar Calificación"
								})
							]
						})
					]
				})
			}),
			editingClassroom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white w-full max-w-md rounded-[28px] p-8 shadow-2xl relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setEditingClassroom(null),
							className: "absolute top-6 right-6 text-zinc-400 hover:text-zinc-700",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "text-brand-orange size-6" }), " Modificar Aula"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleUpdateClassroom,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
									children: "Nombre de la Materia"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									className: "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-orange font-medium",
									value: editingClassroom.title,
									onChange: (e) => setEditingClassroom({
										...editingClassroom,
										title: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
									children: "Sección / Turno"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									className: "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-orange font-medium",
									value: editingClassroom.section,
									onChange: (e) => setEditingClassroom({
										...editingClassroom,
										section: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-[11px] font-bold text-zinc-500 mb-2 uppercase tracking-wider",
									children: "Color del Aula"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-3",
									children: [
										"bg-brand-blue",
										"bg-brand-green",
										"bg-brand-orange",
										"bg-brand-purple",
										"bg-red-500"
									].map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setEditingClassroom({
											...editingClassroom,
											stripeColor: color
										}),
										className: `size-8 rounded-full ${color} transition-transform ${editingClassroom.stripeColor === color ? "scale-125 ring-4 ring-offset-2 ring-zinc-200" : "hover:scale-110"}`
									}, color))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: isUpdatingClass,
									className: "tactile w-full py-3.5 font-bold text-white bg-brand-orange rounded-xl shadow-[0_4px_0_0_#cc7800] hover:bg-orange-600 disabled:opacity-50 mt-4",
									children: isUpdatingClass ? "Guardando..." : "Guardar Cambios"
								})
							]
						})
					]
				})
			}),
			deletingClassroom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white w-full max-w-md rounded-[28px] p-8 shadow-2xl relative text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-14 place-items-center rounded-full bg-red-100 text-red-600 mx-auto mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-gray-800 mb-2",
							children: "¿Eliminar Aula?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-zinc-600 mb-6",
							children: [
								"Estás a punto de eliminar el aula ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									"\"",
									deletingClassroom.title,
									"\""
								] }),
								" (",
								deletingClassroom.section,
								"). Esta acción borrará todas sus tareas, quizzes y registros de forma permanente."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setDeletingClassroom(null),
								className: "flex-1 py-3 font-bold text-zinc-600 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-colors",
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleDeleteClassroom,
								disabled: isDeletingClass,
								className: "flex-1 py-3 font-bold text-white bg-red-600 rounded-xl shadow-[0_4px_0_0_#b91c1c] hover:bg-red-700 disabled:opacity-50 transition-colors",
								children: isDeletingClass ? "Eliminando..." : "Sí, Eliminar"
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
								className: "grid size-9 place-items-center rounded-xl bg-brand-orange shadow-[0_3px_0_0_#cc7800]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
									className: "size-5 text-white",
									strokeWidth: 3
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xl font-bold tracking-tight",
								children: ["EduGami ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-brand-orange",
									children: "Profe"
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 space-y-1",
						children: [
							{
								id: "principal",
								icon: Activity,
								label: "Panel Principal"
							},
							{
								id: "aulas",
								icon: BookOpen,
								label: "Mis Aulas"
							},
							{
								id: "estudiantes",
								icon: Users,
								label: "Estudiantes"
							},
							{
								id: "configuracion",
								icon: Settings,
								label: "Configuración"
							}
						].map((item) => {
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab(item.id),
								className: `w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === item.id ? "bg-brand-orange/10 text-brand-orange ring-1 ring-brand-orange/30" : "text-zinc-500 hover:bg-zinc-950/5"}`,
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
								className: "grid size-10 shrink-0 place-items-center rounded-full bg-brand-orange/20 text-sm font-bold text-brand-orange",
								children: userProfile?.alias?.substring(0, 2).toUpperCase() || "PR"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-sm font-bold text-gray-800",
									children: ["Prof. ", userProfile?.alias || "Docente"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] font-bold uppercase tracking-wider text-zinc-500",
									children: "Docente Activo"
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
								placeholder: "Buscar por estudiante, materia o entrega...",
								className: "w-full rounded-xl border border-zinc-950/5 bg-white py-2.5 pl-9 pr-3 text-sm outline-none ring-brand-orange/30 transition placeholder:text-zinc-400 focus:ring-2 font-medium",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "tactile grid size-10 place-items-center rounded-xl bg-white text-zinc-600 shadow-black/10 ring-1 ring-black/5 hover:text-brand-orange",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
								className: "size-4",
								strokeWidth: 2.5
							})
						})]
					}),
					activeTab === "principal" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-in fade-in",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "mb-8 flex justify-between items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "mb-2 text-3xl font-bold leading-tight tracking-tight text-balance",
									children: [
										"¡Hola, ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-brand-orange",
											children: ["Prof. ", userProfile?.alias]
										}),
										"! 👨‍🏫"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-[56ch] text-pretty text-zinc-500 font-medium",
									children: "Bienvenido al Centro de Comando. Diseña actividades y monitorea el rendimiento académico."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setIsCreating(!isCreating);
										setIsCreatingAssignment(false);
										setIsCreatingQuiz(false);
									},
									className: "tactile inline-flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white shadow-[0_4px_0_0_#cc7800] transition-colors hover:bg-orange-600",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
										className: "size-4",
										strokeWidth: 3
									}), isCreating ? "Cancelar" : "Nueva Aula"]
								})]
							}),
							isCreatingAssignment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleCreateAssignment,
								className: "mb-10 p-8 bg-white border-2 border-brand-blue/20 rounded-[28px] shadow-sm animate-in fade-in slide-in-from-top-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-xl font-bold text-gray-800 mb-6 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "text-brand-blue" }), " Asignar Nueva Tarea"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
											children: "Título de la Tarea"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											required: true,
											placeholder: "Ej. Ensayo sobre Modelo OSI",
											className: "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue font-medium",
											value: newAssignment.title,
											onChange: (e) => setNewAssignment({
												...newAssignment,
												title: e.target.value
											})
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
											children: "Fecha Límite"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											required: true,
											className: "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue font-medium text-zinc-600",
											value: newAssignment.dueDate,
											onChange: (e) => setNewAssignment({
												...newAssignment,
												dueDate: e.target.value
											})
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
											children: "Aula Destino"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											required: true,
											className: "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue font-medium",
											value: newAssignment.classroomId,
											onChange: (e) => setNewAssignment({
												...newAssignment,
												classroomId: e.target.value,
												academicCutId: ""
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												disabled: true,
												children: "Selecciona un aula..."
											}), classrooms.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: c.id,
												children: [
													c.title,
													" (",
													c.section,
													")"
												]
											}, c.id))]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
											children: "Corte Académico"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											required: true,
											disabled: !newAssignment.classroomId,
											className: "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue font-medium disabled:opacity-50",
											value: newAssignment.academicCutId,
											onChange: (e) => setNewAssignment({
												...newAssignment,
												academicCutId: e.target.value
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												disabled: true,
												children: "Selecciona el corte..."
											}), selectedClassForTask?.cuts?.map((cut) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: cut.id,
												children: [
													cut.name,
													" (",
													cut.weight,
													"%)"
												]
											}, cut.id))]
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
											children: "Instrucciones (Opcional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											placeholder: "Detalla lo que el estudiante debe hacer...",
											rows: 3,
											className: "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-blue font-medium",
											value: newAssignment.description,
											onChange: (e) => setNewAssignment({
												...newAssignment,
												description: e.target.value
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: isSubmittingTask || !newAssignment.academicCutId,
										className: "tactile px-8 py-3 font-bold text-white bg-brand-blue rounded-xl shadow-[0_4px_0_0_#1cb0f6] hover:bg-blue-500 disabled:opacity-50",
										children: isSubmittingTask ? "Publicando..." : "Publicar Tarea"
									})
								]
							}),
							isCreatingQuiz && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleCreateQuiz,
								className: "mb-10 p-8 bg-white border-2 border-brand-green/20 rounded-[28px] shadow-sm animate-in fade-in slide-in-from-top-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-xl font-bold text-gray-800 mb-6 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "text-brand-green" }), " Diseñar Nuevo Quiz"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
											children: "Título del Quiz"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											required: true,
											placeholder: "Ej. Control de Lectura 1",
											className: "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-green font-medium",
											value: newQuiz.title,
											onChange: (e) => setNewQuiz({
												...newQuiz,
												title: e.target.value
											})
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
											children: "Recompensa (XP)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											required: true,
											min: "10",
											step: "10",
											className: "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-green font-medium text-brand-green",
											value: newQuiz.xpReward,
											onChange: (e) => setNewQuiz({
												...newQuiz,
												xpReward: Number(e.target.value)
											})
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
											children: "Aula Destino"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											required: true,
											className: "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-green font-medium",
											value: newQuiz.classroomId,
											onChange: (e) => setNewQuiz({
												...newQuiz,
												classroomId: e.target.value,
												academicCutId: ""
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												disabled: true,
												children: "Selecciona un aula..."
											}), classrooms.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: c.id,
												children: [
													c.title,
													" (",
													c.section,
													")"
												]
											}, c.id))]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
											children: "Corte Académico"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											required: true,
											disabled: !newQuiz.classroomId,
											className: "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-brand-green font-medium disabled:opacity-50",
											value: newQuiz.academicCutId,
											onChange: (e) => setNewQuiz({
												...newQuiz,
												academicCutId: e.target.value
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												disabled: true,
												children: "Selecciona el corte..."
											}), classrooms.find((c) => c.id === newQuiz.classroomId)?.cuts?.map((cut) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: cut.id,
												children: [
													cut.name,
													" (",
													cut.weight,
													"%)"
												]
											}, cut.id))]
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-5 bg-brand-paper rounded-2xl border border-zinc-200 mb-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-sm font-bold text-gray-800 mb-4",
											children: "Pregunta de Evaluación Rápida"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
												children: "Pregunta"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												required: true,
												placeholder: "Ej. ¿Qué capa del Modelo OSI enruta los paquetes?",
												className: "w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl outline-none focus:border-brand-green",
												value: newQuiz.questionText,
												onChange: (e) => setNewQuiz({
													...newQuiz,
													questionText: e.target.value
												})
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 md:grid-cols-2 gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-[11px] font-bold text-brand-green mb-1.5 uppercase tracking-wider",
													children: "Opción Correcta"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													required: true,
													placeholder: "Ej. Capa de Red",
													className: "w-full px-4 py-3 bg-white border border-brand-green/30 rounded-xl outline-none focus:border-brand-green",
													value: newQuiz.correctOption,
													onChange: (e) => setNewQuiz({
														...newQuiz,
														correctOption: e.target.value
													})
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block text-[11px] font-bold text-red-500 mb-1.5 uppercase tracking-wider",
													children: "Opción Incorrecta"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													required: true,
													placeholder: "Ej. Capa Física",
													className: "w-full px-4 py-3 bg-white border border-red-200 rounded-xl outline-none focus:border-red-500",
													value: newQuiz.wrongOption,
													onChange: (e) => setNewQuiz({
														...newQuiz,
														wrongOption: e.target.value
													})
												})] })]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: isSubmittingQuiz || !newQuiz.academicCutId,
										className: "tactile px-8 py-3 font-bold text-white bg-brand-green rounded-xl shadow-[0_4px_0_0_#46a302] hover:bg-green-600 disabled:opacity-50",
										children: isSubmittingQuiz ? "Publicando..." : "Publicar Quiz"
									})
								]
							}),
							isCreating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleCreateClass,
								className: "mb-10 p-8 bg-white border-2 border-brand-orange/20 rounded-[28px] shadow-sm animate-in fade-in slide-in-from-top-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold text-gray-800 mb-6",
										children: "Configurar Nueva Aula"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
											children: "Nombre de la Materia"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											required: true,
											placeholder: "Ej. Ingeniería de Software",
											className: "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-foreground rounded-xl outline-none focus:border-brand-orange font-medium",
											value: newClass.title,
											onChange: (e) => setNewClass({
												...newClass,
												title: e.target.value
											})
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
											children: "Sección o Turno"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											required: true,
											placeholder: "Ej. Sección 8A - Noche",
											className: "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-foreground rounded-xl outline-none focus:border-brand-orange font-medium",
											value: newClass.section,
											onChange: (e) => setNewClass({
												...newClass,
												section: e.target.value
											})
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] font-bold text-zinc-500 mb-3 uppercase tracking-wider",
											children: "Color del Aula"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex gap-4",
											children: [
												"bg-brand-blue",
												"bg-brand-green",
												"bg-brand-orange",
												"bg-brand-purple",
												"bg-red-500"
											].map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setNewClass({
													...newClass,
													stripeColor: color
												}),
												className: `size-10 rounded-full ${color} transition-transform ${newClass.stripeColor === color ? "scale-125 ring-4 ring-offset-2 ring-zinc-200" : "hover:scale-110"}`
											}, color))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: isSubmitting,
										className: "tactile px-8 py-3 font-bold text-white bg-brand-orange rounded-xl shadow-[0_4px_0_0_#cc7800] hover:bg-orange-600 disabled:opacity-50",
										children: isSubmitting ? "Generando..." : "Crear Aula y Generar Código"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "mb-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-6 flex justify-between items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold text-gray-800",
										children: "Aulas Activas"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setActiveTab("aulas"),
										className: "text-sm font-bold text-brand-orange hover:underline flex items-center gap-1",
										children: ["Ver detalle completo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
									})]
								}), classrooms.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center justify-center rounded-[28px] bg-brand-paper p-12 ring-1 ring-black/5 text-center border-2 border-dashed border-zinc-200",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-6xl mb-4 block opacity-50",
											children: "🏫"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-2xl font-bold text-gray-800 mb-2",
											children: "No tienes aulas creadas"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-zinc-500 font-medium max-w-md",
											children: "Crea tu primera clase para empezar a gestionar entregas y publicar actividades gamificadas."
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-5",
									children: classrooms.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "overflow-hidden rounded-[20px] bg-white p-1 ring-1 ring-black/5 transition shadow-sm group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-3 rounded-t-[19px] ${c.stripeColor || "bg-brand-blue"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between items-start mb-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-xl font-bold text-gray-800",
													children: c.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm text-zinc-500 font-medium",
													children: c.section
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-col items-center justify-center bg-zinc-50 rounded-xl px-3 py-2 border border-zinc-100",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-lg font-bold text-brand-orange",
														children: c._count?.students || 0
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-bold uppercase text-zinc-400",
														children: "Alumnos"
													})]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-4 p-3 bg-brand-paper rounded-xl border border-zinc-200 flex justify-between items-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "overflow-hidden",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] font-bold uppercase text-zinc-500 mb-1",
														children: "Código de Acceso"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-mono text-sm font-bold text-gray-800 truncate",
														children: c.id
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => copyToClipboard(c.id),
													className: "p-2 bg-white rounded-lg border border-zinc-200 text-zinc-500 hover:text-brand-orange hover:border-brand-orange transition-colors",
													title: "Copiar Código",
													children: copiedId === c.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-brand-green" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
												})]
											})]
										})]
									}, c.id))
								})]
							})
						]
					}),
					activeTab === "aulas" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-in fade-in",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-3xl font-bold leading-tight tracking-tight",
								children: [
									"Mis ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-brand-orange",
										children: "Aulas y Evaluaciones"
									}),
									" 📖"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-zinc-500 font-medium mt-1",
								children: "Selecciona una de tus clases para revisar las actividades publicadas y el listado de estudiantes que han cumplido con sus entregas."
							})]
						}), classrooms.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-12 bg-brand-paper border-2 border-dashed border-zinc-200 rounded-[28px] text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-5xl block mb-3",
									children: "📚"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold text-gray-800",
									children: "Aún no has creado ninguna clase"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-zinc-500 mt-1 mb-6",
									children: "Dirígete al Panel Principal o usa el botón de \"Nueva Aula\"."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setActiveTab("principal");
										setIsCreating(true);
									},
									className: "px-6 py-3 bg-brand-orange text-white font-bold rounded-xl shadow-[0_4px_0_0_#cc7800]",
									children: "+ Crear Mi Primera Aula"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-3 overflow-x-auto pb-2 scrollbar-none",
								children: classrooms.map((cls) => {
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setSelectedClassroomId(cls.id),
										className: `flex items-center gap-3 px-5 py-3 rounded-2xl font-bold text-sm transition-all shrink-0 ${cls.id === currentSelectedClassroom?.id ? "bg-white shadow-md border-2 border-brand-orange text-brand-orange" : "bg-white/60 border border-zinc-200 text-zinc-600 hover:bg-white"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-3 rounded-full ${cls.stripeColor || "bg-brand-blue"}` }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												cls.title,
												" (",
												cls.section,
												")"
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full font-bold",
												children: [cls._count?.students || 0, " est."]
											})
										]
									}, cls.id);
								})
							}), currentSelectedClassroom && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white border-2 border-zinc-200 rounded-[28px] p-8 shadow-sm space-y-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap justify-between items-center gap-4 pb-6 border-b border-zinc-100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-4 rounded-full ${currentSelectedClassroom.stripeColor || "bg-brand-blue"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "text-2xl font-bold text-gray-800",
												children: currentSelectedClassroom.title
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm font-semibold text-zinc-500 mt-1",
											children: [
												"Sección: ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currentSelectedClassroom.section }),
												" • Código: ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
													className: "bg-zinc-100 px-2 py-0.5 rounded text-gray-700",
													children: currentSelectedClassroom.id
												})
											]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													setNewAssignment({
														...newAssignment,
														classroomId: currentSelectedClassroom.id
													});
													setIsCreatingAssignment(true);
													setActiveTab("principal");
												},
												className: "px-4 py-2 bg-brand-blue/10 text-brand-blue font-bold text-xs rounded-xl hover:bg-brand-blue/20 transition-colors",
												children: "+ Asignar Tarea"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													setNewQuiz({
														...newQuiz,
														classroomId: currentSelectedClassroom.id
													});
													setIsCreatingQuiz(true);
													setActiveTab("principal");
												},
												className: "px-4 py-2 bg-brand-green/10 text-brand-green font-bold text-xs rounded-xl hover:bg-brand-green/20 transition-colors",
												children: "+ Diseñar Quiz"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-lg font-bold text-gray-800 mb-4 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "text-brand-blue size-5" }), " Tareas Tradicionales y Entregas"]
									}), !currentSelectedClassroom.assignments || currentSelectedClassroom.assignments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-zinc-400 italic bg-zinc-50 p-4 rounded-xl border border-zinc-100",
										children: "No has publicado tareas en esta aula todavía."
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-4",
										children: currentSelectedClassroom.assignments.map((asg) => {
											const submissions = asg.submissions || [];
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "border-2 border-zinc-100 bg-zinc-50/50 rounded-2xl p-5 hover:border-brand-blue/30 transition-colors",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap justify-between items-start gap-2 mb-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "font-bold text-gray-800 text-base",
														children: asg.title
													}), asg.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-zinc-500 mt-1",
														children: asg.description
													})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] font-bold bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full",
															children: asg.academicCut?.name || "Corte Académico"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] font-bold text-zinc-400 bg-white border border-zinc-200 px-3 py-1 rounded-full",
															children: asg.dueDate ? `Límite: ${new Date(asg.dueDate).toLocaleDateString()}` : "Sin fecha"
														})]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-4 pt-4 border-t border-zinc-200/60",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3",
														children: [
															"Entregas Recibidas (",
															submissions.length,
															" / ",
															currentSelectedClassroom._count?.students || 0,
															" estudiantes)"
														]
													}), submissions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-zinc-400 italic",
														children: "Ningún estudiante ha entregado esta tarea aún."
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "grid grid-cols-1 md:grid-cols-2 gap-3",
														children: submissions.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "bg-white p-3.5 rounded-xl border border-zinc-200 flex justify-between items-center shadow-xs",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "text-sm font-bold text-gray-800",
																	children: sub.student?.name || sub.student?.alias || "Estudiante"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "text-[10px] text-zinc-400",
																	children: new Date(sub.submittedAt).toLocaleString()
																}),
																sub.contentUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
																	href: sub.contentUrl,
																	target: "_blank",
																	rel: "noopener noreferrer",
																	className: "text-xs text-brand-blue font-bold hover:underline flex items-center gap-1 mt-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" }), " Ver trabajo"]
																})
															] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "text-right",
																children: [sub.grade !== null && sub.grade !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "inline-block text-xs font-extrabold text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-lg",
																	children: [sub.grade, " / 20 pts"]
																}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "inline-block text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md",
																	children: "Pendiente"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	onClick: () => {
																		setGradingSubmission({
																			id: sub.id,
																			studentName: sub.student?.name || sub.student?.alias,
																			assignmentTitle: asg.title,
																			contentUrl: sub.contentUrl
																		});
																		setGradeForm({
																			grade: sub.grade !== null ? String(sub.grade) : "",
																			feedback: sub.feedback || ""
																		});
																	},
																	className: "block text-[11px] font-bold text-brand-blue hover:underline mt-1 ml-auto",
																	children: sub.grade !== null ? "Modificar Nota" : "Calificar"
																})]
															})]
														}, sub.id))
													})]
												})]
											}, asg.id);
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-lg font-bold text-gray-800 mb-4 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "text-brand-green size-5" }), " Quizzes y Desafíos Gamificados"]
									}), !currentSelectedClassroom.cuts || !currentSelectedClassroom.cuts.some((c) => c.quizzes?.length > 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-zinc-400 italic bg-zinc-50 p-4 rounded-xl border border-zinc-100",
										children: "No hay quizzes publicados en esta aula aún."
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-4",
										children: currentSelectedClassroom.cuts.flatMap((cut) => cut.quizzes || []).map((qz) => {
											const attempts = qz.attempts || [];
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "border-2 border-zinc-100 bg-zinc-50/50 rounded-2xl p-5 hover:border-brand-green/30 transition-colors",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex justify-between items-start gap-2 mb-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
														className: "font-bold text-gray-800 text-base flex items-center gap-2",
														children: [qz.title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-xs font-extrabold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-md",
															children: [
																"+",
																qz.xpReward,
																" XP"
															]
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xs text-zinc-500 mt-1",
														children: [qz.questions?.length || 0, " pregunta(s)"]
													})] })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-4 pt-4 border-t border-zinc-200/60",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3",
														children: [
															"Estudiantes que Completaron (",
															attempts.length,
															" registrados)"
														]
													}), attempts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-zinc-400 italic",
														children: "Ningún estudiante ha resuelto este quiz todavía."
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "grid grid-cols-1 md:grid-cols-2 gap-3",
														children: attempts.map((att) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "bg-white p-3.5 rounded-xl border border-zinc-200 flex justify-between items-center shadow-xs",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-sm font-bold text-gray-800",
																children: att.student?.name || att.student?.alias || "Estudiante"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[10px] text-zinc-400",
																children: new Date(att.completedAt).toLocaleString()
															})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-right",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "inline-block text-xs font-bold text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-lg",
																	children: [
																		"Puntuación: ",
																		att.score,
																		" pts (+",
																		att.xpEarned,
																		" XP)"
																	]
																})
															})]
														}, att.id))
													})]
												})]
											}, qz.id);
										})
									})] })
								]
							})]
						})]
					}),
					activeTab === "estudiantes" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-in fade-in",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "mb-8 flex flex-wrap justify-between items-end gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-3xl font-bold leading-tight tracking-tight",
								children: [
									"Directorio de ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-brand-orange",
										children: "Estudiantes"
									}),
									" 👨‍🎓"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-zinc-500 font-medium mt-1",
								children: "Consulta el listado completo de alumnos inscritos en tus aulas, sus entregas y su nota acumulada del semestre."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white px-4 py-2 rounded-xl border border-zinc-200 shadow-xs flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-brand-orange" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-bold text-gray-800",
									children: [
										"Total: ",
										filteredStudents.length,
										" Alumnos"
									]
								})]
							})]
						}), filteredStudents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-12 bg-white border-2 border-dashed border-zinc-200 rounded-[28px] text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-5xl block mb-3",
									children: "🔍"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold text-gray-800",
									children: "No se encontraron estudiantes"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-zinc-500 mt-1",
									children: "Intenta con otro término de búsqueda o asegúrate de que los estudiantes usen el código de aula para unirse."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-white border-2 border-zinc-200 rounded-[28px] overflow-hidden shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left border-collapse",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "bg-zinc-50 border-b border-zinc-200 text-[11px] font-bold text-zinc-500 uppercase tracking-wider",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6",
												children: "Estudiante"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6",
												children: "Aula / Materia"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6",
												children: "Sección"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6 text-center",
												children: "Actividades Cumplidas"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-4 px-6 text-right",
												children: "Nota Acumulada"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-zinc-100",
										children: filteredStudents.map((item, idx) => {
											const grade = item.accumulatedGrade;
											let gradeBadge = "bg-zinc-100 text-zinc-600";
											if (grade >= 16) gradeBadge = "bg-brand-green/15 text-brand-green font-bold";
											else if (grade >= 10) gradeBadge = "bg-brand-orange/15 text-brand-orange font-bold";
											else if (grade > 0) gradeBadge = "bg-red-100 text-red-600 font-bold";
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "hover:bg-zinc-50/80 transition-colors",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-4 px-6",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-3",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "grid size-9 place-items-center rounded-full bg-brand-orange/20 text-brand-orange font-bold text-sm",
																children: item.student.alias?.substring(0, 2).toUpperCase() || "ES"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-bold text-gray-800 text-sm",
																children: item.student.name || item.student.alias
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-xs text-zinc-400",
																children: item.student.email
															})] })]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-4 px-6 font-bold text-sm text-gray-700",
														children: item.classroomTitle
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-4 px-6 text-sm text-zinc-500 font-medium",
														children: item.section
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-4 px-6 text-center",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "inline-flex items-center gap-2 text-xs font-bold text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
																	"📝 ",
																	item.submissionsCount,
																	" Tareas"
																] }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
																	"⚡ ",
																	item.quizzesCompleted,
																	" Quizzes"
																] })
															]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-4 px-6 text-right",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: `inline-block px-3 py-1.5 rounded-xl text-sm ${gradeBadge}`,
															children: grade > 0 ? `${grade} / 20 pts` : "Sin notas"
														})
													})
												]
											}, `${item.student.id}_${idx}`);
										})
									})]
								})
							})
						})]
					}),
					activeTab === "configuracion" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-in fade-in",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-3xl font-bold leading-tight tracking-tight",
								children: [
									"Configuración y ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-brand-orange",
										children: "Gestión de Aulas"
									}),
									" ⚙️"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-zinc-500 font-medium mt-1",
								children: "Edita la información de tus materias, actualiza nombres o secciones y elimina aulas que ya no utilices."
							})]
						}), classrooms.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-12 bg-white border-2 border-dashed border-zinc-200 rounded-[28px] text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-5xl block mb-3",
									children: "🏫"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold text-gray-800",
									children: "No hay aulas para configurar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-zinc-500 mt-1",
									children: "Crea tu primera clase desde el panel principal."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-6",
							children: classrooms.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white border-2 border-zinc-200 rounded-[24px] overflow-hidden p-6 shadow-sm hover:border-brand-orange/40 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-start mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-4 rounded-full ${c.stripeColor || "bg-brand-blue"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-xl font-bold text-gray-800",
												children: c.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-zinc-500 font-semibold",
												children: c.section
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setEditingClassroom({
													id: c.id,
													title: c.title,
													section: c.section,
													stripeColor: c.stripeColor
												}),
												className: "p-2 bg-zinc-100 hover:bg-brand-orange/10 hover:text-brand-orange text-zinc-600 rounded-xl transition-colors",
												title: "Modificar Aula",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "size-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setDeletingClassroom({
													id: c.id,
													title: c.title,
													section: c.section
												}),
												className: "p-2 bg-zinc-100 hover:bg-red-100 hover:text-red-600 text-zinc-600 rounded-xl transition-colors",
												title: "Eliminar Aula",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-xs space-y-1.5 text-zinc-600 mb-4 font-medium",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"• ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c._count?.students || 0 }),
												" Estudiantes inscritos"
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"• ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.assignments?.length || 0 }),
												" Tareas tradicionales publicadas"
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"• ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: (c.cuts || []).reduce((acc, cut) => acc + (cut.quizzes?.length || 0), 0) }),
												" Quizzes gamificados"
											] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between pt-3 border-t border-zinc-100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-zinc-400 uppercase tracking-wider",
											children: "Código de inscripción"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
												className: "text-xs font-mono font-bold text-gray-800 bg-zinc-100 px-2 py-1 rounded",
												children: c.id
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => copyToClipboard(c.id),
												className: "text-xs font-bold text-brand-orange hover:underline",
												children: copiedId === c.id ? "¡Copiado!" : "Copiar"
											})]
										})]
									})
								]
							}, c.id))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "flex w-80 shrink-0 flex-col gap-6 overflow-y-auto border-l border-zinc-950/5 bg-brand-paper p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
							className: "size-6 text-brand-blue",
							strokeWidth: 2.5
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-bold uppercase tracking-wider text-zinc-500",
							children: "Tus Aulas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-bold leading-tight",
							children: classrooms.length
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
							className: "size-6 text-brand-purple",
							strokeWidth: 2.5
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-bold uppercase tracking-wider text-zinc-500",
							children: "Alumnos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-bold leading-tight",
							children: classrooms.reduce((acc, curr) => acc + (curr._count?.students || 0), 0)
						})] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[24px] bg-white p-6 ring-1 ring-black/5 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-bold text-gray-800 mb-4",
						children: "Creador Rápido"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setIsCreatingQuiz(!isCreatingQuiz);
								setIsCreatingAssignment(false);
								setIsCreating(false);
								setActiveTab("principal");
							},
							className: "w-full flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-brand-green hover:bg-brand-green/5 transition-colors group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-8 place-items-center rounded-lg bg-brand-green/10 text-brand-green",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-sm text-gray-700 group-hover:text-brand-green",
									children: "Nuevo Quiz"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 text-zinc-400 group-hover:text-brand-green" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setIsCreatingAssignment(!isCreatingAssignment);
								setIsCreatingQuiz(false);
								setIsCreating(false);
								setActiveTab("principal");
							},
							className: "w-full flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-100 hover:border-brand-blue hover:bg-brand-blue/5 transition-colors group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-8 place-items-center rounded-lg bg-brand-blue/10 text-brand-blue",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-sm text-gray-700 group-hover:text-brand-blue",
									children: "Nueva Tarea"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 text-zinc-400 group-hover:text-brand-blue" })]
						})]
					})]
				})]
			})
		]
	});
};
var SplitComponent = TeacherDashboard;
//#endregion
export { SplitComponent as component };
