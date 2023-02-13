import api from './client';
const endpoint = 'userroles';
const getProfiles = () => api.get(endpoint);
export default {
    getProfiles,
}