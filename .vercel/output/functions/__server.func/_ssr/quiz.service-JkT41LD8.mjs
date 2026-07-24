import { t as api } from "./axios-DQ1GboXV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz.service-JkT41LD8.js
var getMyClassrooms = async () => {
	return (await api.get("/classrooms")).data;
};
var createClassroom = async (data) => {
	return (await api.post("/classrooms", data)).data;
};
var updateClassroom = async (id, data) => {
	return (await api.patch(`/classrooms/${id}`, data)).data;
};
var deleteClassroom = async (id) => {
	return (await api.delete(`/classrooms/${id}`)).data;
};
var enrollInClassroom = async (classroomId) => {
	return (await api.post(`/classrooms/${classroomId}/enroll`)).data;
};
var createAssignment = async (data) => {
	return (await api.post("/assignments", data)).data;
};
var submitAssignment = async (data) => {
	return (await api.post("/assignments/submit", data)).data;
};
var gradeSubmission = async (submissionId, data) => {
	return (await api.patch(`/assignments/submissions/${submissionId}/grade`, data)).data;
};
var createQuiz = async (data) => {
	return (await api.post("/quizzes", data)).data;
};
var submitQuizAttempt = async (data) => {
	return (await api.post("/attempts/submit", data)).data;
};
//#endregion
export { enrollInClassroom as a, submitAssignment as c, deleteClassroom as i, submitQuizAttempt as l, createClassroom as n, getMyClassrooms as o, createQuiz as r, gradeSubmission as s, createAssignment as t, updateClassroom as u };
