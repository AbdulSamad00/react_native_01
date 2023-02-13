import api from "./client";

const endpoint = "/patients";

export const getPatients = () => api.get(endpoint);

export const getPatient = (id) => api.get(endpoint + `/${id}`);
export const getPatientByUser = (id) => api.get(`${endpoint}/user/${id}`);

const savePatient = (data) => {
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
    return updatePatient(data._id, formData);
  }

  for (let key in body) {
    formData.append(key, body[key]);
  }
  return addPatient(formData);
};

const addPatient = (data) => api.post(endpoint, data);

const updatePatient = (id, data) => api.patch(`${endpoint}/${id}`, data);

export const deletePatient = (id) => api.delete(`${endpoint}/${id}`);

export default {
  addPatient,
  savePatient,
  getPatientByUser,
};
