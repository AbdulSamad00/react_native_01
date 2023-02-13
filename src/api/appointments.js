import api from "./client";

const endpoint = "/appointments";

export const getAppointments = () => api.get(endpoint);

export const getAppointment = (id) => api.get(`${endpoint}/${id}`);

export const postAppointment = (data) => api.post(endpoint, data);

export const updateAppointment = (id, data) =>
  api.put(`${endpoint}/${id}`, data);

export const deleteAppointment = (id) => api.delete(`${endpoint}/${id}`);
