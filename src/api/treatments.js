import api from './client';

const endpoint = '/treatments';

const getTreatments = () => api.get(endpoint);

const addTreatment = (treatment) => {
    const formData = new FormData();
    const body = { ...treatment };
    for ( let key in body ) {
        formData.append(key, body[key]);
    }
    formData.append('imageSrc', imageSrc);
    return api.post(endpoint,formData);
}
export default {
    getTreatments,
    addTreatment,
}