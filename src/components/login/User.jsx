import { useNavigate } from 'react-router-dom';
import styles from './styles/User.module.css';
import { useAuth } from '../../contexts/FakeAuthContext';

export default function User() {
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	function handleClick() {
		logout();
		navigate('/');
	}

	return (
		<div className={styles.user}>
			<img src={user.avatar} alt={user.name} />
			<span>Welcome, {user.name}</span>
			<button onClick={handleClick}>Logout</button>
		</div>
	);
}
