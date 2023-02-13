import api from "./client";

const endpoint = "/shifts";

export const getShifts = () => api.get(endpoint);

//export const getPatient = (id) => api.get(endpoint + `/${id}`);
export const getShift = (id) => api.get(endpoint + "/" + id);
//export const getProduct = (id) => api.get(endpoint + `/${id}`);
//export const getservice = (id) => api.get(endpoint + `/${id}`);

const addShift = (shift) => {
  const formData = new FormData();

  const body = { ...shift };
  delete body.imageSrc;
  for (let key in body) {
    formData.append(key, body[key]);
  }
  formData.append('imageSrc', {
    name: 'avatar_' + new Date(),
    type: "image/jpeg",
    uri: shift.imageSrc,
  });
  return api.post(endpoint, formData);
};

export const deleteShift = (id) => api.delete(`${endpoint}/${id}`);
export default {
  getShifts,
  addShift,
  deleteShift
};
