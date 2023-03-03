
import styles from '@/styles/Home.module.scss'
import { useAuthService } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'

const Home = () => {
    const { logout } = useAuthService()
    const [user, setUser] = useState(null)
    useEffect(() => {
        const response = window.localStorage.getItem('user')
        setUser(JSON.parse(response))
    }, [])

    const handleLogout = (event) => {
        event.preventDefault()
        logout()
    }

    return <div className={styles.main} >
        <h1>Home page</h1>
        <h4 disabled={true} >{user?.email}</h4>
        <button onClick={handleLogout}>Logout</button>
    </div>
}


export default Home;