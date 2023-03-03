import '@/styles/globals.css';
import { AuthProvider } from '@/hooks/context/authContext';
import { useAuthService } from '@/hooks/useAuth';



function App({ Component, pageProps: { ...pageProps } }) {
  const user = useAuthService();

  return (
    <AuthProvider value={user}>

      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App
