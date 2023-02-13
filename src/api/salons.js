import api from './client';

const endpoint = '/salons';

const getSalons = () => api.get(endpoint);

const addSalon = (salon) => {
    const formData = new FormData();
    const body = { ...salon };
    for ( let key in body ) {
        formData.append(key, body[key]);
    }
    formData.append('imageSrc', imageSrc);
    return api.post(endpoint,formData);
}
export default {
    getSalons,
    addSalon,
}