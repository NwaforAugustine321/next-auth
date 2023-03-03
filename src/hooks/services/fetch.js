import axios from 'axios';
import Cookies from 'js-cookie'

let isRefreshing = false;
let refreshSubscribers = [];

const axiosService = axios.create({ withCredentials: true });
axiosService.defaults.baseURL = process.env.NEXT_API_URL;
axiosService.defaults.headers = {
    'Content-Type': 'application/json; charset=utf-8',
};


axiosService.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    refreshSubscribers.push(() => {
                        resolve(axiosService(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise((resolve, reject) => {
                axiosService
                    .get(`/api/auth/refresh`, {
                        withCredentials: true
                    }).then(() => {
                        resolve()
                    })
                    .catch(error => {
                        Cookies.remove('Authentication')
                        Cookies.remove('Refresh')
                        reject(error);
                    }).finally(() => {
                        isRefreshing = false;
                        refreshSubscribers = [];
                    });

            });
        }
        return Promise.reject(error);
    }
);

export const post = async (path, body) => {
    try {
        const response = await axiosService.post(path, body);
        return response;
    } catch (error) {
        if (error === 'Empty Token') {
            throw 'Invalid token';
        }

        return error;
    }
};


export default axiosService;
