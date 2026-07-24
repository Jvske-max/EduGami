import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as registerUser } from "./auth.service-Cao6cV6i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-BD0MhihI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Register = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		email: "",
		password: "",
		role: "STUDENT"
	});
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		try {
			await registerUser(formData);
			setSuccess(true);
			setTimeout(() => {
				navigate({ to: "/login" });
			}, 2e3);
		} catch (err) {
			console.error("Error al registrar:", err);
			const serverMessage = err.response?.data?.error;
			const networkMessage = err.message ? `Error de conexión: ${err.message}` : null;
			setError(serverMessage || networkMessage || "Ocurrió un error al registrar la cuenta.");
		} finally {
			setIsLoading(false);
		}
	};
	if (success) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-md p-10 bg-brand-paper border-2 border-border rounded-[28px] text-center shadow-sm font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-7xl mb-4 block animate-bounce",
				children: "🎉"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-extrabold tracking-tight text-gray-800 mb-2",
				children: "¡Cuenta Creada!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground font-bold",
				children: "Preparando tu entorno... redirigiendo al login."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-md p-8 sm:p-10 bg-brand-paper border-2 border-border rounded-[28px] shadow-sm font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-3xl font-extrabold tracking-tight text-gray-800",
					children: ["Únete a ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-brand-green",
						children: "EduGami"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground font-bold mt-2 text-sm",
					children: "Tu aventura de aprendizaje comienza hoy."
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 mb-6 text-sm font-bold text-destructive bg-destructive/10 border-2 border-destructive/20 rounded-xl text-center",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex bg-zinc-100 p-1.5 rounded-2xl mb-6 shadow-inner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFormData({
						...formData,
						role: "STUDENT"
					}),
					className: `flex-1 py-2 font-bold text-sm rounded-xl transition-all duration-200 ${formData.role === "STUDENT" ? "bg-white shadow-sm text-brand-blue ring-1 ring-black/5" : "text-zinc-400 hover:text-zinc-600"}`,
					children: "👨‍🎓 Estudiante"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFormData({
						...formData,
						role: "TEACHER"
					}),
					className: `flex-1 py-2 font-bold text-sm rounded-xl transition-all duration-200 ${formData.role === "TEACHER" ? "bg-white shadow-sm text-brand-orange ring-1 ring-black/5" : "text-zinc-400 hover:text-zinc-600"}`,
					children: "👨‍🏫 Docente"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
						children: "Nombre Completo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						name: "name",
						placeholder: "Ej. Fernando Silva",
						className: "w-full px-4 py-3 bg-white border border-zinc-200 text-foreground rounded-xl outline-none focus:border-brand-green focus:ring-4 focus:ring-green-100 transition-all font-medium placeholder:text-zinc-400",
						value: formData.name,
						onChange: handleChange,
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
						children: "Correo Electrónico"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						name: "email",
						placeholder: "tu@correo.com",
						className: "w-full px-4 py-3 bg-white border border-zinc-200 text-foreground rounded-xl outline-none focus:border-brand-green focus:ring-4 focus:ring-green-100 transition-all font-medium placeholder:text-zinc-400",
						value: formData.email,
						onChange: handleChange,
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
						children: "Contraseña"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						name: "password",
						placeholder: "••••••••",
						className: "w-full px-4 py-3 bg-white border border-zinc-200 text-foreground rounded-xl outline-none focus:border-brand-green focus:ring-4 focus:ring-green-100 transition-all font-medium placeholder:text-zinc-400",
						value: formData.password,
						onChange: handleChange,
						minLength: 6,
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: isLoading,
						className: "w-full py-4 mt-2 font-extrabold text-white bg-brand-green rounded-xl shadow-[0_4px_0_0_#46a302] tactile transition-colors hover:bg-brand-green-dark uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed",
						children: isLoading ? "CREANDO CUENTA..." : "REGISTRARME"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-bold text-zinc-500",
					children: [
						"¿Ya tienes una cuenta?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "text-brand-green hover:underline",
							children: "Inicia sesión"
						})
					]
				})
			})
		]
	});
};
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "min-h-screen flex items-center justify-center bg-brand-cream p-4",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Register, {})
});
//#endregion
export { SplitComponent as component };
