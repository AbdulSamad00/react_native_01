import api from "./client";

const endpoint = "/skills";

export const getSkills = () => api.get(endpoint);

//export const getPatient = (id) => api.get(endpoint + `/${id}`);
export const getSkill = (id) => api.get(endpoint + "/" + id);
//export const getProduct = (id) => api.get(endpoint + `/${id}`);
//export const getservice = (id) => api.get(endpoint + `/${id}`);

const saveSkill = (skill) => {
  const formData = new FormData();

  const body = { ...skill };
  if(skill._id) delete body._id;
  delete body.imageSrc;
  for (let key in body) {
    formData.append(key, body[key]);
  }
  formData.append('imageSrc', {
    name: 'avatar_' + new Date(),
    type: "image/jpeg",
    uri: skill.imageSrc,
  });
  if(skill._id) return api.put(`${endpoint}/${skill._id}`, formData);
  return api.post(endpoint, formData);
};


// const addSkill = (skill) => {
//   const formData = new FormData();

//   const body = { ...skill };
//   delete body.imageSrc;
//   for (let key in body) {
//     formData.append(key, body[key]);
//   }
//   formData.append('imageSrc', {
//     name: 'avatar_' + new Date(),
//     type: "image/jpeg",
//     uri: skill.imageSrc,
//   });
//   return api.post(endpoint, formData);
// };
export default {
  getSkills,
  getSkill,
  saveSkill,
};
