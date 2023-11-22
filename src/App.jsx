import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';

import ProtectedRoute from './pages/ProtectedRoute';
import CityList from './components/cities/CityList';
import City from './components/cities/City';
import CountryList from './components/cities/CountryList';
import AppForm from './components/apphub/AppForm';
import SpinnerFullPage from './components/SpinnerFullPage';

const Homepage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const AppHub = lazy(() => import('./pages/AppHub'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

export default function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Suspense fallback={<SpinnerFullPage />}>
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
					</Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}
