import { Outlet } from 'react-router-dom';
import AppNav from './AppNav';
import AppFooter from './AppFooter';
import Logo from '../Logo';
import styles from './styles/AppSidebar.module.css';

export default function AppSidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />

			<Outlet />

			<AppFooter />
		</div>
	);
}
