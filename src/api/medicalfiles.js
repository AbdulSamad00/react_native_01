import api from "./client";

const endpoint = "/medicalfiles";

export const getMedicalfiles = () => api.get(endpoint);

export const getMedicalfile = (id) => api.get(`${endpoint}/${id}`);

export const postMedicalfile = (data) => api.post(endpoint, data);

export const updateMedicalfile = (id, data) =>
  api.put(`${endpoint}/${id}`, data);

export const deleteMedicalfile = (id) => api.delete(`${endpoint}/${id}`);
