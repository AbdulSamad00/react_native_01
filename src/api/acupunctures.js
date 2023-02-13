import api from './client';

const endpoint = '/acupunctures';

const getAcupunctures = () => api.get(endpoint);

const addAcupuncture = (acupuncture) => {
    const formData = new FormData();
    const body = { ...acupuncture };
    for ( let key in body ) {
        formData.append(key, body[key]);
    }
    formData.append('imageSrc', imageSrc);
    return api.post(endpoint,formData);
}
export default {
    getAcupunctures,
    addAcupuncture,
}