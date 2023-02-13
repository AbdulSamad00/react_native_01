import api from './client';

const endpoint = '/garages';

const getGarages = () => api.get(endpoint);

const addGarage = (garage) => {
    const formData = new FormData();
    const body = { ...garage };
    for ( let key in body ) {
        formData.append(key, body[key]);
    }
    formData.append('imageSrc', imageSrc);
    return api.post(endpoint,formData);
}
export default {
    getGarages,
    addGarage,
}