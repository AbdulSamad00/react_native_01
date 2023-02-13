import api from './client';

const endpoint = '/coas';

const getCOAs = () => api.get(endpoint);

const addCOA = (coa) => {
    const formData = new FormData();
    const body = { ...coa };
    for ( let key in body ) {
        formData.append(key, body[key]);
    }
    formData.append('imageSrc', imageSrc);
    return api.post(endpoint,formData);
}
export {
    getCOAs,
    addCOA,
}