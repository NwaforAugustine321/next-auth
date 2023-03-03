import styles from '@/styles/Home.module.scss'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthService } from '@/hooks/useAuth'
import { useCookies } from "react-cookie"


const Login = () => {
    const [cookie, setCookie] = useCookies(["frontend_cookie"])
    const { login } = useAuthService()
    const path = useRouter()

    const [credentials, setCredentials] = useState({
        email: "admin@example.com",
        password: "p4SSw0rd#"
    })

    const handleOnCredentialChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        })
    }

    const handleLogin = (event) => {
        event.preventDefault()
        login(credentials).then(() => {
            // path.push('/profile')
        })

    }




    return <div className={styles.main}>
        <h1 className={styles.title}>Login</h1>
        <input type='email' name='email' onChange={handleOnCredentialChange} defaultValue={credentials.email} />
        <input type='email' name='password' onChange={handleOnCredentialChange} defaultValue={credentials.password} />
        <button onClick={handleLogin}>Login</button>
    </div>
}

export default Login 