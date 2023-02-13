import api from "./client";

const endpoint = "/notes";

export const getNotes = () => api.get(endpoint);
export const getNote = (id) => api.get(endpoint + "/" + id);

export const deleteNote = (id) => api.delete(`${endpoint}/${id}`);

const addNote = (note) => {
  if (innote?._id) {
    const { _id, ...data } = note;
    return api.put(`${endpoint}/${_id}`, {
      ...data,
    });
  }
  return api.post(endpoint, note);
};
export default {
  getNotes,
  getNote,
  addNote,
  deleteNote,
};
