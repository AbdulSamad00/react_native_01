import api from "./client";

const endpoint = "/leaves";

export const getLeaves = () => api.get(endpoint);

//export const getPatient = (id) => api.get(endpoint + `/${id}`);
export const getLeave = (id) => api.get(endpoint + "/" + id);
//export const getProduct = (id) => api.get(endpoint + `/${id}`);
//export const getservice = (id) => api.get(endpoint + `/${id}`);

const addLeave = (leave) => {
  const formData = new FormData();

  const body = { ...leave };
  delete body.imageSrc;
  for (let key in body) {
    formData.append(key, body[key]);
  }
  formData.append('imageSrc', {
    name: 'avatar_' + new Date(),
    type: "image/jpeg",
    uri: leave.imageSrc,
  });
  return api.post(endpoint, formData);
};
export default {
  getLeaves,
  addLeave,
};
