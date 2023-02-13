import api from "./client";

const endpoint = "/areas";

export const getAreas = () => api.get(endpoint);
export const getArea = (id) => api.get(endpoint + "/" + id);

export const deleteArea = (id) => api.delete(`${endpoint}/${id}`);

const addArea = (area) => {
  if (area?._id) {
    const { _id, ...data } = area;
    return api.put(`${endpoint}/${_id}`, {
      ...data,
    });
  }
  return api.post(endpoint, area);
};
export default {
  getAreas,
  getArea,
  addArea,
  deleteArea,
};
