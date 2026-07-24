import { t as axios } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/axios-DQ1GboXV.js
var rawBaseURL = "http://localhost:4000/api";
var getNormalizedBaseURL = (url) => {
	let cleaned = url.trim().replace(/\/+$/, "");
	if (!cleaned.endsWith("/api")) cleaned = `${cleaned}/api`;
	return cleaned;
};
var baseURL = getNormalizedBaseURL(rawBaseURL);
var api = axios.create({
	baseURL,
	headers: { "Content-Type": "application/json" }
});
api.interceptors.request.use((config) => {
	if (typeof window !== "undefined") {
		const token = localStorage.getItem("edugami_token");
		if (token) config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, (error) => {
	return Promise.reject(error);
});
//#endregion
export { api as t };
