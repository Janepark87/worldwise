import { useReducer } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const AuthContext = createContext();

const initialState = {
	user: null,
	isAuthenticated: false,
};

const FAKE_USER = {
	name: 'Jane',
	email: 'jane@example.com',
	password: 'green2024',
	avatar: 'https://i.pravatar.cc/100?u=zz',
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'login':
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
			};
		case 'logout':
			return initialState;
		default:
			throw new Error('Invalid action');
	}
};

export function FakeAuthProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

	const login = (email, password) => {
		if (email === FAKE_USER.email && password && FAKE_USER.password) dispatch({ type: 'login', payload: FAKE_USER });
	};
	const logout = () => {
		dispatch({ type: 'logout' });
	};

	return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}

export function useFakeAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) throw new Error('AuthContext was used outside of the FakeAuthProvider.');
	return context;
}
