import axios from 'axios'
import Cookies from 'js-cookie'
import { verifyToken } from '@/middleware/jwt'

let isRefreshing = false;
let refreshSubscribers = [];

const axiosService = axios.create({ withCredentials: true });
axiosService.defaults.baseURL = process.env.NEXT_API_URL;
axiosService.defaults.headers = {
    'Content-Type': 'application/json; charset=utf-8',
};

// axiosService.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

axiosService.interceptors.response.use(function (response) {

    // if (response.config.url === '/api/auth/signin') {
    //     const refreshToken = response.headers['set-cookie'];
    //     response.data.token = refreshToken
    // }

    const refreshToken = response.headers['set-cookie'];
    response.data.token = refreshToken || ''
    return response
}, function (error) {

    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {


        if (isRefreshing) {

            return new Promise((resolve, reject) => {
                refreshSubscribers.push((cookie) => {
                    //set cookie
                    resolve(axiosService(originalRequest));
                });
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;
        const refreshToken = Cookies.get('Refresh')
        const Token = Cookies.get('Authentication')
        const userID = typeof window !== 'undefined' ? window.localStorage.getItem('userID') : ''
        // console.log(Token)
        //?.split(';')[0]?.split('=')[1]
        // const f = Cookies.serialize('Refresh', refreshToken, {
        //     path: '/',
        //     sameSite: 'none',
        // })

        // const n = Cookies.serialize('Authentication', Token, {
        //     path: '/',
        //     sameSite: 'none',
        // })

        // withCredentials: true,
        //     data: {
        //     id: userID,
        //         refreshToken: refreshToken
        // }
        return new Promise((resolve, reject) => {
            // Make a request to refresh the access token

            axios.get('https://equmedia.pixeliner.com/api/auth/refresh', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    "Cookie": `${Token}; ${refreshToken};`
                },

            }).then((g) => {
                console.log(g)
            }).catch((e) => {
                console.log(e.message)
            })

            // axiosService('/api/auth/refresh', {
            //     method: "post",
            //     data: {
            //         id: userID,
            //         refresh: refreshToken
            //     },
            //     withCredentials: false,
            // }).then(({ data }) => {
            //     console.log(data, 'k')
            //     // localStorage.setItem('access_token', data.access_token);
            //     // originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;
            //     // resolve(axiosInstance(originalRequest));
            //     // refreshSubscribers.forEach(cb => cb(data.access_token));
            //     resolve()
            // })
            //     .catch(err => {
            //         console.log(err.message, 'e')
            //         // console.log('Error refreshing token', err);
            //         reject(err);
            //     })
            //     .finally(() => {
            //         isRefreshing = false;
            //         refreshSubscribers = [];
            //     });
        });
    }
    return Promise.reject(error);
});


export const post = async (path, body) => {
    try {
        const response = await axiosService.post(path, JSON.stringify(body))

        return response
    } catch (error) {

        if (error === 'Empty Token') {
            throw 'Invalid token'
        }

        return error;
    }
}

export const get = async (path, body) => {
    try {

        // const response = await axios.get('https://equmedia.pixeliner.com/api/auth/refresh', {
        //     headers: {
        //         'Content-Type': 'application/json; charset=utf-8',
        //     }
        // })
        // console.log(response, "kkkk")
        return true
    } catch (error) {
        console.log(error)
        // if (error === 'Empty Token') {
        //     throw 'Invalid token'
        // }

        return error;
    }
}


export default axiosService