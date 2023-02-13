import api from "./client";

const endpoint = "/expenses";

export const getExpenses = () => api.get(endpoint);

//export const getPatient = (id) => api.get(endpoint + `/${id}`);
export const getExpense = (id) => api.get(endpoint + "/" + id);
//export const getProduct = (id) => api.get(endpoint + `/${id}`);
//export const getservice = (id) => api.get(endpoint + `/${id}`);

const addExpense = (expense) => {
  const formData = new FormData();

  const body = { ...expense };
  delete body.imageSrc;
  for (let key in body) {
    formData.append(key, body[key]);
  }
  formData.append('imageSrc', {
    name: 'avatar_' + new Date(),
    type: "image/jpeg",
    uri: expense.imageSrc,
  });
  return api.post(endpoint, formData);
};
export default {
  getExpenses,
  addExpense,
};
