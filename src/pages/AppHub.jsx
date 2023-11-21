import styles from './styles/AppHub.module.css';
import AppMain from '../layouts/AppMain';
import AppSidebar from '../components/apphub/AppSidebar';
import Map from '../components/apphub/AppMap';
import User from '../components/login/User';

export default function AppHub() {
	return (
		<AppMain className={styles.app}>
			<AppSidebar />
			<Map />
			<User />
		</AppMain>
	);
}
