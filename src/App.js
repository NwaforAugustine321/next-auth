import '@/styles/globals.css'
import { AuthProvider } from '@/hooks/context/authContext'
import { useAuthService } from '@/hooks/useAuth';
import WithAuthMiddleware from "@/routes/WithPrivateRoute";
import { SessionProvider } from "next-auth/react"



function App({ Component, pageProps: { session, ...pageProps } }) {
    const user = useAuthService();


    return <SessionProvider session={session}>
        <AuthProvider value={user}>
            <Component {...pageProps} />
        </AuthProvider>
    </SessionProvider>

}

export default WithAuthMiddleware(App)