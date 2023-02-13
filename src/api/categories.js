import api from "./client";

const endpoint = "/forumcategories";

export const getCategories = () => api.get(endpoint);
export const getCategory = (id) => api.get(endpoint + "/" + id);

export const deleteCategory = (id) => api.delete(`${endpoint}/${id}`);

const addCategory = (category) => {
  if (category?._id) {
    const { _id, ...data } = category;
    return api.put(`${endpoint}/${_id}`, {
      ...data,
    });
  }
  return api.post(endpoint, category);
};
export default {
  getCategories,
  getCategory,
  addCategory,
  deleteCategory,
};
