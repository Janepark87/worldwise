import styles from './styles/AppFooter.module.css';

export default function AppFooter() {
	return (
		<footer className={styles.footer}>
			<p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} </p>
		</footer>
	);
}
