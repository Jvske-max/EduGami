import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as loginUser } from "./auth.service-Cao6cV6i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Ynj7OA8f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const handleLogin = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		try {
			const data = await loginUser({
				email,
				password
			});
			localStorage.setItem("edugami_token", data.token);
			localStorage.setItem("edugami_role", data.user.role);
			if (data.user.role === "TEACHER") navigate({ to: "/teacher" });
			else navigate({ to: "/" });
		} catch (err) {
			console.error(err);
			setError(err.response?.data?.error || "Credenciales incorrectas. Intenta nuevamente.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-md p-8 sm:p-10 bg-brand-paper border-2 border-border rounded-[28px] shadow-sm font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-3xl font-extrabold tracking-tight text-gray-800",
					children: [
						"¡Bienvenido a ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand-green",
							children: "EduGami"
						}),
						"! 🎮"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground font-bold mt-2 text-sm",
					children: "Ingresa tus datos para continuar tu aventura."
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 mb-6 text-sm font-bold text-destructive bg-destructive/10 border-2 border-destructive/20 rounded-xl text-center",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleLogin,
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
						children: "Correo Electrónico"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						placeholder: "tu@correo.com",
						className: "w-full px-4 py-3 bg-white border border-zinc-200 text-foreground rounded-xl outline-none focus:border-brand-green focus:ring-4 focus:ring-green-100 transition-all font-medium placeholder:text-zinc-400",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-[11px] font-bold text-zinc-500 mb-1.5 uppercase tracking-wider",
						children: "Contraseña"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						placeholder: "••••••••",
						className: "w-full px-4 py-3 bg-white border border-zinc-200 text-foreground rounded-xl outline-none focus:border-brand-green focus:ring-4 focus:ring-green-100 transition-all font-medium placeholder:text-zinc-400",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: isLoading,
						className: "w-full py-4 mt-2 font-extrabold text-white bg-brand-green rounded-xl shadow-[0_4px_0_0_#46a302] tactile transition-colors hover:bg-brand-green-dark uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed",
						children: isLoading ? "INGRESANDO..." : "INICIAR SESIÓN"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-bold text-zinc-500",
					children: [
						"¿Aún no tienes una cuenta?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/register",
							className: "text-brand-green hover:underline",
							children: "Regístrate aquí"
						})
					]
				})
			})
		]
	});
};
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "min-h-screen flex items-center justify-center bg-brand-cream p-4",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Login, {})
});
//#endregion
export { SplitComponent as component };
