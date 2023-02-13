import api from './client';

const endpoint = '/products';

export const getProducts = () => api.get(endpoint);
console.log(api.getBaseURL())
export const addProduct = (product) => {
    const formData = new FormData();
    const body = { ...product };
    for ( let key in body ) {
        formData.append(key, body[key]);
    }
    formData.append('imageSrc', imageSrc);
    return api.post(endpoint,formData);
}
