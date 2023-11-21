import { Outlet } from 'react-router-dom';
import styles from './styles/AppSidebar.module.css';
import Logo from '../Logo';
import AppNavTab from './AppNavTab';
import AppFooter from '../../layouts/AppFooter';

export default function AppSidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNavTab />

			<Outlet />

			<AppFooter />
		</div>
	);
}
