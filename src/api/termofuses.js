import api from "./client";

const endpoint = "/termofuses";

export const getTermofuses = () => api.get(endpoint);
export const getTermofuse = (id) => api.get(endpoint + "/" + id);

export const deleteTermofuse = (id) => api.delete(`${endpoint}/${id}`);

const addTermofuse = (termofuse) => {
  if (termofuse?._id) {
    const { _id, ...data } = termofuse;
    return api.put(`${endpoint}/${_id}`, {
      ...data,
    });
  }
  return api.post(endpoint, termofuse);
};
export default {
  getTermofuses,
  getTermofuse,
  addTermofuse,
  deleteTermofuse,
};
