/* eslint-disable */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { persistor } from '../Redux/store/store';
import { persistor } from '../../redux/store/store';
// import { getCookies } from '../../utils/Cookie';

const instance = axios.create({    
    baseURL: process.env.REACT_APP_API_URL,        
    // timeout: 5000,
    withCredentials: true,    
    // headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
})

const logout = async () => {
    instance
            .post('/auth/logout', {})
            .then(() => {
                // navigate('/');
                // header 입력
                // dispatch(logout({}))
                // window.location.reload();
            })
            .catch(() => {});    
}

const purge = async () => {
    await persistor.purge();
};

// instance.interceptors.request.use(
//     function (config) {         
//         // console.log(tokne);        
                                
//         if (token) {
//             config.headers['Authorization'] = 'Bearer ' + token;
//         }

//         config.headers['Content-Type'] = 'application/json; charset=utf-8';
//         return config;
//     },
//     function (error) {
//         // console.log(error);
//         return Promise.reject(error);
//     },
// );

instance.interceptors.response.use(
    function (response) {        
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if (error.response.status === 401 && !error.response.data.isLoggedIn && !originalRequest._retry) {
            try {                
                originalRequest._retry = true;
                const res = await instance.post('/auth/refreshToken');                
                                                              
                if (res.data.status === 200) {            
                    originalRequest.headers['Authorization'] = 'Bearer ' + res.data.accessToken;                                                                        
                }
                                
                return instance(originalRequest);
            } catch (error) {                
                purge();
                logout();
                location.reload();                
                
                Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },
);

export default instance;

