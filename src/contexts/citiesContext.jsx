import { createContext, useContext, useEffect, useState } from 'react';

const CITIES_BASE_URL = import.meta.env.VITE_APP_CITIES_API_URL;
const CitiesContext = createContext();

export function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [currentCity, setCurrentCity] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchCities = async () => {
			try {
				setIsLoading(true);
				const citiesEndpoint = import.meta.env.MODE === 'production' ? `${CITIES_BASE_URL}/cities.json` : `${CITIES_BASE_URL}/cities`;

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

	const getCity = async (id) => {
		try {
			setIsLoading(true);
			const cityEndpoint = import.meta.env.MODE === 'production' ? `${CITIES_BASE_URL}/cities.json` : `${CITIES_BASE_URL}/cities/${id}`;
			const data = await (await fetch(cityEndpoint)).json();
			setCurrentCity(data);
		} catch (err) {
			console.log(err.message);
			alert('There was an error loading data...', err.message);
		} finally {
			setIsLoading(false);
		}
	};

	const createCity = async (newCity) => {
		// POST request To add a new city into cities.json file
		try {
			setIsLoading(true);
			const cityEndpoint = import.meta.env.MODE === 'production' ? `${CITIES_BASE_URL}/cities.json` : `${CITIES_BASE_URL}/cities`;

			const data = await (
				await fetch(cityEndpoint, {
					method: 'POST',
					body: JSON.stringify(newCity),
					headers: {
						'Content-Type': 'application/json',
					},
				})
			).json();

			setCities((cities) => [data, ...cities]);
		} catch (err) {
			console.log(err.message);
			alert('There was an error loading data...', err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return <CitiesContext.Provider value={{ cities, currentCity, getCity, isLoading, createCity }}>{children}</CitiesContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined) throw new Error('CitiesContext was used outside of the CitiesProvider.');
	return context;
}
