import api from "./client";
const cardsEndpoint = "/cards";

// cards
export const getCards = () => api.get(cardsEndpoint);

export const getSelectedListkanbansCards = (listkanbanNo) =>
  api.get(cardsEndpoint + "/listkanban/" + listkanbanNo);

export const postCard = (data) => api.post(cardsEndpoint, data);

export const updateCard = (id, data) => api.put(`${cardsEndpoint}/${id}`, data);

export const deleteCard = (id) => api.delete(`${cardsEndpoint}/${id}`);
