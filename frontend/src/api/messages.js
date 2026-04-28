import { apiFetch } from "./client.js";

export const getConversation    =  (userId)                => apiFetch(`/messages/${userId}`);
export const sendMessage        =  (userId, content)       => apiFetch(`/messages/${userID}`, { method: 'POST', body: JSON.stringify({ content }) });