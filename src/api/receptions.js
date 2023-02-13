import api from "./client";

const endpoint = "/receptions";

export const getReceptions = () => api.get(endpoint);

export const getReception = (id) => api.get(endpoint + `/${id}`);

const saveReception = (data) => {
  const formData = new FormData();
  const body = { ...data };

  const image = "" + body?.imageSrc;
  if (!image.startsWith("data:image")) {
    delete body.imageSrc;
    formData.append("imageSrc", {
      name: "avatar_" + new Date(),
      type: "image/jpeg",
      uri: data.imageSrc,
    });
  }

  //update
  if (data._id) {
    delete body._id;
    for (let key in body) {
      formData.append(key, body[key]);
    }
    return updateReception(data._id, formData);
  }

  for (let key in body) {
    formData.append(key, body[key]);
  }
  return addReception(formData);
};

const addReception = (data) => api.post(endpoint, data);

const updateReception = (id, data) => api.patch(`${endpoint}/${id}`, data);

export const deleteReception = (id) => api.delete(`${endpoint}/${id}`);

export default {
  addReception,
  saveReception,
};
