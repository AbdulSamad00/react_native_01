import api from './client';

const endpoint = '/formulas';

const getFormulas = () => api.get(endpoint);

const addFormula = (formula) => {
    const formData = new FormData();
    const body = { ...formula };
    for ( let key in body ) {
        formData.append(key, body[key]);
    }
    formData.append('imageSrc', imageSrc);
    return api.post(endpoint,formData);
}
export default {
    getFormulas,
    addFormula,
}