import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import CityList from './components/CityList';
import CountryList from './components/CountryList';

export default function App() {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchCities = async () => {
			try {
				setIsLoading(true);
				const citiesApiUrl = import.meta.env.VITE_APP_CITIES_API_URL;
				const citiesEndpoint = import.meta.env.MODE === 'production' ? `${citiesApiUrl}/cities.json` : `${citiesApiUrl}/cities`;

				const data = await (await fetch(citiesEndpoint)).json();
				setCities(data);
			} catch (err) {
				console.log(err.message);
				alert('There was an error loading data...', err.message);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCities();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path="pricing" element={<Pricing />} />
				<Route path="product" element={<Product />} />
				<Route path="/login" element={<Login />} />
				<Route path="app" element={<AppLayout />}>
					<Route index element={<CityList cities={cities} isLoading={isLoading} />} />
					<Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
					<Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
					<Route path="form" element={<p>form</p>} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
