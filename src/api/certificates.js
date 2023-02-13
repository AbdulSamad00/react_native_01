import api from "./client";

const endpoint = "/certificates";

export const getSkills = () => api.get(endpoint);

//export const getPatient = (id) => api.get(endpoint + `/${id}`);
export const getSkill = (id) => api.get(endpoint + "/" + id);
//export const getProduct = (id) => api.get(endpoint + `/${id}`);
//export const getservice = (id) => api.get(endpoint + `/${id}`);

const saveSkill = (certificate) => {
  const formData = new FormData();

  const body = { ...certificate };
  if(certificate._id) delete body._id;
  delete body.imageSrc;
  for (let key in body) {
    formData.append(key, body[key]);
  }
  formData.append('imageSrc', {
    name: 'avatar_' + new Date(),
    type: "image/jpeg",
    uri: certificate.imageSrc,
  });
  if(certificate._id) return api.put(`${endpoint}/${certificate._id}`, formData);
  return api.post(endpoint, formData);
};


// const addSkill = (certificate) => {
//   const formData = new FormData();

//   const body = { ...certificate };
//   delete body.imageSrc;
//   for (let key in body) {
//     formData.append(key, body[key]);
//   }
//   formData.append('imageSrc', {
//     name: 'avatar_' + new Date(),
//     type: "image/jpeg",
//     uri: certificate.imageSrc,
//   });
//   return api.post(endpoint, formData);
// };
export default {
  getSkills,
  getSkill,
  saveSkill,
};
