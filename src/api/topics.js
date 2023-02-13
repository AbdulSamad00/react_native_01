import api from "./client";

const endpoint = "/topics";

export const getTopics = () => api.get(endpoint);
export const getTopic = (id) => api.get(endpoint + "/" + id);

export const deleteTopic = (id) => api.delete(`${endpoint}/${id}`);

const addTopic = (topic) => {
  if (topic?._id) {
    const { _id, ...data } = topic;
    return api.put(`${endpoint}/${_id}`, {
      ...data,
    });
  }
  return api.post(endpoint, topic);
};
export default {
  getTopics,
  getTopic,
  addTopic,
  deleteTopic,
};
