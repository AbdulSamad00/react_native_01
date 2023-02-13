import api from "./client";
const endpoint = "/users/pushTokens";
const register = (pushToken) => api.post(endpoint, { token: pushToken });
export default {
  register,
};
