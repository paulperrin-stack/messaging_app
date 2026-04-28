import { apiFetch } from "./client.js";

export const register = (username, password) =>
    apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });

export const login = async (username, password) => {
    const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });
    localStorage.setItem('token', data.token);
    return data;
};

export const logout = () => localStorage.removeItem('token');