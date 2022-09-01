import axios from 'axios';

const token = localStorage.getItem('token');

export const api = axios.create({
    baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(async (config) => {
    if (config.headers === undefined) {
        config.headers = {};
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
