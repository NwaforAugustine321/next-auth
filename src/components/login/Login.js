import styles from '@/styles/Home.module.scss';
import { useState } from 'react';
import { useAuthService } from '@/hooks/useAuth';
import Link from 'next/link';

const Login = () => {
	const { login } = useAuthService();

	const [credentials, setCredentials] = useState({
		email: 'admin@example.com',
		password: 'p4SSw0rd#',
	});

	const handleOnCredentialChange = event => {
		setCredentials({
			...credentials,
			[event.target.name]: event.target.value,
		});
	};

	const handleLogin = event => {
		event.preventDefault();
		login(credentials);
	};

	return (
		<div className={styles.main}>
			<h1 className={styles.title}>Login</h1>
			<input type='email' name='email' onChange={handleOnCredentialChange} defaultValue={credentials.email} />
			<input type='email' name='password' onChange={handleOnCredentialChange} defaultValue={credentials.password} />
			<button onClick={handleLogin}>Login</button>
			<Link href='/'>Navigate manually</Link>
		</div>
	);
};

export default Login;
