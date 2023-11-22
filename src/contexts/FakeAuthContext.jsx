import { createContext, useContext, useReducer, useEffect } from 'react';
import { USER } from '../utils/user';

const AuthContext = createContext();
const isAuth = JSON.parse(localStorage.getItem('isAuthenticated'));

const initialState = {
	user: isAuth ? USER : null,
	isAuthenticated: isAuth ?? false,
	error: '',
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'login':
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			};
		case 'logout':
			return {
				...state,
				user: null,
				isAuthenticated: false,
			};
		case 'rejected':
			return {
				...state,
				error: action.payload,
			};
		default:
			throw new Error('Invalid action');
	}
};

export function AuthProvider({ children }) {
	const [{ user, isAuthenticated, error }, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
	}, [isAuthenticated]);

	const login = (email, password) => {
		const isEmail = email === USER.email;
		const isPassword = password === USER.password;

		if (isEmail && isPassword) dispatch({ type: 'login', payload: USER });
		else {
			const errorMessage =
				isEmail && isPassword //
					? 'Invalid email and password.'
					: isEmail
					? 'Invalid email.'
					: 'Invalid password.';
			dispatch({ type: 'rejected', payload: errorMessage });
		}
	};

	const logout = () => dispatch({ type: 'logout' });

	return <AuthContext.Provider value={{ user, isAuthenticated, error, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) throw new Error('AuthContext was used outside of the FakeAuthProvider.');
	return context;
}
