// src/context/UserContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserFromLocalStorage = async () => {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                try {
                    const { token } = JSON.parse(userInfo);
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    };
                    const { data } = await api.get('/users/profile', config);
                    setUser(data);
                } catch (error) {
                    console.error('Error al validar el token:', error);
                    localStorage.removeItem('userInfo');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        loadUserFromLocalStorage();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/users/login', { email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    const value = {
        user,
        setUser,
        login,
        logout,
        loading,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    return useContext(UserContext);
};