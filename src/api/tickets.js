import api from "./client";

const endpoint = "/tickets";

export const getTickets = () => api.get(endpoint);
export const deleteTicket = (id) => api.delete(`${endpoint}/${id}`);

export const saveTicket = (ticket) => {
  const body = { ...ticket };
  const { _id, ...data } = body;
  if (body._id) {
    // delete body._id;
    return api.put(`${endpoint}/${body._id}`, {
      ...data,
      participants: JSON.stringify(body.participants),
      deadline: JSON.stringify(body.deadline),
    });
  }
  return api.post(endpoint, {
    ...body,
    participants: JSON.stringify(body.participants),
    deadline: JSON.stringify(body.deadline),
  });
};
