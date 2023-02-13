import api from "./client";

const endpoint = "/homeopathysessions";

export const getHomeoPathySessions = () => api.get(endpoint);

export const getHomeoPathySession = (id) => api.get(endpoint + "/" + id);

export const postHomeoPathySession = (data) => api.post(endpoint, data);

export const updateHomeoPathySession = (id, data) =>
  api.put(`${endpoint}/${id}`, data);
