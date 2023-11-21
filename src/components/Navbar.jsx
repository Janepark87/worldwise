import { NavLink } from 'react-router-dom';
import styles from './styles/PageNav.module.css';
import { useAuth } from '../contexts/FakeAuthContext';
import Logo from './Logo';
import Button from './Button';

export default function PageNav() {
	const { logout, isAuthenticated } = useAuth();

	return (
		<nav className={styles.nav}>
			<Logo />

			<ul>
				<li>
					<NavLink to="/pricing">Pricing</NavLink>
				</li>
				<li>
					<NavLink to="/product">Product</NavLink>
				</li>
				<li>
					{!isAuthenticated ? (
						<NavLink to="/login" className={styles.ctaLink}>
							Login
						</NavLink>
					) : (
						<Button type="primary" className={styles.catLink} onClick={logout}>
							Log out
						</Button>
					)}
				</li>
			</ul>
		</nav>
	);
}
