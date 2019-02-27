import axios from 'axios';

export default (token = localStorage.getItem('AuthToken')) => axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: { Authorization: token }
  });