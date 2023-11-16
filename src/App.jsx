import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import CityList from './components/CityList';
import City from './components/City';
import CountryList from './components/CountryList';
import Form from './components/Form';
import { CitiesProvider } from './contexts/citiesContext';

export default function App() {
	return (
		<CitiesProvider>
			<BrowserRouter>
				<Routes>
					<Route index element={<Homepage />} />
					<Route path="pricing" element={<Pricing />} />
					<Route path="product" element={<Product />} />
					<Route path="app" element={<AppLayout />}>
						<Route index element={<Navigate to="cities" replace />} />
						<Route path="cities" element={<CityList />} />
						<Route path="cities/:id" element={<City />} />
						<Route path="countries" element={<CountryList />} />
						<Route path="form" element={<Form />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</CitiesProvider>
	);
}
