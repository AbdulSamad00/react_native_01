import api from "./client";

const endpoint = "/users";

export const getUsers = () => api.get(endpoint);

export const getUser = (id) => api.get(`${endpoint}/${id}`);

//will be depracated
export const postUser = (data) => {
  const formData = new FormData();
  const body = { ...data };
  delete body.imageSrc;
  for (let key in body) {
    formData.append(key, body[key]);
  }
  formData.append("imageSrc", {
    name: "avatar_" + new Date(),
    type: "image/jpeg",
    uri: data.imageSrc,
  });
  api.post(endpoint, data);
};

const saveUser = (data) => {
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

  // //update
  if (data._id) {
    return updateUser(data._id, data);
  }

  for (let key in body) {
    formData.append(key, body[key]);
  }
  
  return addUser(formData);
};

const addUser = (data) => api.post(endpoint, data);

const updateUser = (id, data) => api.put(`${endpoint}/${id}`, data);

export const deleteUser = (id) => api.delete(`${endpoint}/${id}`);

export default {
  saveUser,
};
