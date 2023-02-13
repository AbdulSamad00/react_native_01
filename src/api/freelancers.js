import api from "./client";

const endpoint = "/freelancers";

export const getfreelancers = () => api.get(endpoint);

export const getfreelancer = (id) => api.get(endpoint + "/" + id);

const addfreelancer = (freelancer) => {
  const formData = new FormData();

  const body = { ...freelancer };
  delete body.imageSrc;
  for (let key in body) {
    formData.append(key, body[key]);
  }
  formData.append('imageSrc', {
    name: 'avatar_' + new Date(),
    type: "image/jpeg",
    uri: freelancer.imageSrc,
  });
  return api.post(endpoint, formData);
};
export default {
  getfreelancers,
  addfreelancer,
};
