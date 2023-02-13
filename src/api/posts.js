import api from "./client";

const endpoint = "/posts";

export const getPosts = () => api.get(endpoint);
export const getPost = (id) => api.get(endpoint + "/" + id);

export const deletePost = (id) => api.delete(`${endpoint}/${id}`);

export const addPost = (comment) => {
  const body = { ...comment };
  if (comment?._id) {
    const { _id, ...data } = comment;
    return api.put(`${endpoint}/${_id}`, {
      ...data,
    });
  }
  console.log(body)
  return api.post(endpoint, body);
};

