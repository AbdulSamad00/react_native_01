import api from './client';

const endpoint = '/services';

export const getServices = () => api.get(endpoint);

export const addService = (service) => {
    const formData = new FormData();
    const body = { ...service };
    for ( let key in body ) {
        formData.append(key, body[key]);
    }
    formData.append('imageSrc', imageSrc);
    return api.post(endpoint,formData);
}
export default {
    getServices,
    addService,
}