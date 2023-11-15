import { Link } from 'react-router-dom';
import styles from './styles/Logo.module.css';

export default function Logo() {
	return (
		<Link>
			<img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
		</Link>
	);
}
