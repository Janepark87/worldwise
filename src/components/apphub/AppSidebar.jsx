import { Outlet } from 'react-router-dom';
import styles from './styles/AppSidebar.module.css';
import Logo from '../Logo';
import AppNavbar from './AppNavbar';
import AppFooter from '../../layouts/AppFooter';

export default function AppSidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNavbar />

			<Outlet />

			<AppFooter />
		</div>
	);
}
