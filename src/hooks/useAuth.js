import Router from 'next/router';
import { post } from './services/fetch';
import Cookies from 'js-cookie'


export const useAuthService = () => {

    const removeCookie = () => {
        Cookies.remove('Authentication')
        Cookies.remove('Refresh')
    }


    const login = async data => {
        const res = await post('/api/auth/login', data);

        if (res?.status === 200) {
            const { email, id, role } = res?.data;
            window.localStorage.setItem('user', JSON.stringify({ email, id, role }));
            Router.push('/');
        }
    };

    const logout = () => {
        removeCookie()
        Router.push('/login');
    };

    return { login, logout };
};
