import api from "./client";

const endpoint = "/invoices";

export const getInvoices = () => api.get(endpoint);
export const getInvoice = (id) => api.get(endpoint + "/" + id);

export const deleteInvoice = (id) => api.delete(`${endpoint}/${id}`);

const addInvoice = (invoice) => {
  if (invoice?._id) {
    const { _id, ...data } = invoice;
    return api.put(`${endpoint}/${_id}`, {
      ...data,
    });
  }
  return api.post(endpoint, invoice);
};
export default {
  getInvoices,
  getInvoice,
  addInvoice,
  deleteInvoice,
};
