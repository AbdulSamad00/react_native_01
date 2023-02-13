import api from "./client";
const endpoint = "countriesd";
const getCountries = () => api.get(endpoint);
export default {
  getCountries,
};
