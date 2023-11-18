import AppSidebar from '../components/appLayout/AppSidebar';
import AppMap from '../components/cities/AppMap';
import User from '../components/login/User';
import styles from './styles/AppLayout.module.css';

export default function AppLayout() {
	return (
		<div className={styles.app}>
			<AppSidebar />
			<AppMap />
			<User />
		</div>
	);
}
