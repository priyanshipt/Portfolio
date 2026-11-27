import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
});

export const getGithubStats = (signal) => api.get('/github', { signal }).then((res) => res.data);

export const sendContactMessage = (payload) => api.post('/contact', payload).then((res) => res.data);

export default api;
