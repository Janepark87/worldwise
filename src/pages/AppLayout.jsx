import AppNav from '../components/AppNav';
import styles from './styles/AppLayout.module.css';

export default function AppLayout() {
	return (
		<main className={styles.app}>
			<AppNav />
			<p>App Page</p>
		</main>
	);
}
