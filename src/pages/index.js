import { withAuth } from '@/auth/withAuth';
import Home from '@/components/home/Home';


function HomeScreen() {
  return <Home />;
}




export default withAuth(HomeScreen);
