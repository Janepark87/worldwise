import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import ProtectedRoute from './pages/ProtectedRoute';
import AppHub from './pages/AppHub';
import CityList from './components/cities/CityList';
import City from './components/cities/City';
import CountryList from './components/cities/CountryList';
import AppForm from './components/apphub/AppForm';

export default function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Routes>
						<Route index element={<Homepage />} />
						<Route path="pricing" element={<Pricing />} />
						<Route path="product" element={<Product />} />
						<Route
							path="app"
							element={
								<ProtectedRoute>
									<AppHub />
								</ProtectedRoute>
							}>
							<Route index element={<Navigate to="cities" replace />} />
							<Route path="cities" element={<CityList />} />
							<Route path="cities/:id" element={<City />} />
							<Route path="countries" element={<CountryList />} />
							<Route path="form" element={<AppForm />} />
						</Route>
						<Route path="/login" element={<Login />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}
