import api from "./client";

const endpoint = "/physicalconditions";

export const getPhysicalconditions = () => api.get(endpoint);

export const getPhysicalcondition = (id) => api.get(`${endpoint}/${id}`);

export const postPhysicalcondition = (data) => api.post(endpoint, data);

export const updatePhysicalcondition = (id, data) =>
  api.put(`${endpoint}/${id}`, data);

export const deletePhysicalcondition = (id) => api.delete(`${endpoint}/${id}`);
