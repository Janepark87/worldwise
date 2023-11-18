import { useReducer } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { USER } from '../utils/user';

const AuthContext = createContext();

const initialState = {
	user: null,
	isAuthenticated: false,
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
			return initialState;
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

	const logout = () => {
		dispatch({ type: 'logout' });
	};

	console.log(user);

	return <AuthContext.Provider value={{ user, isAuthenticated, error, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) throw new Error('AuthContext was used outside of the FakeAuthProvider.');
	return context;
}
