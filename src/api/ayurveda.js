import api from "./client";

const endpoint = "/ayurvedasessions";

export const getAyurvedaSessions = () => api.get(endpoint);

export const getAyurvedaSession = (id) => api.get(endpoint + "/" + id);

export const postAyurvedaSession = (data) => api.post(endpoint, data);

export const updateAyurvedaSession = (id, data) =>
  api.put(`${endpoint}/${id}`, data);
