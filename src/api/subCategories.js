import api from "./client";

const endpoint = "/forumsubcategories";

export const getSubCategories = () => api.get(endpoint);
export const getSubCategory = (id) => api.get(endpoint + "/" + id);

export const deleteSubCategory = (id) => api.delete(`${endpoint}/${id}`);

const addSubCategory = (subCategory) => {
  if (subCategory?._id) {
    const { _id, ...data } = subCategory;
    return api.put(`${endpoint}/${_id}`, {
      ...data,
    });
  }
  return api.post(endpoint, subCategory);
};
export default {
  getSubCategories,
  getSubCategory,
  addSubCategory,
  deleteSubCategory,
};
