import api from "./client";

const endpoint = "/privacypolicies";

export const getPrivacypolicies = () => api.get(endpoint);
export const getPrivacypolicy = (id) => api.get(endpoint + "/" + id);

export const deletePrivacypolicy = (id) => api.delete(`${endpoint}/${id}`);

const addPrivacypolicy = (privacypolicy) => {
  if (privacypolicy?._id) {
    const { _id, ...data } = note;
    return api.put(`${endpoint}/${_id}`, {
      ...data,
    });
  }
  return api.post(endpoint, note);
};
export default {
  getPrivacypolicies,
  getPrivacypolicy,
  addPrivacypolicy,
  deletePrivacypolicy,
};
