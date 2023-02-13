import api from "./client";

const endpoint = "/internalnotes";

function internalPostUrl(id) {
  return `${endpoint}/${id}`;
}

export const getInternalNoteTopic = (Id)=>api.get((`${endpoint}/topic/${Id}`));

export const getInternalNotes = () => api.get(endpoint);
export const getInternalNote = (id) => api.get(endpoint + "/" + id);

export const deleteInternalNote = (id) => api.delete(`${endpoint}/${id}`);

export const addInternalNote = (internalNote,attachments) => {

    const formData = new FormData();
    //clonse
    const body = { ...internalNote };

   //update
   if (body._id) {
     //delete _id

     delete body._id;
     return api.put(internalNoteUrl(body._id),body);
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