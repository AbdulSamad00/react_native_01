import api from "./client";

const listkanbansEndpoint = "/listkanbans";

// listkanbans
export const getListkanbans = () => api.get(listkanbansEndpoint);

export const getSelectedKanbanListkanbans = (kanbanNo) =>
  api.get(listkanbansEndpoint + "/kanban/" + kanbanNo);

export const postListkanban = (data) => api.post(listkanbansEndpoint, data);

export const updateListkanban = (id, data) =>
  api.put(`${listkanbansEndpoint}/${id}`, data);

export const deleteListkanban = (id) =>
  api.delete(`${listkanbansEndpoint}/${id}`);
