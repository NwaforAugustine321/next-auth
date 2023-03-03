import '@/styles/globals.css'
import { AuthProvider } from '@/hooks/context/authContext'
import { useAuthService } from '@/hooks/useAuth';
import { SessionProvider } from "next-auth/react"
import WithAuthMiddleware from '@/routes/WithPrivateRoute';


function App({ Component, pageProps: { session, ...pageProps } }) {
  const user = useAuthService();


  return <AuthProvider value={user}>
    {Component.auth ? (
      <WithAuthMiddleware>

        <Component {...pageProps} />
      </WithAuthMiddleware>
    ) : (
      <Component {...pageProps} />
    )}
  </AuthProvider>



}

export default App
