import { NavLink, useNavigate } from 'react-router-dom';
import styles from './styles/PageNav.module.css';
import { useAuth } from '../contexts/FakeAuthContext';
import Logo from './Logo';
import Button from './Button';

export default function PageNav() {
	const navigate = useNavigate();
	const { logout, isAuthenticated } = useAuth();

	function handleClick() {
		logout();
		navigate('/');
	}

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
						<Button type="primary" className={styles.catLink} onClick={handleClick}>
							Log out
						</Button>
					)}
				</li>
			</ul>
		</nav>
	);
}
