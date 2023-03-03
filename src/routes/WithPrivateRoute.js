import { useRouter } from 'next/router';
import { useContext, useEffect } from "react";
import { AuthContext } from '@/hooks/context/authContext'
import Cookies from 'js-cookie'

const WithAuthMiddleware = ({ children }) => {
    const navigation = useRouter()

    const authCredential = useContext(AuthContext);

    useEffect(() => {
        console.log(authCredential)
        if (Cookies.get('Authentication') === undefined) {
            navigation.push('/login');

        }
    }, [authCredential.user])

    return children
}

export default WithAuthMiddleware