import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Login.module.css';
import Main from '../layouts/Main';
import Section from '../layouts/Section';
import Button from '../components/Button';
import Message from '../components/Message';
import { useAuth } from '../contexts/FakeAuthContext';
import { USER } from '../utils/user';

export default function Login() {
	const navigate = useNavigate();
	const inputPW = useRef();
	const { isAuthenticated, login, error } = useAuth();
	const [email, setEmail] = useState(USER.email);
	const [password, setPassword] = useState(USER.password);

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		if (email && password) login(email, password);
		setPassword('');
		inputPW.current.focus();
	};

	useEffect(() => {
		if (isAuthenticated) navigate('/app', { replace: true });
	}, [navigate, isAuthenticated]);

	useEffect(() => {
		inputPW.current.focus();
	}, []);

	return (
		<Main className={styles.login}>
			<Section>
				<form onSubmit={handleLoginSubmit} className={styles.form}>
					<div className={styles.row}>
						<label htmlFor="email">Email address</label>
						<input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} disabled required />
					</div>

					<div className={styles.row}>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							placeholder="Enter the password given to you..."
							ref={inputPW}
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
			</Section>
		</Main>
	);
}
