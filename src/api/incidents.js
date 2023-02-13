import api from "./client";

const endpoint = "/incidents";

export const getincidents = () => api.get(endpoint);

export const getincident = (id) => api.get(endpoint + "/" + id);

const addincident = (incident) => {
  const formData = new FormData();

  const body = { ...incident };
  delete body.imageSrc;
  for (let key in body) {
    formData.append(key, body[key]);
  }
  formData.append('imageSrc', {
    name: 'avatar_' + new Date(),
    type: "image/jpeg",
    uri: incident.imageSrc,
  });
  return api.post(endpoint, formData);
};
export default {
  getincidents,
  addincident,
};
