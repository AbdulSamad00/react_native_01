import api from "./client";

const endpoint = "/doctors";

export const getDoctors = () => api.get(endpoint);

export const getDoctor = (id) => api.get(endpoint + `/${id}`);

const saveDoctor = (data) => {
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
    return updateDoctor(data._id, data);
  }

  for (let key in body) {
    formData.append(key, body[key]);
  }
  return addDoctor(formData);
};

const addDoctor = (data) => api.post(endpoint, data);

const updateDoctor = (id, data) => api.put(`${endpoint}/${id}`, data);

export const deleteDoctor = (id) => api.delete(`${endpoint}/${id}`);

export default {
  addDoctor,
  saveDoctor,
};
