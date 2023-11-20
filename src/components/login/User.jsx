import { useAuth } from '../../contexts/FakeAuthContext';
import styles from './styles/User.module.css';
import { useNavigate } from 'react-router-dom';

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
