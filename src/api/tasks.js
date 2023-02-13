import api from "./client";
const tasksEndpoint = "/tasks";

// tasks
export const getTasks = () => api.get(tasksEndpoint);

export const getSelectedListkanbansTasks = (listkanbanNo) =>
  api.get(tasksEndpoint + "/listkanban/" + listkanbanNo);

export const postTask = (data) => api.post(tasksEndpoint, data);

export const updateTask = (id, data) => api.put(`${tasksEndpoint}/${id}`, data);

export const deleteTask = (id) => api.delete(`${tasksEndpoint}/${id}`);
