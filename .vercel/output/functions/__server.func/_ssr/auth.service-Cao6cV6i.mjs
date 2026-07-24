import { t as api } from "./axios-DQ1GboXV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.service-Cao6cV6i.js
var loginUser = async (credentials) => {
	return (await api.post("/auth/login", credentials)).data;
};
var registerUser = async (userData) => {
	return (await api.post("/auth/register", userData)).data;
};
var getCurrentProfile = async () => {
	return (await api.get("/auth/me")).data;
};
//#endregion
export { loginUser as n, registerUser as r, getCurrentProfile as t };
