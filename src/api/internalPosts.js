import api from "./client";

const endpoint = "/internalposts";

function internalPostUrl(id) {
  return `${endpoint}/${id}`;
}

export const getInternalPostTopic = (Id)=>api.get((`${endpoint}/topic/${Id}`));

export const getInternalPosts = () => api.get(endpoint);
export const getInternalPost = (id) => api.get(endpoint + "/" + id);

export const deleteInternalPost = (id) => api.delete(`${endpoint}/${id}`);

export const addInternalPost = (internalPost,attachments) => {

    const formData = new FormData();
    //clonse
    const body = { ...internalPost };

   //update
   if (body._id) {
     //delete _id

     delete body._id;
     return api.put(internalPostUrl(body._id),body);
   }

   for ( let key in body ) {
    formData.append(key, body[key]);
    }
    if(attachments){
      for(let x = 0; x<attachments.length; x++) {
     formData.append('attachments', attachments[x])
   }

    }else{
     formData.append('attachments', attachments);
   }
   const config = {     
     headers: { 'content-type': 'multipart/form-data' }
  }


  return api.post(endpoint,body);

  };