import api from "./client";

const endpoint = "/eros";

export const geteros = () => api.get(endpoint);

export const getero = (id) => api.get(endpoint + "/" + id);

export const addero = (ero) => {
  if (!ero.id) {
    return api.post(endpoint, ero);
  } else {
    console.log(ero.id);
    const end = ero.id;
    delete ero.id;
    return api.put(endpoint + `/${end}`, ero)
  }
};

export const delERO = (id) => {
  return api.delete(endpoint + "/" + id);
}

