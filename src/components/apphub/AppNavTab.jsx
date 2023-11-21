import { NavLink } from 'react-router-dom';
import styles from './styles/AppNavTab.module.css';

export default function AppNavTab() {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<NavLink to="cities">Cities</NavLink>
				</li>
				<li>
					<NavLink to="countries">Countries</NavLink>
				</li>
			</ul>
		</nav>
	);
}
