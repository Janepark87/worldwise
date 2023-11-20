import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/FakeAuthContext';

export default function ProtectedRoute({ children }) {
	const { isAuthenticated } = useAuth();
	return !isAuthenticated ? <Navigate to="/" /> : children;
}
