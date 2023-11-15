import AppNav from './AppNav';
import Footer from './Footer';
import Logo from './Logo';
import styles from './styles/Sidebar.module.css';

export default function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />

			<p>List of citis</p>

			<Footer />
		</div>
	);
}
