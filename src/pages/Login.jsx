import { useEffect, useState } from 'react';
import styles from './styles/Login.module.css';
import Button from '../components/Button';
import PageNav from '../components/PageNav';
import { useAuth } from '../contexts/FakeAuthContext';
import { USER } from '../utils/user';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';

export default function Login() {
	const navigate = useNavigate();
	const { isAuthenticated, login, error } = useAuth();
	const [email, setEmail] = useState(USER.email);
	const [password, setPassword] = useState('');

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		if (email && password) login(email, password);
	};

	useEffect(() => {
		if (isAuthenticated) navigate('/app', { replace: true });
	}, [navigate, isAuthenticated]);

	return (
		<main className={styles.login}>
			<PageNav />
			<form onSubmit={handleLoginSubmit} className={styles.form}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						placeholder="Enter the password given to you..."
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						required
					/>
				</div>

				{error && <Message message={error} emoji={false} className="login-error" />}

				<div className="ml-auto">
					<Button type="primary">Login</Button>
				</div>
			</form>
		</main>
	);
}
