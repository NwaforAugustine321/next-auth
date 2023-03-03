import { useRouter } from 'next/router';
import Cookies from 'js-cookie';


export const withAuth = WrappedComponent => {
	const AuthComponent = props => {
		const router = useRouter();
		const token = Cookies.get('Authentication');

		if (!token && typeof window !== 'undefined') {
			router.push('/login');
			return null;
		}

		return <WrappedComponent {...props} />;
	};

	AuthComponent.getInitialProps = async ({ req, res }) => {

		if (req && res && !req?.cookies?.Authentication) {
			res.writeHead(302, { Location: '/login' });
			res.end();
		}


		return { auth: false };
	};



	return AuthComponent;
};

export default withAuth;
