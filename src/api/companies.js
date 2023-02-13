import api from "./client";

const endpoint = "/company";

export const getCompanies = () => api.get(endpoint);

export const getCompany = (id) => api.get(`${endpoint}/${id}`);

export const getCompanyUser = (id) => api.get(`${endpoint}/user/${id}`);

export const updateCompanyUser = (id,data) => api.patch(`${endpoint}/user/${id}`,data);

export const postCompany = (data) => api.post(endpoint, data);

export const updateCompany = (id, data) => api.patch(`${endpoint}/${id}`, data);

export const deleteCompany = (id) => api.delete(`${endpoint}/${id}`);

const addCompany = (data) => api.post(endpoint, data);

const saveCompany = (data) => {
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
    return updateCompany(data._id, formData);
  }

  for (let key in body) {
    formData.append(key, body[key]);
  }
  return addCompany(formData);
};

export default {
  addCompany,
  saveCompany,
};
