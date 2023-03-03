import { useState } from 'react';
import Router from 'next/router';
import { post } from './services/fetch';
import Cookies from 'js-cookie'


export const useAuthService = () => {
    const [user, setUser] = useState(null);

    const setCookie = (data) => {
        // Cookies.set('Authentication', data[0], {
        //     path: '/',
        //     sameSite: 'none',
        // })

        // Cookies.set('Refresh', data[1], {
        //     path: '/',
        //     sameSite: 'none',
        // })
    }

    const handlePath = (user) => {
        setUser({ ...user });
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('userID', JSON.stringify(user.id))
        }
    }

    const login = async (data) => {
        const res = await post('/api/auth/signin', data)

        if (res?.status === 200) {
            setCookie(res?.data.data.token)
            const { email, id, role } = res.data.data;
            handlePath({ email, id, role })
            Router.push('/');
        } else {
            setUser(null);
        }

    };

    const logout = () => {
        setUser(null);
        Router.push('/login');
    };

    return { user, login, logout };
};
