import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    // headers: { 'Content-Type': 'application/json' },
});
