import { o as __toESM } from "../_runtime.mjs";
import { t as api } from "./axios-DQ1GboXV.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leaderboard-B4V-pPnQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getLeaderboard = async () => {
	return (await api.get("/leaderboard")).data;
};
var Leaderboard = () => {
	useNavigate();
	const [students, setStudents] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const fetchTopStudents = async () => {
			try {
				setIsLoading(true);
				const data = await getLeaderboard();
				setStudents(data.leaderboard);
			} catch (err) {
				console.error(err);
				setError("No pudimos cargar la Liga Diamante. El servidor podría estar fuera de línea.");
			} finally {
				setIsLoading(false);
			}
		};
		fetchTopStudents();
	}, []);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-gray-500 font-bold font-geist text-xl text-center p-10",
		children: "Cargando clasificación... ⏳"
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-red-500 font-bold font-geist text-xl text-center p-10",
		children: [error, " ⚠️"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-2xl mx-auto p-8 bg-brand-paper border-2 border-gray-200 rounded-3xl shadow-[0_8px_0_0_rgba(229,231,235,1)] font-geist",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-between mb-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-4xl",
					children: "🏆"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-extrabold text-gray-800",
					children: "Liga Diamante"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-4",
			children: students.map((student, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between bg-white border-2 border-gray-200 p-4 rounded-2xl shadow-sm hover:border-brand-orange transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `text-2xl font-extrabold w-8 text-center ${index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : index === 2 ? "text-amber-700" : "text-gray-300"}`,
							children: ["#", index + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-gray-800 text-lg",
							children: student.alias
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-200",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "🔥"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-extrabold text-brand-orange",
								children: student.streak
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-extrabold text-brand-green text-xl tracking-tight",
					children: [student.xpTotal, " XP"]
				})]
			}, student.id))
		})]
	});
};
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "min-h-screen flex items-center justify-center bg-brand-cream p-4",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaderboard, {})
});
//#endregion
export { SplitComponent as component };
