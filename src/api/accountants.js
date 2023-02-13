import api from "./client";

const endpoint = "/accountants";

export const getAccountants = () => api.get(endpoint);

export const getAccountant = (id) => api.get(endpoint + `/${id}`);

const saveAccountant = (data) => {
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
    return updateAccountant(data._id, formData);
  }

  for (let key in body) {
    formData.append(key, body[key]);
  }
  return addAccountant(formData);
};

const addAccountant = (data) => api.post(endpoint, data);

const updateAccountant = (id, data) => api.patch(`${endpoint}/${id}`, data);

export const deleteAccountant = (id) => api.delete(`${endpoint}/${id}`);

export default {
  addAccountant,
  saveAccountant,
};
