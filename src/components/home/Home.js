
import styles from '@/styles/Home.module.scss'
import { useAuthService } from '@/hooks/useAuth'

const Home = () => {
    const { logout } = useAuthService()

    const handleLogout = (event) => {
        event.preventDefault()
        logout()
    }
    return <div className={styles.main} >
        <h1>Home page</h1>
        <button onClick={handleLogout}>Logout</button>
    </div>
}


export default Home;