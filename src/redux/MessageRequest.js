import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:8000' });

export const getMessages = (id) => API.get(`v1/message/${id}`);

export const addMessage = (data) => API.post('v1/message/', data);