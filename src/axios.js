// src/axios.js

import axios from 'axios';

// Crea una instancia de Axios con la URL base de tu backend
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || '/',
});

// Interceptor de solicitudes
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        const token = user?.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;