import api from './client';

const endpoint = '/mechanics';

const getMechanics = () => api.get(endpoint);

const addMechanic = (mechanic) => {
    const formData = new FormData();
    const body = { ...mechanic };
    for ( let key in body ) {
        formData.append(key, body[key]);
    }
    formData.append('imageSrc', imageSrc);
    return api.post(endpoint,formData);
}
export default {
    getMechanics,
    addMechanic,
}