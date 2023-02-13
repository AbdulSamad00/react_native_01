import api from "./client";

const kanbansEndpoint = "/kanbans";

// kanbans
export const getKanbans = () => api.get(kanbansEndpoint);

export const getKanban = (id) => api.get(`${kanbansEndpoint}/${id}`);

export const postKanban = (data) => api.post(kanbansEndpoint, data);

export const updateKanban = (id, data) =>
  api.put(`${kanbansEndpoint}/${id}`, data);

export const deleteKanban = (id) => api.delete(`${kanbansEndpoint}/${id}`);
