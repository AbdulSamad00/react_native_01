import api from './client';

const endpoint = '/materiamedicas';

const getMateriamedicas = () => api.get(endpoint);

const addMateriamedica = (materiamedica) => {
    const formData = new FormData();
    const body = { ...materiamedica };
    for ( let key in body ) {
        formData.append(key, body[key]);
    }
    formData.append('imageSrc', imageSrc);
    return api.post(endpoint,formData);
}
export default {
    getMateriamedicas,
    addMateriamedica,
}