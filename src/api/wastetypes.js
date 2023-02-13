import api from "./client";

const apiEndpoint = '/wastes';


function wastetypeUrl(id) {
  return `${apiEndpoint}/${id}`;
}

// wastetypes
export const getWastetypes = () => api.get(apiEndpoint);

export const getWastetype = (id) => api.get(wastetypeUrl(id));

export function saveWasteType(wastetype) {
  //clone
  const body = { ...wastetype };
  console.log(body);
  //update
  if (wastetype._id) {
    //delete _id
    delete body._id;
    return api.put(wastetypeUrl(wastetype._id), body);
  }

  //add a new wastetype
  return api.post(apiEndpoint, wastetype);
}

//delete wastetypes
export function deleteWasteType(Id) {
  return api.delete(wastetypeUrl(Id));
}
