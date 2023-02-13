import api from "./client";

const endpoint = "/tcmsessions";

export const getTCMSessions = () => api.get(endpoint);

export const getTCMSession = (id) => api.get(endpoint + "/" + id);

export const postTCMSession = (data) => api.post(endpoint, data);

export const updateTCMSession = (id, data) =>
  api.put(`${endpoint}/${id}`, data);
