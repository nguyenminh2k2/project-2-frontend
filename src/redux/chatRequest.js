import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:8000' });

export const createChat = (data) => API.post('/v1/chat/', data);

export const createChatRoom = (data) => API.post('/v1/chat/chatroom', data);

export const userChats = (id) => API.get(`/v1/chat/${id}`);

export const findChat = (firstId, secondId) => API.get(`/v1/chat/find/${firstId}/${secondId}`);

export const getAChat = (ChatId) => API.get(`/v1/chat/achat/${ChatId}`);