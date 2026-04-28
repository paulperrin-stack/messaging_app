import { apiFetch } from "./client.js";

export const getUsers       = ()                => apiFetch('/users');
export const getUser        = (id)              => apiFetch(`/users/${id}`);
export const updateUser     = (id, data)        => apiFetch(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });